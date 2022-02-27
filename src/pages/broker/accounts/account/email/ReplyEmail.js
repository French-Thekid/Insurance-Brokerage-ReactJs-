import React from 'react'
import 'styled-components/macro'
import { usePermission } from 'hooks'
import { EmailContent } from 'components'
import { ReplyEmailForm } from './forms'

export default function Reply({ email, data }) {
  const { to = [], cc = [], text, path, attributes, subject = '' } = email

  let Subject = subject
  const [permissions, Access] = usePermission()
  if (!Subject.includes('Re:')) Subject = `Re: ${subject}`

  return (
    <EmailContent.EmailContainer title="Reply">
      {permissions.EMAIL_CREATE_TYPEACCOUNT &&
      permissions.EMAIL_CREATE_TYPEACCOUNT ? (
        <ReplyEmailForm
          data={data}
          path={path}
          subject={Subject}
          to={to}
          cc={cc}
          text={text}
          attributes={attributes}
        />
      ) : (
        <Access />
      )}
    </EmailContent.EmailContainer>
  )
}
