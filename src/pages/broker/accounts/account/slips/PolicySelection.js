import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'

import { Loading, Content } from 'components'

import { Table } from 'components'
import { LIST_POLICY } from '../policies/queries'

export default function () {
  const {
    params: { accountId },
  } = useRouteMatch()
  const { loading, error, data: policyData } = useQuery(LIST_POLICY, {
    variables: { accountID: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Fail to Load Policies'} />

  const HeaderData = [
    'Policy Number',
    'Insured',
    'Status',
    'Created On',
    'Expired On',
  ]
  const RowData = policyData.listPolicy.data.map(
    ({ id, accountId, status, startDate, endDate, ...rest }, index) => {
      return {
        id,
        accountId,
        status,
        startOn:
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
        startDate:
          startDate !== '0000-00-00'
            ? new Date(
                new Date(parseInt(startDate)).setDate(
                  new Date(parseInt(startDate)).getDate() + 1
                )
              ).toDateString()
            : '',
        endDate:
          endDate !== '0000-00-00'
            ? new Date(
                new Date(parseInt(endDate)).setDate(
                  new Date(parseInt(endDate)).getDate() + 1
                )
              ).toDateString()
            : '',
        ...rest,
      }
    }
  )

  return (
    <Table
      disableMultiAction
      title="Policy Selection"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 50px 1fr 1fr`}
      buttonTitle="Generate Slip"
      checkBoxNeeded
      breakingPoint="938px"
    />
  )
}
