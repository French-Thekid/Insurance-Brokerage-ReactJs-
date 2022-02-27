import React, { useEffect, useContext, useRef } from 'react'
import { SlipContext } from '../../context'
import 'styled-components/macro'
import { ColourContext } from 'context'

import motor from 'assets/Motor.png'
import { Core, FormControl } from 'components'

export default function ({ data = [], list, RiskData, policyId, PolicyType }) {
  const { setMotorRiskIdsPolicyPairs } = useContext(SlipContext)
  const { Colours, mode } = useContext(ColourContext)

  const listRef = useRef(list)
  const riskListRef = useRef(RiskData)
  useEffect(() => {
    setMotorRiskIdsPolicyPairs((state) => {
      const MotorRisks = state.MotorRisks.concat({
        policyId: parseInt(policyId),
        MotorRisks: riskListRef.current.map((id) => {
          return id
        }),
      })
      return {
        MotorRisks,
      }
    })
  }, [listRef, setMotorRiskIdsPolicyPairs, policyId]) // Only run this once to populate motorRiskIdsPolicyPairs initially

  return (
    <>
      <div
        css={`
          height: max-content;
          background-color: ${Colours.header};
          border: 0.5px solid ${Colours.border};
          padding: 5px;
          margin-top: 10px;
          border-radius: 2px;
        `}
      >
        <Core.Text customSize="12px" weight="600">
          Motor Risks
        </Core.Text>
      </div>
      <div
        css={`
          width: 100%;
          margin-bottom: 25px;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 40px 1fr 1fr 20px 1fr 1fr 60px;
            align-items: center;
            justify-items: center;
            margin-bottom: 5px;
            padding: 5px;
            border-bottom: 1px solid ${Colours.border};
          `}
        >
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Image
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Make
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Model
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Year
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Mileage
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Usage
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Selected
          </Core.Text>
        </div>
        {data.map(
          (
            {
              make,
              model,
              mileage,
              risk: {
                image,
                base64Image,
                year,
                usage,
                id,
                policyId: riskPolicyId,
              },
            },
            index
          ) => (
            <div
              key={index}
              css={`
                display: grid;
                grid-template-columns: 40px 1fr 1fr 20px 1fr 1fr 60px;
                align-items: center;
                justify-items: center;
                padding: 5px;
                border-bottom: 0.5px solid ${Colours.border};
                &:nth-child(even) {
                  background-color: ${Colours.hover};
                }
              `}
            >
              <img
                alt="img"
                src={image || motor}
                css={`
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  object-fit: cover;
                `}
              />
              <Core.Text customSize="12px">{make || '--'}</Core.Text>
              <Core.Text customSize="12px">{model || '--'}</Core.Text>
              <Core.Text customSize="12px">{year || '--'}</Core.Text>
              <Core.Text customSize="12px">{mileage || '--'}</Core.Text>
              <Core.Text customSize="12px">{usage || '--'}</Core.Text>
              <FormControl.Toggle
                onClick={(event) => {
                  if (event.target.checked) {
                    setMotorRiskIdsPolicyPairs((state) => {
                      const MotorRisks = state.MotorRisks.map((statePairs) => {
                        if (statePairs.policyId === parseInt(policyId))
                          return {
                            policyId: parseInt(policyId),
                            MotorRisks: statePairs.MotorRisks.concat({
                              id,
                              image,
                              base64Image: base64Image,
                              make,
                              mileage,
                              model,
                              usage,
                              year,
                              policyId: riskPolicyId,
                              PolicyType,
                            }),
                          }

                        return statePairs
                      })
                      return { MotorRisks: MotorRisks }
                    })
                  } else {
                    setMotorRiskIdsPolicyPairs((state) => {
                      const MotorRisks = state.MotorRisks.map((statePairs) => {
                        if (statePairs.policyId === parseInt(policyId))
                          return {
                            policyId: parseInt(policyId),
                            MotorRisks: statePairs.MotorRisks.filter(
                              (riskId) => {
                                return riskId.id !== id
                              }
                            ),
                          }
                        return statePairs
                      })
                      return { MotorRisks: MotorRisks }
                    })
                  }
                }}
              />
            </div>
          )
        )}
      </div>
    </>
  )
}
