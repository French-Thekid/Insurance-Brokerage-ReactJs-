import React, { useState, useContext } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useQuery /*, useLazyQuery */ } from '@apollo/react-hooks'
import { ColourContext } from 'context'
import {
  CREATE_ROLE,
  ASSIGN_USER_TO_ROLE,
  ASSIGN_ROLE_TO_ROLE,
} from './forms/mutations'
import { LIST_ROLES } from './forms/queries'
import { LIST_USERS /*, SEARCH_USERS*/ } from '../users/queries'
import {
  Content,
  Core,
  FormControl,
  Layout,
  PageHeader,
  Loading,
} from 'components'
import 'styled-components/macro'
import UserCard from './UserCard'
import { CreateRoleForm } from './forms'
import { usePermission } from '../../../hooks'
import { Logger } from '../../../utils'

function CreateRole() {
  const [role, setRole] = useState({ roles: [] })
  const [usersId, setUsersId] = useState({ userIDs: [] })
  // //Search User
  // const [
  //   searchUsers,
  //   { loading: Searching, data: searchResult },
  // ] = useLazyQuery(SEARCH_USERS)

  //Create Role have Users Mutation
  const [addUserRoles, { loading: assigningUsers, error: UserToRoleError }] =
    useMutation(ASSIGN_USER_TO_ROLE, {
      refetchQueries: () => [
        {
          query: LIST_ROLES,
        },
      ],
    })

  //Create Role have Role Mutation
  const [addRolesToRole, { loading: assigningRoles, error: RoleToRoleError }] =
    useMutation(ASSIGN_ROLE_TO_ROLE, {
      refetchQueries: () => [
        {
          query: LIST_ROLES,
        },
      ],
    })

  //Create Role Mutation
  const [createRole, { loading: creatingRole, error: RoleError }] = useMutation(
    CREATE_ROLE,
    {
      //catch errors
      onCompleted({ createRole }) {
        // Logger('create role')
        //Adding users to Role
        if (usersId)
          usersId.userIDs.map((usersId) =>
            //Execution of policy have insured for selected insured
            addUserRoles({
              variables: {
                userId: usersId,
                roleId: createRole.id,
              },
            })
              .then(() => {
                Logger('add user to role', 'general', createRole.id)
                setUsersId({ userIDs: [] })
              })
              .catch((e) => console.log(e))
          )

        //Adding Roles to Role
        if (role)
          role.roles.map((role) =>
            addRolesToRole({
              variables: {
                parentId: createRole.id,
                childId: parseInt(role),
              },
            })
              .then(() => {
                Logger('add role to role', 'general', parseInt(role))
                setRole({ roles: [] })
              })
              .catch((e) => console.log(e))
          )
      },
      refetchQueries: [{ query: LIST_ROLES }],
    }
  )

  //List Roles Query
  const {
    loading: isRolesLoading,
    error: RoleErrors,
    data: RoleList,
  } = useQuery(LIST_ROLES)

  //List Users Mutation
  let {
    loading: isUsersLoading,
    error: UserErrors,
    data: UserData,
  } = useQuery(LIST_USERS)

  if (isRolesLoading || assigningRoles || assigningUsers)
    return <Loading small />
  if (RoleErrors)
    return <Content.Alert type="error" message={RoleErrors.message} />

  if (isUsersLoading) return <Loading small />
  if (UserErrors)
    return <Content.Alert type="error" message={UserErrors.message} />
  if (UserToRoleError)
    return <Content.Alert type="error" message={UserToRoleError.message} />
  if (RoleToRoleError)
    return <Content.Alert type="error" message={RoleToRoleError.message} />

  let {
    listUsers: { data: UserList },
  } = UserData

  return (
    <Layout.Container>
      <div
        css={`
          height: 100%;
          display: grid;
          grid-template-rows: max-content 1fr;
        `}
      >
        <PageHeader title="Create Role">
          <Core.Button width="120px" type="submit" form="createRoleForm">
            Create
          </Core.Button>
        </PageHeader>
        {RoleError && (
          <Content.Alert type="error" message="Failed to create Role" />
        )}
        {(assigningUsers || assigningRoles || creatingRole) && <Loading />}

        <div
          css={`
            height: 100%;
            display: grid;
            grid-template-columns: 1fr 3fr;
            grid-gap: 20px;
            @media (max-width: 1400px) {
              grid-template-columns: 2fr 4fr;
            }
            @media (max-width: 790px) {
              grid-template-columns: 1fr;
            }
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-rows: 1fr 1fr;
              grid-gap: 20px;
              height: 100%;
              width: 100%;
              @media (min-width: 376px) {
                min-width: 300px;
              }
            `}
          >
            <div
              css={`
                height: 100%;
                width: 100%;
                min-height: 300px;
              `}
            >
              <RoleDetails
                createRole={createRole}
                width="100%"
                height="100%"
                mg="0px"
              />
            </div>
            <div
              css={`
                height: 100%;
                width: 100%;
                min-height: 300px;
              `}
            >
              <AddRoles
                roles={RoleList}
                setRole={setRole}
                mg="0px"
                width="100%"
                height="100%"
              />
            </div>
          </div>
          <div
            css={`
              height: 100%;
              width: 100%;
              min-height: 500px;
            `}
          >
            <AddUsers
              usersId={usersId}
              setUsersId={setUsersId}
              mg="0px"
              width="100%"
              height="100%"
              UserList={UserList}
            />
          </div>
        </div>
      </div>
    </Layout.Container>
  )
}

function AddUsers({ usersId, setUsersId, UserList, ...rest }) {
  return (
    <Content.CustomCard
      {...rest}
      style={{ overflowY: 'auto' }}
      title="Add Users"
    >
      <Layout.Flex wrap="wrap">
        {UserList.map(({ firstName, id, enabled, email, avatar, lastName }) => (
          <Core.Box key={id}>
            <UserCard
              // state={state}
              selected={usersId.userIDs.indexOf(id) !== -1 ? true : false}
              id={id}
              enabled={enabled}
              image={avatar}
              email={email}
              firstName={firstName}
              lastName={lastName}
              usersId={usersId}
              setUsersId={setUsersId}
            />
          </Core.Box>
        ))}
      </Layout.Flex>
    </Content.CustomCard>
  )
}

function RoleDetails({ createRole, ...rest }) {
  return (
    <Content.CustomCard {...rest} title="Role Details" bodyPadding="12px">
      <CreateRoleForm createRole={createRole} />
    </Content.CustomCard>
  )
}

function AddRoles(props) {
  const { Colours } = useContext(ColourContext)
  const { roles } = props || {}
  const { listRoles } = roles || {}
  const { data } = listRoles || {}
  return (
    <Content.CustomCard {...props} title="Add Existing Roles">
      <Layout.Flex justify="space-between">
        <Core.Text weight="500" color={Colours.text}>
          Name
        </Core.Text>
        <Core.Text weight="500" color={Colours.text}>
          Assign
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

      {data.map((role) => (
        <Core.Box
          display="block"
          key={role.id}
          bb={`1px solid ${Colours.border}`}
        >
          <Layout.Flex wrap="no-wrap" justify="space-between">
            <Core.Text>{role.name}</Core.Text>
            <section
              css={`
                width: 40px;
              `}
            >
              <FormControl.Checkbox
                value={role.id}
                onChange={(event) => {
                  event.persist()
                  const id = event.target.value
                  if (event.target.checked === true) {
                    props.setRole((state) => {
                      const roles = state.roles.concat(id)
                      return {
                        roles,
                      }
                    })
                  } else {
                    props.setRole((state) => {
                      let index = state.roles.indexOf(event.target.value)
                      const roles = state.roles.filter((item, j) => index !== j)
                      return {
                        roles,
                      }
                    })
                  }
                }}
              />
            </section>
          </Layout.Flex>
        </Core.Box>
      ))}
    </Content.CustomCard>
  )
}

export default CreateRole
