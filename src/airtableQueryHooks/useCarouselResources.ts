import { useStaticQuery, graphql } from 'gatsby'
import { ImageDataLike } from 'gatsby-plugin-image'

export interface CaroselResourceData {
  nodes: {
    data: {
      Resource_name: string
      Short_name: string
      Short_description: string
      Resource_type: string
      Access_limitations: string[]
      Access_method: string
      Authoring_organization: {
        data: {
          Name: string
        }
      }[]
      Key_topic_area: {
        data: {
          Name: string
        }
      }[]
      Thumbnail: {
        localFiles: ImageDataLike[]
      }
    }
  }[]
}

const useCaroselData = (): CaroselResourceData => {
  const { caroselResources }: { caroselResources: CaroselResourceData } =
    useStaticQuery(graphql`
      query caroselResourcesQuery {
        caroselResources: allAirtable(
          filter: {
            table: { eq: "Resource Library" }
            data: { Key_resource: { eq: "Yes" } }
          }
        ) {
          nodes {
            data {
              Short_name
              Resource_name
              Resource_type
              Short_description
              Key_topic_area {
                data {
                  Name
                }
              }
              Access_limitations
              Access_method
              Authoring_organization {
                data {
                  Name
                }
              }
              Thumbnail {
                localFiles {
                  childImageSharp {
                    gatsbyImageData(width: 200, placeholder: BLURRED)
                  }
                }
              }
            }
          }
        }
      }
    `)
  return caroselResources
}

export default useCaroselData
