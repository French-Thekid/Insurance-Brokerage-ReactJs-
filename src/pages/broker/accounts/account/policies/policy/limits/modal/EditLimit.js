import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { EditLimitForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeLimit')
        history.goBack()
      }}
      width="650px"
      title="Edit Limit"
    >
      {permissions.POLICY_UPDATE_TYPEPOLICY ? (
        <EditLimitForm
          close={() => {
            localStorage.removeItem('activeLimit')
            history.goBack()
          }}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
