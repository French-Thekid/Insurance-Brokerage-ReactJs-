import React from 'react'
import { usePermission } from 'hooks'
import 'styled-components/macro'
import { ComposeEmailForm } from './forms'
import { EmailModal } from './EmailViewer'

export default function ComposeEmail() {
  const [permissions, Access] = usePermission()
  return (
    <EmailModal title="New Mail">
      {permissions.EMAIL_CREATE_TYPEACCOUNT ? <ComposeEmailForm /> : <Access />}
    </EmailModal>
  )
}
