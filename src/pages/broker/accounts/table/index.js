import React from 'react'
import { useHistory } from 'react-router-dom'

import { Table } from 'components'

export default function ({ Accounts }) {
  const history = useHistory()
  const HeaderData = [
    'Avatar',
    'Name',
    'Email',
    'No. of Policies',
    'Created At',
    'Created By',
    'Created On',
  ]

  const RowData = Accounts.data.map(
    (
      {
        type,
        person,
        company,
        createdByUser: {
          firstName: creatorFName,
          lastName: creatorLName,
          userBranch,
        },
        totalPolicies,
        totalRisks,
        createdAt,
        ...rest
      },
      index
    ) => {
      const { id: PID, avatar, firstName, lastName, email } = person || {}
      const {
        id: CID,
        companyName,
        avatar: companyLogo,
        email: companyEmail,
        ...rest1
      } = company || {}
      const { branchName } = userBranch || {}

      return {
        avatar: type === 'individual' ? avatar : companyLogo,
        name: type === 'individual' ? `${firstName} ${lastName}` : companyName,
        email: type === 'individual' ? email : companyEmail,
        totalPolicies,
        branchName,
        createdByuser: `${creatorFName} ${creatorLName}`,
        created: new Date(
          new Date(parseInt(createdAt)).setDate(
            new Date(parseInt(createdAt)).getDate() + 1
          )
        ).toDateString(),
        companyName,
        ...rest,
        ...rest1,
      }
    }
  )

  const handleRowClick = (accountId, data) => {
    localStorage.setItem('Active#', data.id)
    history.push(`/broker/account/details/${accountId}`)
  }

  return (
    <Table
      MainButtonpath="?action=createAccount"
      title="Accounts"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`50px 1fr 2fr 1fr 1fr 1fr 1fr`}
      buttonTitle="Create Account"
      hasAvatar
      breakingPoint="894px"
      rowClick={handleRowClick}
    />
  )
}
