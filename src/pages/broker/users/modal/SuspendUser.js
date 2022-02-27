import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { SuspendUserForm } from '../form'

export default function ({ isShowing, suspendHandler, loading }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Suspend User"
    >
      <SuspendUserForm
        suspendHandler={suspendHandler}
        loading={loading}
        close={() => history.goBack()}
      />
    </Dialog>
  )
}
