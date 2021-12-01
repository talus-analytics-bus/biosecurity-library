import React from 'react'
import styled, { useTheme } from 'styled-components'
import CMS from '@talus-analytics/library.airtable-cms'

const Tag = styled.div<{
  foregroundColor: string
  backgroundColor: string
  borderColor: string
}>`
  padding: 0.3em 1em;
  border: 1px solid ${({ borderColor }) => borderColor};
  border-radius: 2em;
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${({ foregroundColor }) => foregroundColor};
  font-size: 16px;
  background-color: ${({ backgroundColor }) => backgroundColor}; ;
`

interface IconTagProps extends React.ComponentPropsWithoutRef<'div'> {
  name: string
  dark?: boolean
}

const IconTag = ({
  name,
  dark = false,
  ...props
}: IconTagProps): JSX.Element => {
  const theme: any = useTheme()

  let backgroundColor: string = dark ? theme.colorDarkest : `rgba(0,0,0,0)`
  let borderColor: string = theme.colorDarkest
  let foregroundColor: string = dark ? theme.colorWhite : theme.colorDarkest

  // special case for key resource
  if (name === 'Key resource') {
    backgroundColor = theme.colorGolden
    borderColor = theme.colorGolden
    foregroundColor = theme.colorDarkest
  }

  return (
    <Tag {...{ foregroundColor, backgroundColor, borderColor, ...props }}>
      <CMS.Icon
        name={name}
        color={foregroundColor}
        style={{
          height: '1.4em',
          width: '1.4em',
          marginRight: '0.375em',
        }}
      />
      {name}
    </Tag>
  )
}

export default IconTag
