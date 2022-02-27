import gql from 'graphql-tag'

export const SUBMIT_SLIP = gql`
  mutation emailSlip(
    $accountId: Int!
    $createdOn: String!
    $submitDate: String!
    $emails: [String!]
    $slip: String!
    $name: String!
    $subject: String!
    $body: String!
  ) {
    emailSlip(
      slip: {
        metadata: { createdon: $createdOn, submittedon: $submitDate }
        email: {
          accountId: $accountId
          subject: $subject
          html: $body
          to: $emails
          attachments: { body: $slip, name: $name }
        }
      }
    ) {
      message
    }
  }
`

export const DELETE_SLIP = gql`
  mutation deleteSlip($accountId: Int!, $id: String!) {
    deleteSlip(id: $id, accountId: $accountId) {
      message
    }
  }
`
