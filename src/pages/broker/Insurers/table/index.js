import React from 'react'
import { useHistory } from 'react-router-dom'

import { Table } from 'components'
import { Logger } from '../../../../utils'

export default function ({ Insurers, deleteHandler, massLoading, massError }) {
  const history = useHistory()
  const HeaderData = ['Logo', 'Company', 'Representative', 'Email']

  const RowData = Insurers.data.map(
    ({ avatar, company, email, firstName, lastName, ...rest }, index) => {
      return {
        avatar,
        company,
        representativeName: `${firstName} ${lastName}`,
        email,
        firstName,
        lastName,
        ...rest,
      }
    }
  )

  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteHandler({ variables: { id: parseInt(id) } })
        .then(() => {
          Logger('deleted an insurer')
        })
        .catch((e) => console.log(e))
    )
    history.goBack()
  }
  const DeleteAction = (id) =>
    history.push(`/broker/insurers?action=deleteInsurer&&id=${id}`)

  const EditAction = (data) => {
    localStorage.setItem('activeInsurer', JSON.stringify(data))
    history.push(`/broker/insurers?action=editInsurer&&id=${data.id}`)
  }

  const handleRowClick = (id, data) => {
    localStorage.setItem('activeInsurer', JSON.stringify(data))
    history.push(`/broker/insurers?action=viewInsurer`)
  }
  return (
    <Table
      MainButtonpath="?action=createInsurer"
      title="Insurers"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 2fr`}
      buttonTitle="Create Insurer"
      editAction={EditAction}
      deleteAction={DeleteAction}
      hasAvatar
      checkBoxNeeded
      rowClick={handleRowClick}
      deleteMultipleAction={deleteMultipleAction}
      massLoading={massLoading}
      massError={massError}
    />
  )
}
