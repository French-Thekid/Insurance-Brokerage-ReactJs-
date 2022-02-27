import React from 'react'
import 'styled-components/macro'

import { Layout } from 'components'
import { ForgetPasswordForm } from './forms'

function ForgetPassword() {
  return (
    <Layout.Panel>
      <ForgetPasswordForm />
    </Layout.Panel>
  )
}

export default ForgetPassword
