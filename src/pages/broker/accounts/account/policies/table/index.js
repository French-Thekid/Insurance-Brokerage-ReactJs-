import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Table } from 'components'

export default function ({ Policies }) {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const HeaderData = [
    'Policy Number',
    'Type',
    'Status',
    'Created On',
    'Expired On',
  ]
  const RowData = Policies.map(
    ({ id, groupName, status, startDate, endDate, ...rest }, index) => {
      return {
        id,
        groupName,
        status,
        startOn:
          startDate !== '0000-00-00'
            ? new Date(
                new Date(parseInt(startDate)).setDate(
                  new Date(parseInt(startDate)).getDate() + 1
                )
              ).toDateString()
            : '-',
        expiredOn:
          endDate !== '0000-00-00'
            ? new Date(
                new Date(parseInt(endDate)).setDate(
                  new Date(parseInt(endDate)).getDate() + 1
                )
              ).toDateString()
            : '-',
        startDate:
          startDate !== '0000-00-00'
            ? new Date(
                new Date(parseInt(startDate)).setDate(
                  new Date(parseInt(startDate)).getDate() + 1
                )
              ).toDateString()
            : '',
        endDate:
          endDate !== '0000-00-00'
            ? new Date(
                new Date(parseInt(endDate)).setDate(
                  new Date(parseInt(endDate)).getDate() + 1
                )
              ).toDateString()
            : '',
        ...rest,
      }
    }
  )

  const EditAction = (data) => {
    localStorage.setItem('activePolicy', JSON.stringify(data))
    if (data.groupName === 'Motor')
      history.push(`?action=editMotorPolicy&id=${data.id}`)
    else history.push(`?action=editPolicy&id=${data.id}`)
  }
  const handleRowClick = (policyID, data) => {
    localStorage.setItem('activePolicy', JSON.stringify(data))
    history.push(`/broker/account/policies/${accountId}/details/${policyID}`)
  }

  return (
    <Table
      MainButtonpath="?action=createPolicy"
      title="Policies"
      slipNeeded
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 1fr 1fr`}
      buttonTitle="Create Policy"
      checkBoxNeeded
      editAction={EditAction}
      rowClick={handleRowClick}
      breakingPoint="938px"
    />
  )
}
