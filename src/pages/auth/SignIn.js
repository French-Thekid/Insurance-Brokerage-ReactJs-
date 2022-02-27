import React, { useContext } from 'react'
import 'styled-components/macro'
import { Layout, Notification } from 'components'
import { SignInForm } from './forms'
import { AuthContext, SessionContext } from '../../context'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

function RoleRouting() {
  const history = useHistory()
  const { hasValidSession, user } = useContext(SessionContext)
  const {
    isForcePasswordResetReq: { status, username },
  } = useContext(AuthContext)
  const [{ isNewUser }] = useCookies(['isNewUser'])

  if (
    hasValidSession &&
    (user.role === 'RegularUser' || user.role === 'AdminUser')
  )
    history.push('/broker/home')
  else if (status === true)
    history.push('/forget-password-confirmation', { username, force: true })
  else if (isNewUser) history.push('/new-password')
  else if (hasValidSession && user.role === 'SupportAdmin')
    history.push('/support/organisation')
}

function ExpiredSessionMesssage() {
  if (sessionStorage.getItem('lastSession')) {
    let info = JSON.parse(sessionStorage.getItem('lastSession'))
    console.log('called')
    Notification(
      {
        title: 'Session Expired',
        body: info.reason,
      },
      { autoClose: false }
    )
  }
}
function SignIn() {
  RoleRouting()
  ExpiredSessionMesssage()
  return (
    <Layout.Panel>
      <SignInForm />
    </Layout.Panel>
  )
}

export default SignIn
