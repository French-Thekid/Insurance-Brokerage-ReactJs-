import { gql } from 'apollo-boost'

export const LIST_BRANCHES = gql`
  query listBranches {
    listBranches(params: { limit: 1000, offset: 0 }) {
      total
      data {
        id
        branchName
        streetNumber
        streetName
        city
        parish
        country
      }
    }
  }
`
