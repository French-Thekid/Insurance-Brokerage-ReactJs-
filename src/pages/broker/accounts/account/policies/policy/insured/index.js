import React from 'react'
import 'styled-components/macro'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { DELETE_POLICY_INSURED } from '../../forms/mutations'
import InsuredTable from './table'
import { Content, Loading } from 'components'
import { GET_INSUREDS } from '../queries'
import { CreateInsured, RemoveInsured, EditInsured } from './modals'

const queryString = require('query-string')

export default function () {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  //MUTATION
  const [
    deletePolicyHaveInsured,
    { loading: deleting, error: failedRemoving },
  ] = useMutation(DELETE_POLICY_INSURED, {
    refetchQueries: () => [
      {
        query: GET_INSUREDS,
        variables: {
          policyID: parseInt(policyId),
          accountID: parseInt(accountId),
        },
      },
    ],
  })

  //QUERY
  const { loading, error, data } = useQuery(GET_INSUREDS, {
    variables: { policyID: parseInt(policyId), accountID: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert
        type="error"
        message={'Failed to load Insureds, try refreshing'}
      />
    )

  return (
    <>
      <InsuredTable
        deleteHandler={deletePolicyHaveInsured}
        massLoading={deleting}
        massError={failedRemoving}
        Insureds={data.listPolicyHaveInsured.data}
        accountId={accountId}
        policyId={policyId}
      />

      <CreateInsured isShowing={action === 'createInsured'} />
      <RemoveInsured
        deletePolicyHaveInsured={deletePolicyHaveInsured}
        deleting={deleting}
        isShowing={action === 'deleteInsured'}
      />
      <EditInsured isShowing={action === 'editInsured'} />
    </>
  )
}
