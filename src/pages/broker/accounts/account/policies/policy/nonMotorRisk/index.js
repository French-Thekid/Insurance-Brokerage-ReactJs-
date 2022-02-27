import React from 'react'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'

import NonMotorRiskTable from './table'
import { CreateRisk, ViewNonMotorRisk, DeleteRisk, EditRisk } from './modals'
import { Loading, Content } from 'components'
import { LIST_NONMOTOR_RISKS } from '../queries'
import { deleteNonMotorRiskMutation } from '../mutations'

const queryString = require('query-string')

export default function () {
  const { search } = useLocation() 
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { action } = queryString.parse(search)

  //MUTATION
  const [deleteNonMotorRisk, { loading, error }] = useMutation(
    deleteNonMotorRiskMutation,
    {
      refetchQueries: () => [
        {
          query: LIST_NONMOTOR_RISKS,
          variables: {
            accountId: parseInt(accountId),
            policyId: parseInt(policyId),
          },
        },
      ],
    }
  )

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
      <NonMotorRiskTable
        deleteHandler={deleteNonMotorRisk}
        massLoading={loading}
        massError={error}
        data={nonMotorRiskData.listNonMotorPolicyRisks}
      />
      {action === 'viewNonMotorRisk' && (
        <ViewNonMotorRisk isShowing={action === 'viewNonMotorRisk'} />
      )}
      {action === 'deleteNonMotorRisk' && (
        <DeleteRisk
          deleteNonMotorRisk={deleteNonMotorRisk}
          loading={loading}
          isShowing={action === 'deleteNonMotorRisk'}
        />
      )}
      {action === 'editNonMotorRisk' && (
        <EditRisk isShowing={action === 'editNonMotorRisk'} />
      )}
      <CreateRisk isShowing={action === 'createNonMotorRisk'} />
    </>
  )
}
