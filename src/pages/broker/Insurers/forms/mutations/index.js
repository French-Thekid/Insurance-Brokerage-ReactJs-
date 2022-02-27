import { gql } from 'apollo-boost'

export const CREATE_INSURER = gql`
  mutation createInsurer($insurer: InsurerCreateInput!) {
    createInsurer(insurer: $insurer) {
      email
    }
  }
`
export const UPDATE_INSURER = gql`
  mutation updateInsurer($Insurer: InsurerUpdateInput!) {
    updateInsurer(insurer: $Insurer) {
      email
    }
  }
`

export const DELETE_INSURER = gql`
  mutation deleteInsurer($id: Int!) {
    deleteInsurer(id: $id) {
      message
    }
  }
`
