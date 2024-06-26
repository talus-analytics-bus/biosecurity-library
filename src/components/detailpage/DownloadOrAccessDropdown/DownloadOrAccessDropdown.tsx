import React from 'react'
import styled from 'styled-components'

import Dropdown from 'components/ui/Dropdown'

import LanguageList from './LanguageList'

const DropdownCaret = styled.div<{ open: boolean; animDuration: number }>`
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='6' viewBox='0 0 12 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L6 6L12 0H0Z' fill='%233A3A3C'/%3E%3C/svg%3E%0A");
  transform: ${({ open }) => (open ? `scaleY(-1)` : `scaleY(1)`)};
  transition: ${({ animDuration }) => animDuration + 'ms ease'};
  background-position: 100% 60%;
  background-repeat: no-repeat;
  background-size: contain;
  margin-left: 15px;
  height: 10px;
  width: 15px;
`

const DropdownButton = styled.button<{ open: boolean; animDuration: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.colorBlack} !important;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #bdd9f2;

  border: 2px solid #bdd9f2;
  box-sizing: border-box;
  box-shadow: 0px 1.5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin-top: 25px;
  padding: 10px 20px;
  transition: ${({ animDuration }) => animDuration + 'ms ease'};

  ${({ open }) =>
    open &&
    `
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #9bc1e2;
    border: 2px solid #a7c6e1;
  `}
`

const DownloadLinkButton = styled.a`
  display: block;
  width: fit-content;
  color: ${({ theme }) => theme.colorBlack} !important;
  background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    #bdd9f2;

  border: 2px solid #bdd9f2;
  box-sizing: border-box;
  box-shadow: 0px 1.5px 4px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  margin-top: 25px;
  padding: 10px 20px;

  /* &:hover {
    text-decoration: none !important;
  } */
`

const DownloadContainer = styled.div`
  padding: 15px;
  min-width: 200px;
`

interface DownloadOrAccessDropdownProps {
  data: {
    Short_name: string
    Other_language_URLs: string
    URL_for_resource: string
    Resource_language?: string[]
    Primary_file?: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
    Other_language_files?: {
      localFiles: {
        publicURL: string
        name: string
      }[]
    }
  }
  showLanguages?: boolean
  showBothButtons?: boolean
}

const DownloadOrAccessDropdown = ({
  data,
  showLanguages,
  showBothButtons,
}: DownloadOrAccessDropdownProps) => {
  const languageFiles: { [key: string]: string } = {}
  if (data.Primary_file?.localFiles[0].publicURL)
    languageFiles['English'] = data.Primary_file?.localFiles[0].publicURL

  data.Other_language_files?.localFiles.forEach(file => {
    const lang = file.name.split('_').slice(-1)[0].replace('.', '')
    languageFiles[lang] = file.publicURL
  })

  const languageURLs: { [key: string]: string } = {}
  if (Object.keys(languageFiles).length === 0 || showBothButtons) {
    if (data.URL_for_resource) languageURLs['English'] = data.URL_for_resource

    data.Other_language_URLs?.split('\n').forEach(row => {
      const [lang, url] = row.split(': ')
      languageURLs[lang] = url
    })
  }

  return (
    <>
      {Object.keys(languageFiles).length === 1 && (
        <DownloadLinkButton
          href={languageFiles.English}
          target="_blank"
          rel="noreferrer"
        >
          Download
        </DownloadLinkButton>
      )}
      {Object.keys(languageFiles).length > 1 && (
        <Dropdown
          hover
          renderButton={(open, animDuration) => (
            <DropdownButton {...{ open, animDuration }}>
              Download ({Object.keys(languageFiles).length})
              <DropdownCaret {...{ open, animDuration }} />
            </DropdownButton>
          )}
        >
          <DownloadContainer>
            {Object.entries(languageFiles).map(([lang, url]) => (
              <p key={url}>
                <a href={url} target="_blank" rel="noreferrer">
                  {lang}
                </a>
              </p>
            ))}
          </DownloadContainer>
        </Dropdown>
      )}
      {Object.keys(languageURLs).length === 1 && (
        <DownloadLinkButton
          href={languageURLs.English}
          target="_blank"
          rel="noreferrer"
        >
          Access
        </DownloadLinkButton>
      )}
      {Object.keys(languageURLs).length > 1 && (
        <Dropdown
          hover
          renderButton={(open, animDuration) => (
            <DropdownButton {...{ open, animDuration }}>
              Access ({Object.keys(languageURLs).length})
              <DropdownCaret {...{ open, animDuration }} />
            </DropdownButton>
          )}
        >
          <DownloadContainer>
            {Object.entries(languageURLs).map(([lang, url]) => (
              <p key={lang}>
                <a href={url ?? lang} target="_blank" rel="noreferrer">
                  {lang}
                </a>
              </p>
            ))}
          </DownloadContainer>
        </Dropdown>
      )}
      {showLanguages && (
        <LanguageList
          languages={data.Resource_language}
          {...{ languageFiles, languageURLs }}
        />
      )}
    </>
  )
}

export default DownloadOrAccessDropdown
