import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { EditOrganisationForm } from './forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      minWidth="550px"
      title="Edit Organisation"
      close={() => history.goBack()}
    >
      <EditOrganisationForm
        close={() => {
          localStorage.removeItem('selectedOrg')
          history.goBack()
        }}
      />
    </Dialog>
  )
}
