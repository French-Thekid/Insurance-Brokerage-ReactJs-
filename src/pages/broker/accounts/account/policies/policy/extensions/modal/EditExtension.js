import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { EditExtensionForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeExtension')
        history.goBack()
      }}
      width="650px"
      title="Edit Extension"
    >
      {permissions.RISK_UPDATE_TYPEACCOUNT ? (
        <EditExtensionForm
          close={() => {
            localStorage.removeItem('activeExtension')
            history.goBack()
          }}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
