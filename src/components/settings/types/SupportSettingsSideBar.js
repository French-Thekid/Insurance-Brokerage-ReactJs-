import React from 'react'
import 'styled-components/macro'
import { useLocation, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import { Colours, Layout, Icons, Core } from 'components'

function SettingsSideBar() {
  const { pathname } = useLocation()
  const history = useHistory()

  const ListItem = ({ Icon, title, active, to, datacy }) => {
    return (
      <Container active={active} to={to} datacy={datacy}>
        <Icon style={{ color: '#fff' }} />
        <div
          css={`
            display: none;
            ${MainContainer}:hover & {
              display: block;
            }
            @media (max-width: 769px) {
              display: none;
            }
          `}
        >
          <Core.Text Contained color={'#fff'}>
            {title}
          </Core.Text>
        </div>
      </Container>
    )
  }

  const Container = ({ datacy, active, children, to }) => {
    return (
      <div
        data-cy={datacy}
        css={`
          padding: 10px;
          border-left: ${active ? `3px solid #fff` : 'none'};
          border-top-left-radius: 3px;
          border-top-right-radius: 3px;
          background: ${active ? `rgba(0,47,88,0.4)` : 'none'};
          display: grid;
          grid-template-columns: max-content;
          width: 27px;
          transition: ease-out 0.2s;
          ${MainContainer}:hover & {
            transition: ease-out 0.2s;
            grid-template-columns: max-content 1fr;
            grid-column-gap: 15px;
            width: 190px;
          }
          color: ${Colours.inactive};
          overflow: hidden;
          &:hover {
            border-left: 3px solid transparent;
            color: ${Colours.foreground};
            cursor: pointer;
            background: ${active ? `rgba(0,47,88,0.4)` : `rgba(0,47,88,0.2)`};
          }
        `}
        onClick={() => history.push(to)}
      >
        {children}
      </div>
    )
  }

  const MainContainer = styled.div`
    border-radius: 5px;
    display: grid;
    grid-template-rows: repeat(2, max-content) 1fr;
    align-items: end;
    height: 100%;
  `

  return (
    <Layout.Container
      background={
        'linear-gradient(180deg, rgba(46,123,255,1) 0%, rgba(120,169,255,1) 100%)'
      }
    >
      <MainContainer>
        <ListItem
          to={`/support/settings/`}
          title="System Preferences"
          Icon={Icons.TuneRounded}
          active={
            pathname ===
              `/${window.location.pathname.split('/')[1]}/settings` ||
            pathname === `/${window.location.pathname.split('/')[1]}/settings/`
          }
        />
        <ListItem
          to={`/support/settings/profile/`}
          title="Profile"
          Icon={Icons.PersonRounded}
          active={pathname.includes('/settings/profile')}
        />
      </MainContainer>
    </Layout.Container>
  )
}

export default SettingsSideBar
