import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { LISTNOTES } from '../../notes/queries'

import { timestampToTime } from 'utils'
import { Table, Loading, Content } from 'components'

export default function () {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const { loading, error, data } = useQuery(LISTNOTES, {
    variables: { accountId: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Failed to load Notes'} />

  const HeaderData = ['Avatar', 'Name', 'Section', 'Created On', 'Content']

  const RowData = data.listNotes.data.map(
    (
      { createdByUser: { avatar, firstName, lastName }, section, createdAt, content },
      index
    ) => {
      return {
        avatar,
        name: `${firstName} ${lastName}`,
        section,
        createdOn: `${new Date(
          parseInt(createdAt)
        ).toDateString()} ${timestampToTime(parseInt(createdAt))}`,
        content,
      }
    }
  )

  const handleRowClick = () =>
    history.push(`/broker/account/notes/${accountId}`)

  return (
    <Table
      MainButtonpath="?action=createNote"
      justify="start"
      alignment="start"
      hasAvatar
      title="Notes"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`100px 1fr 1fr 1fr 2fr`}
      buttonTitle="Create Note"
      rowClick={handleRowClick}
      breakingPoint="938px"
    />
  )
}
