import React, { useContext } from 'react'
import { OrganisationContext } from 'context'
import { useHistory, useLocation } from 'react-router-dom'
import { Table, Layout, Loading, Content } from 'components'
import {
  ViewOrganisation,
  DeleteOrganisation,
  SuspendOrganisation,
  EnableOrganisation,
  CreateOrganisation,
  EditOrganisation,
} from '../index'
import { LIST_ORGANIZATION } from '../queries'
import { useQuery } from '@apollo/react-hooks'

const queryString = require('query-string')

export default function () {
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const { ToggleOrganisation, DeleteOrganisation: DeleteOrgContext } =
    useContext(OrganisationContext)

  const {
    loading,
    error,
    data: organisations = [],
    refetch,
  } = useQuery(LIST_ORGANIZATION)
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load Medical Facilities'}
      />
    )

  const { listFacilities } = organisations || {}

  let flag = false
  const filteredFacilities = listFacilities
    .map((facility, index) => {
      if (facility.status === 'CREATE_IN_PROGRESS') flag = true
      return facility
    })
    .filter((item, j) => item !== null)

  if (flag) {
    setTimeout(() => refetch(), 5000)
    console.log('Refetching')
  }

  const HeaderData = ['Logo', 'Name', 'Tax ID', 'Organization ID', 'Status']

  const RowData = filteredFacilities.map(
    ({ logoUrl, name, status, taxId, organizationId, ...rest }, index) => {
      return {
        logoUrl,
        name,

        taxId,
        organizationId,
        status,
        id: organizationId,
        ...rest,
      }
    }
  )

  const DeleteMultipleAction = (ids) => {
    const noRefresh = true
    ids.map((id, index) =>
      DeleteOrgContext(id, noRefresh).catch((e) => console.log(e))
    )
    history.goBack()
    setTimeout(() => window.location.reload(), 1000)
  }
  const SuspendMultipleAction = (ids) => {
    ids.map((id, index) =>
      ToggleOrganisation(id, 'SUSPENDED').catch((e) => console.log(e))
    )
    history.goBack()
    setTimeout(() => window.location.reload(), 1000)
  }
  const EnableMultipleAction = (ids) => {
    ids.map((id, index) =>
      ToggleOrganisation(id, 'ACTIVE').catch((e) => console.log(e))
    )
    history.goBack()
    setTimeout(() => window.location.reload(), 1000)
  }

  const DeleteAction = (id) =>
    history.push(`?action=deleteOrganization&&organisationId=${id}`)

  const suspendAction = (id) =>
    history.push(
      `?action=suspendOrganization&&organisationId=${id}&&status=SUSPENDED`
    )

  const enableAction = (id) =>
    history.push(
      `?action=enableOrganization&&organisationId=${id}&&status=ACTIVE`
    )

  const editAction = (data) => {
    localStorage.setItem('selectedOrg', JSON.stringify(data))
    history.push(`?action=editOrganization&&organisationId=${data.id}`)
  }

  const handleRowClick = (id, data) => {
    localStorage.setItem('selectedOrg', JSON.stringify(data))
    history.push(`?action=viewOrganization`)
  }

  return (
    <Layout.Container>
      <Table
        MainButtonpath="?action=createOrganization"
        title="Organisations"
        RowData={RowData}
        HeaderData={HeaderData}
        Columns={`70px 1fr 140px 2fr 1fr`}
        searchPlaceholder="Search Name, Email"
        buttonTitle="New Organisation"
        deleteAction={DeleteAction}
        suspendAction={suspendAction}
        enableAction={enableAction}
        editAction={editAction}
        deleteMultipleAction={DeleteMultipleAction}
        suspendMultipleAction={SuspendMultipleAction}
        enableMultipleAction={EnableMultipleAction}
        searchEnable
        hasAvatar
        checkBoxNeeded
        rowClick={handleRowClick}
        massLoading={false}
        massError={false}
      />
      <ViewOrganisation isShowing={action === 'viewOrganization'} />
      <DeleteOrganisation isShowing={action === 'deleteOrganization'} />
      <SuspendOrganisation isShowing={action === 'suspendOrganization'} />
      <EnableOrganisation isShowing={action === 'enableOrganization'} />
      <CreateOrganisation isShowing={action === 'createOrganization'} />
      <EditOrganisation isShowing={action === 'editOrganization'} />
    </Layout.Container>
  )
}
