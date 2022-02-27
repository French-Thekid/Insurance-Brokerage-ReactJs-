import React from 'react'
import 'styled-components/macro'
import { Table, Loading } from 'components'
import 'styled-components/macro'
import { useRouteMatch } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_USER_EVENT } from '../../mutations'
import { GET_EVENT } from '../../queries'

function Users({ data }) {
  const HeaderData = ['Avatar', 'Name', 'Email']
  const RowData = data.map(
    ({ avatar, firstName, lastName, email, ...rest }, index) => {
      return { avatar, name: `${firstName} ${lastName}`, email, ...rest }
    }
  )

  const {
    params: { accountId, id },
  } = useRouteMatch()

  const [deleteUserCalendarEvent, { loading: RemovingPerson }] = useMutation(
    DELETE_USER_EVENT,
    {
      refetchQueries: () => [
        {
          query: GET_EVENT,
          variables: {
            id: parseInt(id),
            accountId: parseInt(accountId),
            calendarId: parseInt(localStorage.getItem('CalendarId')),
          },
        },
      ],
    }
  )
  const deleteAction = (userId) =>
    deleteUserCalendarEvent({
      variables: {
        accountId: parseInt(accountId),
        calendarId: parseInt(localStorage.getItem('CalendarId')),
        id: userId,
        eventId: parseInt(id),
      },
    }).catch((e) => console.log(e))

  return (
    <div
      css={`
        height: calc(100% - 110px);
        margin-top: 10px;
      `}
    >
      {RemovingPerson && <Loading small />}
      <Table
        title="Users"
        RowData={RowData}
        HeaderData={HeaderData}
        Columns={`30px 1fr 2fr`}
        deleteAction={deleteAction}
        breakingPoint="38px"
        hasAvatar
        imageStatusNeeded
        noTop
      />
    </div>
  )
}

export default Users
