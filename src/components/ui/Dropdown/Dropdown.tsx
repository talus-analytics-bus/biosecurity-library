import React, { useEffect, useState } from 'react'
import Expander, { ExpanderProps } from '@talus-analytics/library.ui.expander'

export interface DropdownProps
  extends Omit<ExpanderProps, 'open' | 'style' | 'floating'> {
  /**
   * render prop for the button which opens and closes the
   * dropdown. This function gets passed "open" and "animDuration"
   * props, and must render a button.
   */
  renderButton: (
    open: boolean,
    animDuration: number
  ) => React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>
  /** Trigger the dropdown on hover instead of click */
  hover?: boolean
  /** onOpen effect, which is called whenever the dropdown opens */
  onOpen?: () => void
  /**
   * onOpen effect, which is called whenever the
   * dropdown closes, but not when it mounts closed.
   */
  onClose?: () => void
  /**
   * CSS object to pass to the expander to resolve
   * issues with z-index, border-radius, or shadow.
   */
  expanderStyle?: React.CSSProperties
  animDuration?: number
}

const Dropdown = ({
  renderButton,
  children,
  onOpen,
  onClose,
  hover = false,
  animDuration = 250,
  expanderStyle = {},
  ...props
}: DropdownProps) => {
  const [open, setOpen] = useState<boolean | undefined>(undefined)

  // handle onOpen and onClose effects
  useEffect(() => {
    open === true && onOpen && onOpen()
    open === false && onClose && onClose()
  }, [open, onClose, onOpen])

  // detect onBlur, set a no-time timer to close it next tick but cancel
  // the timer if one of the child elements got focus. taken from here:
  // https://reactjs.org/docs/accessibility.html#mouse-and-pointer-events
  // This approach handles closing the expander when the user clicks away
  // but also when the user navigates away using the keyboard.
  let blurTimeout: ReturnType<typeof global.setTimeout>

  const onBlurHandler = () => {
    blurTimeout = setTimeout(() => {
      setOpen(false)
    })
  }

  const onFocusHandler = () => {
    clearTimeout(blurTimeout)
  }

  // by default, clicking the button opens / closes the expander
  let mouseHandlers: {
    [key: string]: (e: React.MouseEvent<HTMLButtonElement>) => void
  } = { onClick: () => setOpen(prev => !prev) }

  let hoverHandlers: { [key: string]: () => void } = {}
  // if hover is true, only allow onClick events from the keyboard
  // (detected because the clientX and clientY are zero) and use
  // onMouseEnter and onMouseLeave to open / close the dropdown
  if (hover) {
    mouseHandlers = {
      onClick: e => {
        if (e.clientX === 0 && e.clientY === 0) setOpen(prev => !prev)
      },
    }
    hoverHandlers = {
      onMouseEnter: () => setOpen(true),
      onMouseLeave: () => setOpen(false),
    }
  }

  // render the renderButton render props function,
  // and clone it with the new props we need
  const buttonWithProps = React.cloneElement(
    { ...renderButton(open ?? false, animDuration) },
    {
      ...mouseHandlers,
      ...hoverHandlers,
      'aria-expanded': open ? 'true' : 'false',
      'aria-haspopup': 'true',
    }
  )

  // check if we're being passed the right kind
  // of element in the render prop function
  if (
    // standard react elements will have type as a string
    (typeof buttonWithProps.type === 'string' &&
      buttonWithProps.type !== 'button') ||
    // styled components have type.target
    (typeof buttonWithProps.type === 'object' &&
      (buttonWithProps.type as any).target !== 'button')
  ) {
    const type =
      (typeof buttonWithProps.type === 'string' && buttonWithProps.type) ||
      (typeof buttonWithProps.type === 'object' &&
        (buttonWithProps.type as { target: string }).target)
    throw new Error(
      `renderButton render prop in dropdown ` +
        `must render a button element for accessibility. ` +
        `Element type found was ${type}.`
    )
  }

  return (
    <div onFocus={onFocusHandler} onBlur={onBlurHandler}>
      {buttonWithProps}
      <Expander
        {...props}
        floating
        style={expanderStyle}
        {...{ open, animDuration }}
      >
        <div {...hoverHandlers} tabIndex={-1}>
          {children}
        </div>
      </Expander>
    </div>
  )
}

export default Dropdown
