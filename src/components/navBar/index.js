import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import 'styled-components/macro'
import { useSpring, animated, config } from 'react-spring'
import { useHistory, useLocation } from 'react-router-dom'

import { Icons } from 'components'
import Brand from './Brand'
import BurgerMenu from './BurgerMenu'
import CollapseMenu, { SupportCollapseMenu } from './CollapseMenu'
import { Content, Core, Layout } from '..'
import { UserContext, ColourContext } from '../../context'
import SignOutCard from '../SignOutCard'

const NavigationBar = (props) => {
  const history = useHistory()
  const { loggedInUser } = useContext(UserContext) || {}
  const {
    firstName = 'Loading',
    lastName = 'User..',
    avatar,
  } = loggedInUser || {}
  const { pathname } = useLocation()
  const path = pathname.split('/')[1].split('/')[0]
  const [navbarOpen, setNavBarOpen] = useState(false)
  const handleNavbar = () => {
    setNavBarOpen(!navbarOpen)
  }
  const { Colours } = useContext(ColourContext)
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

  return (
    <div
      css={`
        width: 100%;
        display: flex;
        justify-content: space-between;
        z-index: 1;
        background: ${Colours.background};
      `}
    >
      <NavBar Colours={Colours} style={barAnimation}>
        <NavContainer>
          <Brand />
          <NavLinks style={linkAnimation}>
            <div
              css={`
                display: flex;
              `}
            >
              {props.children}
            </div>
            {/* Error Container */}
            <div />
            <div
              css={`
                display: grid;
                align-items: Center;
                grid-template-columns: repeat(4, max-content);
                @media (max-width: 769px) {
                  display: none;
                }
              `}
            >
              <div
                css={`
                  transition: ease-out 1s;
                  margin-right: 20px;
                  display: grid;
                  place-items: center;
                  padding: 14px 15px 10px 15px;
                  border-bottom: ${pathname.includes('settings')
                    ? `3px solid ${Colours.blue}`
                    : `none`};
                  background: ${pathname.includes('settings')
                    ? `rgba(2,96,178,0.09)`
                    : `none`};
                  color: ${pathname.includes('settings')
                    ? Colours.blue
                    : Colours.inactive};
                  transition: ease-out 0.2s;
                  &:hover {
                    cursor: pointer;
                    transition: ease-out 0.2s;
                    transform: translateY(-2px);
                    color: ${Colours.blue};
                  }
                `}
                onClick={() => history.push(`/${path}/settings/`)}
              >
                <Icons.SettingsIcon color="inherit" />
              </div>

              <Core.Dropdown
                width="240px"
                x="-75px"
                items={[
                  {
                    type: 'any',
                    component: <SignOutCard />,
                  },
                ]}
              >
                <Layout.Flex>
                  <Core.Box cursor="pointer">
                    <Layout.Flex>
                      <Core.Text
                        color={Colours.text}
                      >{`${firstName} ${lastName}`}</Core.Text>
                      <Icons.ArrowDropDownRounded
                        style={{ color: Colours.iconInactive }}
                      />
                    </Layout.Flex>
                  </Core.Box>
                  <section
                    css={`
                      &:hover {
                        cursor: pointer;
                      }
                    `}
                  >
                    <Content.Avatar
                      src={avatar}
                      size="medium"
                      firstName={firstName}
                      lastName={lastName}
                    />
                  </section>
                </Layout.Flex>
              </Core.Dropdown>
            </div>
          </NavLinks>
          <BurgerWrapper>
            <BurgerMenu navbarState={navbarOpen} handleNavbar={handleNavbar} />
          </BurgerWrapper>
        </NavContainer>
      </NavBar>
      {path === 'support' ? (
        <SupportCollapseMenu
          navbarState={navbarOpen}
          handleNavbar={handleNavbar}
        />
      ) : (
        <CollapseMenu navbarState={navbarOpen} handleNavbar={handleNavbar} />
      )}
    </div>
  )
}

export default NavigationBar

const NavBar = ({ Colours, children, ...rest }) => {
  const { mode } = useContext(ColourContext)
  return (
    <animated.nav
      {...rest}
      css={`
        transition: ease-out 1s;
        width: 100%;
        background: ${Colours.foreground};
        box-shadow: ${mode === 'Dark'
          ? '0px 4px 13px 0px rgba(0,0,0,1)'
          : '0px 4px 13px 0px rgba(245, 245, 250, 1)'};
        z-index: 1;
        display: grid;
        align-items: center;
        justify-items: start;
      `}
    >
      {children}
    </animated.nav>
  )
}

const NavContainer = styled.div`
  /* max-width: 120rem; */
  padding-left: 10px;
  padding-right: 10px;
  width: calc(100% - 20px);
  display: grid;
  grid-template-columns: max-content 1fr;
  @media (max-width: 769px) {
    grid-template-columns: max-content 1fr max-content;
  }
  align-items: center;
  height: 50px;
`

function NavLinks({ children, style }) {
  return (
    <animated.div
      style={style}
      css={`
        width: 100%;
        display: grid;
        grid-template-columns: max-content 1fr max-content;
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
