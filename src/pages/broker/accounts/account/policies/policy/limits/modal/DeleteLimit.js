import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteLimitForm } from '../forms'

export default function ({ isShowing, loading, deletePolicyLimit, error }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Delete Limit"
    >
      {permissions.POLICY_DELETE_TYPEPOLICY ? (
        <DeleteLimitForm
          deletePolicyLimit={deletePolicyLimit}
          loading={loading}
          error={error}
          close={() => history.goBack()}
        />
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
