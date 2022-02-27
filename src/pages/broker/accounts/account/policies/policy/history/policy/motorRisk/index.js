import React from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { Loading, Content } from 'components'
import MotorRiskTable from './table'
import { ViewMotorRisk } from './modals'
import { useQuery } from '@apollo/react-hooks'
import { LIST_MOTOR_RISKS } from '../../../queries'

const queryString = require('query-string')

export default function () {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const {
    params: { accountId },
  } = useRouteMatch()
  const { id: policyId } =
    JSON.parse(localStorage.getItem('activeVersion')) || {}

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

  if (motorRiskLoading) return <Loading small />
  if (motorRiskError)
    return <Content.Alert type="error" message={'Fail to Load Motor Risks'} />

  return (
    <>
      <MotorRiskTable data={motorRiskData.listMotorPolicyRisks} />
      {action === 'viewMotorRisk' && (
        <ViewMotorRisk isShowing={action === 'viewMotorRisk'} />
      )}
    </>
  )
}
