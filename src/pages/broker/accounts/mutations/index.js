import { gql } from 'apollo-boost'

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($account: PersonAccountUpdateInput!) {
    updateAccount(account: $account) {
      person {
        id
      }
    }
  }
`

export const CREATE_ACCOUNT = gql`
  mutation createAccount($account: AccountCreateInput!) {
    createAccount(account: $account) {
      person {
        id
      }
    }
  }
`

export const ADD_ACCOUNT_TO_WORKFLOW = gql`
  mutation updateAccount(
    $id: Int!
    $workflowId: String
    $stepId: String
    $person: PersonUpdateInput!
  ) {
    updateAccount(
      account: {
        id: $id
        workflowId: $workflowId
        stepId: $stepId
        person: $person
      }
    ) {
      id
      workflowId
      stepId
    }
  }
`
