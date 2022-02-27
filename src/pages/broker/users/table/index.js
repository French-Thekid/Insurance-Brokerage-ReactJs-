import React from 'react'

import { Table } from 'components'
import { useHistory } from 'react-router-dom'

export default function ({
  Users,
  suspendHandler,
  enableHandler,
  deleteHandler,
  massLoading,
  massError,
  searchHandler,
  Searching,
}) {
  const history = useHistory()

  const HeaderData = ['Avatar', 'First Name', 'Last Name', 'Email', 'Branch']
  const RowData = Users.map(
    ({ avatar, firstName, lastName, userBranch, email, ...rest }, index) => {
      const { branchName } = userBranch || {}
      return {
        avatar,
        firstName,
        lastName,
        email,
        branchName,
        ...rest,
      }
    }
  )

  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteHandler({ variables: { id } }).catch((e) => console.log(e))
    )
    history.goBack()
  }
  const DeleteAction = (id) =>
    history.push(`/broker/users?action=deleteUser&&id=${id}`)

  const suspendAction = (id) =>
    history.push(`/broker/users?action=suspendUser&&id=${id}`)
  const suspendMultipleAction = (ids) => {
    ids.map((id, index) =>
      suspendHandler({ variables: { id } }).catch((e) => console.log(e))
    )
    history.goBack()
  }

  const enableAction = (id) =>
    history.push(`/broker/users?action=enableUser&&id=${id}`)
  const enableMultipleAction = (ids) => {
    ids.map((id, index) =>
      enableHandler({ variables: { id } }).catch((e) => console.log(e))
    )
    history.goBack()
  }

  const handleRowClick = (id) => history.push(`/broker/users/view-user/${id}`)

  return (
    <Table
      MainButtonpath="/broker/users/create-user/"
      title="Users"
      RowData={RowData}
      HeaderData={HeaderData}
      deleteMultipleAction={deleteMultipleAction}
      enableMultipleAction={enableMultipleAction}
      suspendMultipleAction={suspendMultipleAction}
      Columns={`1fr 1fr 1fr 2fr 1fr`}
      searchPlaceholder="Search Name, Email"
      buttonTitle="Create User"
      deleteAction={DeleteAction}
      suspendAction={suspendAction}
      enableAction={enableAction}
      searchEnable
      Searching={Searching}
      searchHandler={searchHandler}
      hasAvatar
      imageStatusNeeded
      checkBoxNeeded
      rowClick={handleRowClick}
      massLoading={massLoading}
      massError={massError}
    />
  )
}
