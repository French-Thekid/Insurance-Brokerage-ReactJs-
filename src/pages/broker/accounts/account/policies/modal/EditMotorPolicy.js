import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { EditMotorPolicyForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activePolicy')
        history.goBack()
      }}
      width="650px"
      title="Edit Policy - Motor"
    >
      <EditMotorPolicyForm
        close={() => {
          localStorage.removeItem('activePolicy')
          history.goBack()
        }}
      />
    </Dialog>
  )
}
