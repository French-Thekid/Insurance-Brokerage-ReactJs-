import { gql } from 'apollo-boost'

export const LIST_POLICY = gql`
  query listPolicy($accountID: Int!) {
    listPolicy(limit: 1000, offset: 0, accountId: $accountID) {
      data {
        id
        accountId
        status
        usage
        startDate
        endDate
        prefix
        memo
        currency
        agreedValue
        thirdParty
        premium
        balance
        inceptionDate
        dateSigned
        renewalDate
        renewalMemo
        branch
        country
        occupancy
        groupName
        limitGroup
        groupName
      }
    }
  }
`
