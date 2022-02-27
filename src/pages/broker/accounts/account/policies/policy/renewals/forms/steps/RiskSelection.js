import React, { useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ColourContext } from 'context'
import 'styled-components/macro'
import { LIST_MOTOR_RISKS } from '../../../queries'
import { useQuery } from '@apollo/react-hooks'
import { Content, Loading, Core, FormControl } from 'components'

export default function RiskSelection({ risks, setRisks }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { Colours } = useContext(ColourContext)

  //Fetching Motor Risks
  const {
    loading: motorRiskLoading,
    error: motorRiskError,
    data: motorRiskData,
  } = useQuery(LIST_MOTOR_RISKS, {
    variables: {
      accountId: parseInt(accountId),
      policyId: parseInt(policyId),
    },
  })

  if (motorRiskLoading) return <Loading Contained small />
  if (motorRiskError)
    return <Content.Alert type="error" message={'Fail to Load Motor Risks'} />

  const { listMotorPolicyRisks } = motorRiskData || {}

  if (
    listMotorPolicyRisks &&
    (localStorage.getItem('existingRisks') === null ||
      localStorage.getItem('existingRisks') === undefined)
  ) {
    console.log('risks stored')
    let oldRisks = []
    listMotorPolicyRisks.map((item, index) => {
      const { risk } = item || {}
      const { id } = risk || {}
      oldRisks.push(id)
      return null
    })
    localStorage.setItem('existingRisks', JSON.stringify(oldRisks))
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
          Please remove risk(s) that are not required for this renewal.
        </Core.Text>
      </div>
      <RiskTable
        data={listMotorPolicyRisks}
        risks={risks}
        setRisks={setRisks}
      />
    </div>
  )
}

const RiskTable = ({ data, risks, setRisks }) => {
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
          grid-template-columns: 70px 1fr 1fr 1fr 1fr 1fr;
          grid-gap: 10px;
          background: ${Colours.title};
          padding: 10px 5px;
          justify-items: center;
          align-items: Center;
          border-radius: 2px;
        `}
      >
        <Core.Text>Image</Core.Text>
        <Core.Text>Make</Core.Text>
        <Core.Text>Model</Core.Text>
        <Core.Text>Year</Core.Text>
        <Core.Text>Vin</Core.Text>
        <Core.Text>Toggle</Core.Text>
      </div>
      <div
        css={`
          max-height: 300px;
          overflow-y: auto;
        `}
      >
        {data.map((item, index) => {
          const {
            risk: { id, image, year },
            make,
            model,
            vin,
          } = item || {}
          return (
            <div
              key={index}
              css={`
                display: grid;
                grid-template-columns: 70px 1fr 1fr 1fr 1fr 1fr;
                grid-gap: 10px;
                padding: 10px 5px;
                justify-items: center;
                align-items: Center;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <Content.Avatar
                shadow
                key={index}
                size="medium"
                src={image}
                firstName={make}
                lastName={model}
              />
              <Core.Text customSize="12px">{make}</Core.Text>
              <Core.Text customSize="12px">{model}</Core.Text>
              <Core.Text customSize="12px">{year}</Core.Text>
              <Core.Text customSize="12px">{vin}</Core.Text>
              <FormControl.Toggle
                startwithoff={
                  risks.length === 0 || risks.includes(id) === false
                    ? null
                    : 'On'
                }
                onChange={(e) => {
                  e.persist()
                  if (e.target.checked) {
                    setRisks((prevState) => {
                      const a = prevState.filter((item, index) => item !== id)
                      return a
                    })
                  } else {
                    setRisks((prevState) => {
                      const a = prevState.concat(id)
                      return a
                    })
                  }
                }}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
