import { gql } from 'apollo-boost'

export const CREATE_ORGANIZATION = gql`
  mutation createFacility($facility: FacilityCreateInput!) {
    createFacility(facility: $facility) {
      organizationId
    }
  }
`

export const DELETE_ORGANIZATION = gql`
  mutation deleteFacility($id: [String]!) {
    deleteFacility(organizationId: $id) {
      message
    }
  }
`
export const UPDATE_ORGANIZATION = gql`
  mutation updateFacility($facility: FacilityUpdateInput!) {
    updateFacility(facility: $facility) {
      organizationId
      status
    }
  }
`
