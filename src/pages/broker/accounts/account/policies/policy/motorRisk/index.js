import React from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { Loading, Content } from 'components'
import MotorRiskTable from './table'
import { CreateRisk, ViewMotorRisk, DeleteRisk, EditRisk } from './modals'
import { deleteMotorRiskMutation } from '../mutations'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { LIST_MOTOR_RISKS } from '../queries'

const queryString = require('query-string')

export default function () {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  //MUTATION
  const [deleteMotorRisk, { loading, error }] = useMutation(
    deleteMotorRiskMutation,
    {
      refetchQueries: () => [
        {
          query: LIST_MOTOR_RISKS,
          variables: {
            accountId: parseInt(accountId),
            policyId: parseInt(policyId),
          },
        },
      ],
    }
  )

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
      <MotorRiskTable
        deleteHandler={deleteMotorRisk}
        massLoading={loading}
        massError={error}
        data={motorRiskData.listMotorPolicyRisks}
      />
      {action === 'viewMotorRisk' && (
        <ViewMotorRisk isShowing={action === 'viewMotorRisk'} />
      )}
      {action === 'deleteMotorRisk' && (
        <DeleteRisk
          deleteMotorRisk={deleteMotorRisk}
          loading={loading}
          isShowing={action === 'deleteMotorRisk'}
        />
      )}
      {action === 'editMotorRisk' && (
        <EditRisk isShowing={action === 'editMotorRisk'} />
      )}
      <CreateRisk isShowing={action === 'createMotorRisk'} />
    </>
  )
}
