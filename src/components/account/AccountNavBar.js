import React, { useContext } from 'react'
import 'styled-components/macro'
import { useSpring, animated } from 'react-spring'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { READACCOUNT } from 'components/account/query'
import { useQuery } from '@apollo/react-hooks'
import { CreateNote } from 'pages/broker/accounts/account/notes/modal'
import { ColourContext } from 'context'

import { Icons, Core, Content } from 'components'
import {
  EditIndividualAccount,
  EditCompanyAccount,
} from 'pages/broker/accounts/modals'

const queryString = require('query-string')

function AccountContainer() {
  const history = useHistory()
  const { Colours } = useContext(ColourContext)
  const {
    params: { accountId },
  } = useRouteMatch()
  const { pathname } = useLocation()

  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const style = useSpring({
    from: { transform: 'translate3d(0, 10rem, 0)' },
    transform: 'translate3d(0, 0, 0)',
  })

  //array of all paths i'd want to overide back button routes for
  const policyPaths = [
    `/account/policies/${accountId}/details`,
    `/account/policies/${accountId}/insureds`,
    `/account/policies/${accountId}/motorRisks`,
    `/account/policies/${accountId}/nonMotorRisks`,
    `/account/policies/${accountId}/extensions`,
    `/account/policies/${accountId}/limits`,
  ]

  const blacklist = pathname.includes('slip-generation')

  //checking routes
  let isPolicyPage = null
  for (var index = 0; index < policyPaths.length; index++) {
    if ((isPolicyPage = pathname.includes(policyPaths[index]))) {
      break
    }
  }

  const { loading, error, data } = useQuery(READACCOUNT, {
    variables: { accountId: parseInt(accountId) },
  })
  if (loading) return null
  if (error)
    return (
      <Content.Alert type="error" message={`Filed to fetch Active Account`} />
    )

  const { readAccount } = data || {}
  const { type, person, company } = readAccount || {}
  const { firstName, lastName, avatar, email } = person || {}
  const { avatar: CAvatar, companyName, email: companyEmail } = company || {}

  const mode = localStorage.getItem('Theme') || ''

  return (
    <>
      <animated.div
        style={style}
        css={`
          width: 100%;
          height: 100%;
          background: ${Colours.foreground};
          border-radius: 5px;
          z-index: 1;
          display: grid;
          grid-template-rows: max-content 1fr;
        `}
      >
        <div
          css={`
            height: 40px;
            background: ${mode === 'Dark'
              ? `linear-gradient(90deg, rgba(68,65,87,1) 0%, rgba(20,17,36,1) 100%)`
              : `linear-gradient(
              90deg,
              rgba(240, 242, 255, 1) 0%,
              rgba(226, 232, 255, 1) 100%
            )`};
            border-top: 1px solid ${Colours.border};
            border-bottom: 1px solid ${Colours.border};
            border-top-right-radius: 5px;
            border-top-left-radius: 5px;
            display: grid;
            grid-template-columns: max-content 1fr max-content max-content;
            align-items: center;
            justify-items: start;
            grid-column-gap: 10px;
            width: calc(100% - 10px);
            padding: 5px;
          `}
        >
          <section
            css={`
              color: ${Colours.inactive};
              transition: ease-out 0.2s;
              &:hover {
                transition: ease-out 0.2s;
                transform: translateX(-2px);
                color: ${Colours.blue};
                cursor: pointer;
              }
            `}
            onClick={() => {
              if (isPolicyPage) {
                localStorage.removeItem('activePolicy')
                history.push(`/broker/account/policies/${accountId}`)
              } else {
                localStorage.removeItem('Active#')
                history.push('/broker/accounts')
              }
            }}
          >
            <Icons.ArrowBackRounded style={{ color: 'inherit' }} />
          </section>
          <div
            css={`
              display: grid;
              grid-template-columns: max-content 1fr;
              grid-column-gap: 10px;
              align-items: center;
            `}
          >
            <Content.Avatar
              src={type === 'individual' ? avatar : CAvatar}
              firstName={type === 'individual' ? firstName : companyName}
              lastName={type === 'individual' ? lastName : companyName}
            />
            <div
              css={`
                display: grid;
                grid-template-rows: repeat(2, max-content);
                grid-gap: 0px;
              `}
            >
              <Core.Text customSize="18px" color={Colours.blue} weight={600}>
                {type === 'individual'
                  ? `${firstName} ${lastName}`
                  : companyName}
              </Core.Text>
              <Core.Text customSize="12px" color={Colours.text} weight={400}>
                {type === 'individual' ? email : companyEmail}
              </Core.Text>
            </div>
          </div>
          <Core.Button
            style={{ paddingTop: '5px', paddingBottom: '2px' }}
            selfContained
            bgColour={Colours.blue}
            disabled={blacklist}
            onClick={() => history.push(`?action=createNote`)}
          >
            <Icons.ChatRounded style={{ color: '#fff', fontSize: '20px' }} />
          </Core.Button>
          <Core.Button
            selfContained
            bgColour={Colours.orange}
            disabled={blacklist}
            onClick={() =>
              type === 'individual'
                ? history.push(`?action=editIaccount`)
                : history.push(`?action=editOaccount`)
            }
          >
            Edit Account
          </Core.Button>
        </div>
      </animated.div>

      <CreateNote isShowing={action === 'createNote'} />

      {action === 'editIaccount' && (
        <EditIndividualAccount isShowing={action === 'editIaccount'} />
      )}
      {action === 'editOaccount' && (
        <EditCompanyAccount isShowing={action === 'editOaccount'} />
      )}
    </>
  )
}

export default AccountContainer
