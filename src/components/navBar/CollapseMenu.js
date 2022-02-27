import React, { useContext } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'
import { useSpring, animated } from 'react-spring'
import { useHistory, useLocation } from 'react-router-dom'

import { Colours } from 'components'
import { Content } from '..'
import { SessionContext, UserContext } from '../../context'

const CollapseMenu = (props) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 })
  const user = useContext(UserContext)
  const { firstName, lastName, email, position, avatar } =
    user.loggedInUser || {}
  const { clearSession } = useContext(SessionContext)

  const userType = JSON.parse(localStorage.getItem('session'))
  const {
    user: { role },
  } = userType

  const NavItems = ({ children, colour, to, active, ...rest }) => (
    <div
      css={`
        width: calc(100% - 20px);
        font-size: 0.8rem;
        line-height: 2;
        color: ${colour ? colour : active ? Colours.blue : Colours.text};
        text-transform: uppercase;
        padding: 5px 10px 5px 10px;
        text-decoration: none;
        border-bottom: 1px solid ${active ? Colours.blue : Colours.border};
        display: grid;
        justify-items: center;
        &:hover {
          cursor: pointer;
          color: ${Colours.blue};
          border-bottom: 1px solid ${Colours.blue};
        }
      `}
      {...rest}
      onClick={() => {
        history.push(to)
        props.handleNavbar()
      }}
    >
      {children}
    </div>
  )

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200],
            })
            .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <OrgCard>
          <Content.Avatar
            size="large"
            firstName={firstName}
            lastName={lastName}
            src={avatar}
          />
          <section
            css={`
              display: grid;
              grid-row-gap: 3px;
            `}
          >
            <Label size="0.9em" bold>
              {firstName} {lastName}
            </Label>
            <Label size="0.8em" colour={Colours.softText}>
              {email}
            </Label>
            <Label size="0.8em" colour={Colours.blue}>
              {position}
            </Label>
          </section>
        </OrgCard>
        <NavLinks>
          <NavItems
            to="/broker/home"
            active={pathname.includes('/broker/home')}
          >
            Home
          </NavItems>

          <NavItems
            to="/broker/accounts"
            active={pathname.includes('/broker/accounts')}
          >
            Accounts
          </NavItems>
          {role === 'AdminUser' && (
            <NavItems
              to="/broker/users"
              active={pathname.includes('/broker/users')}
            >
              Users
            </NavItems>
          )}
          <NavItems
            to="/broker/insurers"
            active={pathname.includes('/broker/insurers')}
          >
            Insurers
          </NavItems>
          {role === 'AdminUser' && (
            <NavItems
              to="/broker/branches"
              active={pathname.includes('/broker/branches')}
            >
              Branches
            </NavItems>
          )}
          <NavItems
            to="/broker/ivis"
            active={pathname.includes('/broker/ivis')}
          >
            IVIS
          </NavItems>
          {role === 'AdminUser' && (
            <NavItems
              to="/broker/roles"
              active={pathname.includes('/broker/roles')}
            >
              Roles
            </NavItems>
          )}
          {/* TODO FUTURE RELEASE*/}
          {/* <NavItems to="/broker/log" active={pathname.includes('/broker/log')}>
            Activity Logs
          </NavItems> */}
          {/* <NavItems
            to="/broker/notifications"
            active={pathname.includes('/broker/notifications')}
          >
            Notifications
          </NavItems> */}
          <NavItems
            to="/broker/settings"
            active={pathname.includes('/broker/settings')}
          >
            Settings
          </NavItems>
          <div
            css={`
              width: calc(100% - 20px);
              font-size: 0.8rem;
              line-height: 2;
              color: ${Colours.red};
              text-transform: uppercase;
              padding: 5px 10px 5px 10px;
              text-decoration: none;
              border-bottom: 1px solid ${Colours.border};
              display: grid;
              justify-items: center;
              &:hover {
                cursor: pointer;
                color: ${Colours.red};
                border-bottom: 1px solid ${Colours.blue};
              }
            `}
            onClick={() => {
              clearSession()
            }}
          >
            Sign Out
          </div>
        </NavLinks>
      </CollapseWrapper>
    )
  }

  return null
}

export default CollapseMenu

export function SupportCollapseMenu(props) {
  const { clearSession } = useContext(SessionContext)
  const history = useHistory()
  const { pathname } = useLocation()
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 })

  const NavItems = ({ children, colour, to, active, ...rest }) => (
    <div
      css={`
        width: calc(100% - 20px);
        font-size: 0.8rem;
        line-height: 2;
        color: ${colour ? colour : active ? Colours.blue : Colours.text};
        text-transform: uppercase;
        padding: 5px 10px 5px 10px;
        text-decoration: none;
        border-bottom: 1px solid ${active ? Colours.blue : Colours.border};
        display: grid;
        justify-items: center;
        &:hover {
          cursor: pointer;
          color: ${Colours.blue};
          border-bottom: 1px solid ${Colours.blue};
        }
      `}
      {...rest}
      onClick={() => {
        history.push(to)
        props.handleNavbar()
      }}
    >
      {children}
    </div>
  )

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200],
            })
            .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <OrgCard>
          <Content.Avatar size="large" firstName="D" lastName="B" />
          <section
            css={`
              display: grid;
              grid-row-gap: 3px;
            `}
          >
            <Label size="0.9em" bold>
              {'Darryl Brown'}
            </Label>
            <Label size="0.8em" colour={Colours.softText}>
              {'Dabrown@vertisjm.com'}
            </Label>
            <Label size="0.8em" colour={Colours.blue}>
              {'CEO'}
            </Label>
          </section>
        </OrgCard>
        <NavLinks>
          <NavItems
            to="/support/organisation"
            active={pathname.includes('/support/organisation')}
          >
            Organisations
          </NavItems>
          <NavItems
            to="/support/settings"
            active={pathname.includes('/support/settings')}
          >
            Settings
          </NavItems>
          <div
            css={`
              width: calc(100% - 20px);
              font-size: 0.8rem;
              line-height: 2;
              color: ${Colours.red};
              text-transform: uppercase;
              padding: 5px 10px 5px 10px;
              text-decoration: none;
              border-bottom: 1px solid ${Colours.border};
              display: grid;
              justify-items: center;
              &:hover {
                cursor: pointer;
                color: ${Colours.red};
                border-bottom: 1px solid ${Colours.blue};
              }
            `}
            onClick={() => {
              clearSession()
            }}
          >
            Sign Out
          </div>
        </NavLinks>
      </CollapseWrapper>
    )
  }

  return null
}

const Label = ({ children, bold, size = '0.6em', colour = Colours.text }) => (
  <p
    css={`
      font-size: ${size};
      margin: 0px;
      color: ${colour};
      font-weight: ${bold ? '600' : 'inherit'};
    `}
  >
    {children}
  </p>
)

const OrgCard = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  grid-column-gap: 10px;
  width: 100%;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid ${Colours.border};
`

const CollapseWrapper = styled(animated.div)`
  background: ${Colours.foreground};
  position: fixed;
  top: 3.5rem;
  right: 0;
  box-shadow: -5px 5px 2px rgba(0, 0, 0, 0.04);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 10px;
  z-index: 10;
`

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 10px;
  & div {
    transition: all 300ms linear 0s;
  }
`
