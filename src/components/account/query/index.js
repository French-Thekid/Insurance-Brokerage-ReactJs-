import gql from 'graphql-tag'

export const READACCOUNT = gql`
  query readAccount($accountId: Int!) {
    readAccount(accountId: $accountId) {
      id
      accountHolder
      workflowId
      totalRisks
      totalPolicies
      stepId
      type
      person {
        id
        email
        firstName
        lastName
        avatar
      }
      company {
        id
        companyName
        avatar
        email
      }
    }
  }
`
