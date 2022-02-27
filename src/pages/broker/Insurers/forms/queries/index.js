import { gql } from 'apollo-boost'

export const LIST_INSURERS = gql`
  query {
    listInsurer(limit: 100, offset: 0) {
      total
      data {
        id
        avatar
        company
        base64Avatar
        email
        firstName
        lastName
        phoneNumber
        phoneCarrier
        phoneType
        phoneExtension
        streetNumber
        streetName
        country
        city
        parish
        createdAt
        updatedAt
        deletedAt
        updatedBy
        deletedBy
      }
    }
  }
`

export const GET_INSURERS = gql`
  query readInsurer($id: Int!) {
    readInsurer(id: $id) {
      email
      company
      firstName
      lastName
      phoneType
      phoneNumber
      phoneCarrier
      phoneExtensionRange
      addressPremise
      addressSubPremise
      addressStreetNumber
      addressThoroughfare
      addressCountry
      avatar
    }
  }
`
