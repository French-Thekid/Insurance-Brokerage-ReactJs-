import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { CreateCompanyAccountForm } from '../form'

export default function ({ isShowing, showNotificationCreate }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.push('/broker/accounts')}
      width="650px"
      title="Create Account - Company"
    >
      <div
        css={`
          @media (max-height: 376px) {
            overflow-y: auto;
            max-height: 280px;
            grid-template-rows: 1fr;
            padding-right: 3px;
          }
          @media (max-width: 376px) {
            overflow-y: auto;
            max-height: 600px;
            max-width: 300px;
            grid-template-rows: 1fr;
            padding-right: 3px;
          }
        `}
      >
        <CreateCompanyAccountForm
          showNotificationCreate={showNotificationCreate}
          close={() => history.push('/broker/accounts')}
        />
      </div>
    </Dialog>
  )
}
