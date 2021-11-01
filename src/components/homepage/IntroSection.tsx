import React from 'react'
import styled from 'styled-components'

import AirtableCMSText from '../../airtable-cms/AirtableCMSText'
import useHomePageData from '../../airtableQueryHooks/useHomePageData'

const Section = styled.section`
  h1 {
    text-align: center;
    margin-bottom: 0px;
  }

  h3 {
    margin-top: 30px;
    font-weight: normal;
    font-style: normal;
    line-height: 38px;
  }
`

const IntroSection = (): JSX.Element => {
  const { homePageText } = useHomePageData()

  return (
    <Section>
      <h1>
        <AirtableCMSText name={'First Header'} data={homePageText} />
      </h1>
      <h3>
        <AirtableCMSText name={'First Paragraph'} data={homePageText} />
      </h3>
    </Section>
  )
}

export default IntroSection
