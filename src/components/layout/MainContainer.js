import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'
import { NavTypes } from 'components'
import { AccountSuspended } from '../../view/AccountSuspended'

function MainContainer({ children, type }) {
  const userType = JSON.parse(localStorage.getItem('session'))
  const { user: { role } = {} } = userType || {}
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        height: 100vh;
        display: grid;
        grid-template-rows: max-content 1fr;
      `}
    >
      <div>
        <AccountSuspended />
        {type === 'Broker' && role === 'AdminUser' ? (
          <NavTypes.BrokerAdminNav />
        ) : type === 'Broker' && role === 'RegularUser' ? (
          <NavTypes.BrokerNav />
        ) : type === 'Support' ? (
          <NavTypes.SupportNAv />
        ) : null}
      </div>

      <div
        css={`
          background: ${Colours.background};
          height: calc(100% - 20px);
          width: calc(100% - 20px);
          padding: 10px;
          overflow-y: auto;
          transition: ease-out 1s;
        `}
      >
        {children}
      </div>
    </div>
  )
}

export default MainContainer
