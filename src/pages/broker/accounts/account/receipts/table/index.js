import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Table } from 'components'

export default function ({ Receipts }) {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const HeaderData = [
    'Premium',
    'Receipt Number',
    'Created By',
    'Created On',
    'Created At',
  ]
  const RowData = Receipts.map(
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
    localStorage.setItem('activeReceipt', JSON.stringify(data))
    if (data.groupName === 'Motor')
      history.push(`?action=editMotorReceipt&id=${data.id}`)
    else history.push(`?action=editReceipt&id=${data.id}`)
  }
  const handleRowClick = (policyID, data) => {
    localStorage.setItem('activeReceipt', JSON.stringify(data))
    history.push(`/broker/account/receipts/${accountId}/view/${policyID}`)
  }

  return (
    <Table
      MainButtonpath="?action=createReceipt"
      title="Receipts"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 1fr 1fr`}
      buttonTitle="Create Receipt"
      checkBoxNeeded
      editAction={EditAction}
      rowClick={handleRowClick}
      breakingPoint="938px"
    />
  )
}
