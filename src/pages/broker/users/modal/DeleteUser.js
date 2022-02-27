import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteUserForm } from '../form'

export default function ({ isShowing, deleteHandler, loading }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Delete User"
    >
      <DeleteUserForm
        deleteHandler={deleteHandler}
        loading={loading}
        close={() => history.goBack()}
      />
    </Dialog>
  )
}
