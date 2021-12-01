import CMS from '@talus-analytics/library.airtable-cms'
import React from 'react'
import styled, { useTheme } from 'styled-components'

const Tag = styled.div<{ dark: boolean }>`
  padding: 0.25em 1em;
  border: 1px solid ${({ theme }) => theme.colorDarkest};
  border-radius: 2em;
  width: fit-content;
  display: flex;
  align-items: center;
  color: ${({ theme, dark }) => (dark ? theme.colorWhite : theme.colorDarkest)};
  margin-bottom: 1em;
  ${({ theme, dark }) => dark && `background-color: ${theme.colorDarkest}`}
`

interface IconTagProps {
  name: string
  dark?: boolean
}

const IconTag = ({ name, dark = false }: IconTagProps): JSX.Element => {
  const theme: any = useTheme()

  return (
    <Tag dark={dark}>
      <CMS.Icon
        name={name}
        color={dark ? theme.colorWhite : theme.colorDarkest}
        style={{
          height: '1.5em',
          width: '1.5em',
          marginRight: '0.375em',
          position: 'relative',
          top: -1,
        }}
      />
      {name}
    </Tag>
  )
}

export default IconTag
