import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { RemoveInsuredForm } from '../forms'

export default function ({ isShowing, deleting, deletePolicyHaveInsured }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Remove Insured"
    >
      {permissions.PERSON_DELETE_TYPEPERSON ? (
        <RemoveInsuredForm
          close={() => history.goBack()}
          deletePolicyHaveInsured={deletePolicyHaveInsured}
          deleting={deleting}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
