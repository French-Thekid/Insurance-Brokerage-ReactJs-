import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { EnableUserForm } from '../form'

export default function ({ isShowing, enableHandler, loading }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Enable User"
    >
      <EnableUserForm
        enableHandler={enableHandler}
        loading={loading}
        close={() => history.goBack()}
      />
    </Dialog>
  )
}
