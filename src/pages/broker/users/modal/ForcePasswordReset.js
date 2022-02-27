import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { ForcePasswordResetForm } from '../form'

export default function ({ isShowing, userId, firstName, lastName, email }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Force Password Reset"
    >
      <ForcePasswordResetForm
        close={() => history.goBack()}
        userId={userId}
        firstName={firstName}
        lastName={lastName}
        email={email}
      />
    </Dialog>
  )
}
