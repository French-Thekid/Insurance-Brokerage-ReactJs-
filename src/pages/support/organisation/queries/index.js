import gql from 'graphql-tag'

export const LIST_ORGANIZATION = gql`
  query listFacilities {
    listFacilities(params: { id: "" }) {
      organizationId
      name
      taxId
      organisationEmail
      replyToEmail
      status
      logoUrl
      description
      templates {
        slip {
          avatar
          headerContent
          templateName
          footerContent
          body
        }
        workflows {
          name
          createdAt
          id
          description
          body
          steps {
            id
            name
            description
            steType
            userIDs
          }
        }
      }
      base64Logo
      location {
        streetNumber
        streetName
        city
        province
        country
      }
      adminContact {
        avatar
        firstName
        lastName
        phone
        position
        email
      }
      billingContact {
        avatar
        firstName
        lastName
        phone
        position
        email
      }
      technicalContact {
        avatar
        firstName
        lastName
        phone
        position
        email
      }
    }
  }
`
