import gql from 'graphql-tag'

export const LIST_USERS = gql`
  query listUsers {
    listUsers(params: { limit: 1000, offset: 0 }) {
      data {
        id
        email
        firstName
        lastName
        position
        avatar
        base64Avatar
        emailVerified
        status
        enabled
        branchId
        person {
          id
        }
        role {
          id
        }
        userBranch {
          id
          branchName
        }
      }
      total
    }
  }
`

export const SEARCH_USERS = gql`
  query searchUsers($query: String!) {
    searchUsers(fragment: $query, limit: 100, offset: 0) {
      data {
        avatar
        firstName
        lastName
        position
        email
        enabled
        id
      }
    }
  }
`

export const LIST_USERSHAVE_ROLES = gql`
  query usersAssignedToRole($roleId: Int!) {
    usersAssignedToRole(params: { limit: 1000, offset: 0, roleId: $roleId }) {
      avatar
      firstName
      lastName
      position
      email
      enabled
      id
    }
  }
`

export const READ_USER = gql`
  query readUser($id: String!) {
    readUser(id: $id) {
      id
      email
      firstName
      lastName
      position
      avatar
      base64Avatar
      emailVerified
      status
      enabled
      branchId
      person {
        id
      }
      role {
        id
      }
      userBranch {
        id
        branchName
      }
    }
  }
`
