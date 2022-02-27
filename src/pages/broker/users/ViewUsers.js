import React from 'react'
import 'styled-components/macro'
import { useQuery } from '@apollo/react-hooks'

import { Content, Core, PageHeader, Layout, Colours, Loading } from 'components'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { READ_USER } from './queries'
import { LIST_ROLES_UNDER_USERS } from '../roles/forms/queries'
import { usePermission } from 'hooks'
import { ForcePasswordReset } from './modal'

const queryString = require('query-string')

export default function ViewUser() {
  const {
    params: { userId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const history = useHistory()
  const [permissions, Access] = usePermission()

  //List Role on Role Query
  // const {
  //   loading: isRolesUnderUserLoading,
  //   error: RoleUnderUserErrors,
  //   data: RoleUnderUserList,
  // } = useQuery(LIST_ROLES_UNDER_USERS, {
  //   variables: { userId },
  // })

  // Get the user details On load
  const {
    loading,
    error: userError,
    data: userData = {},
  } = useQuery(READ_USER, {
    variables: { id: userId },
  })

  //Checking Role on Role
  // if (isRolesUnderUserLoading) return <Loading small />
  // if (RoleUnderUserErrors)
  //   return (
  //     <Content.Alert
  //       type="error"
  //       message={'Failed to Load Roles Assigned to User.'}
  //     />
  //   )

  //Checking User Rendering
  if (loading) return <Loading small />
  if (userError)
    return (
      <Content.Alert type="error" message={'Failed to Load User details.'} />
    )

  const { readUser } = userData || {}
  const { avatar, firstName, lastName, email, position, userBranch } =
    readUser || {}
  const { branchName } = userBranch || {}

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
          title="View Broker"
          close={() => history.push(`/broker/users`)}
        >
          <div
            css={`
              @media (max-width: 376px) {
                display: grid;
                grid-row-gap: 10px;
              }
              @media (min-width: 376px) {
                display: grid;
                grid-gap: 10px;
                grid-template-columns: repeat(2, max-content);
              }
            `}
          >
            <Core.Button
              // width="300px"
              bgColour={Colours.yellow}
              onClick={() => history.push(`?action=forcePasswordReset`)}
            >
              Force Password Reset
            </Core.Button>
            <Core.Button
              onClick={() => history.push(`/broker/users/edit-user/${userId}`)}
            >
              Modify
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
            <div
              css={`
                display: grid;
                justify-items: center;
                padding-top: 10px;
                grid-gap: 30px;
              `}
            >
              <Content.Avatar
                src={avatar}
                size="huge"
                firstName={firstName}
                lastName={lastName}
              />
              <div
                css={`
                  width: 100%;
                  margin-top: 20px;
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  @media (max-width: 769px) {
                    grid-template-columns: 1fr;
                  }
                  grid-gap: 20px;
                `}
              >
                <LabelValue label="First Name" value={firstName} />
                <LabelValue label="Last Name" value={lastName} />
              </div>
              <LabelValue label="Email" value={email} />
              <LabelValue label="Position" value={position} />
              <LabelValue label="Branch" value={branchName} />
            </div>
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
                  grid-template-columns: 1fr 3fr;
                  grid-column-gap: 10px;
                  align-items: center;
                  border-bottom: 2px solid ${Colours.border};
                  padding-bottom: 5px;
                `}
              >
                <Core.Text weight="600">Name</Core.Text>
                <Core.Text weight="600">Description</Core.Text>
              </div>
              <div
                css={`
                  overflow-y: auto;
                `}
              >
                {[].map(({ name, description }, index) => (
                  <div
                    key={index}
                    css={`
                      display: Grid;
                      grid-template-columns: 1fr 3fr;
                      grid-column-gap: 10px;
                      align-items: start;
                      border-bottom: 0.5px solid ${Colours.border};
                      padding: 10px 0px;
                    `}
                  >
                    <Core.Text>{name}</Core.Text>
                    <Core.Text>{description}</Core.Text>
                  </div>
                ))}
              </div>
            </div>
          </Content.CustomCard>
        </div>
      </div>
      <ForcePasswordReset
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        email={email}
        isShowing={action === 'forcePasswordReset'}
      />
    </Layout.Container>
  )
}

const LabelValue = ({ label, value }) => (
  <div
    css={`
      width: 100%;
      display: grid;
      grid-row-gap: 10px;
    `}
  >
    <Core.Text weight="600">{label}</Core.Text>
    <div
      css={`
        border-bottom: 2px solid ${Colours.border};
      `}
    >
      <Core.Text>{value}</Core.Text>
    </div>
  </div>
)
