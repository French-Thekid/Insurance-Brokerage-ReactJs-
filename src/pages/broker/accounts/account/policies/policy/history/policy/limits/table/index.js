import React from 'react'

import { Table } from 'components'

export default function ({ Limits }) {
  const HeaderData = ['Heading', 'Amount', 'Third Party', 'Description']
  const RowData = Limits.data.map(
    ({ heading, amount, thirdParty, description, ...rest }, index) => {
      return {
        heading,
        amountDisplay: amount,
        thirdParty: thirdParty === 1 ? 'Yes' : 'No',
        description,
        amount,
        ...rest,
      }
    }
  )

  return (
    <Table
      title="Limit"
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
