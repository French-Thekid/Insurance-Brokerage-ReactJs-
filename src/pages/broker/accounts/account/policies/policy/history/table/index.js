import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Table } from 'components'

export default function ({ versions }) {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const HeaderData = [
    'Policy Number',
    'Created On',
    'Created By',
    'Created At',
    'Expired On',
    'Renewed On',
  ]
  const RowData = versions.map(
    ({ id, groupName, startDate, endDate, ...rest }, index) => {
      return {
        id,
        startDate,
        createdBy: 'Darryl Brown',
        createdAt: 'Main Branch',
        expiredOn: endDate,
        renewed: endDate,
        ...rest,
      }
    }
  )

  const handleRowClick = (policyID, data) => {
    localStorage.setItem('activeVersion', JSON.stringify(data))
    history.push(
      `/broker/account/policies/${accountId}/history/details/${policyID}`
    )
  }

  return (
    <Table
      title="Policy Versions"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 1fr 1fr 1fr`}
      rowClick={handleRowClick}
      breakingPoint="938px"
      noTopButton
      noTop
    />
  )
}
