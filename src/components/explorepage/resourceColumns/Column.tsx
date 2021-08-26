import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { urlString } from '../../../airtable-cms/utilities'

import { ResourceGroup } from '../../../pages/explore'

const ColumnContainer = styled.div`
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
`

const Column: React.FC<{ name: string; resources: ResourceGroup | undefined }> =
  ({ name, resources }) => {
    console.log(resources)
    return (
      <ColumnContainer>
        <h3>{name}</h3>
        {resources &&
          resources.nodes.map(({ data }) => (
            <p>
              <Link
                to={
                  '/resource/' +
                  urlString(data.Resource_Type) +
                  urlString(data.Short_Name)
                }
              >
                {data.Resource_Name}
              </Link>
            </p>
          ))}
      </ColumnContainer>
    )
  }

export default Column
