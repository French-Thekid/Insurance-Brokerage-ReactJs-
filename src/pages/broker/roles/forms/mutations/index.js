import { gql } from 'apollo-boost'

export const DELETE_ROLE = gql`
  mutation DeleteRole($id: Int!) {
    deleteRole(id: $id) {
      message
    }
  }
`

export const CREATE_ROLE = gql`
  mutation CreateRole($name: String!, $description: String!) {
    createRole(role: { name: $name, description: $description }) {
      id
    }
  }
`

export const UPDATE_ROLE = gql`
  mutation updateRole($id: Int!, $name: String!, $description: String!) {
    updateRole(role: { id: $id, name: $name, description: $description }) {
      id
    }
  }
`

export const ASSIGN_PERMISSION = gql`
  mutation assignPermissionsToRole($permission: [AssignPermissionInput]!) {
    assignPermissionsToRole(permissions: $permission) {
      message
    }
  }
`
export const REVOKE_PERMISSION = gql`
  mutation revokePermissionsFromRole($permissions: [RevokePermissionInput]!) {
    revokePermissionsFromRole(permissions: $permissions) {
      message
    }
  }
`

export const ASSIGN_USER_TO_ROLE = gql`
  mutation addUserRoles($userId: String!, $roleId: Int!) {
    addUserRoles(params: { userId: $userId, roleId: $roleId }) {
      message
    }
  }
`
export const DELETE_ASSIGN_USER_TO_ROLE = gql`
  mutation deleteUserRoles($userId: String!, $roleId: Int!) {
    deleteUserRoles(params: { userId: $userId, roleId: $roleId }) {
      message
    }
  }
`

export const ASSIGN_ROLE_TO_ROLE = gql`
  mutation addRolesToRole($parentId: Int!, $childId: Int!) {
    addRolesToRole(params: { parentId: $parentId, child: $childId }) {
      message
    }
  }
`
export const DELETE_ROLE_FROM_ROLE = gql`
  mutation deleteRolesFromRole($parentId: Int!, $childId: Int!) {
    deleteRolesFromRole(params: { parentId: $parentId, child: $childId }) {
      message
    }
  }
`
