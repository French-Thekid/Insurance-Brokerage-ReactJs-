import React from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'

import { BrokerSettingSideBar, SupportSettingSideBar } from './types'

function SettingsSideBar() {
  const { pathname } = useLocation()
  const path = pathname.split('/')[1].split('/')[0]

  return path === 'support' ? (
    <SupportSettingSideBar />
  ) : (
    <BrokerSettingSideBar />
  )
}

export default SettingsSideBar
