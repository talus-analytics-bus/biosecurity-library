import React, { useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import NavLink from './NavLink'

import Typeahead from 'components/ui/Typeahead'
import useHomePageData from 'airtableQueryHooks/useHomePageData'
import { navigate } from 'gatsby'
import { getDetailURL } from 'utilities/urls'
// import NavSearchResult from './NavSearchResult'

import logoSVG from '../../../../static/Brandmark_wordmark.svg'
import MobileMenu from './MobileMenu/MobileMenu'

const Nav = styled.nav`
  // background-color: ${({ theme }) => theme.colorBlack};
  /* background-color: #05213a; */
  background-color: ${({ theme }) => theme.colorSuperDarkest};
  position: sticky;
  top: 0px;
  width: 100%;
  z-index: 50;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.24);
  border-bottom: 1px solid black;
`
const Container = styled.div`
  margin: 0 auto;
  max-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
`
const LinkList = styled.ol`
  list-style: none;
  display: flex;
  padding: 0;
  margin: 0;
`
const HomeLink = styled(NavLink)`
  font-family: 'Overpass', sans-serif !important;
  /* font-family: 'Spectral' !important; */
  font-weight: 500 !important;
  font-size: 24px !important;
  color: white;
  padding: 0;
  display: flex;
  align-items: center;
  margin-left: 20px;
`

const NavSearchContainer = styled.div`
  display: flex;
  align-items: center;
  font-family: 'Open sans';
  @media (max-width: 900px) {
    display: none;
  }
`

const NavTypeahead = styled(Typeahead)`
  > input {
    border-radius: 2px;
    font-size: 16px;
  }
`

const DesktopNav = styled(LinkList)`
  @media (max-width: 500px) {
    display: none;
  }
`

const MobileLinkList = styled(LinkList)`
  flex-direction: column;
  background-color: ${({ theme }) => theme.colorSuperDarkest};
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`

const MobileSearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Open sans';
  width: 100%;
  padding: 15px;
`

const Banner = styled.div`
  ${({ theme }) => theme.medParagraph}
  width: 100%;
  margin: auto;
  max-width: 1500px;
  padding: 10px;
  padding-left: 28px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    padding-right: 25px;
  }

  > span {
    width: 100%;
    text-align: center;
  }
`

const BannerLink = styled.a`
  ${({ theme }) => theme.medParagraph}
  font-size: 16px !important;
  font-weight: 600 !important;
  color: ${({ theme }) => theme.colorBlack} !important;
`

const BannerContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colorYellow};
`
const CloseBannerButton = styled.button`
  border: none;
  margin-left: auto;
  flex-shrink: 0;
  background: url('data:image/svg+xml,<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(%23clip0_2672_6156)"><path d="M15.8333 5.34163L14.6583 4.16663L9.99996 8.82496L5.34163 4.16663L4.16663 5.34163L8.82496 9.99996L4.16663 14.6583L5.34163 15.8333L9.99996 11.175L14.6583 15.8333L15.8333 14.6583L11.175 9.99996L15.8333 5.34163Z" fill="%23063968"/></g><defs><clipPath id="clip0_2672_6156"><rect width="20" height="20" fill="white"/></clipPath></defs></svg>');
  width: 20px;
  height: 20px;
`

// const MobileNav = styled.div

const NavBar: React.FC = () => {
  const { resourceSearchData } = useHomePageData()

  const [showBanner, setShowBanner] = useState(true)

  const resources = useMemo(
    () =>
      resourceSearchData.nodes
        .map(r => ({
          key: r.data.Short_name,
          label: r.data.Resource_name,
          Description: r.data.Short_description,
          Resource_Name: r.data.Resource_name,
          Resource_Type: r.data.Resource_type,
        }))
        .sort((a, b) => a.label.localeCompare(b.label)),
    [resourceSearchData.nodes]
  )

  const [focusInSearch, setFocusInSearch] = useState(false)
  const theme: any = useTheme()

  return (
    <>
      <Nav>
        <Container>
          <LinkList>
            <HomeLink to="/">
              <img
                src={logoSVG}
                height={'40px'}
                alt={'Biosecurity Central Logo'}
              />
            </HomeLink>
          </LinkList>
          <DesktopNav>
            <li style={{ display: 'inherit' }}>
              <NavSearchContainer
                onFocus={() => setFocusInSearch(true)}
                onBlur={() => setTimeout(() => setFocusInSearch(false), 200)}
              >
                <NavTypeahead
                  style={{
                    margin: 0,
                    minWidth: 400,
                    flexShrink: 0,
                    marginRight: 14,
                  }}
                  iconLeft
                  fontColor={focusInSearch ? 'black' : 'white'}
                  // borderColor="#5B6476"
                  borderColor={theme.colorYellow}
                  backgroundColor={focusInSearch ? 'white' : '#082E51'}
                  items={resources}
                  placeholder={`Search`}
                  // RenderItem={({ item, selected }) => (
                  //   <NavSearchResult {...{ item, selected }} />
                  // )}
                  onAdd={resource => {
                    if (resource)
                      navigate(
                        getDetailURL({
                          Resource_type: resource.Resource_Type,
                          Short_name: resource.key,
                        })
                      )
                  }}
                  iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23ABB8C4'/%3E%3C/svg%3E%0A`}
                />
              </NavSearchContainer>
            </li>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/explore/">Explore</NavLink>
            <NavLink to="/about/">About</NavLink>
          </DesktopNav>
          <MobileMenu>
            <MobileLinkList>
              <NavLink to="/">Home</NavLink>
              <NavLink to="/explore/">Explore</NavLink>
              <NavLink to="/about/">About</NavLink>
              <li style={{ display: 'inherit' }}>
                <MobileSearchContainer
                  onFocus={() => setFocusInSearch(true)}
                  onBlur={() => setTimeout(() => setFocusInSearch(false), 200)}
                >
                  <NavTypeahead
                    style={{
                      margin: 0,
                      // flexShrink: 0,
                      width: '100%',
                    }}
                    iconLeft
                    fontColor={focusInSearch ? 'black' : 'white'}
                    // borderColor="#5B6476"
                    borderColor={theme.colorYellow}
                    backgroundColor={focusInSearch ? 'white' : '#082E51'}
                    items={resources}
                    placeholder={`Search`}
                    // RenderItem={({ item, selected }) => (
                    //   <NavSearchResult {...{ item, selected }} />
                    // )}
                    onAdd={resource => {
                      if (resource)
                        navigate(
                          getDetailURL({
                            Resource_type: resource.Resource_Type,
                            Short_name: resource.key,
                          })
                        )
                    }}
                    iconSVG={`%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.01 11.255H12.22L11.94 10.985C12.92 9.845 13.51 8.365 13.51 6.755C13.51 3.165 10.6 0.254997 7.01001 0.254997C3.42001 0.254997 0.51001 3.165 0.51001 6.755C0.51001 10.345 3.42001 13.255 7.01001 13.255C8.62001 13.255 10.1 12.665 11.24 11.685L11.51 11.965V12.755L16.51 17.745L18 16.255L13.01 11.255ZM7.01001 11.255C4.52001 11.255 2.51001 9.245 2.51001 6.755C2.51001 4.265 4.52001 2.255 7.01001 2.255C9.50001 2.255 11.51 4.265 11.51 6.755C11.51 9.245 9.50001 11.255 7.01001 11.255Z' fill='%23ABB8C4'/%3E%3C/svg%3E%0A`}
                  />
                </MobileSearchContainer>
              </li>
            </MobileLinkList>
          </MobileMenu>
        </Container>
      </Nav>
      <BannerContainer style={{ display: showBanner ? 'flex' : 'none' }}>
        <Banner>
          <span>
            To suggest a resource for inclusion on Biosecurity Central email our
            team at{' '}
            <strong>
              <BannerLink href="mailto:biosecuritycentral@georgetown.edu">
                biosecuritycentral@georgetown.edu.
              </BannerLink>
            </strong>
          </span>
          <CloseBannerButton
            aria-label="Close"
            onClick={() => setShowBanner(false)}
          />
        </Banner>
      </BannerContainer>
    </>
  )
}

export default NavBar
