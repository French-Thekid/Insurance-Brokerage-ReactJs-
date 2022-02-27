import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { LIST_SLIPS } from '../../slips/queries'
import { useQuery } from '@apollo/react-hooks'

import { Table, Loading, Content } from 'components'

export default function () {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const { loading, error, data: slipData } = useQuery(LIST_SLIPS, {
    variables: { accountId: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to load recent Slips'} />
    )

  const HeaderData = ['Icon', 'Slip Number', 'Created On', 'Submitted On']
  const RowData = slipData.listSlip.data.map(
    ({ id, submittedon, createdon, url }, index) => {
      return { icon: '', id: id.substring(0, 4), submittedon, createdon, url }
    }
  )

  const handleRowClick = (slipId, url) => {
    localStorage.setItem('selectedSlip', url)
    history.push(`/broker/account/slips/${accountId}/view-slip/`)
  }

  //localhost:3000/broker/account/slips/1/policy-selection/1

  return (
    <Table
      MainButtonpath={`/broker/account/slips/${accountId}/policy-selection/${accountId}`}
      title="Slips"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 1fr`}
      buttonTitle="Create Slip"
      rowClick={handleRowClick}
      breakingPoint="858px"
    />
  )
}
