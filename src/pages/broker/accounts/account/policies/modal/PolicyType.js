import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'
import { Card } from '../../../form/CreateAccountForm'
import { Core, Icons } from 'components'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Policy Type Selection"
    >
      <div
        css={`
          display: grid;
          grid-gap: 10px;
        `}
      >
        <Core.Text>Please Select the Policy Type</Core.Text>
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-gap: 20px;
            margin-top: 10px;
            margin-bottom: 10px;
          `}
        >
          <Card
            Icon={Icons.DirectionsCarRoundedIcon}
            title="Motor Vehicle"
            to={`?action=createMotorPolicy`}
          />
          <Card
            Icon={Icons.AccountBalanceRoundedIcon}
            title="Property"
            to={`?action=createPropertyPolicy`}
          />
        </div>
      </div>
    </Dialog>
  )
}
