import React from 'react'
import 'styled-components/macro'
import { Table, Loading } from 'components'
import 'styled-components/macro'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_PERSON_EVENT } from '../../mutations'
import { useRouteMatch } from 'react-router-dom'
import { GET_EVENT } from '../../queries'

function Accounts({ data }) {
  const match = useRouteMatch()
  const {
    params: { accountId, id },
  } = match

  const HeaderData = ['Avatar', 'Name', 'Email']
  const RowData = data.map(
    ({ avatar, firstName, lastName, email, companyName, ...rest }, index) => {
      return {
        avatar,
        name: companyName ? companyName : `${firstName} ${lastName}`,
        email,
        companyName,
        ...rest,
      }
    }
  )

  const [deletePersonCalendarEvent, { loading: RemovingPerson }] = useMutation(
    DELETE_PERSON_EVENT,
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

  const deleteAction = (personId) =>
    deletePersonCalendarEvent({
      variables: {
        accountId: parseInt(accountId),
        calendarId: parseInt(localStorage.getItem('CalendarId')),
        id: personId,
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
        RowData={RowData}
        HeaderData={HeaderData}
        Columns={`30px 1fr 2fr`}
        deleteAction={deleteAction}
        breakingPoint="38px"
        hasAvatar
        noTop
      />
    </div>
  )
}

export default Accounts
