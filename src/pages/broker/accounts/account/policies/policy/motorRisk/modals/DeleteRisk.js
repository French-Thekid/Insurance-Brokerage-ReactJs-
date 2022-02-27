import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteRiskForm } from '../forms'

export default function ({ isShowing, deleteMotorRisk, loading }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permisssions, Access] = usePermission()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      title="Delete Risk - Motor"
    >
      {permisssions.RISK_DELETE_TYPEACCOUNT ? (
        <DeleteRiskForm
          deleteMotorRisk={deleteMotorRisk}
          loading={loading}
          close={() => history.goBack()}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
