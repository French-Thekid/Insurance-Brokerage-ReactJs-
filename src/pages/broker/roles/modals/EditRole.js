import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'
import { EditRoleForm } from '../forms'

export default function ({ isShowing, updateAction, updateError, loading }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeRole')
        history.goBack()
      }}
      width="650px"
      title="Edit Role"
    >
     
        <EditRoleForm
          updateAction={updateAction}
          updateError={updateError}
          loading={loading}
          close={() => {
            localStorage.removeItem('activeRole')
            history.goBack()
          }}
        />
     
    </Dialog>
  )
}
