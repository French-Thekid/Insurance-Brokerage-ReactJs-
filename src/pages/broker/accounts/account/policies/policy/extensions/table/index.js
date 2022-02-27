import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Table } from 'components'

export default function ({
  Extensions,
  deleteHandler,
  massLoading,
  massError,
}) {
  const history = useHistory()
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const HeaderData = ['Name', 'Limit', 'Type', 'Description']
  const RowData = Extensions.data.map(
    ({ name, limit, type, description, ...rest }, index) => {
      return {
        name,
        amountDisplay: limit,
        type,
        description,
        limit,
        ...rest,
      }
    }
  )

  const EditAction = (data) => {
    localStorage.setItem('activeExtension', JSON.stringify(data))
    history.push(`?action=editExtension&id=${data.id}`)
  }
  const DeleteAction = (id) => history.push(`?action=deleteExtension&id=${id}`)
  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteHandler({
        variables: {
          policyID: parseInt(policyId),
          accountID: parseInt(accountId),
          extensionID: parseInt(id),
        },
      }).catch((e) => console.log(e))
    )
    history.goBack()
  }
  return (
    <Table
      title="Extension"
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
