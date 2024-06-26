import React from 'react'
import { Link } from 'gatsby'
import styled, { useTheme } from 'styled-components'

import CMS from 'AirtableCMS'

import { Resource } from '../../../airtableQueryHooks/useExplorePageData'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

import * as urls from '../../../utilities/urls'
import { commaSeparatedList } from 'utilities/grammar'

const ResourceContainer = styled.section<{ expanded: boolean }>`
  background: ${({ theme }) => theme.colorVeryLightGray};
  padding: 20px;
  display: grid;
  gap: 15px;
  grid-template-areas:
    'title'
    'author'
    'icons';
  grid-template-rows: min-content 1fr;
  border-bottom: 1px solid ${({ theme }) => theme.colorMedGray};

  ${({ expanded }) =>
    expanded &&
    `grid-template-areas:
      "image title author users summary"
      "image icons author users summary";
      grid-template-columns: 100px 250px 180px 250px auto;`}
`
const Title = styled(Link)`
  grid-area: title;
  font-family: 'Overpass', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorDarker} !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-size: 22px !important;
  line-height: 30px !important;
`
const Author = styled.h6`
  grid-area: author;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  color: ${({ theme }) => theme.colorVeryDarkGray} !important;
  margin: 0px !important;
`
const IconContainer = styled.div`
  grid-area: icons;
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-top: 8px;
`
const Users = styled.div`
  grid-area: users;
`
const Summary = styled.div`
  grid-area: summary;
`
const ThumbnailContainer = styled.div`
  grid-area: image;
  width: 100px;
  padding-right: 15px;
`
const Thumbnail = styled(GatsbyImage)`
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.24);
`

const ResourcePreview: React.FC<Resource & { expand: boolean }> = ({
  data,
  expand,
}) => {
  const theme: any = useTheme()
  const thumbnail = getImage(data.Thumbnail?.localFiles[0])
  return (
    <ResourceContainer expanded={expand}>
      {expand && (
        <ThumbnailContainer>
          {thumbnail && (
            <Thumbnail
              image={thumbnail}
              alt={data.Short_name + 'thumbnail image'}
            />
          )}
        </ThumbnailContainer>
      )}
      <Title to={urls.getDetailURL(data)}>
        {data.Key_resource === 'Yes' && (
          <CMS.Icon
            name="Key resource"
            color={theme.colorGolden}
            style={{
              height: '1.2em',
              display: 'inline-block',
              position: 'relative',
              top: '.2em',
              left: '-.2em',
            }}
          />
        )}
        {data.Access_limitations[0] === 'Restricted' && (
          <CMS.Icon
            name={data.Access_method}
            color={theme.colorRed}
            style={{
              height: '1.2em',
              display: 'inline-block',
              position: 'relative',
              top: '.2em',
              left: '-.2em',
            }}
          />
        )}
        {data.Short_name}
      </Title>
      <Author>
        {commaSeparatedList(
          data.Authoring_organization.map(org => org.data.value).sort((a, b) =>
            a.localeCompare(b)
          )
        )}
      </Author>
      <IconContainer>
        {data.Key_topic_area.sort().map(({ data: { value } }) => (
          <Tippy content={value} key={value}>
            <CMS.Icon
              name={value}
              color={theme.colorDarkest}
              style={{ width: 30 }}
            />
          </Tippy>
        ))}
      </IconContainer>
      {expand && (
        <>
          <Users>
            {/* <p>{commaSeparatedList(data.Target_user_role)}</p> */}
            <span
              style={{
                color:
                  data.Access_limitations[0] === 'Restricted' && theme.colorRed,
              }}
            >
              {data.Access_limitations[0] === 'Restricted' && (
                <CMS.Icon
                  name={data.Access_method}
                  color={theme.colorRed}
                  style={{
                    height: '1.2em',
                    display: 'inline-block',
                    position: 'relative',
                    top: '.2em',
                    left: '-.2em',
                  }}
                />
              )}
              {data.Access_method}
            </span>
          </Users>
          <Summary>
            <p>{data.Short_description}</p>
          </Summary>
        </>
      )}
    </ResourceContainer>
  )
}

export default ResourcePreview
