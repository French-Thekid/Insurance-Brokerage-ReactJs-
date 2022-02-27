import React, { useContext } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'
import { useSpring, animated } from 'react-spring'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { ColourContext } from 'context'

import { Colours, Core } from 'components'

const CollapseMenu = (props) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 })
  const { Colours } = useContext(ColourContext)

  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const NavItem = ({ children, colour, to, active, ...rest }) => (
    <div
      css={`
        width: calc(100% - 0px);
        font-size: 0.8rem;
        line-height: 2;
        color: ${colour ? colour : active ? Colours.blue : Colours.text};
        text-transform: uppercase;
        padding: 5px;
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

  const PathNameCheck = (path) => pathname.includes(path)

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
        <NavLinks>
          <NavItem
            left
            to={`/broker/account/policies/${accountId}/details/${policyId}`}
            active={pathname.includes('/details')}
          >
            Details
          </NavItem>
          <NavItem
            to={`/broker/account/policies/${accountId}/insureds/${policyId}`}
            active={pathname.includes('/insureds')}
          >
            Insureds
          </NavItem>
          <NavItem
            to={`/broker/account/policies/${accountId}/motorRisks/${policyId}`}
            active={pathname.includes('/motorRisks')}
          >
            Motor Risks
          </NavItem>
          <NavItem
            to={`/broker/account/policies/${accountId}/nonMotorRisks/${policyId}`}
            active={pathname.includes('/nonMotorRisks')}
          >
            Non-Motor Risks
          </NavItem>
          <NavItem
            to={`/broker/account/policies/${accountId}/extensions/${policyId}`}
            active={pathname.includes('/extensions')}
          >
            Extensions
          </NavItem>
          <NavItem
            to={`/broker/account/policies/${accountId}/limits/${policyId}`}
            active={pathname.includes('/limits')}
          >
            Limits
          </NavItem>
          <NavItem
            to={`/broker/account/policies/${accountId}/renewals/${policyId}`}
            active={pathname.includes('/renewals')}
          >
            Renewals
          </NavItem>
          <div
            css={`
              background: ${PathNameCheck(`/details`)
                ? Colours.green
                : Colours.blue};
              width: 100%;
              padding: 5px;
              display: grid;
              place-items: center;
              &:hover {
                cursor: pointer;
              }
            `}
            onClick={() => {
              if (PathNameCheck(`/details`))
                history.push(
                  `/broker/account/policies/${accountId}/history/${policyId}`
                )
              if (PathNameCheck(`/motorRisks`))
                history.push('?action=createMotorRisk')
              if (PathNameCheck(`/nonMotorRisks`))
                history.push('?action=createNonMotorRisk')
              if (PathNameCheck(`/extensions`))
                history.push('?action=createExtension')
              if (PathNameCheck(`/limits`)) history.push('?action=createLimit')
            }}
          >
            <Core.Text color="#fff">
              {PathNameCheck(`/details`)
                ? 'View History'
                : PathNameCheck(`/insureds`)
                ? 'Create Insured'
                : PathNameCheck(`/motorRisks`)
                ? 'Create Motor Risk'
                : PathNameCheck(`/nonMotorRisks`)
                ? 'Create Property Risk'
                : PathNameCheck(`/extensions`)
                ? 'Create Extension'
                : PathNameCheck(`/limits`)
                ? 'Create Limit'
                : PathNameCheck(`/renewals`)
                ? 'Renew'
                : ''}
            </Core.Text>
          </div>
        </NavLinks>
      </CollapseWrapper>
    )
  }

  return null
}

export default CollapseMenu

const CollapseWrapper = styled(animated.div)`
  background: ${Colours.foreground};
  position: fixed;
  top: 6.5rem;
  right: 10px;
  box-shadow: -5px 5px 2px rgba(0, 0, 0, 0.04);
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 10px;
  z-index: 10;
`

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0px;
  & div {
    transition: all 300ms linear 0s;
  }
`
