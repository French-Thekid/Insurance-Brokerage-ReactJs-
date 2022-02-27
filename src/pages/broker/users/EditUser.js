import React, { useState } from 'react'
import 'styled-components/macro'
// import { useHistory, useRouteMatch } from 'react-router-dom'

import {
  LIST_ROLES,
  LIST_ROLES_UNDER_USERS,
  // SEARCH_ROLES,
} from '../roles/forms/queries'
import { DELETE_ASSIGN_USER_TO_ROLE } from 'pages/broker/roles/forms/mutations'
import { useQuery, /* useLazyQuery,*/ useMutation } from '@apollo/react-hooks'
import { EditUserForm } from './form'
import {
  Content,
  Core,
  Icons,
  FormControl,
  PageHeader,
  Layout,
  Colours,
  Loading,
} from 'components'
import { useRouteMatch } from 'react-router-dom'

export default function EditUser() {
  const [role, setRole] = useState({ roles: [] })
  const roleID = []

  const {
    params: { userId },
  } = useRouteMatch()

  // const history = useHistory()
  //Search Roles
  // const [
  //   searchRoles,
  //   { loading: SearchingRoles, data: searchRoleResult },
  // ] = useLazyQuery(SEARCH_ROLES)

  //List Role on Role Query
  // const {
  //   loading: isRolesUnderUserLoading,
  //   error: RoleUnderUserErrors,
  //   data: RoleUnderUserList,
  // } = useQuery(LIST_ROLES_UNDER_USERS, {
  //   variables: { userId },
  // })

  //List Roles Query
  // const {
  //   loading: isRolesLoading,
  //   error: RoleErrors,
  //   data: RolesData,
  // } = useQuery(LIST_ROLES)

  //Remove User from Role Mutation
  // const [
  //   deleteUserRoles,
  //   { loading: loadingUsersOnRoles, error: RemoveUserFromRoleError },
  // ] = useMutation(DELETE_ASSIGN_USER_TO_ROLE, {
  //   refetchQueries: () => [
  //     {
  //       query: LIST_ROLES_UNDER_USERS,
  //       variables: { userId },
  //     },
  //   ],
  // })

  //Removing Users assignment to Role
  // if (RemoveUserFromRoleError)
  //   return (
  //     <Content.Alert
  //       type="error"
  //       message={'Failed to Remove User from Role.'}
  //     />
  //   )

  //Checking Role on Role
  // if (isRolesUnderUserLoading) return <Loading small />
  // if (RoleUnderUserErrors)
  //   return (
  //     <Content.Alert
  //       type="error"
  //       message={'Failed to Load Roles Assigned to User.'}
  //     />
  //   )

  //Checking Roles List
  // if (isRolesLoading) return <Loading small />
  // if (RoleErrors)
  //   return <Content.Alert type="error" message={'Failed to Load Roles.'} />

  // let { listRoles: RolesList } = RolesData

  // if (searchRoleResult && searchRoleResult.searchRoles.length !== 0)
  //   RolesList = searchRoleResult.searchRoles

  return (
    <Layout.Container>
      <div
        css={`
          height: 100%;
          display: grid;
          grid-template-rows: max-content 1fr;
        `}
      >
        <PageHeader title="Modify Broker" xAxis="-50px">
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
              bgColour={Colours.blue}
              type="submit"
              form="editUserForm"
            >
              Update
            </Core.Button>
          </div>
        </PageHeader>
        <div
          css={`
            display: grid;
            height: calc(100% - 2px);
            grid-template-columns: 1fr 1fr;
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
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-row-gap: 20px;
              overflow-y: auto;
            `}
          >
            <Content.CustomCard title="Broker Details">
              <EditUserForm
                formId="editUserForm"
                setRole={setRole}
                role={role}
              />
            </Content.CustomCard>
            <div
              css={`
                height: calc(100% - 2px);
                @media (max-width: 769px) {
                  display: none;
                }
              `}
            >
              <Content.CustomCard title="Roles Assigned to Broker">
                <div
                  css={`
                    height: 100%;
                    display: grid;
                    grid-template-rows: 40px 1fr;
                    grid-row-gap: 10px;
                    overflow-y: auto;
                  `}
                >
                  <div
                    css={`
                      display: Grid;
                      grid-template-columns: 1fr 2fr 50px;
                      grid-column-gap: 10px;
                      align-items: center;
                      border-bottom: 2px solid ${Colours.border};
                      padding-bottom: 5px;
                      width: calc(100% - 2px);
                    `}
                  >
                    <Core.Text weight="600">Name</Core.Text>
                    <Core.Text weight="600">Description</Core.Text>
                    <Core.Text weight="600">Action</Core.Text>
                  </div>
                  <div
                    css={`
                      overflow-y: auto;
                    `}
                  >
                    {/* {loadingUsersOnRoles && <Loading small />} */}
                    {[].map(({ id: roleId, name, description }, index) => {
                      roleID.push(roleId)
                      return (
                        <div
                          key={index}
                          css={`
                            display: Grid;
                            grid-template-columns: 1fr 2fr 50px;
                            grid-column-gap: 10px;
                            align-items: start;
                            border-bottom: 0.5px solid ${Colours.border};
                            padding: 10px 0px;
                          `}
                        >
                          <Core.Text>{name}</Core.Text>
                          <Core.Text>{description}</Core.Text>
                          <section
                            css={`
                              padding-left: 10px;
                              &:hover {
                                cursor: pointer;
                              }
                            `}
                          >
                            <Icons.DeleteRounded
                              style={{ color: Colours.red }}
                            />
                          </section>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </Content.CustomCard>
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
            <Content.CustomCard title="Roles Assigned to Broker">
              <div
                css={`
                  display: grid;
                  grid-template-rows: 40px 1fr;
                  grid-row-gap: 10px;
                  overflow-y: auto;
                  height: 100%;
                `}
              >
                <div
                  css={`
                    display: Grid;
                    grid-template-columns: 1fr 2fr 45px;
                    grid-column-gap: 10px;
                    align-items: center;
                    border-bottom: 2px solid ${Colours.border};
                    padding-bottom: 5px;
                    width: calc(100% - 2px);
                  `}
                >
                  <Core.Text weight="600">Name</Core.Text>
                  <Core.Text weight="600">Description</Core.Text>
                  <Core.Text weight="600">Action</Core.Text>
                </div>
                <div
                  css={`
                    overflow-y: auto;
                  `}
                >
                  {[].map(({ id: roleId, name, description }, index) => {
                    roleID.push(roleId)
                    return (
                      <div
                        key={index}
                        css={`
                          display: Grid;
                          grid-template-columns: 1fr 2fr 45px;
                          grid-column-gap: 10px;
                          align-items: start;
                          border-bottom: 0.5px solid ${Colours.border};
                          padding: 10px 0px;
                        `}
                      >
                        <Core.Text>{name}</Core.Text>
                        <Core.Text>{description}</Core.Text>
                        <section
                          css={`
                            padding-left: 15px;
                            &:hover {
                              cursor: pointer;
                            }
                          `}
                          onClick={() => {
                            // deleteUserRoles({
                            //   variables: {
                            //     userId,
                            //     roleId: role.id,
                            //   },
                            // }).catch((e) => console.log(e))
                          }}
                        >
                          <Icons.DeleteRounded style={{ color: Colours.red }} />
                        </section>
                      </div>
                    )
                  })}
                </div>
              </div>
            </Content.CustomCard>
          </div>

          {/* Third */}
          <Content.CustomCard title="Assign to Role">
            <div
              css={`
                min-height: 450px;
                display: grid;
                grid-template-rows: 40px 1fr;
                grid-row-gap: 10px;
                overflow-y: auto;
                height: 100%;
              `}
            >
              <div
                css={`
                  display: Grid;
                  grid-template-columns: 1fr 2fr 45px;
                  grid-column-gap: 10px;
                  align-items: center;
                  border-bottom: 2px solid ${Colours.border};
                  padding-bottom: 5px;
                  width: calc(100% - 2px);
                `}
              >
                <Core.Text weight="600">Name</Core.Text>
                <Core.Text weight="600">Description</Core.Text>
                <Core.Text weight="600">Action</Core.Text>
              </div>
              <div
                css={`
                  overflow-y: auto;
                `}
              >
                {[].map(({ name, id: roleId, description }, index) => {
                  if (roleID.indexOf(roleId) === -1)
                    return (
                      <div
                        key={index}
                        css={`
                          display: Grid;
                          grid-template-columns: 1fr 2fr 30px;
                          grid-column-gap: 10px;
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
        </div>
      </div>
    </Layout.Container>
  )
}
