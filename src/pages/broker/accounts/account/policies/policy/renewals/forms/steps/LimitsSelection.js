import React, { useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ColourContext } from 'context'
import 'styled-components/macro'
import { LIST_LIMITS } from '../../../queries'
import { useQuery } from '@apollo/react-hooks'
import { Content, Loading, Core, FormControl } from 'components'
import { currencyFormatter } from 'utils'

export default function LimitSelection({ limits = [], setLimits }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { Colours } = useContext(ColourContext)

  //Fetching Motor Risks
  const {
    loading: limitsLoading,
    error: limitsError,
    data: limitsData,
  } = useQuery(LIST_LIMITS, {
    variables: {
      accountID: parseInt(accountId),
      policyID: parseInt(policyId),
    },
  })

  if (limitsLoading) return <Loading Contained small />
  if (limitsError)
    return <Content.Alert type="error" message={'Fail to Load Limits'} />

  const { listPolicyLimit } = limitsData || {}
  const { data } = listPolicyLimit || {}

  if (
    data &&
    (localStorage.getItem('existingLimits') === null ||
      localStorage.getItem('existingLimits') === undefined)
  ) {
    console.log('limits stored')
    let oldLimits = []
    data.map(({ id }, index) => {
      oldLimits.push(id)
      return null
    })
    localStorage.setItem('existingLimits', JSON.stringify(oldLimits))
  }

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
        margin-bottom: 20px;
      `}
    >
      <div
        css={`
          margin: 10px 0px 10px 0px;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text>
          Please remove limit(s) that are not required for this renewal.
        </Core.Text>
      </div>
      <LimitTable data={data} limits={limits} setLimits={setLimits} />
    </div>
  )
}

const LimitTable = ({ data, limits = [], setLimits }) => {
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 100px 1fr 2fr 80px;
          grid-gap: 10px;
          background: ${Colours.title};
          padding: 10px 5px;
          justify-items: start;
          align-items: Center;
          border-radius: 2px;
        `}
      >
        <Core.Text>Name</Core.Text>
        <Core.Text>Limit</Core.Text>
        <Core.Text>Type</Core.Text>
        <Core.Text>Description</Core.Text>
        <div
          css={`
            display: grid;
            justify-items: center;
            width: 100%;
          `}
        >
          <Core.Text>Toggle</Core.Text>
        </div>
      </div>
      <div
        css={`
          max-height: 300px;
          overflow-y: auto;
        `}
      >
        {data.map((item, index) => {
          const { id, heading, amount, thirdParty, description } = item || {}
          return (
            <div
              key={index}
              css={`
                display: grid;
                grid-template-columns: 1fr 100px 1fr 2fr 80px;
                grid-gap: 10px;
                padding: 10px 5px;
                justify-items: start;
                align-items: start;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <Core.Text customSize="12px">{heading}</Core.Text>
              <Core.Text customSize="12px">
                ${currencyFormatter(amount)}
              </Core.Text>
              <Core.Text customSize="12px">
                {thirdParty === 1 ? 'Yes' : 'No'}
              </Core.Text>
              <Core.Text customSize="12px">{description}</Core.Text>{' '}
              <div
                css={`
                  display: grid;
                  width: 100%;
                  justify-items: center;
                `}
              >
                <FormControl.Toggle
                  startwithoff={
                    limits.length === 0 || limits.includes(id) === false
                      ? null
                      : 'On'
                  }
                  onChange={(e) => {
                    e.persist()
                    if (e.target.checked) {
                      setLimits((prevState) => {
                        const a = prevState.filter((item, index) => item !== id)
                        return a
                      })
                    } else {
                      setLimits((prevState) => {
                        const a = prevState.concat(id)
                        return a
                      })
                    }
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
