import React, { useContext } from 'react'
import 'styled-components/macro'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { usePermission } from 'hooks'
import { ColourContext } from 'context'

import { Content, Core, Layout, PageHeader, Loading, Icons } from 'components'
import ViewRoleTable from './table/ViewRoleTable'
import { LIST_ROLESHAVE_ROLES, READ_ROLES } from './forms/queries'
import { LIST_USERSHAVE_ROLES } from '../users/queries'

function ViewRole() {
  const history = useHistory()
  const match = useRouteMatch()
  const [permissions, Access] = usePermission()
  const {
    params: { roleId },
  } = match
  const { Colours } = useContext(ColourContext)

  //List Roles Query
  const {
    loading: isRolesLoading,
    error: RoleErrors,
    data: RoleList,
  } = useQuery(LIST_ROLESHAVE_ROLES, {
    variables: { parentId: parseInt(roleId) },
  })

  //Read Roles Query
  const {
    loading: isCurrentRolesLoading,
    error: CurrentRoleErrors,
    data: CurrentRoleList,
  } = useQuery(READ_ROLES, {
    variables: { roleId: parseInt(roleId) },
  })

  //List Users Mutation
  const {
    loading: isUsersLoading,
    error: UserErrors,
    data: UserList,
  } = useQuery(LIST_USERSHAVE_ROLES, {
    variables: { roleId: parseInt(roleId) },
  })
  if (isCurrentRolesLoading) return <Loading small />
  if (CurrentRoleErrors)
    return <Content.Alert type="error" message={CurrentRoleErrors.message} />

  if (isRolesLoading) return <Loading small />
  if (RoleErrors)
    return <Content.Alert type="error" message={RoleErrors.message} />

  if (isUsersLoading) return <Loading small />
  if (UserErrors)
    return <Content.Alert type="error" message={UserErrors.message} />

  const { name, description } = CurrentRoleList.readRole

  return (
    <Layout.Container>
      <div
        css={`
          height: 100%;
          display: grid;
          grid-template-rows: max-content 1fr;
        `}
      >
        <PageHeader
          title="Role Details"
          xAxis="-50px"
          close={() => {
            localStorage.removeItem('selectedPermission')
            history.push('/broker/roles')
          }}
        >
          <div
            css={`
              @media (max-width: 376px) {
                display: grid;
                grid-row-gap: 10px;
              }
              @media (min-width: 376px) {
                display: flex;
                grid-gap: 10px;
              }
            `}
          >
            <Core.Button
              width="120px"
              bgColour={Colours.orange}
              onClick={() =>
                history.push(`/broker/roles/permissions/${match.params.roleId}`)
              }
            >
              Permissions
            </Core.Button>
            <Core.Button
              width="120px"
              bgColour={Colours.blue}
              onClick={() =>
                history.push(`/broker/roles/edit-role/${match.params.roleId}`)
              }
            >
              Manage
            </Core.Button>
          </div>
        </PageHeader>
        {permissions.ROLE_READ_TYPEROLE ? (
          <div
            css={`
              display: grid;
              height: calc(100% - 2px);
              grid-template-columns: 1fr 2fr;
              @media (max-width: 769px) {
                grid-template-columns: 1fr;
                grid-template-rows: 450px 400px 570px;
              }
              @media (max-width: 376px) {
                grid-template-columns: 1fr;
                grid-template-rows: 450px 400px 600px;
              }
              @media (min-width: 1439px) {
                grid-template-columns: 1fr 2fr;
              }
              grid-gap: 20px;
              overflow-y: auto;

              .table___StyledDiv-sc-14m0iw7-0 {
                height: calc(100% - 5px) !important;
              }
            `}
          >
            <div
              css={`
                display: grid;
                // grid-template-rows: max-content 1fr;
                grid-row-gap: 10px;
                overflow-y: auto;
                // border: 1px solid red;
              `}
            >
              <RoleDetails
                name={name}
                description={description}
                height="100%"
              />

              <div
                css={`
                  height: 100%;
                  @media (max-width: 769px) {
                    display: none;
                  }
                `}
              >
                <RolesOnRole RoleList={RoleList} />
              </div>
            </div>
            {/* second */}
            <div
              css={`
                min-height: 400px;
                @media (min-width: 769px) {
                  display: none;
                }
              `}
            >
              <RolesOnRole RoleList={RoleList} />
            </div>
            {/* Third */}

            <ViewRoleTable Users={UserList.usersAssignedToRole} />
          </div>
        ) : (
          <Access />
        )}
      </div>
    </Layout.Container>
  )
}

function RoleDetails({ name, description, ...rest }) {
  const { Colours } = useContext(ColourContext)
  return (
    <Content.CustomCard
      bg={Colours.title}
      {...rest}
      title="Role Details"
      bodyPadding="12px"
    >
      <Core.Text mb="8px" weight="500" color={Colours.text}>
        Role Name
      </Core.Text>
      <Core.Text mb="24px" color={Colours.darkBlue}>
        {name}
      </Core.Text>

      <Core.Text mb="8px" weight="500" color={Colours.text}>
        Role Description
      </Core.Text>
      <Core.Text color={Colours.darkBlue}>{description}</Core.Text>
    </Content.CustomCard>
  )
}

function RolesOnRole({ RoleList, ...rest }) {
  const { Colours } = useContext(ColourContext)
  return (
    <Content.CustomCard
      bg={Colours.title}
      {...rest}
      title="Roles On This Role"
      bodyPadding="12px"
    >
      <Layout.Flex justify="space-between">
        <Core.Text weight="500" color={Colours.text}>
          Name
        </Core.Text>
        <Core.Text weight="500" color={Colours.text}>
          Status
        </Core.Text>
      </Layout.Flex>
      <Core.Line
        length="calc(100% - 15px)"
        variant="h"
        thickness="1px"
        color={Colours.border}
        display="block"
        mt="4px"
        mb="4px"
      />

      {RoleList.rolesAssignedToRole.map(({ id, name }, index) => (
        <Core.Box display="block" key={id} bb={`1px solid ${Colours.border}`}>
          <Layout.Flex wrap="no-wrap" justify="space-between">
            <Core.Text>{name}</Core.Text>
            <Icons.CheckCircleRounded
              style={{ color: Colours.green }}
              key={index}
            />
          </Layout.Flex>
        </Core.Box>
      ))}
    </Content.CustomCard>
  )
}

export default ViewRole
