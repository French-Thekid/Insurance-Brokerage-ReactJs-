import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Core, Content, Layout, Loading } from '../../../components'
import { LIST_USERS } from '../../broker/users/queries'
import { LIST_ROLES } from '../../broker/roles/forms/queries'
import RoleCard from './RoleCard'
import UserCard from '../../broker/roles/UserCard'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'

export default function Notify(props) {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [userID, setUserId] = useState({
    userIDs: props.stepData.userIDs,
  })
  const [roleID, setRoleId] = useState({
    roleIDs: props.stepData.roleIDs,
  })
  const roleIDs = []
  const userIDs = []

  let {
    loading: isUsersListLoading,
    error: UserListErrors,
    data: UserData,
  } = useQuery(LIST_USERS)

  const {
    loading: RolesLoading,
    error: RoleListErrors,
    data: RolesData,
  } = useQuery(LIST_ROLES)

  useEffect(() => {
    const data = {
      ...props.stepData,
      userIDs: userID.userIDs,
      roleIDs: roleID.roleIDs,
    }
    props.workflow.Step.update(props.stepData.id, data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIDs, roleIDs])

  if (isUsersListLoading || RolesLoading) return <Loading small />
  if (UserListErrors || RoleListErrors)
    return <Content.Alert>{UserListErrors || RoleListErrors}</Content.Alert>
  return (
    <Core.Box pt="2px">
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
          indicatorColor="primary"
        >
          <Tab label="Users" />
          <Tab label="Role Groups" />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <Core.Text mt="12px" mb="12px">
          Select the users that will be be notified when this workflow step is
          active below:
        </Core.Text>

        <Layout.Flex wrap="wrap">
          {UserData.listUsers.data.map(
            ({ id, firstName, lastName, email, enabled, avatar }, index) => {
              if (userIDs.indexOf(id) === -1)
                return (
                  <UserCard
                    key={index}
                    small
                    selected={userID.userIDs.indexOf(id) !== -1 ? true : false}
                    id={id}
                    enabled={enabled}
                    image={avatar}
                    email={email}
                    firstName={firstName}
                    lastName={lastName}
                    usersId={userID}
                    setUsersId={setUserId}
                  />
                )
              return null
            }
          )}
        </Layout.Flex>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Core.Text mt="12px" mb="12px">
          All users in the Role groups selected will be notified once the
          workflow arrives at this step.
        </Core.Text>

        <Layout.Flex wrap="wrap">
          {RolesData.listRoles.map(({ id, name, description }, index) => {
            if (roleIDs.indexOf(id) === -1)
              return (
                <RoleCard
                  key={index}
                  small
                  selected={roleID.roleIDs.indexOf(id) !== -1 ? true : false}
                  id={id}
                  description={description}
                  name={name}
                  rolesId={roleID}
                  setRolesId={setRoleId}
                />
              )
            return null
          })}
        </Layout.Flex>
      </TabPanel>
    </Core.Box>
  )
}

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Core.Box>{children}</Core.Box>}
    </div>
  )
}
