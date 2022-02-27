import React, { useState, useContext } from 'react'
import {
  FormControl,
  Content,
  Core,
  Layout,
  PageHeader,
  Icons,
  Loading,
  MenuNavigation,
} from 'components'
import { ColourContext } from 'context'
import 'styled-components/macro'
import UserCard from './UserCard'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { LIST_ROLESHAVE_ROLES, LIST_ROLES } from './forms/queries'
import {
  ASSIGN_USER_TO_ROLE,
  ASSIGN_ROLE_TO_ROLE,
  DELETE_ROLE_FROM_ROLE,
  DELETE_ASSIGN_USER_TO_ROLE,
} from './forms/mutations'
import { LIST_USERSHAVE_ROLES, LIST_USERS } from '../users/queries'
import { useRouteMatch } from 'react-router-dom'
import { usePermission } from 'hooks'

function EditRole() {
  const [role, setRole] = useState({ roles: [] })
  const [userID, setUserId] = useState({ userIDs: [] })
  const [Page, setPage] = useState('Users')
  const match = useRouteMatch()
  const [permissions, Access] = usePermission()
  const {
    params: { roleId },
  } = match
  const roleID = []
  const userIDs = []

  //QUERIES

  //List Roles Query
  const {
    loading: isRolesLoading,
    error: RoleErrors,
    data: RoleList,
  } = useQuery(LIST_ROLESHAVE_ROLES, {
    variables: { parentId: parseInt(roleId) },
  })

  //List Users on Role
  const {
    loading: isUsersLoading,
    error: UserErrors,
    data: UserList,
  } = useQuery(LIST_USERSHAVE_ROLES, {
    variables: { roleId: parseInt(roleId) },
  })

  //List Roles
  const {
    loading: RolesLoading,
    error: RoleListErrors,
    data: RolesData,
  } = useQuery(LIST_ROLES)

  //List Users
  let {
    loading: isUsersListLoading,
    error: UserListErrors,
    data: UserData,
  } = useQuery(LIST_USERS)

  //MUTATIONS

  //Create Role have Users Mutation
  const [addUserRoles, { loading: AddingUserToRole, error: UserToRoleError }] =
    useMutation(ASSIGN_USER_TO_ROLE, {
      refetchQueries: () => [
        {
          query: LIST_USERSHAVE_ROLES,
          variables: { roleId: parseInt(roleId) },
        },
      ],
    })

  //Create Role have Role Mutation
  const [
    addRolesToRole,
    { loading: AddingRoleToRole, error: RoleToRoleError },
  ] = useMutation(ASSIGN_ROLE_TO_ROLE, {
    refetchQueries: () => [
      {
        query: LIST_ROLESHAVE_ROLES,
        variables: { parentId: parseInt(roleId) },
      },
      {
        query: LIST_USERSHAVE_ROLES,
        variables: { roleId: parseInt(roleId) },
      },
    ],
  })

  //Remove Roles from Role Mutation
  const [
    deleteRolesFromRole,
    { loading: RemovingRoleFromRole, error: RemoveRoleFromRoleError },
  ] = useMutation(DELETE_ROLE_FROM_ROLE, {
    refetchQueries: () => [
      {
        query: LIST_ROLES,
      },
      {
        query: LIST_ROLESHAVE_ROLES,
        variables: { parentId: parseInt(roleId) },
      },
    ],
  })
  //Remove User from Role Mutation
  const [
    deleteUserRoles,
    { loading: RemovingUsersFromRole, error: RemoveUserFromRoleError },
  ] = useMutation(DELETE_ASSIGN_USER_TO_ROLE, {
    refetchQueries: () => [
      {
        query: LIST_USERS,
      },
      {
        query: LIST_USERSHAVE_ROLES,
        variables: { roleId: parseInt(roleId) },
      },
    ],
  })

  if (isRolesLoading || isUsersListLoading || RolesLoading || isUsersLoading)
    return <Loading small />
  if (RoleErrors)
    return (
      <Content.Alert type="error" message={'Fail to Load Load Users on Role'} />
    )
  if (UserErrors)
    return <Content.Alert type="error" message={'Fail to Load  Users'} />
  if (RoleListErrors)
    return <Content.Alert type="error" message={'Fail to Load  Roles'} />
  if (UserListErrors)
    return <Content.Alert type="error" message={'Fail to Load Users List'} />

  if (RemoveUserFromRoleError)
    return <Content.Alert type="error" message={'Fail to Remove Users'} />
  if (RemoveRoleFromRoleError)
    return <Content.Alert type="error" message={'Fail to Remove Role'} />
  if (UserToRoleError)
    return <Content.Alert type="error" message={'Fail to Add Users'} />
  if (RoleToRoleError)
    return <Content.Alert type="error" message={'Fail to Add Role'} />

  return (
    <Layout.Container>
      <div
        css={`
          height: 100%;
          display: grid;
          grid-template-rows: max-content 1fr;
          overflow-y: auto;
        `}
      >
        <PageHeader title="Role Management">
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
            {permissions.ROLE_UPDATE_TYPEROLE ? (
              <Core.Button
                width="120px"
                onClick={() => {
                  //Adding users to Role
                  if (userID)
                    userID.userIDs.map((userID) =>
                      //Execution of policy have insured for selected insured
                      addUserRoles({
                        variables: {
                          userId: userID,
                          roleId: parseInt(roleId),
                        },
                      })
                        .then(() => {
                          setUserId({ userIDs: [] })
                        })
                        .catch((e) => console.log(e))
                    )

                  //Adding Roles to Role
                  if (role)
                    role.roles.map((role) =>
                      addRolesToRole({
                        variables: {
                          parentId: parseInt(roleId),
                          childId: parseInt(role),
                        },
                      })
                        .then(() => {
                          setRole({ roles: [] })
                        })
                        .catch((e) => console.log(e))
                    )
                }}
              >
                Save
              </Core.Button>
            ) : null}
          </div>
        </PageHeader>
        {permissions.ROLE_READ_TYPEROLE ? (
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 20px;
              overflow-y: auto;
            `}
          >
            <MenuNavigation.Container>
              <MenuNavigation.MainItem
                handler={setPage}
                active={Page === 'Users'}
              >
                Users
              </MenuNavigation.MainItem>
              <MenuNavigation.MainItem
                handler={setPage}
                active={Page === 'Roles'}
              >
                Roles
              </MenuNavigation.MainItem>
            </MenuNavigation.Container>
            {Page === 'Users' && (
              <div
                css={`
                  overflow-y: auto;
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-gap: 20px;
                  @media screen and (max-width: 950px) {
                    grid-template-columns: 1fr;
                  }
                `}
              >
                <UsersOnThisRole
                  parentID={roleId}
                  deleteUserRoles={deleteUserRoles}
                  RemovingUsersFromRole={RemovingUsersFromRole}
                  UserList={UserList}
                  userIDs={userIDs}
                  mg="0px"
                  width="100%"
                  height="100%"
                />
                <AddUsers
                  loading={AddingUserToRole}
                  setUserId={setUserId}
                  userID={userID}
                  userIDs={userIDs}
                  listUsers={UserData.listUsers.data}
                  mg="0px"
                  width="100%"
                  height="100%"
                />
              </div>
            )}
            {Page === 'Roles' && (
              <div
                css={`
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-gap: 20px;
                  @media screen and (max-width: 950px) {
                    grid-template-columns: 1fr;
                  }
                `}
              >
                <RolesOnRole
                  parentID={roleId}
                  deleteRolesFromRole={deleteRolesFromRole}
                  RemovingRoleFromRole={RemovingRoleFromRole}
                  roleID={roleID}
                  roles={RoleList.rolesAssignedToRole}
                  mg="0px"
                  width="100%"
                  height="100%"
                />
                <AddRole
                  loading={AddingRoleToRole}
                  roleID={roleID}
                  roleId={roleId}
                  setRole={setRole}
                  width="100%"
                  roles={RolesData.listRoles}
                />
              </div>
            )}
          </div>
        ) : (
          <Access />
        )}
      </div>
    </Layout.Container>
  )
}

function AddRole({
  loading,
  roleId: parentId,
  roleID,
  roles,
  setRole,
  ...rest
}) {
  const { Colours } = useContext(ColourContext)
  return (
    <Content.CustomCard
      bg={Colours.title}
      {...rest}
      title="Duplicate Existing Roles"
    >
      <div
        css={`
          height: 100%;
          overflow-y: auto;
          display: grid;
          grid-template-rows: 30px 1fr;
        `}
      >
        {loading && <Loading small />}
        <div
          css={`
            display: Grid;
            grid-template-columns: 1fr 2fr 60px;
            grid-column-gap: 20px;
            align-items: center;
            border-bottom: 2px solid ${Colours.border};
            padding-bottom: 5px;
          `}
        >
          <Core.Text weight="600">Name</Core.Text>
          <Core.Text weight="600">Description</Core.Text>
          <Core.Text weight="600">Assign</Core.Text>
        </div>
        <div
          css={`
            overflow-y: auto;
          `}
        >
          {roles.map(({ name, id: roleId, description }, index) => {
            if (roleID.indexOf(roleId) === -1 && roleId !== parseInt(parentId))
              return (
                <div
                  key={index}
                  css={`
                    display: Grid;
                    grid-template-columns: 1fr 2fr 40px;
                    grid-column-gap: 20px;
                    align-items: start;
                    border-bottom: 0.5px solid ${Colours.border};
                    padding: 10px 0px;
                  `}
                >
                  <Core.Text>{name}</Core.Text>
                  <Core.Text>{description}</Core.Text>
                  <section
                    css={`
                      &:hover {
                        cursor: pointer;
                      }
                    `}
                  >
                    <FormControl.Checkbox
                      value={roleId}
                      onChange={(event) => {
                        event.persist()
                        const id = event.target.value
                        if (event.target.checked) {
                          setRole((state) => {
                            const roles = state.roles.concat(id)
                            return {
                              roles,
                            }
                          })
                        } else {
                          setRole((state) => {
                            let roleIndex = state.roles.indexOf(
                              event.target.value
                            )
                            const roles = state.roles.filter(
                              (item, index) => roleIndex !== index
                            )
                            return {
                              roles,
                            }
                          })
                        }
                      }}
                    />
                  </section>
                </div>
              )
            return null
          })}
        </div>
      </div>
    </Content.CustomCard>
  )
}

function UsersOnThisRole(props) {
  const { Colours } = useContext(ColourContext)
  return (
    <Content.CustomCard
      bg={Colours.title}
      {...props}
      title="Users On This Role"
    >
      <div
        css={`
          height: 100%;
          display: grid;
          grid-template-rows: 30px 1fr;
        `}
      >
        <div
          css={`
            display: Grid;
            grid-template-columns: 1fr 1fr 50px;
            grid-column-gap: 10px;
            align-items: center;
            border-bottom: 2px solid ${Colours.border};
            padding-bottom: 5px;
          `}
        >
          <Core.Text weight="600">Name</Core.Text>
          <Core.Text weight="600">Position</Core.Text>
          <Core.Text weight="600">Action</Core.Text>
        </div>
        <div
          css={`
            overflow-y: auto;
            @media screen and (max-width: 950px) {
              height: 250px;
              max-height: 250px;
            }
          `}
        >
          {props.RemovingUsersFromRole && <Loading small />}
          {props.UserList.usersAssignedToRole.map((user, index) => {
            props.userIDs.push(user.id)
            return (
              <div
                key={index}
                css={`
                  display: Grid;
                  grid-template-columns: 1fr 1fr 40px;
                  grid-column-gap: 10px;
                  align-items: start;
                  border-bottom: 0.5px solid ${Colours.border};
                  padding: 10px 0px;
                `}
              >
                <Core.Text>
                  {user.firstName} {user.lastName}
                </Core.Text>
                <Core.Text>{user.position}</Core.Text>
                <section
                  css={`
                    &:hover {
                      cursor: pointer;
                    }
                  `}
                  onClick={() => {
                    props
                      .deleteUserRoles({
                        variables: {
                          userId: user.id,
                          roleId: parseInt(props.parentID),
                        },
                      })
                      .catch((e) => console.log(e))
                  }}
                >
                  <Icons.DeleteSweepRounded style={{ color: Colours.red }} />
                </section>
              </div>
            )
          })}
        </div>
      </div>
    </Content.CustomCard>
  )
}

function RolesOnRole({
  parentID,
  deleteRolesFromRole,
  RemovingRoleFromRole,
  roleID,
  roles,
  setRole,
  ...rest
}) {
  const { Colours } = useContext(ColourContext)
  return (
    <Content.CustomCard bg={Colours.title} {...rest} title="Roles On This Role">
      <div
        css={`
          height: 100%;
          overflow-y: auto;
          display: grid;
          grid-template-rows: 30px 1fr;
        `}
      >
        <div
          css={`
            display: Grid;
            grid-template-columns: 1fr 50px;
            grid-column-gap: 10px;
            align-items: center;
            border-bottom: 2px solid ${Colours.border};
            padding-bottom: 5px;
          `}
        >
          <Core.Text weight="600">Name</Core.Text>
          <Core.Text weight="600">Action</Core.Text>
        </div>
        <div
          css={`
            overflow-y: auto;
          `}
        >
          {RemovingRoleFromRole && <Loading small />}
          {roles.map((role, index) => {
            roleID.push(role.id)
            return (
              <div
                key={index}
                css={`
                  display: Grid;
                  grid-template-columns: 1fr 40px;
                  grid-column-gap: 10px;
                  align-items: start;
                  border-bottom: 0.5px solid ${Colours.border};
                  padding: 10px 0px;
                `}
              >
                <Core.Text>{role.name}</Core.Text>
                <section
                  css={`
                    &:hover {
                      cursor: pointer;
                    }
                  `}
                  onClick={() => {
                    deleteRolesFromRole({
                      variables: {
                        parentId: parseInt(parentID),
                        childId: role.id,
                      },
                    }).catch((e) => console.log(e))
                  }}
                >
                  <Icons.DeleteSweepRounded style={{ color: Colours.red }} />
                </section>
              </div>
            )
          })}
        </div>
      </div>
    </Content.CustomCard>
  )
}

function AddUsers(props) {
  const { Colours } = useContext(ColourContext)
  return (
    <Content.CustomCard bg={Colours.title} title="Add Users">
      <div
        css={`
          height: 100%;
          overflow-y: auto;
          @media screen and (max-width: 950px) {
            height: 370px;
          }
        `}
      >
        {props.loading && <Loading small />}
        <div
          css={`
            display: flex;
            flex-wrap: wrap;
          `}
        >
          {props.listUsers.map(
            ({ id, firstName, lastName, email, enabled, avatar }, index) => {
              if (props.userIDs.indexOf(id) === -1)
                return (
                  <>
                    <UserCard
                      key={index}
                      small
                      selected={
                        props.userID.userIDs.indexOf(id) !== -1 ? true : false
                      }
                      id={id}
                      enabled={enabled}
                      image={avatar}
                      email={email}
                      firstName={firstName}
                      lastName={lastName}
                      usersId={props.userID}
                      setUsersId={props.setUserId}
                    />
                  </>
                )
              return null
            }
          )}
        </div>
      </div>
    </Content.CustomCard>
  )
}

export default EditRole
