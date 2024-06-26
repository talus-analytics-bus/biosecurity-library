import CMS from 'AirtableCMS'
import Footer from 'components/layout/Footer'
import React from 'react'
import styled from 'styled-components'
import useAboutPageData from '../airtableQueryHooks/useAboutPageData'

import NavBar from '../components/layout/NavBar/NavBar'
import AccessibilityBanner from '../components/ui/AccessibilityBanner/AccessibilityBanner'
import FigmaProvider from '../figma/FigmaProvider'

const Header = styled.header`
  text-align: center;
`
const AboutMain = styled.section`
  max-width: 1000px;
  padding: 0 50px;
  @media (max-width: 700px) {
    padding: 0px 10px;
  }
  margin: 0 auto;
  margin-bottom: 3em;
  color: ${({ theme }) => theme.colorBlack};

  p {
    margin-top: 1em;
    margin-bottom: 1em;
  }
`
const ImageBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  margin-bottom: 60px;
  max-width: 100%;
`
const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
`
const ButtonLink = styled(CMS.Download)`
  display: block;
  width: fit-content;
  text-decoration: none;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    ${({ theme }) => theme.colorGolden};
  padding: 0.5em 1em;
  border: 1px solid ${({ theme }) => theme.colorGolden};
  color: ${({ theme }) => theme.colorBlack} !important;
  margin-top: 1em;
  transition: 250ms;
  border-radius: 2px;

  &:hover {
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.3) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      ${({ theme }) => theme.colorYellow};
    border: 1px solid ${({ theme }) => theme.colorYellow};
    text-decoration: none !important;
  }
`

const About = (): JSX.Element => {
  const data = useAboutPageData()

  const imgScale = 1

  return (
    <FigmaProvider>
      <NavBar />
      <CMS.SEO title={'About'} />
      <AboutMain>
        <Header>
          <h1>
            <CMS.Text name="H1" data={data} />
          </h1>
        </Header>

        <AccessibilityBanner>
          <CMS.RichText name="Accessibility notice" data={data} />
        </AccessibilityBanner>

        <h2 style={{ marginBottom: 20 }}>
          <CMS.Text name="Overview h2" data={data} />
        </h2>
        <CMS.RichText name="Overview" data={data} />

        <ButtonLink name="Methods button" data={data} />

        <ImageBar>
          <ImageContainer
            style={{ height: 70 * imgScale, width: 272 * imgScale }}
          >
            <CMS.Image
              imgStyle={{ objectFit: 'contain' }}
              name="WOAH logo"
              data={data}
            />
          </ImageContainer>
          <ImageContainer
            style={{ height: 50 * imgScale, width: 415 * imgScale }}
          >
            <CMS.Image
              imgStyle={{ objectFit: 'contain' }}
              name="Funder logo"
              data={data}
            />
          </ImageContainer>
          <ImageContainer
            style={{ height: 50 * imgScale, width: 460 * imgScale }}
          >
            <CMS.Image
              imgStyle={{ objectFit: 'contain' }}
              name="Georgetown logo"
              data={data}
            />
          </ImageContainer>
        </ImageBar>

        <h2
          style={{
            marginBottom: 15,
            borderTop: '1px solid #D3D3D3',
            paddingTop: 30,
          }}
        >
          <CMS.Text name="Other h2" data={data} />
        </h2>
        <CMS.RichText name="Other text" data={data} />
      </AboutMain>
      <Footer />
    </FigmaProvider>
  )
}

export default About
