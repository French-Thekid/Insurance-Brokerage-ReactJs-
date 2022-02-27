import React from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Layout } from 'components'
import { ForgetPasswordConfirmationForm } from './forms'

function ForgetPasswordConfirmation() {
  const location = useLocation()
  const { state: { username, force = false } = {} } = location

  return (
    <Layout.Panel>
      <ForgetPasswordConfirmationForm force={force} email={username} />
    </Layout.Panel>
  )
}

export default ForgetPasswordConfirmation
