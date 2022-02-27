import React, { useState } from 'react'
import 'styled-components/macro'
import LookUp from './LookUp'
import { Layout, MenuNavigation } from 'components'

export default function Index() {
  const [Page, setPage] = useState('Look Up')

  return (
    <Layout.Container>
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
          grid-gap: 20px;
          overflow-y: auto;
          height: 100%;
        `}
      >
        <MenuNavigation.Container>
          <MenuNavigation.MainItem
            handler={setPage}
            active={Page === 'Look Up'}
          >
            Look Up
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem handler={setPage} active={Page === 'Manage'}>
            Manage
          </MenuNavigation.MainItem>
        </MenuNavigation.Container>
        {Page === 'Look Up' && <LookUp />}
        {Page === 'Manage' && <div>Manage</div>}
      </div>
    </Layout.Container>
  )
}
