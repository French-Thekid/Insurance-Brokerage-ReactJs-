import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { EditRiskForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permisssions, Access] = usePermission()

  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeMotorRisk')
        history.goBack()
      }}
      title="Edit Risk - Motor"
    >
      {permisssions.RISK_UPDATE_TYPEACCOUNT ? (
        <EditRiskForm
          close={() => {
            localStorage.removeItem('activeMotorRisk')
            history.goBack()
          }}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
