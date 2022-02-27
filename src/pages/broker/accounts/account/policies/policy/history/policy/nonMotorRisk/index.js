import React from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import NonMotorRiskTable from './table'
import { ViewNonMotorRisk } from './modals'
import { Loading, Content } from 'components'
import { LIST_NONMOTOR_RISKS } from '../../../queries'

const queryString = require('query-string')

export default function () {
  const { search } = useLocation()
  const {
    params: { accountId },
  } = useRouteMatch()
  const { id: policyId } =
    JSON.parse(localStorage.getItem('activeVersion')) || {}
  const { action } = queryString.parse(search)

  //Fetching Non-Motor Risks
  const {
    error: nonMotorRiskError,
    loading: nonMotorRiskLoading,
    data: nonMotorRiskData,
  } = useQuery(LIST_NONMOTOR_RISKS, {
    variables: {
      accountId: parseInt(accountId),
      policyId: parseInt(policyId),
    },
  })

  if (nonMotorRiskLoading) return <Loading small />
  if (nonMotorRiskError)
    return (
      <Content.Alert type="error" message="Fail to Retrieve Non-Motor Risk" />
    )

  return (
    <>
      <NonMotorRiskTable data={nonMotorRiskData.listNonMotorPolicyRisks} />
      {action === 'viewNonMotorRisk' && (
        <ViewNonMotorRisk isShowing={action === 'viewNonMotorRisk'} />
      )}
    </>
  )
}
