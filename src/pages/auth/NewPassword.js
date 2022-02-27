import React, { useContext } from 'react'
import { SessionContext } from 'context'
import 'styled-components/macro'

import { Layout } from 'components'
import { NewPasswordForm } from './forms'
import { useHistory } from 'react-router-dom'

function NewPassword() {
  const history = useHistory()
  const { user, hasValidSesion } = useContext(SessionContext)
  if (
    hasValidSesion &&
    (user.role === 'AdminUser' || user.role === 'RegularUser')
  )
    history.push('/broker/home')
  else if (hasValidSesion && user.role === 'SupportAdmin')
    history.push('/support/organisation')

  return (
    <Layout.Panel>
      <NewPasswordForm />
    </Layout.Panel>
  )
}

export default NewPassword
