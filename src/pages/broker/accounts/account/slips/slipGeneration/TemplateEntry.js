import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

import { Loading, Content } from 'components'
import {
  Header,
  AccountsDetails,
  MotorRisk,
  NonMotorRisk,
  Extensions,
  Limits,
  Premium,
} from './sections'
import {
  LIST_MOTOR_RISKS,
  LIST_LIMITS,
  LIST_EXTENSIONS,
  LIST_NONMOTOR_RISKS,
} from '../../policies/policy/queries'
import { GET_POLICY_TYPE } from '../queries'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'

export default function TemplateEntry({ policyId }) {
  const { Colours, mode } = useContext(ColourContext)
  const {
    params: { accountId },
  } = useRouteMatch()
  //Getting template layout and data
  const template = JSON.parse(localStorage.getItem('template'))
  let { avatar, sections, name: slipTitle } = template[0] || []

  if (sections === undefined) sections = []

  const motorList = []
  const nonMotorlist = []
  const extensionList = []
  const limitList = []

  //QUERIES

  //Get Policy Type
  const {
    loading: policyTypeLoading,
    error: policyTypeError,
    data: policyType,
  } = useQuery(GET_POLICY_TYPE, {
    variables: { policyId: parseInt(policyId), accountId: parseInt(accountId) },
  })

  //List Limits Query
  const {
    loading: policyLimitsLoading,
    error: policyLimitsError,
    data: policyLimits,
  } = useQuery(LIST_LIMITS, {
    variables: { policyID: parseInt(policyId), accountID: parseInt(accountId) },
  })

  //List Extensions Query
  const {
    loading: loadPolicyExtensions,
    error: policyExtensionError,
    data: policyExtensions,
  } = useQuery(LIST_EXTENSIONS, {
    variables: { policyID: parseInt(policyId), accountID: parseInt(accountId) },
  })

  //List Motor Risk Query
  const {
    loading: loadMotorRisk,
    error: motorRiskError,
    data: motorRisk,
  } = useQuery(LIST_MOTOR_RISKS, {
    variables: { policyId: parseInt(policyId), accountId: parseInt(accountId) },
  })

  //List Non Motor Risk Query
  const {
    loading: loadNonMotorRisk,
    error: nonMotorRiskError,
    data: nonMotorRisk,
  } = useQuery(LIST_NONMOTOR_RISKS, {
    variables: { policyId: parseInt(policyId), accountId: parseInt(accountId) },
  })

  if (
    policyLimitsLoading ||
    loadNonMotorRisk ||
    loadPolicyExtensions ||
    loadMotorRisk ||
    policyTypeLoading
  )
    return <Loading small />

  if (policyTypeError)
    return (
      <Content.Alert type="error" message="Failed to retrieve policy type" />
    )

  const {
    readPolicy: { groupName: PolicyType },
  } = policyType || {}

  const RiskData = []

  console.log(motorRisk)
  if (motorRisk && motorRisk.listMotorPolicyRisks !== null) {
    motorRisk.listMotorPolicyRisks.map((data) => {
      motorList.push(`${policyId}/${data.risk.id}`)
      return RiskData.push({
        make: data.make,
        model: data.model,
        id: data.risk.id,
        image: data.risk.image,
        base64Image: data.risk.base64Image,
        year: data.risk.year,
        usage: data.risk.usage,
        mileage: data.mileage,
        policyId: data.risk.policyId,
        PolicyType,
      })
    })
  }

  const nonMotorRiskData = []
  if (nonMotorRisk.listNonMotorPolicyRisks) {
    nonMotorRisk.listNonMotorPolicyRisks.map((data) => {
      nonMotorlist.push(`${policyId}/${data.risk.id}`)
      return nonMotorRiskData.push({
        image: data.risk.image,
        country: data.country,
        thoroughfare: data.thoroughfare,
        premise: data.premise,
        storeys: data.storeys,
        type: data.type,
        id: data.risk.id,
        usage: data.risk.usage,
        policyId: data.risk.policyId,
        PolicyType,
      })
    })

    nonMotorRisk.listNonMotorPolicyRisks.map((data) =>
      nonMotorlist.push(`${policyId}/${data.risk.id}`)
    )
  }

  if (policyLimits) {
    policyLimits.listPolicyLimit.data.map((data) => limitList.push(data))
  }
  if (policyExtensions) {
    policyExtensions.listPolicyExtension.data.map((data) =>
      extensionList.push(data)
    )
  }

  return (
    <div
      css={`
        background: ${mode === 'Dark'
          ? Colours.CollapsibleHeader
          : Colours.foreground};
        border: 1px solid ${Colours.border};
        border-radius: 2px;
        padding: 10px;
        box-shadow: ${mode === 'Dark'
          ? '0px 1px 5px 0px rgba(16,15,28,1)'
          : mode === 'Light' || mode === ''
          ? '0px 1px 5px 0px rgba(181, 181, 181, 1)'
          : 'none'};
        margin-bottom: 10px;
        margin-right: 5px;
        &:hover {
          box-shadow: ${mode === 'Dark'
            ? '0px 6px 20px -6px rgba(16, 15, 28, 1)'
            : mode === 'Light' || mode === ''
            ? `0 1.7px 3.5px rgba(0, 0, 0, 0.016),
            0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08)`
            : 'none'};
          transform: translateY(-1px);
        }
        transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
        transition-duration: 0.3s;
      `}
    >
      <Header policyId={policyId} slipTitle={slipTitle} avatar={avatar} />
      {sections.indexOf('Account Details') !== -1 ? <AccountsDetails /> : null}
      {sections.indexOf('Premium') !== -1 ? <Premium /> : null}
      {sections.indexOf('Risk') !== -1 ? (
        <>
          {motorRiskError && PolicyType !== 'Property' ? (
            <Content.Alert type="error" message="Failed to Load Motor Risks" />
          ) : (
            PolicyType !== 'Property' && (
              <MotorRisk
                list={motorList}
                policyId={policyId}
                data={motorRisk.listMotorPolicyRisks}
                RiskData={RiskData}
                PolicyType={PolicyType}
              />
            )
          )}
          {nonMotorRiskError && PolicyType === 'Property' ? (
            <Content.Alert
              type="error"
              message="Failed to Load Non-Motor Risks"
            />
          ) : (
            PolicyType === 'Property' && (
              <NonMotorRisk
                list={nonMotorlist}
                policyId={policyId}
                data={nonMotorRisk.listNonMotorPolicyRisks}
                nonMotorRiskData={nonMotorRiskData}
                PolicyType={PolicyType}
              />
            )
          )}
        </>
      ) : null}
      {policyExtensionError ? (
        <Content.Alert type="error" message="Failed to Load Extensions" />
      ) : (
        <Extensions
          policyId={policyId}
          extensionList={extensionList}
          data={policyExtensions.listPolicyExtension.data}
        />
      )}
      {policyLimitsError ? (
        <Content.Alert type="error" message="Failed to Load Limits" />
      ) : (
        <Limits
          loading={policyLimitsLoading}
          policyId={policyId}
          limitList={limitList}
          data={policyLimits.listPolicyLimit.data}
        />
      )}
    </div>
  )
}
