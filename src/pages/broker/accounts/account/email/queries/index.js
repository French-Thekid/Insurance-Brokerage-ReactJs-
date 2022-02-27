import { gql } from 'apollo-boost'

export const LIST_EMAIL = gql`
  query listEmail($accountId: Int!) {
    listEmail(accountId: $accountId, limit: 1000) {
      total
      data {
        id
        accountId
        sender {
          email
        }
        bcc {
          email
        }
        cc {
          email
        }
        to {
          email
        }
        attachments {
          name
          url
          mime
          ext
        }
        subject
        timestamp
        html
        attributes
      }
    }
  }
`

export const GET_EMAIL = gql`
  query getEmail($accountId: Int!, $emailId: String!) {
    getEmail(accountId: $accountId, emailId: $emailId) {
      attachments {
        mime
        name
        url
        ext
      }
    }
  }
`
