import React, { useState } from 'react'
import { useQuery, useMutation, useLazyQuery } from '@apollo/react-hooks'
import { useLocation } from 'react-router-dom'

import { LIST_USERS, SEARCH_USERS } from './queries'
import { DISABLE_USER, ENABLE_USER, DELETE_USER } from './mutations'
import UserTable from './table'
import { Layout, Loading, Content, POPUP } from 'components'
import { DeleteUser, SuspendUser, EnableUser } from './modal'

const queryString = require('query-string')

function Users() {
  const [completedSuspended, setcompletedSuspend] = useState(false)
  const [completedEnabled, setcompletedEnabled] = useState(false)
  const [completedDelete, setcompletedDelete] = useState(false)

  //PopUps
  const showNotificationSuspend = () => {
    setcompletedSuspend(true)
    setTimeout(() => {
      setcompletedSuspend(false)
    }, 6000)
  }
  const showNotificationEnabled = () => {
    setcompletedEnabled(true)
    setTimeout(() => {
      setcompletedEnabled(false)
    }, 6000)
  }
  const showNotificationDelete = () => {
    setcompletedDelete(true)
    setTimeout(() => {
      setcompletedDelete(false)
    }, 6000)
  }

  //Query
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [searchUsers, { loading: Searching, data: searchResult }] =
    useLazyQuery(SEARCH_USERS)

  //Fetching all Users
  const { loading: loadingUsers, error, data: userData } = useQuery(LIST_USERS)

  //Mutations
  const [disableUser, { loading: disabling, error: failedDisabling }] =
    useMutation(DISABLE_USER, {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted() {
        showNotificationSuspend()
      },
    })

  const [enableUser, { loading: enabling, error: failedEnabling }] =
    useMutation(ENABLE_USER, {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted() {
        showNotificationEnabled()
      },
    })

  const [deleteUser, { loading: deleting, error: failedDeleting }] =
    useMutation(DELETE_USER, {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
      onCompleted() {
        showNotificationDelete()
      },
    })

  if (loadingUsers) return <Loading small />
  // if (Searching) return null
  if (error)
    return <Content.Alert type="error" message={'Failed to load Users'} />

  let { listUsers } = userData ? userData : {}
  let { data = [] } = listUsers || {}

  //Checking Search Result
  if (searchResult && searchResult.searchUsers.data.length !== 0)
    data = searchResult.searchUsers.data

  return (
    <Layout.Container>
      <POPUP
        setcompleted={setcompletedSuspend}
        message="User Account successfully Suspended."
        notification={completedSuspended}
      />
      <POPUP
        setcompleted={setcompletedEnabled}
        message="User Account successfully Enabled."
        notification={completedEnabled}
      />
      <POPUP
        setcompleted={setcompletedDelete}
        message="User Account successfully Removed."
        notification={completedDelete}
      />
      <UserTable
        Searching={Searching}
        searchHandler={searchUsers}
        Users={data}
        suspendHandler={disableUser}
        enableHandler={enableUser}
        deleteHandler={deleteUser}
        massLoading={disabling || enabling || deleting}
        massError={failedDisabling || failedEnabling || failedDeleting}
      />
      <DeleteUser
        isShowing={action === 'deleteUser'}
        loading={deleting}
        deleteHandler={deleteUser}
      />
      <SuspendUser
        isShowing={action === 'suspendUser'}
        loading={disabling}
        suspendHandler={disableUser}
      />
      <EnableUser
        isShowing={action === 'enableUser'}
        loading={enabling}
        enableHandler={enableUser}
      />
    </Layout.Container>
  )
}

export default Users
