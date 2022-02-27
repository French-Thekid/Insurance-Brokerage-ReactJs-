import React, { useState } from 'react'
import 'styled-components/macro'

import {
  Content,
  Core,
  PageHeader,
  Layout,
  FormControl,
  Colours,
  Loading,
} from 'components'
// import { useHistory, useRouteMatch } from 'react-router-dom'
import { CreateUserForm } from './form'
import { LIST_ROLES /*, SEARCH_ROLES*/ } from '../roles/forms/queries'
import { useQuery /*, useLazyQuery*/ } from '@apollo/react-hooks'

export default function CreateUser() {
  const [role, setRole] = useState({ roles: [] })
  // const [query, setQuery] = useState('')

  //Search Roles
  // const [
  //   searchRoles,
  //   { loading: SearchingRoles, data: searchRoleResult },
  // ] = useLazyQuery(SEARCH_ROLES)

  //List Roles Query
  const {
    loading: isRolesLoading,
    error: RoleErrors,
    data: RolesData,
  } = useQuery(LIST_ROLES)

  if (isRolesLoading) return <Loading small />
  if (RoleErrors)
    return <Content.Alert type="error" message={'Failed to Load Roles.'} />

  let { listRoles: RolesList = [] } = RolesData

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
        <PageHeader title="Create Broker">
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
              form="createUserForm"
            >
              Create
            </Core.Button>
          </div>
        </PageHeader>

        <div
          css={`
            display: grid;
            height: 100%;
            grid-template-columns: 1fr 2fr;
            @media (max-width: 769px) {
              grid-template-columns: 1fr;
            }
            grid-gap: 20px;
            overflow-y: auto;
          `}
        >
          <Content.CustomCard title="Broker Details">
            <CreateUserForm
              formId="createUserForm"
              setRole={setRole}
              role={role}
            />
          </Content.CustomCard>
          <Content.CustomCard title="Roles Assignment to Broker">
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
                  grid-template-columns: 1fr 3fr 50px;
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
                {[].map(({ id: roleId, name, description }, index) => (
                  <div
                    key={index}
                    css={`
                      display: Grid;
                      grid-template-columns: 1fr 3fr 35px;
                      grid-column-gap: 20px;
                      align-items: start;
                      border-bottom: 0.5px solid ${Colours.border};
                      padding: 10px 0px;
                    `}
                  >
                    <Core.Text>{name}</Core.Text>
                    <Core.Text>{description}</Core.Text>

                    <FormControl.Checkbox
                      value={roleId}
                      onChange={(event) => {
                        event.persist()
                        const id = event.target.value
                        if (event.target.checked === true) {
                          setRole((state) => {
                            const roles = state.roles.concat(id)
                            return {
                              roles,
                            }
                          })
                        } else {
                          setRole((state) => {
                            let index = state.roles.indexOf(event.target.value)
                            const roles = state.roles.filter(
                              (item, j) => index !== j
                            )
                            return {
                              roles,
                            }
                          })
                        }
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Content.CustomCard>
        </div>
      </div>
    </Layout.Container>
  )
}
