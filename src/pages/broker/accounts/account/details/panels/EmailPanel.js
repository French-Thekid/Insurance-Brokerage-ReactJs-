import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Table, Loading, Content } from 'components'
import { LIST_EMAIL } from '../../email/queries'
import { timestampToTime } from 'utils'

export default function () {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const { loading, error, data } = useQuery(LIST_EMAIL, {
    variables: { accountId: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Fail to load recent Emails'} />

  const { listEmail } = data
  const emails = listEmail.data

  const incommingEmails = emails
    .map((email) => {
      if (
        JSON.parse(email.attributes) &&
        JSON.parse(email.attributes).type === 'inBound'
      )
        return email
      return null
    })
    .filter((val) => val)

  incommingEmails.sort(
    (a, b) => new Date(parseInt(b.timestamp)) - new Date(parseInt(a.timestamp))
  )

  const HeaderData = ['Icon', 'Subject', 'Date', 'Content']
  const RowData = incommingEmails.map(
    ({ id, subject, timestamp, attributes }) => {
      return {
        icon: '',
        subject,
        date: `${new Date(1623262562000).toDateString()} ${timestampToTime(
          timestamp
        )}`,
        content:
          JSON.parse(attributes).text &&
          JSON.parse(attributes).text.split('On ')[0]
            ? JSON.parse(attributes).text &&
              JSON.parse(attributes).text.split('On ')[0]
            : JSON.parse(attributes).text,
      }
    }
  )

  const handleRowClick = () =>
    history.push(`/broker/account/details/${accountId}`)

  return (
    <Table
      MainButtonpath={`/broker/account/email/${accountId}?action=compose&${accountId}`}
      justify="start"
      alignment="start"
      title="Emails"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`100px 1fr 1fr 2fr`}
      buttonTitle="Compose Email"
      rowClick={handleRowClick}
      breakingPoint="938px"
    />
  )
}
