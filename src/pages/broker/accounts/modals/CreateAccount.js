import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { CreateAccountForm } from '../form'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.push('/broker/accounts')}
      width="650px"
      title="Select Account Type"
    >
      <CreateAccountForm />
    </Dialog>
  )
}
