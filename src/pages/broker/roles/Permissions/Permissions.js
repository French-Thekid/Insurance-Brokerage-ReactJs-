import React, { useContext } from 'react'
import 'styled-components/macro'
import PermissionsDisplay from './PermissionsDisplay'
import { Core, PageHeader, Loading, Content } from 'components'
import { useQuery } from '@apollo/react-hooks'
import { LIST_PERMISSION } from '../forms/queries'
import { usePermission } from 'hooks'
import { ColourContext } from 'context'

function Permissions({ history, match }) {
  const [permissions, Access] = usePermission()
  const { Colours } = useContext(ColourContext)
  const {
    params: { roleID: id },
  } = match
  const { name, id: roleId } = JSON.parse(
    localStorage.getItem('selectedPermission')
  )

  //Getting Objects/Resources
  const {
    data: PermissionList,
    error,
    loading,
  } = useQuery(LIST_PERMISSION, {
    variables: { roleId: parseInt(roleId) },
  })

  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message="Failed to load Permissions" />

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
        overflow-y: auto;
      `}
    >
      <PageHeader
        title={name}
        close={() => {
          history.push(`/broker/roles/view-role/${id}`)
        }}
      >
        <Core.Button
          bgColour={Colours.green}
          onClick={() => {
            history.push(`/broker/roles/modify-permissions/${id}`)
          }}
        >
          Add Permissions
        </Core.Button>
      </PageHeader>
      <div
        css={`
          height: 100%;
          overflow: auto;
        `}
      >
        {permissions.ROLEPERMISSIONS_LIST_TYPEROLE ? (
          <PermissionsDisplay
            data={PermissionList.listRolePermissions.permissions}
            roleId={id}
            history={history}
          />
        ) : (
          <Access />
        )}
      </div>
    </div>
  )
}

export default Permissions
