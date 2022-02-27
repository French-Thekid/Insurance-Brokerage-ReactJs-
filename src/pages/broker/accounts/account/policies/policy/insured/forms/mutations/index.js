import { gql } from 'apollo-boost'

export const UPDATE_INDIVIDUAL_INSURED = gql`
  mutation updatePerson($person: PersonUpdateInput) {
    updatePerson(person: $person) {
      id
    }
  }
`

export const UPDATE_MAIN_INSURED = gql`
  mutation updatePolicyHaveInsured(
    $personId: Int!
    $accountId: Int!
    $policyId: Int!
    $isMain: Boolean!
  ) {
    updatePolicyHaveInsured(
      haveInsured: {
        personId: $personId
        accountId: $accountId
        policyId: $policyId
        isMain: $isMain
      }
    ) {
      isMain
    }
  }
`

export const CREATE_INSURED = gql`
  mutation createPerson($person: PersonCreateInput) {
    createPerson(person: $person) {
      id
    }
  }
`

export const POLICY_HAVE_INSURED = gql`
  mutation createPolicyHaveInsured(
    $personId: Int!
    $accountId: Int!
    $isMain: Boolean!
    $policyId: Int!
  ) {
    createPolicyHaveInsured(
      haveInsured: {
        policyId: $policyId
        accountId: $accountId
        isMain: $isMain
        personId: $personId
      }
    ) {
      policyId
    }
  }
`
