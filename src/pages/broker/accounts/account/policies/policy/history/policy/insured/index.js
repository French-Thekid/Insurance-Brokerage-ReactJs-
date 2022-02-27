import React from 'react'
import 'styled-components/macro'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import InsuredTable from './table'
import { Content, Loading } from 'components'
import { GET_INSUREDS } from '../../../queries'

export default function () {
  const {
    params: { accountId },
  } = useRouteMatch()

  const { id: policyId } =
    JSON.parse(localStorage.getItem('activeVersion')) || {}

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
        Insureds={data.listPolicyHaveInsured.data}
        accountId={accountId}
        policyId={policyId}
      />
    </>
  )
}
