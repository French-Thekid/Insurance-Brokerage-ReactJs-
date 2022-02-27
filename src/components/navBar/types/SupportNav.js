import React from 'react'
import { useLocation } from 'react-router-dom'

import { NavigationBar } from 'components'
import NavItem from '../NavItem'

function SupportNav() {
  const { pathname } = useLocation()
  return (
    <NavigationBar>
      <NavItem
        left
        to="/support/organisation"
        active={pathname.includes('/support/organisation')}
      >
        Organizations
      </NavItem>
    </NavigationBar>
  )
}

export default SupportNav
