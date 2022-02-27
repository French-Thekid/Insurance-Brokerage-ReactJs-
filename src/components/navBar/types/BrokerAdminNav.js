import React from 'react'
import { useLocation } from 'react-router-dom'
import { NavigationBar } from 'components'
import NavItem from '../NavItem'

function BrokerAdminNav() {
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
      <NavItem to="/broker/users" active={pathname.includes('/broker/users')}>
        Users
      </NavItem>

      <NavItem
        to="/broker/insurers"
        active={pathname.includes('/broker/insurers')}
      >
        Insurers
      </NavItem>

      <NavItem
        to="/broker/branches"
        active={pathname.includes('/broker/branches')}
      >
        Branches
      </NavItem>
      <NavItem to="/broker/ivis" active={pathname.includes('/broker/ivis')}>
        IVIS
      </NavItem>
      <NavItem to="/broker/roles" active={pathname.includes('/broker/roles')}>
        Roles
      </NavItem>
      {/* TODO FUTURE RELEASE */}
      {/* <NavItem to="/broker/log" active={pathname.includes('/broker/log')}>
        Activity Logs
      </NavItem> */}
    </NavigationBar>
  )
}

export default BrokerAdminNav
