import React from 'react'

import { Table } from 'components'

export default function ({ renewals }) {
  const HeaderData = ['ID', 'Renewed On', 'Renewed At', 'Renewed By']
  const RowData = renewals.map(
    ({ id, createdOn, createdAt, createdByUser, ...rest }, index) => {
      return {
        id,
        createdOn,
        createdAt,
        createdByUser,
        ...rest,
      }
    }
  )

  return (
    <Table
      title="Renewals"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 1fr`}
      breakingPoint="938px"
      noTop
    />
  )
}
