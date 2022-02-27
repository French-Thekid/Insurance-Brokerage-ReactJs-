import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { DeleteBranchForm } from '../forms'

export default function ({ isShowing, deleteHandler, loading, BranchError }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  return (
    <Dialog
      open={isShowing}
      close={() => history.push('/broker/branches')}
      width="650px"
      title="Delete Branch"
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
        <DeleteBranchForm
          deleteHandler={deleteHandler}
          loading={loading}
          BranchError={BranchError}
          close={() => history.push('/broker/branches')}
        />
      </div>
    </Dialog>
  )
}
