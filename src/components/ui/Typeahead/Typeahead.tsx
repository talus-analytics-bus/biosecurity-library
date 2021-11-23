import React, { useState, useRef, useEffect, useMemo } from 'react'
import Fuse from 'fuse.js'

import {
  Container,
  SearchBar,
  Results,
  ItemButton,
  SearchIcon,
  Selected,
  SelectedItem,
} from './DisplayComponents'

import removeSVG from './assets/remove.svg'
import TypeaheadResult from './TypeaheadResult'

export interface Item {
  key: string
  label: string
  [key: string]: any
}

interface RenderItemProps {
  item: Item
}

export interface TypeaheadProps {
  /** The array of items that the user should
   * be able to select from
   */
  items: Item[]
  /**
   * The currently selected items
   */
  values: Item[]
  /**
   * Function called when and item is
   * selected; the first argument will
   * be passed the selected item
   */
  onAdd: (item: Item) => void
  /**
   * Function called when and item is removed
   * from the multiselect, the first argument
   * will be the removed item.
   */
  onRemove: (item: Item) => void
  /** Toggle multi-select or single-select mode */
  multiselect?: boolean
  /**
   * Placeholder string for the search bar
   */
  placeholder?: string
  /**
   * React functional component which should be used
   * to render each item. The props passed to this
   * component will contain 'item' which is the
   * item being rendered.
   */
  RenderItem?: React.FC<RenderItemProps>
  /**
   * The properties of the Item object which should be
   * considered in the fuzzy search. Properties for search
   * must have string values.
   */
  searchKeys?: Fuse.FuseOptionKey[]
  /**
   * className; for supporting scss modules and
   * styled-components.
   */
  className?: string
  /**
   * Toggle disabled state
   */
  disabled?: boolean
  /**
   * object of styles which will be passed
   * to the container component
   */
  style?: React.CSSProperties
  ariaLabel?: string
}

const Typeahead = ({
  multiselect = false,
  items,
  values,
  onAdd,
  onRemove,
  placeholder = '',
  RenderItem = ({ item: { label } }) => (
    <TypeaheadResult>{label}</TypeaheadResult>
  ),
  searchKeys = ['key', 'label'],
  className = '',
  disabled = false,
  style = {},
  ariaLabel = '',
}: TypeaheadProps) => {
  if (!items) throw new Error('Item array in multiselect cannot be undefined')

  const [searchString, setSearchString] = useState('')
  const [showResults, setShowResults] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // compute fuzzy search
  const fuse = useMemo(
    () => new Fuse(items, { keys: searchKeys }),
    [items, searchKeys]
  )

  const results = fuse.search(searchString).map(({ item }) => item)

  // accept top result if enter is pressed
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (results[0] || items[0]) onAdd(results[0] || items[0])
      inputRef.current!.blur()
      setShowResults(false)
      setSearchString('')
    }
  }

  // close results onBlur, but
  // not if a button is clicked
  let blurTimeout: ReturnType<typeof global.setTimeout>
  const onBlurHandler = () => {
    // set it to close next tick
    blurTimeout = setTimeout(() => {
      setShowResults(false)
      if (!values) setSearchString('')
    })
  }

  // if focus is inside the container,
  // cancel the timer, don't close it
  const onFocusHandler = () => {
    clearTimeout(blurTimeout)
    setShowResults(true)
    inputRef.current!.focus()
  }

  useEffect(() => {
    if (values.length > 0 && !multiselect) setSearchString(values[0]?.label)
  }, [values, multiselect])

  useEffect(() => {
    if (disabled && !values) setSearchString('')
  }, [disabled, values])

  return (
    <Container
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      className={className}
      onSubmit={e => e.preventDefault()}
      style={style}
    >
      <SearchBar
        disabled={disabled}
        type="search"
        autoComplete="off"
        name="special-auto-fill"
        ref={inputRef}
        onKeyPress={handleKeyPress}
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
      />
      <SearchIcon searchString={searchString} />

      <Results style={{ display: showResults ? 'flex' : 'none' }}>
        {multiselect && values.length > 0 && (
          <Selected>
            {values.map((item: Item) => (
              <SelectedItem onClick={() => onRemove(item)}>
                {item.label}
                <img
                  src={removeSVG}
                  style={{ flexShrink: 0 }}
                  alt="Remove item"
                />
              </SelectedItem>
            ))}
          </Selected>
        )}
        {(results.length > 0 && searchString !== values[0]?.label
          ? results
          : items
        ).map(item => (
          <ItemButton key={item.key} onClick={() => onAdd(item)}>
            <RenderItem {...{ item }} />
          </ItemButton>
        ))}
      </Results>
    </Container>
  )
}

export default Typeahead