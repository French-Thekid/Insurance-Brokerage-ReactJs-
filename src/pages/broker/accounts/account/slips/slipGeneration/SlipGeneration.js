import React, { useContext, useState } from 'react'
import 'styled-components/macro'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'

import { SlipContext } from '../context'
import { PageHeader, Core, Content, ScreenDisplayWarning } from 'components'
import TemplateEntry from './TemplateEntry'
import Insurers from './Insurers'

const queryString = require('query-string')

export default function SlipGeneration() {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()
  const { search } = useLocation()
  const [InsurerEmails, setInsurerEmails] = useState({ Emails: [] })
  const {
    motorRiskIdsPolicyPairs,
    nonMotorRiskIdsPolicyPairs,
    extensionsPair,
    limitsPair,
  } = useContext(SlipContext)

  const { policies } = queryString.parse(search)

  //Converting possible single selected policy to array
  let policyIds
  if (Array.isArray(policies)) policyIds = policies
  else policyIds = Array.from(String(policies), Number)

  let toolTip = {
    'aria-label': 'Select Insurer(s)',
    'data-balloon-pos': 'down',
  }
  if (InsurerEmails.Emails.length > 0) toolTip = null

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
      `}
    >
      <PageHeader
        title="Generate Slip PDF"
        close={() =>
          history.push(
            `/broker/account/slips/${accountId}/policy-selection/${accountId}`
          )
        }
      >
        <Core.Button
          {...toolTip}
          onClick={() => {
            let policyDetails = null
            policyDetails = queryString.stringify({
              policies: policyIds.map((Id) => Id),
            })

            localStorage.setItem(
              'motorRisks',
              JSON.stringify(motorRiskIdsPolicyPairs)
            )
            localStorage.setItem(
              'nonMotorRisks',
              JSON.stringify(nonMotorRiskIdsPolicyPairs)
            )
            localStorage.setItem('extensions', JSON.stringify(extensionsPair))
            localStorage.setItem('limits', JSON.stringify(limitsPair))
            localStorage.setItem('receivers', JSON.stringify(InsurerEmails))

            history.push(
              `/broker/account/slips/${accountId}/slip-generation/${accountId}/slip?${policyDetails}`
            )
            policyDetails = null
          }}
          disabled={InsurerEmails.Emails.length === 0 ? true : false}
        >
          Generate
        </Core.Button>
      </PageHeader>
      <div
        css={`
          @media only screen and (orientation: portrait) {
            @media (min-width: 769px) {
              display: none;
            }
          }
          @media only screen and (orientation: landscape) {
            @media (min-height: 376px) {
              display: none;
            }
          }
          @media only screen and (orientation: portrait) {
            @media (max-width: 376px) {
              display: visible;
            }
          }
          @media only screen and (orientation: landscape) {
            @media (max-height: 376px) {
              display: visible;
            }
          }
        `}
      >
        <ScreenDisplayWarning />
      </div>

      <div
        css={`
          height: 100%;
          display: grid;
          grid-template-columns: 2fr 1fr;
          overflow-y: auto;
          @media (max-width: 376px), (max-height: 376px) {
            display: none;
          }
          @media only screen and (orientation: portrait) {
            @media (max-width: 769px) {
              display: none;
            }
          }
        `}
      >
        <div
          css={`
            width: 100%;
            height: 100%;
            overflow-y: auto;
            display: grid;
            grid-gap: 20px;
          `}
        >
          {policyIds.map((id, index) => (
            <TemplateEntry policyId={id} key={index} />
          ))}
        </div>
        <div
          css={`
            margin-left: 5px;
          `}
        >
          <Content.CustomCard title={'Choose Insurers'}>
            <Insurers
              policyId={policyIds}
              setInsurerEmails={setInsurerEmails}
            />
          </Content.CustomCard>
        </div>
      </div>
    </div>
  )
}
