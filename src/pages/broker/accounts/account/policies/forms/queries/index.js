import { gql } from 'apollo-boost'

export const SEARCH_PERSON = gql`
  query searchPersons($query: String!) {
    searchPersons(query: $query, limit: 15) {
      data {
        firstName
        lastName
        gender
        companyName
        nationality
        taxIdNumber
        dlNumber
        dlDateIssued
        dlExpirationDate
        email
        id
      }
    }
  }
`

export const LIST_PERSON = gql`
  query listPerson {
    listPerson(limit: 100, offset: 0) {
      data {
        firstName
        lastName
        gender
        companyName
        nationality
        taxIdNumber
        dlNumber
        dlDateIssued
        dlExpirationDate
        email
        id
      }
    }
  }
`
