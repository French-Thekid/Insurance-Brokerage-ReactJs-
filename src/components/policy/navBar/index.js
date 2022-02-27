import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'
import { ColourContext } from 'context'
import { useSpring, animated, config } from 'react-spring'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'

import { Core } from 'components'
import BurgerMenu from './BurgerMenu'
import CollapseMenu from './CollapseMenu'
import NavItem from './NavItem'

const NavigationBar = (props) => {
  const { pathname } = useLocation()
  const { Colours } = useContext(ColourContext)
  const history = useHistory()
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const [navbarOpen, setNavBarOpen] = useState(false)

  const handleNavbar = () => {
    setNavBarOpen(!navbarOpen)
  }

  const barAnimation = useSpring({
    from: { transform: 'translate3d(0, -10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  })

  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  })

  //Helper Function
  /**
   * TODO move to helper util
   */
  const PathNameCheck = (path) => pathname.includes(path)

  const { groupName: policyType } = JSON.parse(
    localStorage.getItem('activePolicy')
  )

  let historySection = false
  if (PathNameCheck(`/history`)) historySection = true

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        justify-content: space-between;
      `}
    >
      <NavBar style={barAnimation}>
        <NavContainer>
          <NavLinks style={linkAnimation}>
            <div
              css={`
                display: flex;
              `}
            >
              <NavItem
                left
                to={
                  historySection
                    ? `/broker/account/policies/${accountId}/history/details/${policyId}`
                    : `/broker/account/policies/${accountId}/details/${policyId}`
                }
                active={pathname.includes('/details')}
              >
                Details
              </NavItem>
              <NavItem
                to={
                  historySection
                    ? `/broker/account/policies/${accountId}/history/insureds/${policyId}`
                    : `/broker/account/policies/${accountId}/insureds/${policyId}`
                }
                active={pathname.includes('/insureds')}
              >
                Insureds
              </NavItem>
              {policyType === 'Property' ? (
                <NavItem
                  to={
                    historySection
                      ? `/broker/account/policies/${accountId}/history/nonMotorRisks/${policyId}`
                      : `/broker/account/policies/${accountId}/nonMotorRisks/${policyId}`
                  }
                  active={pathname.includes('/nonMotorRisks')}
                >
                  Property Risks
                </NavItem>
              ) : (
                <NavItem
                  to={
                    historySection
                      ? `/broker/account/policies/${accountId}/history/motorRisks/${policyId}`
                      : `/broker/account/policies/${accountId}/motorRisks/${policyId}`
                  }
                  active={pathname.includes('/motorRisks')}
                >
                  Motor Risks
                </NavItem>
              )}

              <NavItem
                to={
                  historySection
                    ? `/broker/account/policies/${accountId}/history/extensions/${policyId}`
                    : `/broker/account/policies/${accountId}/extensions/${policyId}`
                }
                active={pathname.includes('/extensions')}
              >
                Extensions
              </NavItem>
              <NavItem
                to={
                  historySection
                    ? `/broker/account/policies/${accountId}/history/limits/${policyId}`
                    : `/broker/account/policies/${accountId}/limits/${policyId}`
                }
                active={pathname.includes('/limits')}
              >
                Limits
              </NavItem>
              {!historySection && (
                <NavItem
                  to={`/broker/account/policies/${accountId}/renewals/${policyId}`}
                  active={pathname.includes('/renewals')}
                >
                  Renewals
                </NavItem>
              )}
            </div>
            <div />

            <div
              css={`
                display: grid;
                align-items: Center;
                @media (max-width: 769px) {
                  display: none;
                }
              `}
            >
              {!historySection ? (
                <Core.Button
                  bgColour={
                    PathNameCheck(`/details`) ? Colours.green : Colours.blue
                  }
                  onClick={() => {
                    if (PathNameCheck(`/details`))
                      history.push(
                        `/broker/account/policies/${accountId}/history/${policyId}`
                      )
                    if (PathNameCheck(`/insureds`))
                      history.push('?action=createInsured')
                    if (PathNameCheck(`/motorRisks`))
                      history.push('?action=createMotorRisk')
                    if (PathNameCheck(`/nonMotorRisks`))
                      history.push('?action=createNonMotorRisk')
                    if (PathNameCheck(`/extensions`))
                      history.push('?action=createExtension')
                    if (PathNameCheck(`/limits`))
                      history.push('?action=createLimit')
                    if (PathNameCheck(`/renewals`))
                      history.push('?action=renewPolicy')
                  }}
                >
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
                </Core.Button>
              ) : (
                <Core.Button
                  onClick={() => {
                    localStorage.removeItem('activeVersion')
                    history.push(
                      `/broker/account/policies/${accountId}/history/${policyId}`
                    )
                  }}
                >
                  Done
                </Core.Button>
              )}
            </div>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu navbarState={navbarOpen} handleNavbar={handleNavbar} />
          </BurgerWrapper>
        </NavContainer>
      </NavBar>
      <CollapseMenu navbarState={navbarOpen} handleNavbar={handleNavbar} />
    </div>
  )
}

export default NavigationBar

const NavBar = ({ children, ...rest }) => {
  const { Colours } = useContext(ColourContext)
  return (
    <animated.nav
      {...rest}
      css={`
        width: 100%;
        background-color: ${Colours.title};
        border-bottom: 0.5px solid ${Colours.border};
        z-index: 1;
        display: grid;
        align-items: center;
        justify-items: start;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
      `}
    >
      {children}
    </animated.nav>
  )
}

const NavContainer = styled.div`
  max-width: 120rem;
  padding-right: 5px;
  width: calc(100% - 5px);
  display: grid;
  align-items: center;
  height: 40px;
`

function NavLinks({ children, style }) {
  return (
    <animated.div
      style={style}
      css={`
        width: 100%;
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        align-items: center;
      `}
    >
      {children}
    </animated.div>
  )
}

const BurgerWrapper = styled.div`
  @media (min-width: 769px) {
    display: none;
  }
`
