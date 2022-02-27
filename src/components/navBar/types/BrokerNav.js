import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationBar } from 'components'
import NavItem from '../NavItem'

function BrokerNav() {
  const { pathname } = useLocation()
  return (
    <NavigationBar>
      <NavItem
        left
        to="/broker/home"
        active={pathname.includes('/broker/home')}
      >
        Home
      </NavItem>
      <NavItem
        to="/broker/accounts"
        active={
          pathname.includes('/broker/accounts') ||
          pathname.includes('/broker/account')
        }
      >
        Accounts
      </NavItem>
      <NavItem
        to="/broker/insurers"
        active={pathname.includes('/broker/insurers')}
      >
        Insurers
      </NavItem>
      <NavItem to="/broker/ivis" active={pathname.includes('/broker/ivis')}>
        IVIS
      </NavItem>
    </NavigationBar>
  )
}

export default BrokerNav
