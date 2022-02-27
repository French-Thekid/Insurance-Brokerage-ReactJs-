import { gql } from 'apollo-boost'

export const EDIT_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      email
      firstName
      lastName
      position
      avatar
      id
    }
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      email
      firstName
      lastName
      position
      id
    }
  }
`

export const ENABLE_USER = gql`
  mutation EnableUser($id: String!) {
    enableUser(id: $id) {
      enabled
    }
  }
`
export const FORCE_RESET_USER = gql`
  mutation adminForceResetUserPassword($email: String!) {
    adminForceResetUserPassword(email: $email) {
      message
    }
  }
`

export const DISABLE_USER = gql`
  mutation DisableUser($id: String!) {
    disableUser(id: $id) {
      enabled
    }
  }
`
export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      message
    }
  }
`
