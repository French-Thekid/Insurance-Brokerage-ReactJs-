import { gql } from 'apollo-boost'

export const LIST_INSURERS = gql`
  query {
    listInsurer(limit: 100, offset: 0) {
      data {
        firstName
        lastName
        email
        company
        avatar
        id
      }
    }
  }
`

export const LIST_SLIPS = gql`
  query listSlip($accountId: Int!) {
    listSlip(accountId: $accountId, limit: 1000, offset: "") {
      data {
        id
        submittedon
        createdon
        url
      }
    }
  }
`
export const GET_POLICY_TYPE = gql`
  query readPolicy($accountId: Int!, $policyId: Int!) {
    readPolicy(policyId: $policyId, accountId: $accountId) {
      groupName
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

export const LIST_MOTOR_RISK = gql`
  query listMotorPolicyRisks($policyID: Int!, $accountID: Int!) {
    listMotorPolicyRisks(
      params: {
        policyId: $policyID
        accountId: $accountID
        limit: 100
        offset: 0
      }
    ) {
      data {
        risk {
          image
          id
          usage
          year
          policyId
          image
        }
        make
        model
        mileage
      }
    }
  }
`

export const LIST_NON_MOTOR_RISK = gql`
  query listNonMotorPolicyRisks($policyID: Int!, $accountID: Int!) {
    listNonMotorPolicyRisks(
      params: {
        policyId: $policyID
        accountId: $accountID
        limit: 100
        offset: 0
      }
    ) {
      risk {
        image
        id
        usage
        policyId
      }
      type
      storeys
      premise
      thoroughfare
      country
    }
  }
`
