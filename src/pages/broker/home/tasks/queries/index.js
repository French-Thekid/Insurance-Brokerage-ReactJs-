import { gql } from 'apollo-boost'

export const LIST_TASK = gql`
  query listUserTasks($userId: String!) {
    listUserTasks(params: { userId: $userId, limit: 1000, offset: 0 }) {
      data {
        id
        description
        completed
      }
    }
  }
`
