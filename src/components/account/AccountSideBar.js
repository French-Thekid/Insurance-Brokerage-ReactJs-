import React from 'react'
import 'styled-components/macro'
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'

import { Colours, Icons, Core } from 'components'
import { Layout } from '..'

function AccountSideBar() {
  const { pathname } = useLocation()
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const ListItem = ({ Icon, title, active, to, datacy, ...rest }) => {
    return (
      <Container active={active} to={to} datacy={datacy} {...rest}>
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
          <Core.Text color={'#fff'}>{title}</Core.Text>
        </div>
      </Container>
    )
  }

  const Container = ({ datacy, active, children, to, ...rest }) => {
    let toolTip = { 'aria-label': 'Whats up!', 'data-balloon-pos': 'right' }
    return (
      <div
        {...toolTip}
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
            width: 143px;
          }
          color: ${Colours.foreground};
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
    /* background: ${Colours.foreground}; */
    border-radius: 5px;
    display: grid;
    grid-template-rows: repeat(8, max-content) 1fr;
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
          to={`/broker/account/details/${accountId}`}
          title="Details"
          datacy="account-sidebar-details"
          Icon={Icons.AccountBalanceRoundedIcon}
          active={pathname.includes('/account/details/')}
        />
        <ListItem
          to={`/broker/account/email/${accountId}`}
          title="Email"
          datacy="account-sidebar-email"
          Icon={Icons.MailOutlineRoundedIcon}
          active={pathname.includes('/account/email/')}
        />
        <ListItem
          to={`/broker/account/events/${accountId}`}
          title="Events"
          datacy="account-sidebar-events"
          Icon={Icons.TodayRoundedIcon}
          active={pathname.includes('/account/events/')}
        />
        <ListItem
          to={`/broker/account/documents/${accountId}`}
          title="Documents"
          datacy="account-sidebar-documents"
          Icon={Icons.DescriptionRoundedIcon}
          active={pathname.includes('/account/documents/')}
        />
        <ListItem
          to={`/broker/account/policies/${accountId}`}
          title="Policies"
          datacy="account-sidebar-policies"
          Icon={Icons.PolicyOutlinedIcon}
          active={pathname.includes('/account/policies/')}
        />
        <ListItem
          to={`/broker/account/slips/${accountId}`}
          title="Slips"
          datacy="account-sidebar-slips"
          Icon={Icons.DescriptionOutlinedIcon}
          active={pathname.includes('/account/slips/')}
        />
        <ListItem
          to={`/broker/account/notes/${accountId}`}
          title="Notes"
          datacy="account-sidebar-notes"
          Icon={Icons.SpeakerNotesOutlinedIcon}
          active={pathname.includes('/account/notes/')}
        />
        <ListItem
          to={`/broker/account/receipts/${accountId}`}
          title="Receipts"
          datacy="account-sidebar-receipts"
          Icon={Icons.ReceiptIcon}
          active={pathname.includes('/account/receipts/')}
        />
        {/* <ToggleView /> */}
      </MainContainer>
    </Layout.Container>
  )
}

export default AccountSideBar
