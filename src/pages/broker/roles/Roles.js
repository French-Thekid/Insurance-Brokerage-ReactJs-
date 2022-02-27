import React from 'react'
import RolesTable from './table/RolesTable'
import { useQuery, useLazyQuery } from '@apollo/react-hooks'
import { Layout, Loading, Content } from 'components'
import { DeleteRole, EditRole } from './modals'

import { LIST_ROLES, SEARCH_ROLES } from './forms/queries'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_ROLE, UPDATE_ROLE } from './forms/mutations'

const queryString = require('query-string')

function Roles() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  //QUERIES
  const {
    loading: isRolesLoading,
    error: RoleErrors,
    data: RolesData,
  } = useQuery(LIST_ROLES)

  //Search Roles
  const [searchRoles, { loading: SearchingRoles, data: searchRoleResult }] =
    useLazyQuery(SEARCH_ROLES)

  //MUTATIONS
  const [deleteRole, { loading: deleting, error: RoleError }] = useMutation(
    DELETE_ROLE,
    {
      refetchQueries: () => [
        {
          query: LIST_ROLES,
        },
      ],
    }
  )

  const [updateRole, { loading: updating, error: updateError }] = useMutation(
    UPDATE_ROLE,
    {
      refetchQueries: () => [
        {
          query: LIST_ROLES,
        },
      ],
    }
  )

  if (isRolesLoading) return <Loading small />
  if (RoleErrors)
    return <Content.Alert type="error" message={'Failed to load Roles'} />

  let { listRoles = [] } = RolesData || {}
  const { data: RolesList = [] } = listRoles || {}

  if (searchRoleResult && searchRoleResult.searchRoles.length !== 0)
    RolesList = searchRoleResult.searchRoles

  return (
    <Layout.Container>
      <RolesTable
        searchHandler={searchRoles}
        searching={SearchingRoles}
        Roles={RolesList || []}
        deleteHandler={deleteRole}
        massLoading={deleting}
        massError={RoleError}
      />
      <DeleteRole
        isShowing={action === 'deleteRole'}
        loading={deleting}
        deleterror={RoleError}
        deleteAction={deleteRole}
      />
      <EditRole
        isShowing={action === 'editRole'}
        loading={updating}
        updateError={updateError}
        updateAction={updateRole}
      />
    </Layout.Container>
  )
}

export default Roles
