import { gql } from 'apollo-boost'

export const CREATE_PERSON = gql`
  mutation createPerson(
    $email: String!
    $firstName: String!
    $lastName: String!
    $dlNumber: Int
    $dlDateIssued: String
    $dlExpirationDate: String
  ) {
    createPerson(
      person: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        dlNumber: $dlNumber
        dlDateIssued: $dlDateIssued
        dlExpirationDate: $dlExpirationDate
      }
    ) {
      id
      email
    }
  }
`

export const POLICY_HAVE_INSURED = gql`
  mutation createPolicyHaveInsured(
    $personId: Int!
    $accountID: Int!
    $isMain: Boolean!
    $policyID: Int!
  ) {
    createPolicyHaveInsured(
      haveInsured: {
        policyId: $policyID
        accountId: $accountID
        isMain: $isMain
        personId: $personId
      }
    ) {
      policyId
    }
  }
`

export const DELETE_POLICY = gql`
  mutation deletePolicy($PID: Int!, $accountID: Int!) {
    deletePolicy(policyId: $PID, accountId: $accountID) {
      message
    }
  }
`
export const DELETE_POLICY_INSURED = gql`
  mutation deletePolicyHaveInsured(
    $policyId: Int!
    $personId: Int!
    $accountId: Int!
  ) {
    deletePolicyHaveInsured(
      personId: $personId
      policyId: $policyId
      accountId: $accountId
    ) {
      message
    }
  }
`
export const CREATE_MOTOR_RISK_ACCESSORY = gql`
  mutation createMotorRiskAccessory(
    $accountID: Int!
    $riskID: Int!
    $type: String!
    $description: String!
  ) {
    createMotorRiskAccessory(
      accessory: {
        riskId: $riskID
        accountId: $accountID
        description: $description
        type: $type
      }
    ) {
      riskId
    }
  }
`
export const CREATE_NONMOTOR_RISK_ITEM = gql`
  mutation createNonMotorRiskItem(
    $accountID: Int!
    $riskID: Int!
    $type: String!
    $value: Float!
    $description: String!
  ) {
    createNonMotorRiskItem(
      item: {
        accountId: $accountID
        riskId: $riskID
        value: $value
        type: $type
        description: $description
      }
    ) {
      id
    }
  }
`
export const CREATE_MORTGAGEES = gql`
  mutation createRiskMortgagee(
    $accountID: Int!
    $riskID: Int!
    $currency: String!
    $Branch: String
    $notes: String
    $loanAmount: Float
    $nationalIdNum: String
    $nationalIdType: String
  ) {
    createRiskMortgagee(
      mortgagee: {
        accountId: $accountID
        riskId: $riskID
        branch: $Branch
        notes: $notes
        loanAmount: $loanAmount
        nationalIdNum: $nationalIdNum
        nationalIdType: $nationalIdType
        currency: $currency
      }
    ) {
      id
    }
  }
`
export const UPDATE_LIMIT = gql`
  mutation updatePolicyLimit(
    $policyID: Int!
    $accountID: Int!
    $limitID: Int!
    $header: String
    $description: String
    $thirdparty: Int
    $amount: Int
  ) {
    updatePolicyLimit(
      policyLimit: {
        id: $limitID
        policyId: $policyID
        accountId: $accountID
        heading: $header
        description: $description
        amount: $amount
        thirdParty: $thirdparty
      }
    ) {
      id
    }
  }
`
export const CREATE_RISK = gql`
  mutation createRisk(
    $policyID: Int!
    $accountID: Int!
    $year: Int!
    $sumInsured: Float
    $usage: String
    $base64Image: String
  ) {
    createRisk(
      risk: {
        year: $year
        policyId: $policyID
        accountId: $accountID
        sumInsured: $sumInsured
        usage: $usage
        base64Image: $base64Image
      }
    ) {
      id
    }
  }
`
export const UPDATE_RISK = gql`
  mutation updateRisk(
    $policyID: Int!
    $accountID: Int!
    $riskID: Int!
    $year: Int!
    $sumInsured: Float
    $usage: String
    $base64Image: String
  ) {
    updateRisk(
      risk: {
        year: $year
        id: $riskID
        policyId: $policyID
        accountId: $accountID
        sumInsured: $sumInsured
        usage: $usage
        base64Image: $base64Image
      }
    ) {
      id
    }
  }
`
export const UPDATE_EXTENSION = gql`
  mutation updatePolicyExtension(
    $extensionID: Int!
    $accountID: Int!
    $policyID: Int!
    $name: String
    $limit: Int
    $type: String
    $description: String
  ) {
    updatePolicyExtension(
      policyExtension: {
        id: $extensionID
        policyId: $policyID
        accountId: $accountID
        name: $name
        description: $description
        limit: $limit
        type: $type
      }
    ) {
      id
    }
  }
`
export const deletePolicyLimitMutation = gql`
  mutation deletePolicyLimit(
    $accountID: Int!
    $policyID: Int!
    $limitID: Int!
  ) {
    deletePolicyLimit(
      policyLimitId: $limitID
      accountId: $accountID
      policyId: $policyID
    ) {
      message
    }
  }
`
export const deleteMotorRiskMutation = gql`
  mutation deleteMotorRisk($accountID: Int!, $riskID: Int!) {
    deleteMotorRisk(params: { accountId: $accountID, riskId: $riskID }) {
      message
    }
  }
`
export const deleteNonMotorRiskMutation = gql`
  mutation deleteNonMotorRisk($accountID: Int!, $riskID: Int!) {
    deleteNonMotorRisk(params: { accountId: $accountID, riskId: $riskID }) {
      message
    }
  }
`
export const deletePolicyExtensionMutation = gql`
  mutation deletePolicyExtension(
    $accountID: Int!
    $policyID: Int!
    $extensionID: Int!
  ) {
    deletePolicyExtension(
      policyExtensionId: $extensionID
      accountId: $accountID
      policyId: $policyID
    ) {
      message
    }
  }
`
export const createPolicyMutation = gql`
  mutation createPolicy(
    $accountID: Int!
    $Prefix: String
    $Status: String
    $Memo: String
    $Usage: String
    $Currency: String
    $MutualAgreement: Int
    $ThirdParty: Int
    $Premium: Int
    $Balance: Int
    $InceptionDate: String
    $StartDate: String
    $EndDate: String
    $DateSigned: String
    $RenewalDate: String
    $RenewalMemo: String
    $Branch: String
    $Country: String
    $Occupancy: String
    $GroupName: String
    $LimitGroup: String
  ) {
    createPolicy(
      policy: {
        accountId: $accountID
        prefix: $Prefix
        status: $Status
        memo: $Memo
        usage: $Usage
        currency: $Currency
        agreedValue: $MutualAgreement
        thirdParty: $ThirdParty
        premium: $Premium
        balance: $Balance
        inceptionDate: $InceptionDate
        startDate: $StartDate
        endDate: $EndDate
        dateSigned: $DateSigned
        renewalDate: $RenewalDate
        renewalMemo: $RenewalMemo
        branch: $Branch
        country: $Country
        occupancy: $Occupancy
        groupName: $GroupName
        limitGroup: $LimitGroup
      }
    ) {
      id
    }
  }
`

export const updatePolicyMutation = gql`
  mutation updatePolicy(
    $id: Int!
    $accountID: Int!
    $Prefix: String
    $Status: String
    $Memo: String
    $Usage: String
    $Currency: String
    $MutualAgreement: Int
    $ThirdParty: Int
    $Premium: Int
    $Balance: Int
    $InceptionDate: String
    $StartDate: String
    $EndDate: String
    $DateSigned: String
    $RenewalDate: String
    $RenewalMemo: String
    $Branch: String
    $Country: String
    $Occupancy: String
    $GroupName: String
    $LimitGroup: String
  ) {
    updatePolicy(
      policy: {
        id: $id
        accountId: $accountID
        prefix: $Prefix
        status: $Status
        memo: $Memo
        usage: $Usage
        currency: $Currency
        agreedValue: $MutualAgreement
        thirdParty: $ThirdParty
        premium: $Premium
        balance: $Balance
        inceptionDate: $InceptionDate
        startDate: $StartDate
        endDate: $EndDate
        dateSigned: $DateSigned
        renewalDate: $RenewalDate
        renewalMemo: $RenewalMemo
        branch: $Branch
        country: $Country
        occupancy: $Occupancy
        groupName: $GroupName
        limitGroup: $LimitGroup
      }
    ) {
      id
    }
  }
`
export const CREATE_MOTOR_RISK = gql`
  mutation createMotorRisk(
    $accountID: Int!
    $vin: String!
    $riskId: Int!
    $regNum: String
    $make: String!
    $model: String
    $colour: String
    $modelType: String
    $bodyType: String
    $bodyShape: String
    $engineNum: String
    $engineType: String
    $engineModified: Boolean
    $numberOfEngines: Int
    $NumberOfCylinders: Int
    $ccRating: Int
    $mileage: Int
    $transmissionType: String
    $tonnage: Int
    $numOfDoors: Int
    $electricDoors: Boolean
    $electricWindows: Boolean
    $electricMirrors: Boolean
    $leftHandDrive: Boolean
    $powersteering: Boolean
    $roofType: String
    $seating: Int
    $seatType: String
    $authorizedDriverClause: String
  ) {
    createMotorRisk(
      risk: {
        accountId: $accountID
        vin: $vin
        riskId: $riskId
        regNum: $regNum
        make: $make
        model: $model
        colour: $colour
        modelType: $modelType
        bodyType: $bodyType
        bodyShape: $bodyShape
        engineNum: $engineNum
        engineType: $engineType
        engineModified: $engineModified
        numberOfEngines: $numberOfEngines
        NumberOfCylinders: $NumberOfCylinders
        ccRating: $ccRating
        mileage: $mileage
        transmissionType: $transmissionType
        tonnage: $tonnage
        numOfDoors: $numOfDoors
        electricDoors: $electricDoors
        electricWindows: $electricWindows
        electricMirrors: $electricMirrors
        leftHandDrive: $leftHandDrive
        powersteering: $powersteering
        roofType: $roofType
        seating: $seating
        seatType: $seatType
        authorizedDriverClause: $authorizedDriverClause
      }
    ) {
      make
    }
  }
`
export const UPDATE_MOTOR_RISK = gql`
  mutation updateMotorRisk(
    $accountID: Int!
    $vin: String!
    $riskId: Int!
    $regNum: String
    $make: String!
    $model: String
    $colour: String
    $modelType: String
    $bodyType: String
    $bodyShape: String
    $engineNum: String
    $engineType: String
    $engineModified: Boolean
    $numberOfEngines: Int
    $NumberOfCylinders: Int
    $ccRating: Int
    $mileage: Int
    $transmissionType: String
    $tonnage: Int
    $numOfDoors: Int
    $electricDoors: Boolean
    $electricWindows: Boolean
    $electricMirrors: Boolean
    $leftHandDrive: Boolean
    $powersteering: Boolean
    $roofType: String
    $seating: Int
    $seatType: String
    $authorizedDriverClause: String
  ) {
    updateMotorRisk(
      risk: {
        accountId: $accountID
        vin: $vin
        riskId: $riskId
        regNum: $regNum
        make: $make
        model: $model
        colour: $colour
        modelType: $modelType
        bodyType: $bodyType
        bodyShape: $bodyShape
        engineNum: $engineNum
        engineType: $engineType
        engineModified: $engineModified
        numberOfEngines: $numberOfEngines
        NumberOfCylinders: $NumberOfCylinders
        ccRating: $ccRating
        mileage: $mileage
        transmissionType: $transmissionType
        tonnage: $tonnage
        numOfDoors: $numOfDoors
        electricDoors: $electricDoors
        electricWindows: $electricWindows
        electricMirrors: $electricMirrors
        leftHandDrive: $leftHandDrive
        powersteering: $powersteering
        roofType: $roofType
        seating: $seating
        seatType: $seatType
        authorizedDriverClause: $authorizedDriverClause
      }
    ) {
      make
    }
  }
`
export const CREATE_NONMOTOR_RISK = gql`
  mutation createNonMotorRisk(
    $accountID: Int!
    $type: String!
    $riskID: Int!
    $details: String!
    $description: String
    $occupancy: String
    $roofConstruction: String
    $wallConstruction: String
    $storeys: String
    $subPremise: String
    $premise: String
    $streetNumber: String
    $thoroughfare: String
    $country: String
  ) {
    createNonMotorRisk(
      risk: {
        accountId: $accountID
        type: $type
        riskId: $riskID
        details: $details
        description: $description
        occupancy: $occupancy
        roofConstruction: $roofConstruction
        wallConstruction: $wallConstruction
        storeys: $storeys
        subPremise: $subPremise
        premise: $premise
        streetNumber: $streetNumber
        thoroughfare: $thoroughfare
        country: $country
      }
    ) {
      type
    }
  }
`
export const UPDATE_NONMOTOR_RISK = gql`
  mutation updateNonMotorRisk(
    $accountID: Int!
    $type: String!
    $riskID: Int!
    $details: String!
    $description: String
    $occupancy: String
    $roofConstruction: String
    $wallConstruction: String
    $storeys: String
    $subPremise: String
    $premise: String
    $streetNumber: String
    $thoroughfare: String
    $country: String
  ) {
    updateNonMotorRisk(
      risk: {
        accountId: $accountID
        type: $type
        riskId: $riskID
        details: $details
        description: $description
        occupancy: $occupancy
        roofConstruction: $roofConstruction
        wallConstruction: $wallConstruction
        storeys: $storeys
        subPremise: $subPremise
        premise: $premise
        streetNumber: $streetNumber
        thoroughfare: $thoroughfare
        country: $country
      }
    ) {
      type
    }
  }
`

export const CreateLimit = gql`
  mutation CreateLimit(
    $accountID: Int!
    $policyID: Int!
    $header: String!
    $amount: Int!
    $thirdparty: Int!
    $description: String!
  ) {
    createPolicyLimit(
      policyLimit: {
        accountId: $accountID
        policyId: $policyID
        heading: $header
        amount: $amount
        thirdParty: $thirdparty
        description: $description
      }
    ) {
      id
      heading
    }
  }
`

export const CreateExtension = gql`
  mutation createPolicyExtension(
    $accountID: Int!
    $policyID: Int!
    $name: String!
    $limit: Int!
    $type: String!
    $description: String!
  ) {
    createPolicyExtension(
      policyExtension: {
        accountId: $accountID
        policyId: $policyID
        name: $name
        limit: $limit
        type: $type
        description: $description
      }
    ) {
      id
      name
    }
  }
`
