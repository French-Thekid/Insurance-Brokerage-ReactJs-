import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useLocation, useRouteMatch } from 'react-router-dom'

import { Loading, Content } from 'components'
import PolicyTable from './table'
import { LIST_POLICY } from './queries'
import {
  EditPolicy,
  CreatePropertyPolicy,
  CreateMotorPolicy,
  PolicyTypes,
  EditMotorPolicy,
} from './modal'

const queryString = require('query-string')

function Policies() {
  const { search } = useLocation()
  const {
    params: { accountId },
  } = useRouteMatch()
  const { action } = queryString.parse(search)
  const { loading, error, data: policyData } = useQuery(LIST_POLICY, {
    variables: { accountID: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Fail to Load Policies'} />

  return (
    <>
      <PolicyTable Policies={policyData.listPolicy.data} />
      <PolicyTypes isShowing={action === 'createPolicy'} />
      <CreatePropertyPolicy isShowing={action === 'createPropertyPolicy'} />
      <CreateMotorPolicy isShowing={action === 'createMotorPolicy'} />
      <EditPolicy isShowing={action === 'editPolicy'} />
      <EditMotorPolicy isShowing={action === 'editMotorPolicy'} />
    </>
  )
}

export default Policies
