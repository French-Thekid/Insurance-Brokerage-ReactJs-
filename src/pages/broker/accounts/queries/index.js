import gql from 'graphql-tag'

export const SEARCH_PERSONS = gql`
  query searchPersons($query: String!) {
    searchPersons(query: $query, limit: 100) {
      data {
        id
        gender
        accountId
        firstName
        lastName
        companyName
        title
        avatar
        email
      }
    }
  }
`

export const LIST_ACCOUNTS = gql`
  query listAccount {
    listAccount {
      total
      data {
        id
        accountHolder
        workflowId
        totalRisks
        totalPolicies
        stepId
        type
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
          gender
          accountId
          firstName
          lastName
          companyName
          title
          avatar
          email
          streetNumber
          streetName
          city
          parish
          country
          type
          number
          carrier
          extensionRange
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
  }
`

export const READ_ACCOUNT = gql`
  query readAccount($accountId: Int!) {
    readAccount(accountId: $accountId) {
      id
      accountHolder
      workflowId
      totalRisks
      totalPolicies
      stepId
      type
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
        streetNumber
        streetName
        city
        parish
        country
        type
        number
        carrier
        extensionRange
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
