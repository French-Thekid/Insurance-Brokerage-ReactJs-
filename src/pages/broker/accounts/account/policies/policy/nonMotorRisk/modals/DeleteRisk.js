import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteRiskForm } from '../forms'

export default function ({ isShowing, deleteNonMotorRisk, loading }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permisssions, Access] = usePermission()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      title="Delete Risk - Property"
    >
      {permisssions.RISK_DELETE_TYPEACCOUNT ? (
        <DeleteRiskForm
          deleteNonMotorRisk={deleteNonMotorRisk}
          loading={loading}
          close={() => history.goBack()}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
