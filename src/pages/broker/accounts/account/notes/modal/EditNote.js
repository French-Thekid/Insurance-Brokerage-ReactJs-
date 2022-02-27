import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { EditNoteForm } from '../form'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeNote')
        history.goBack()
      }}
      width="650px"
      title="Edit Note"
    >
      <EditNoteForm
        close={() => {
          localStorage.removeItem('activeNote')
          history.goBack()
        }}
      />
    </Dialog>
  )
}
