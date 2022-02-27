import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { CreateRenewalsForm } from '../forms'

export default function ({ isShowing, props }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  return (
    <Dialog
      open={isShowing}
      close={() => {
        history.goBack()
        localStorage.removeItem('existingRisks')
        localStorage.removeItem('existingLimits')
        localStorage.removeItem('existingExtensions')
      }}
      title="Renew Policy"
      minWidth="800px"
    >
      <CreateRenewalsForm
        props={props}
        close={() => {
          history.goBack()
          localStorage.removeItem('existingRisks')
          localStorage.removeItem('existingLimits')
          localStorage.removeItem('existingExtensions')
        }}
      />
    </Dialog>
  )
}
