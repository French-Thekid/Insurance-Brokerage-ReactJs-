import gql from 'graphql-tag'

export const LIST_RISKS = gql`
  query listMotorRisks($offset: Int!, $limit: Int!, $accountID: Int!) {
    listRisks(
      params: { accountId: $accountID, offset: $offset, limit: $limit }
    ) {
      usage
      year
      id
      policyId
    }
  }
`

export const LIST_RISKS_MORTGAGEES = gql`
  query listPolicyExtension($policyID: Int!, $accountID: Int!) {
    listPolicyExtension(policyId: $policyID, accountId: $accountID) {
      data {
        name
        type
        description
        limit
        id
        policyId
      }
    }
  }
`

export const LIST_MOTOR_RISKS = gql`
  query listMotorPolicyRisks($accountId: Int!, $policyId: Int!) {
    listMotorPolicyRisks(
      params: {
        offset: 0
        limit: 1000
        accountId: $accountId
        policyId: $policyId
      }
    ) {
      vin
      regNum
      make
      model
      colour
      modelType
      bodyType
      bodyShape
      engineType
      engineNum
      engineModified
      numberOfEngines
      NumberOfCylinders
      numOfDoors
      electricDoors
      electricWindows
      electricMirrors
      ccRating
      mileage
      transmissionType
      tonnage
      leftHandDrive
      powersteering
      roofType
      seatType
      seating
      authorizedDriverClause
      risk {
        id
        year
        image
        base64Image
        usage
        policyId
        sumInsured
      }
    }
  }
`

// base64Image
export const LIST_NONMOTOR_RISKS = gql`
  query listNonMotorPolicyRisks($accountId: Int!, $policyId: Int!) {
    listNonMotorPolicyRisks(
      params: {
        offset: 0
        limit: 1000
        accountId: $accountId
        policyId: $policyId
      }
    ) {
      type
      storeys
      streetNumber
      subPremise
      premise
      occupancy
      details
      description
      thoroughfare
      country
      roofConstruction
      wallConstruction
      risk {
        id
        year
        image
        usage
        sumInsured
        policyId
      }
    }
  }
`

export const LIST_LIMITS = gql`
  query listPolicyLimit($policyID: Int!, $accountID: Int!) {
    listPolicyLimit(policyId: $policyID, accountId: $accountID) {
      data {
        id
        heading
        amount
        thirdParty
        description
        policyId
      }
    }
  }
`

export const LIST_EXTENSIONS = gql`
  query listPolicyExtension($policyID: Int!, $accountID: Int!) {
    listPolicyExtension(policyId: $policyID, accountId: $accountID) {
      data {
        name
        type
        description
        limit
        id
        policyId
      }
    }
  }
`

export const READ_PERSON = gql`
  query readPerson($personID: Int!) {
    readPerson(personId: $personID) {
      avatar
      taxIdType
      firstName
      lastName
      taxIdNumber
      dlDateIssued
      dlExpirationDate
      gender
      dateOfBirth
      placeOfBirth
      maritalStatus
      occupation
      title
      nationality
    }
  }
`

export const GET_INSUREDS = gql`
  query details($accountID: Int!, $policyID: Int!) {
    listPolicyHaveInsured(
      policyId: $policyID
      accountId: $accountID
      limit: 200
      offset: 0
    ) {
      data {
        policyId
        accountId
        isMain
        person {
          id
          avatar
          title
          email
          dateOfBirth
          firstName
          middleName
          lastName
          maritalStatus
          salutationName
          placeOfBirth
          nationality
          gender
          occupation
          companyName
          industry
          taxIdNumber
          taxIdType
          employmentType
          dlNumber
          dlCountry
          dlDateIssued
          dlDateFirstIssued
          dlType
          dlExpirationDate
        }
      }
    }
  }
`

export const GET_RISK_DETAILS = gql`
  query getRiskdetails($accountID: Int!, $riskID: Int!) {
    readMotorRisk(params: { riskId: $riskID, accountId: $accountID }) {
      vin
      risk {
        id
        policyId
        year
        usage
        image
        sumInsured
      }
      regNum
      make
      model
      colour
      modelType
      bodyType
      bodyShape
      engineNum
      engineType
      engineModified
      numberOfEngines
      NumberOfCylinders
      ccRating
      mileage
      transmissionType
      tonnage
      numOfDoors
      electricDoors
      electricWindows
      electricMirrors
      leftHandDrive
      powersteering
      roofType
      seating
      seatType
      authorizedDriverClause
    }
    listRiskMortgagees(
      params: { accountId: $accountID, riskId: $riskID, limit: 10, offset: 0 }
    ) {
      nationalIdType
      branch
      currency
      loanAmount
      notes
      nationalIdNum
    }
  }
`

export const GET_NON_MOTORRISK_DETAILS = gql`
  query getNonMotorRiskdetails($accountID: Int!, $riskID: Int!) {
    listRiskMortgagees(
      params: { accountId: $accountID, riskId: $riskID, limit: 10, offset: 0 }
    ) {
      nationalIdType
      branch
      currency
      loanAmount
      notes
      nationalIdNum
    }
    listNonMotorRiskItems(
      params: { accountId: $accountID, riskId: $riskID, limit: 10, offset: 0 }
    ) {
      type
      description
    }
  }
`
export const GET_MOTORRISK_DETAILS = gql`
  query getNonMotorRiskdetails($accountID: Int!, $riskID: Int!) {
    listRiskMortgagees(
      params: { accountId: $accountID, riskId: $riskID, limit: 10, offset: 0 }
    ) {
      nationalIdType
      branch
      currency
      loanAmount
      notes
      nationalIdNum
    }
  }
`
