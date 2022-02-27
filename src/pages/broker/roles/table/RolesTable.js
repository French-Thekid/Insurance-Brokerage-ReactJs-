import React from 'react'
import 'styled-components/macro'
import { Table } from 'components'
import { useHistory } from 'react-router-dom'

export default function ({
  Roles,
  deleteHandler,
  massLoading,
  massError,
  searchHandler,
  searching,
}) {
  const history = useHistory()
  const HeaderData = ['Name', 'Created By', 'Created On', 'Description']

  const RowData = Roles.map(
    ({ id, name, createdAt, description, createdBy, ...rest }, index) => {
      const { firstName, lastName } = createdBy || {}
      if (name !== 'Supreme Administrator')
        return {
          name,
          createdBy:
            firstName === null && lastName === null
              ? 'Administrator'
              : `${firstName} ${lastName}`,
          created: new Date(
            new Date(parseInt(createdAt)).setDate(
              new Date(parseInt(createdAt)).getDate() + 1
            )
          ).toDateString(),
          description,
          id,
          ...rest,
        }
      return null
    }
  ).filter((item, index) => item !== null)

  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteHandler({ variables: { id: parseInt(id) } }).catch((e) =>
        console.log(e)
      )
    )
    history.goBack()
  }
  const DeleteAction = (id) => history.push(`?action=deleteRole&&id=${id}`)

  const editAction = (data) => {
    console.log(data)
    localStorage.setItem(
      'activeRole',
      JSON.stringify({
        id: data.id,
        name: data.name,
        description: data.description,
      })
    )
    history.push(`?action=editRole&&id=${data.id}`)
  }
  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedPermission', JSON.stringify(data))
    history.push(`roles/view-role/${id}`)
  }

  return (
    <Table
      MainButtonpath="/broker/roles/create-role/"
      justify="start"
      alignment="start"
      title="Roles"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 2fr`}
      searchPlaceholder="Search Name"
      buttonTitle="Create Role"
      deleteAction={DeleteAction}
      editAction={editAction}
      searchEnable
      checkBoxNeeded
      rowClick={handleRowClick}
      deleteMultipleAction={deleteMultipleAction}
      massLoading={massLoading}
      massError={massError}
      searchHandler={searchHandler}
      Searching={searching}
    />
  )
}
