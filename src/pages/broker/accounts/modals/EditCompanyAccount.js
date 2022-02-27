import React from 'react'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'

import { useDialog } from 'hooks'
import { EditCompanyAccountForm } from '../form'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Edit Account - Company"
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
        <EditCompanyAccountForm close={() => history.goBack()} />
      </div>
    </Dialog>
  )
}
