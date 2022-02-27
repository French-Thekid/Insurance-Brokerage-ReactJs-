import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { Core, Content, Loading } from '../../../components'
import { LIST_USERS } from '../../broker/users/queries'
import UserCard from '../../broker/roles/UserCard'
import 'styled-components/macro'

export default function Approvers(props) {
  const [userID, setUserId] = useState({
    userIDs: props.stepData.userIDs,
  })
  const userIDs = []
  let {
    loading: isUsersListLoading,
    error: UserListErrors,
    data: UserData,
  } = useQuery(LIST_USERS)

  useEffect(() => {
    const data = { ...props.stepData, userIDs: userID.userIDs }
    props.workflow.Step.update(props.stepData.id, data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIDs])

  if (isUsersListLoading) return <Loading small />
  if (UserListErrors) return <Content.Alert>{UserListErrors}</Content.Alert>
  return (
    <Core.Box>
      <Core.Text weight="700" size="md">
        Users
      </Core.Text>
      <Core.Text>
        Select the users that will be able to approve this step below:
      </Core.Text>
      <Core.Line
        variant="h"
        length="100%"
        thickness="1px"
        color="#707070"
        mt="8px"
        mb="16px"
      />
      <div
        css={`
          display: flex;
          flex-wrap: wrap;
          overflow-y: auto;
          max-height: 250px;
          gap: 30px;
        `}
      >
        {UserData.listUsers.data.map(
          ({ id, firstName, lastName, email, enabled, avatar }, index) => {
            if (userIDs.indexOf(id) === -1)
              return (
                <UserCard
                  key={index}
                  small
                  selected={userID.userIDs.indexOf(id) !== -1 ? true : false}
                  id={id}
                  dataCy="user-card"
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
      </div>
    </Core.Box>
  )
}
