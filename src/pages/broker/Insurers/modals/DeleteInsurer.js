import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteInsurerForm } from '../forms'

export default function ({
  isShowing,
  showNotificationDelete,
  deleteHandler,
  loading,
  insurerError,
}) {
  const { Dialog } = useDialog()
  const history = useHistory()
  return (
    <Dialog
      open={isShowing}
      close={() => history.push('/broker/insurers')}
      width="650px"
      title="Delete Insurer"
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
        <DeleteInsurerForm
          deleteHandler={deleteHandler}
          loading={loading}
          insurerError={insurerError}
          showNotificationDelete={showNotificationDelete}
        />
      </div>
    </Dialog>
  )
}
