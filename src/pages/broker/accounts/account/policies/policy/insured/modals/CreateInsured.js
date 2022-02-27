import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { CreateInsuredForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Create Insured"
    >
      {permissions.PERSON_CREATE_TYPEPERSON ? (
        <CreateInsuredForm close={() => history.goBack()} />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
