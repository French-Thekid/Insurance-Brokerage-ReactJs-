import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'
import { EditPolicyForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activePolicy')
        history.goBack()
      }}
      width="650px"
      title="Edit Policy - Property"
    >
      {permissions.POLICY_UPDATE_TYPEPOLICY ? (
        <EditPolicyForm
          close={() => {
            localStorage.removeItem('activePolicy')
            history.goBack()
          }}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
