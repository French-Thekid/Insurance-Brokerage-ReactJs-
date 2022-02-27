import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { CreateRiskForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permisssions, Access] = usePermission()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      title="Create Risk - Motor"
    >
      {permisssions.RISK_CREATE_TYPEACCOUNT ? (
        <CreateRiskForm close={() => history.goBack()} />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
