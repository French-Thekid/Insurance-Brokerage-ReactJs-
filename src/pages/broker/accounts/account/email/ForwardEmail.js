import React from 'react'
import 'styled-components/macro'
import { usePermission } from 'hooks'
import { EmailContent } from 'components'
import { ForwardEmailForm } from './forms'

export default function ForwardEmail({ email, data }) {
  const { text, path, subject = '', attributes } = email
  let Subject = subject
  const [permissions, Access] = usePermission()
  if (!Subject.includes('Fwd:')) Subject = `Fwd: ${subject}`

  return (
    <EmailContent.EmailContainer title="Forward">
      {permissions.EMAIL_CREATE_TYPEACCOUNT &&
      permissions.EMAIL_CREATE_TYPEACCOUNT ? (
        <ForwardEmailForm
          data={data}
          path={path}
          subject={Subject}
          attributes={attributes}
          text={text}
        />
      ) : (
        <Access />
      )}
    </EmailContent.EmailContainer>
  )
}
