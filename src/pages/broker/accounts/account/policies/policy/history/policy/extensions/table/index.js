import React from 'react'
import { Table } from 'components'

export default function ({ Extensions }) {
  const HeaderData = ['Name', 'Limit', 'Type', 'Description']
  const RowData = Extensions.data.map(
    ({ name, limit, type, description, ...rest }, index) => {
      return {
        name,
        amountDisplay: limit,
        type,
        description,
        limit,
        ...rest,
      }
    }
  )

  return (
    <Table
      title="Extension"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 2fr`}
      breakingPoint="938px"
      noTop
      justify="start"
      alignment="start"
    />
  )
}
