import gql from 'graphql-tag'

export const LISTNOTES = gql`
  query listNotes($accountId: Int!) {
    listNotes(params: { accountId: $accountId, offset: 0, limit: 200 }) {
      total
      data {
        id
        createdAt
        content
        section
        createdByUser {
          id
          avatar
          firstName
          lastName
        }
      }
    }
  }
`
