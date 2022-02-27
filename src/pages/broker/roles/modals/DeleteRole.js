import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteRoleForm } from '../forms'

export default function ({ isShowing, deleteAction, deleteError, loading }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Delete Role"
    >
      <DeleteRoleForm
        deleteError={deleteError}
        deleteAction={deleteAction}
        loading={loading}
        close={() => history.goBack()}
      />
    </Dialog>
  )
}
