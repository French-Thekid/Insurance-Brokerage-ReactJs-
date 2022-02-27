import { gql } from 'apollo-boost'

export const CREATE_INSURER = gql`
  mutation createInsurer(
    $email: String!
    $company: String!
    $firstName: String
    $lastName: String
    $phoneType: String
    $phoneNumber: String!
    $phoneCarrier: String
    $phoneExtension: String
    $premise: String
    $subPremise: String
    $streetNumber: String
    $thoroughfare: String
    $country: String
    $base64Avatar: String
  ) {
    createInsurer(
      insurer: {
        email: $email
        company: $company
        firstName: $firstName
        lastName: $lastName
        phoneType: $phoneType
        phoneNumber: $phoneNumber
        phoneCarrier: $phoneCarrier
        phoneExtensionRange: $phoneExtension
        addressPremise: $premise
        addressSubPremise: $subPremise
        addressStreetNumber: $streetNumber
        addressThoroughfare: $thoroughfare
        addressCountry: $country
        base64Avatar: $base64Avatar
      }
    ) {
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
