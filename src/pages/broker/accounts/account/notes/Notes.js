import React from 'react'
import 'styled-components/macro'
import { LISTNOTES } from './queries'
import { useQuery } from '@apollo/react-hooks'

import { NoteCard, Loading, Content } from 'components'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { EditNote, DeleteNote } from './modal'

const queryString = require('query-string')

function Notes() {
  const match = useRouteMatch()
  const {
    params: { accountId },
  } = match

  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const { loading, error, data } = useQuery(LISTNOTES, {
    variables: { accountId: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Fail to load Notes'} />

  return (
    <>
      <div
        css={`
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          @media (max-width: 769px) {
            justify-content: space-between;
          }
          @media (min-width: 1050px) {
            justify-content: start;
          }
        `}
      >
        {data.listNotes.data.map((note, index) => (
          <NoteCard noteData={note} key={index} />
        ))}
      </div>
      <EditNote isShowing={action === 'editNote'} />
      <DeleteNote isShowing={action === 'deleteNote'} />
    </>
  )
}

export default Notes
