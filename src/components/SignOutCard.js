import React, { useContext } from 'react'
import {
  AuthContext,
  UserContext,
  OrganisationContext,
  SessionContext,
  ColourContext,
} from 'context'
import { useHistory, useLocation } from 'react-router-dom'
import 'styled-components/macro'
import { Core, Content } from 'components'

function SignOutCard({ isShowing, title = 'Card', close = () => {}, small }) {
  const { logout: signout } = useContext(AuthContext)
  const { clearSession } = useContext(SessionContext)
  const {
    loggedInUser: { firstName, lastName, avatar, email, position } = {},
  } = useContext(UserContext) || {}
  const { orgName } = useContext(OrganisationContext)
  const { Colours } = useContext(ColourContext)

  const { pathname } = useLocation()
  const history = useHistory()

  const path = pathname.split('/')[1].split('/')[0]
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: repeat(7, max-content);
        justify-items: Center;
        width: calc(100% - 20px);
        padding: 10px;
        grid-row-gap: 5px;
        background: ${Colours.foreground};
      `}
    >
      <div
        css={`
          width: 100%;
          border-bottom: 1px solid ${Colours.border};
          padding: 0px 0px 10px 0px;
          display: grid;
          justify-items: Center;
        `}
      >
        <Core.Text color={Colours.blue}>{orgName}</Core.Text>
      </div>
      <div
        css={`
          padding: 10px;
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          history.push(`/${path}/settings/profile`)
        }}
      >
        <Content.Avatar
          size="large+"
          src={avatar}
          firstName={firstName}
          lastName={lastName}
        />
      </div>
      <Core.Text
        customSize="14px"
        weight="600"
      >{`${firstName} ${lastName}`}</Core.Text>
      <Core.Text customSize="14px">{email}</Core.Text>
      <Core.Text customSize="14px" color={Colours.blue}>
        {position}
      </Core.Text>
      <div
        css={`
          width: 100%;
          padding: 15px;
          border-top: 1px solid ${Colours.border};
          border-bottom: 1px solid ${Colours.border};
          margin-top: 5px;
          margin-bottom: 5px;
        `}
      >
        <Core.Button
          action="READ"
          onClick={() => {
            signout()
            clearSession()
            window.location.reload()
          }}
        >
          Sign Out
        </Core.Button>
      </div>
      <div
        css={`
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 10px;
          align-items: center;
          margin-top: 5px;
        `}
      >
        <Core.Text customSize="12px" color={Colours.blue}>
          Privacy Policy
        </Core.Text>
        <Core.Text customSize="12px" color={Colours.blue}>
          Terms of Service
        </Core.Text>
      </div>
    </div>
  )
}

export default SignOutCard
