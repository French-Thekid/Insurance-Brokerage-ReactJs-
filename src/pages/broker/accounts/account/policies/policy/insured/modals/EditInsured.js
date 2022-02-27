import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { EditInsuredForm } from '../forms'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeInsured')
        history.goBack()
      }}
      width="650px"
      title="Edit Insured"
    >
      {permissions.PERSON_UPDATE_TYPEPERSON ? (
        <EditInsuredForm
          close={() => {
            localStorage.removeItem('activeInsured')
            history.goBack()
          }}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
