import gql from 'graphql-tag'

export const LIST_FILES = gql`
  query listAccountFiles($accountId: Int!) {
    listAccountFiles(accountId: $accountId) {
      data {
        name
        url
        description
        id
      }
    }
  }
`
