import React from 'react'
import styled, { useTheme } from 'styled-components'
import { Link } from 'gatsby'
import qs from 'qs'

import { PageContext } from '../../../templates/Detail'
import IconTag from 'components/ui/IconTag/IconTag'
import { commaSeparatedElements, commaSeparatedList } from 'utilities/grammar'

const HeaderContainer = styled.header`
  grid-area: header;
  padding-left: 50px;
  margin-top: 20px;

  @media (max-width: 1000px) {
    padding-right: 50px;
  }
  @media (max-width: 700px) {
    padding: 0;
  }
`
const IconContainer = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-top: 15px;
  gap: 20px;
  flex-wrap: wrap;
`
const Author = styled.div`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colorVeryDarkGray};
  font-family: 'Open Sans';
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px; /* 155.556% */
`

const ShortName = styled.h6`
  margin-bottom: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px !important;
  line-height: 22px;
  font-family: 'Open Sans' !important;
`
const TagHolder = styled.div`
  display: flex;
  margin-top: 35px;
  flex-wrap: wrap;
  gap: 15px;
`

const Header = ({ data }: PageContext['data']['resources']['nodes'][0]) => {
  const theme: any = useTheme()

  return (
    <HeaderContainer>
      <h2 style={{ marginTop: 30, marginBottom: 0, lineHeight: 1.2 }}>
        {data.Resource_name}
      </h2>
      <ShortName>[{data.Short_name.trim()}]</ShortName>
      <Author>
        {commaSeparatedElements(
          data.Authoring_organization.map(org => org.data.value)
            .sort((a, b) => a.localeCompare(b))
            .map(org => (
              <Link
                to={`/explore/?${qs.stringify({
                  filters: { Authoring_organization: [org] },
                })}`}
              >
                {org}
              </Link>
            ))
        )}
      </Author>
      <p>{data.Short_description}</p>
      <TagHolder>
        {data.Key_resource === 'Yes' && (
          <IconTag dark name={'Key resource'} style={{ marginRight: '0em' }} />
        )}
        <Link
          to={`/explore?${qs.stringify({
            type: data.Resource_type,
          })}`}
        >
          <IconTag
            dark
            name={data.Resource_type}
            // style={{ marginRight: '1em' }}
          />
        </Link>
        {data.Access_limitations[0] === 'Restricted' && (
          <Link
            to={`/explore?${qs.stringify({
              filters: { Access_limitations: [data.Access_limitations[0]] },
            })}`}
          >
            <IconTag
              name={data.Access_method}
              overrideBackground={`rgba(0,0,0,0)`}
              overrideBorder={theme.colorRed}
              overrideForeground={theme.colorRed}
            />
          </Link>
        )}
      </TagHolder>
      <IconContainer>
        {data.Key_topic_area.map(({ data: { Name: topic } }) => (
          <Link
            key={topic}
            to={`/explore?${qs.stringify({
              filters: { Key_topic_area: [topic] },
            })}`}
          >
            <IconTag name={topic} />
          </Link>
        ))}
      </IconContainer>
    </HeaderContainer>
  )
}

export default Header
