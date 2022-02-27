import { gql } from 'apollo-boost'

export const CREATE_TASK = gql`
  mutation createTask($task: CreateTaskInput!) {
    createTask(task: $task) {
      description
    }
  }
`

export const UPDATE_TASK = gql`
  mutation updateTask($task: UpdateTaskInput!) {
    updateTask(task: $task) {
      description
    }
  }
`

export const REMOVE_TASK = gql`
  mutation deleteTask($userId: String!, $id: Int!) {
    deleteTask(params: { userId: $userId, id: $id }) {
      message
    }
  }
`
