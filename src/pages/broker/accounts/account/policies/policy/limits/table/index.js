import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Table } from 'components'

export default function ({ Limits, deleteHandler, massLoading, massError }) {
  const history = useHistory()
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const HeaderData = ['Heading', 'Amount', 'Third Party', 'Description']
  const RowData = Limits.data.map(
    ({ heading, amount, thirdParty, description, ...rest }, index) => {
      return {
        heading,
        amountDisplay: amount,
        thirdParty: thirdParty === 1 ? 'Yes' : 'No',
        description,
        amount,
        ...rest,
      }
    }
  )

  const EditAction = (data) => {
    localStorage.setItem('activeLimit', JSON.stringify(data))
    history.push(`?action=editLimit&id=${data.id}`)
  }
  const DeleteAction = (id) => history.push(`?action=deleteLimit&id=${id}`)
  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteHandler({
        variables: {
          policyID: parseInt(policyId),
          accountID: parseInt(accountId),
          limitID: parseInt(id),
        },
      }).catch((e) => console.log(e))
    )
    history.goBack()
  }

  return (
    <Table
      title="Limit"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 2fr`}
      checkBoxNeeded
      editAction={EditAction}
      deleteAction={DeleteAction}
      breakingPoint="938px"
      noTop
      justify="start"
      alignment="start"
      deleteMultipleAction={deleteMultipleAction}
      massLoading={massLoading}
      massError={massError}
    />
  )
}
