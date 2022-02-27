import gql from 'graphql-tag'
export const READ_USER = gql`
  query readUser($id: String!) {
    readUser(id: $id) {
      firstName
      lastName
      position
      avatar
      email
    }
  }
`
export const LOGGED_IN_USER = gql`
  {
    loggedInUser {
      id
      email
      firstName
      lastName
      position
      avatar
      base64Avatar
      emailVerified
      status
      enabled
      theme
      role {
        name
        description
      }
    }
  }
`
export const CHECK_PERMISSION = gql`
  mutation checkPermission(
    $userId: String!
    $endpoint: String!
    $objectId: String!
    $objectType: String!
  ) {
    checkPermission(
      params: {
        userId: $userId
        endpoint: $endpoint
        objectId: $objectId
        objectType: $objectType
      }
    )
  }
`

export const READACCOUNT = gql`
  query readAccount($accountId: Int!) {
    readAccount(accountId: $accountId) {
      workflowRanBy
      workflowId
      stepId
      type
      id
      createdByUser {
        avatar
        firstName
        lastName
        position
        userBranch {
          branchName
        }
      }
      createdAt
      person {
        id
        accountId
        title
        avatar
        email
        salutationName
        firstName
        middleName
        lastName
        maritalStatus
        dateOfBirth
        placeOfBirth
        nationality
        gender
        occupation
        industry
        taxIdNumber
        taxIdType
        employmentType
        dlNumber
        dlCountry
        dlDateIssued
        dlDateFirstIssued
        dlType
        dlExpirationDate
      }
      company {
        id
        companyName
        avatar
        industry
        email
        taxIdNumber
        streetNumber
        streetName
        city
        parish
        country
        phoneType
        phoneNumber
        phoneCarrier
        phoneExtension
        createdAt
      }
    }
  }
`
export const ADD_ACCOUNT_TO_WORKFLOW = gql`
  mutation updateAccount(
    $id: Int!
    $workflowId: String
    $workflowRanBy: String
    $stepId: String
    $person: PersonUpdateInput!
  ) {
    updateAccount(
      account: {
        id: $id
        workflowId: $workflowId
        workflowRanBy: $workflowRanBy
        stepId: $stepId
        person: $person
      }
    ) {
      id
      workflowId
      workflowRanBy
      stepId
    }
  }
`
export const LIST_USER_ROLES = gql`
  query rolesAssignedToUser($userId: String!) {
    rolesAssignedToUser(params: { userId: $userId, limit: 10, offset: 0 }) {
      id
    }
  }
`

export const GET_ORGANIZATION = gql`
  query readFacility($id: String) {
    readFacility(id: $id) {
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
