import React, { useContext } from 'react'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { ColourContext } from 'context'

import { Core, Icons } from 'components'

export default function () {
  return (
    <div
      css={`
        display: grid;
        grid-gap: 10px;
      `}
    >
      <Core.Text customSize="18px">Please Select the Account Type.</Core.Text>

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
          Icon={Icons.PersonRounded}
          title="Individual"
          to={`?action=createIndividualAccount`}
        />
        <Card
          Icon={Icons.AccountBalanceRoundedIcon}
          title="Company"
          to={`?action=createCompanyAccount`}
        />
      </div>
    </div>
  )
}

export const Card = ({ Icon, title, to }) => {
  const history = useHistory()
  const { Colours, mode } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        place-items: Center;
        border-radius: 5px;
        border: 1px solid ${Colours.border};
        padding: 20px;
        &:hover {
          cursor: pointer;
          box-shadow: ${mode === 'Dark'
            ? '0px 8px 20px -2px rgba(16, 15, 28, 1)'
            : '0px 8px 20px -2px rgba(196, 196, 196, 1)'};
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }
      `}
    >
      <div
        onClick={() => history.push(to)}
        css={`
          display: grid;
          grid-template-rows: max-content max-content;
          justify-items: center;
          grid-gap: 10px;
          width: 200px;
        `}
      >
        <Icon style={{ fontSize: '50px', color: Colours.blue }} />
        <Core.Text color={Colours.blue} customSize="20px">
          {title}
        </Core.Text>
      </div>
    </div>
  )
}
