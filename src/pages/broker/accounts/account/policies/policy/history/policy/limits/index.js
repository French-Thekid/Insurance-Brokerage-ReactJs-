import React from 'react'
import LimitTable from './table'
import { useRouteMatch } from 'react-router-dom'
import { LIST_LIMITS } from '../../../queries'
import { useQuery } from '@apollo/react-hooks'
import { Loading, Content } from 'components'

export default function () {
  const {
    params: { accountId },
  } = useRouteMatch()

  const { id: policyId } =
    JSON.parse(localStorage.getItem('activeVersion')) || {}

  //QUERY
  const { loading, error, data } = useQuery(LIST_LIMITS, {
    variables: { policyID: parseInt(policyId), accountID: parseInt(accountId) },
  })

  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Fail to load Limits'} />

  return (
    <>
      <LimitTable Limits={data.listPolicyLimit} />
    </>
  )
}
