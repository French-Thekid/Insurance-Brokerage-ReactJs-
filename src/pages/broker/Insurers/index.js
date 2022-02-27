import React, { useState } from 'react'
import InsurerTable from './table'
import { Layout, Loading, Content, POPUP } from 'components'
import { useLocation } from 'react-router-dom'
import { LIST_INSURERS } from './forms/queries'
import { DELETE_INSURER } from './forms/mutations'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  CreateInsurer,
  EditInsurer,
  DeleteInsurer,
  ViewInsurer,
} from './modals'

const queryString = require('query-string')

export default function Insurers() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [completedCreate, setcompletedCreate] = useState(false)
  const [completedUpdate, setcompletedUpdate] = useState(false)
  const [completedDelete, setcompletedDelete] = useState(false)

  const [deleteInsurer, { loading: deleting, error: insurerError }] =
    useMutation(DELETE_INSURER, {
      refetchQueries: () => [
        {
          query: LIST_INSURERS,
        },
      ],
    })

  const {
    loading: isInsurersLoading,
    error: InsurerErrors,
    data: InsurerList,
  } = useQuery(LIST_INSURERS)

  if (isInsurersLoading) return <Loading small />
  if (InsurerErrors)
    return <Content.Alert type="error" message={'Failed to load Insurers'} />

  //PopUps
  const showNotificationCreate = () => {
    setcompletedCreate(true)
    setTimeout(() => {
      setcompletedCreate(false)
    }, 6000)
  }
  const showNotificationUpdate = () => {
    setcompletedUpdate(true)
    setTimeout(() => {
      setcompletedUpdate(false)
    }, 6000)
  }
  const showNotificationDelete = () => {
    setcompletedDelete(true)
    setTimeout(() => {
      setcompletedDelete(false)
    }, 6000)
  }

  return (
    <Layout.Container>
      <POPUP
        setcompleted={setcompletedCreate}
        message="New Insurer successfully Created."
        notification={completedCreate}
      />
      <POPUP
        setcompleted={setcompletedUpdate}
        message="Insurer successfully Updated."
        notification={completedUpdate}
      />
      <POPUP
        setcompleted={setcompletedDelete}
        message="Insurer successfully Deleted."
        notification={completedDelete}
      />
      <InsurerTable
        deleteHandler={deleteInsurer}
        massLoading={deleting}
        massError={insurerError}
        Insurers={InsurerList.listInsurer}
      />
      <CreateInsurer
        showNotificationCreate={showNotificationCreate}
        isShowing={action === 'createInsurer'}
      />
      <EditInsurer
        showNotificationUpdate={showNotificationUpdate}
        isShowing={action === 'editInsurer'}
      />
      <DeleteInsurer
        showNotificationDelete={showNotificationDelete}
        deleteHandler={deleteInsurer}
        loading={deleting}
        insurerError={insurerError}
        isShowing={action === 'deleteInsurer'}
      />
      <ViewInsurer isShowing={action === 'viewInsurer'} />
    </Layout.Container>
  )
}
