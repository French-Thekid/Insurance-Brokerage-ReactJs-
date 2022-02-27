import React, { useEffect, useContext, useRef } from 'react'
import { SlipContext } from '../../context'
import { ColourContext } from 'context'
import 'styled-components/macro'
import house from 'assets/house.png'
import { Core, FormControl } from 'components'

export default function ({
  data,
  list,
  policyId,
  nonMotorRiskData,
  PolicyType,
}) {
  const { Colours, mode } = useContext(ColourContext)
  const { setNonMotorRiskIdsPolicyPairs } = useContext(SlipContext)
  const listRef = useRef(list)
  const riskListRef = useRef(nonMotorRiskData)

  useEffect(() => {
    setNonMotorRiskIdsPolicyPairs((state) => {
      const nonMotorRisks = state.nonMotorRisks.concat({
        policyId: parseInt(policyId),
        nonMotorRisks: riskListRef.current.map((id) => id),
      })
      return {
        nonMotorRisks,
      }
    })
  }, [listRef, setNonMotorRiskIdsPolicyPairs, policyId]) // Only run this once to populate motorRiskIdsPolicyPairs initially

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
          Non-Motor Risks
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
            grid-template-columns: 40px 1fr 60px 1fr 2fr 60px;
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
            Type
          </Core.Text>
          <Core.Text
            customSize="12px"
            weight="650"
            color={mode === 'Dark' ? Colours.softGrey : Colours.text}
          >
            Storeys
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
            Location
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
              image,
              type,
              storeys,
              premise,
              thoroughfare,
              country,
              risk: { id, usage, policyId: riskPolicyId },
            },
            index
          ) => (
            <div
              key={index}
              css={`
                display: grid;
                grid-template-columns: 40px 1fr 60px 1fr 2fr 60px;
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
                src={image || house}
                css={`
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  object-fit: cover;
                `}
              />
              <Core.Text customSize="12px">{type || '--'}</Core.Text>
              <Core.Text customSize="12px">{storeys || '--'}</Core.Text>
              <Core.Text customSize="12px">{usage || '--'}</Core.Text>
              <Core.Text customSize="12px">
                {`${premise ? premise : '--'}, ${
                  thoroughfare ? thoroughfare : '--'
                }, ${country ? country : '--'}`}
              </Core.Text>
              <FormControl.Toggle
                onClick={(event) => {
                  if (event.target.checked) {
                    setNonMotorRiskIdsPolicyPairs((state) => {
                      const nonMotorRisks = state.nonMotorRisks.map(
                        (statePairs) => {
                          if (statePairs.policyId === parseInt(policyId))
                            return {
                              policyId: parseInt(policyId),
                              nonMotorRisks: statePairs.nonMotorRisks.concat({
                                id,
                                image,
                                type,
                                storeys,
                                premise,
                                thoroughfare,
                                country,
                                usage,
                                policyId: riskPolicyId,
                                PolicyType,
                              }),
                            }

                          return statePairs
                        }
                      )
                      return { nonMotorRisks: nonMotorRisks }
                    })
                  } else {
                    setNonMotorRiskIdsPolicyPairs((state) => {
                      const nonMotorRisks = state.nonMotorRisks.map(
                        (statePairs) => {
                          if (statePairs.policyId === parseInt(policyId))
                            return {
                              policyId: parseInt(policyId),
                              nonMotorRisks: statePairs.nonMotorRisks.filter(
                                (riskId) => riskId.id !== id
                              ),
                            }
                          return statePairs
                        }
                      )
                      return { nonMotorRisks: nonMotorRisks }
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
