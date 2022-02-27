import gql from 'graphql-tag'

export const LIST_ACCOUNTS = gql`
  query listAccount {
    listAccount {
      total
      data {
        id
        accountHolder
        workflowId
        stepId
        createdBy {
          id
        }
        person {
          id
          firstName
          gender
          lastName
          companyName
          avatar
          accountId
          title
          avatar
          email
        }
      }
    }
  }
`

export const LIST_USERS = gql`
  query listUsers {
    listUsers(params: { limit: 8, offset: 0 }) {
      data {
        avatar
        firstName
        lastName
        position
        email
        enabled
        id
      }
      total
    }
  }
`

export const ACTIVEINACTIVE_POLICYCOUNT = gql`
  query getActiveInactivePolicyCount {
    getActiveInactivePolicyCount {
      active
      inactive
    }
  }
`

export const DAILY_EVENT_COUNT = gql`
  query getUserDailyEventCount($userId: String!, $startDate: String!) {
    getUserDailyEventCount(userId: $userId, startDate: $startDate)
  }
`
