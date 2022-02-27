import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { CreateOrganisationForm } from './forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      minWidth="550px"
      title="Create Organisation"
    >
      <CreateOrganisationForm close={() => history.goBack()} />
    </Dialog>
  )
}
