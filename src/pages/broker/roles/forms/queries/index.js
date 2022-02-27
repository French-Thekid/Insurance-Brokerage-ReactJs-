import { gql } from 'apollo-boost'

export const LIST_ROLES = gql`
  query listRoles {
    listRoles(params: { limit: 10, offset: 0 }) {
      total
      data {
        id
        name
        description
        createdBy {
          firstName
          lastName
        }
        createdAt
      }
    }
  }
`
export const SEARCH_ROLES = gql`
  query searchRoles($query: String!) {
    searchRoles(fragment: $query, limit: 100, offset: 0) {
      id
      name
      description
      createdBy {
        firstName
        lastName
      }
      createdAt
    }
  }
`
export const READ_ROLES = gql`
  query readRole($roleId: Int!) {
    readRole(id: $roleId) {
      id
      name
      description
    }
  }
`
export const LIST_ROLESHAVE_ROLES = gql`
  query rolesAssignedToRole($parentId: Int!) {
    rolesAssignedToRole(parentId: $parentId) {
      id
      name
      description
      createdBy {
        firstName
        lastName
      }
      createdAt
    }
  }
`
export const LIST_ROLES_UNDER_USERS = gql`
  query rolesAssignedToUser($userId: String!) {
    rolesAssignedToUser(params: { userId: $userId, limit: 30, offset: 0 }) {
      id
      name
      description
    }
  }
`
export const LIST_RESOURCES = gql`
  query listObjectsForType($type: String!) {
    listObjectsForType(params: { type: $type, offset: 0, limit: 200 }) {
      id
      type
      parentId
      parentType
      created
      createdBy
    }
  }
`
export const LIST_PERMISSION = gql`
  query listRolePermissions($roleId: Int!) {
    listRolePermissions(params: { roleId: $roleId, limit: 2000, offset: 0 }) {
      roleId
      permissions {
        objectType
        data {
          endpoint
          objectIds
        }
      }
    }
  }
`

export const LIST_PERMISSIONS = gql`
  {
    listPermissions(params: { limit: 200, offset: 0 }) {
      name
      description
      endpoint
      objectType
    }
  }
`
