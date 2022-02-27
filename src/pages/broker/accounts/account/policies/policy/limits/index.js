import React from 'react'
import LimitTable from './table'
import { CreateLimit, DeleteLimit, EditLimit } from './modal'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_LIMITS } from '../queries'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Loading, Content } from 'components'
import { deletePolicyLimitMutation } from '../mutations'

const queryString = require('query-string')

export default function () {
  const { search } = useLocation()
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { action } = queryString.parse(search)

  //MUTATION
  const [
    deletePolicyLimit,
    { error: failedDelete, loading: deleting },
  ] = useMutation(deletePolicyLimitMutation, {
    refetchQueries: () => [
      {
        query: LIST_LIMITS,
        variables: {
          policyID: parseInt(policyId),
          accountID: parseInt(accountId),
        },
      },
    ],
  })
  //QUERY
  const { loading, error, data } = useQuery(LIST_LIMITS, {
    variables: { policyID: parseInt(policyId), accountID: parseInt(accountId) },
  })

  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Fail to load Limits'} />

  return (
    <>
      <LimitTable
        deleteHandler={deletePolicyLimit}
        massLoading={deleting}
        massError={failedDelete}
        Limits={data.listPolicyLimit}
      />
      <CreateLimit isShowing={action === 'createLimit'} />
      <DeleteLimit
        deletePolicyLimit={deletePolicyLimit}
        loading={deleting}
        error={failedDelete}
        isShowing={action === 'deleteLimit'}
      />
      {action === 'editLimit' && (
        <EditLimit isShowing={action === 'editLimit'} />
      )}
    </>
  )
}
