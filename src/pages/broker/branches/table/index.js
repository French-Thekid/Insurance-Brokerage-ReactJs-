import React from 'react'
import { useHistory } from 'react-router-dom'

import { Table } from 'components'
import { Logger } from '../../../../utils'

export default function ({ Branches, deleteHandler, massLoading, massError }) {
  const history = useHistory()
  const HeaderData = ['Logo', 'Branch Name', 'Location']

  const RowData = Branches.map(
    (
      {
        logo,
        branchName,
        streetNumber,
        streetName,
        city,
        parish,
        country,
        ...rest
      },
      index
    ) => {
      return {
        logo,
        branchName,
        location: `${
          streetNumber || ''
        } ${streetName}, ${city}  ${parish},${country}`,
        streetNumber,
        streetName,
        city,
        parish,
        country,
        ...rest,
      }
    }
  )

  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteHandler({ variables: { id: parseInt(id) } })
        .then(() => {
          Logger('deleted an Branch')
        })
        .catch((e) => console.log(e))
    )
    history.goBack()
  }
  const DeleteAction = (id) =>
    history.push(`/broker/branches?action=deleteBranch&&id=${id}`)

  const EditAction = (data) => {
    localStorage.setItem('activeBranch', JSON.stringify(data))
    history.push(`/broker/branches?action=editBranch&&id=${data.id}`)
  }


  return (
    <Table
      MainButtonpath="?action=createBranch"
      title="Branches"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 2fr`}
      buttonTitle="Create Branch"
      editAction={EditAction}
      deleteAction={DeleteAction}
      hasAvatar
      checkBoxNeeded
      deleteMultipleAction={deleteMultipleAction}
      massLoading={massLoading}
      massError={massError}
    />
  )
}
