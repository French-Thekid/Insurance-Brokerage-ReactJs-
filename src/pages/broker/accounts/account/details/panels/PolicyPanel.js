import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { LIST_POLICY } from '../../policies/queries'

import { Table, Loading, Content } from 'components'

export default function () {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const {
    loading,
    error,
    data: policyData,
  } = useQuery(LIST_POLICY, {
    variables: { accountID: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load recent policies'} />
    )

  const HeaderData = [
    'Policy Number',
    'Type',
    'Status',
    'Created On',
    'Expired On',
  ]
  const RowData = policyData.listPolicy.data.map(
    ({ id, groupName, status, startDate, endDate }, index) => {
      return {
        id,
        groupName,
        status,
        startDate:
          startDate !== '0000-00-00'
            ? new Date(
                new Date(parseInt(startDate)).setDate(
                  new Date(parseInt(startDate)).getDate() + 1
                )
              ).toDateString()
            : '-',
        expiredOn:
          endDate !== '0000-00-00'
            ? new Date(
                new Date(parseInt(endDate)).setDate(
                  new Date(parseInt(endDate)).getDate() + 1
                )
              ).toDateString()
            : '-',
      }
    }
  )

  const handleRowClick = (policyID) =>
    history.push(`/broker/account/policies/${accountId}/details/${policyID}`)

  return (
    <Table
      MainButtonpath={`/broker/account/policies/${accountId}/?action=createPolicy`}
      title="Policies"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 1fr 1fr`}
      buttonTitle="Create Policy"
      rowClick={handleRowClick}
      breakingPoint="938px"
    />
  )
}
