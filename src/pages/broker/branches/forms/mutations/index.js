import { gql } from 'apollo-boost'

export const CREATE_BRANCH = gql`
  mutation createBranch($branch: BranchCreateInput!) {
    createBranch(branch: $branch) {
      id
    }
  }
`
export const UPDATE_BRANCH = gql`
  mutation updateBranch($branch: BranchUpdateInput!) {
    updateBranch(branch: $branch) {
      id
    }
  }
`

export const DELETE_BRANCH = gql`
  mutation deleteBranch($id: [Int]!) {
    deleteBranch(id: $id) {
      message
    }
  }
`
