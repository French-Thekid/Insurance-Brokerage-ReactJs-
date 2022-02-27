import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { CreateNoteForm } from '../form'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Create Note"
    >
      <CreateNoteForm close={() => history.goBack()} />
    </Dialog>
  )
}
