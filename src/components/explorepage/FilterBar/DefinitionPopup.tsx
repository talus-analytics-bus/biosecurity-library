import React from 'react'
import styled, { useTheme } from 'styled-components'

import CMS from 'AirtableCMS'

const Container = styled.div`
  background-color: ${({ theme }) => theme.colorWhite};
  border-radius: 5px;
  overflow: hidden;
  margin: -5px -9px;
`
const Header = styled.header`
  background-color: ${({ theme }) => theme.colorVeryLightGray};
  color: ${({ theme }) => theme.colorOrange};
  display: flex;
  align-items: center;
  font-family: 'Overpass', Arial, Helvetica, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 26px;
  line-height: 32px;
  padding: 15px;
`
const Content = styled.section`
  padding: 15px;
  color: ${({ theme }) => theme.colorBlack};
`
const DefinitionHeader = styled.div`
  font-size: 16px;
  font-weight: 600;
`
const Definition = styled.div`
  font-size: 16px;
  margin-top: 10px;
  color: black;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
`
const CTA = styled(Definition)`
  font-style: italic;
  color: ${({ theme }) => theme.colorOrange};
`

interface DefinitionPopupProps {
  name: string
  definition: string
}

const DefinitionPopup = ({
  name,
  definition,
}: DefinitionPopupProps): JSX.Element => {
  const theme: any = useTheme()

  return (
    <Container>
      <Header>
        <CMS.Icon
          noEmitError
          name={name}
          color={theme.colorGolden}
          style={{ height: 40, marginRight: 10 }}
        />
        {name}
      </Header>
      {definition && (
        <Content>
          <DefinitionHeader>About this topic</DefinitionHeader>
          <Definition>{definition}</Definition>
          <CTA>Click to filter</CTA>
        </Content>
      )}
    </Container>
  )
}

export default DefinitionPopup
