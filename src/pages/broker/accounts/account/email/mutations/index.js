import { gql } from 'apollo-boost'

export const SEND_MAIL = gql`
  mutation SendMail($params: SendEmailInput!) {
    sendEmail(params: $params) {
      id
      success
    }
  }
`

export const DELETE_EMAIL = gql`
  mutation DeleteMail($id: String!, $accountId: Int!) {
    deleteEmail(id: $id, accountId: $accountId)
  }
`
