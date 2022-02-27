import React from 'react'

import { Table } from 'components'

export default function ({ Users }) {
  const HeaderData = ['Avatar', 'Name', 'Position', 'Email']
  const RowData = Users.map(
    ({ avatar, firstName, lastName, position, email, ...rest }, index) => {
      return {
        avatar,
        name: `${firstName} ${lastName}`,
        position,
        email,
        ...rest,
      }
    }
  )

  return (
    <Table
      breakingPoint="1190px"
      title="Users On This Role"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 2fr`}
      noTopButton
      hasAvatar
    />
  )
}
