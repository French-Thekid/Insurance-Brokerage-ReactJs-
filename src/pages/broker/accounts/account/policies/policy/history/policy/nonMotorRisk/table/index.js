import React from 'react'
import { useHistory } from 'react-router-dom'
import House from 'assets/house.png'

import { Table } from 'components'

export default function ({ data }) {
  const history = useHistory()

  const HeaderData = [
    'Image',
    'Year Built',
    'Type',
    'Storeys',
    'Location',
    'Status',
  ]

  const RowData = data.map(
    (
      {
        risk: { year, id, image, usage, ...rest1 },
        type,
        storeys,
        thoroughfare,
        premise,
        country,
        ...rest2
      },
      index
    ) => {
      return {
        images: image || House,
        year,
        type,
        storeys,
        location: `${premise}, ${thoroughfare}, ${country}`,
        status: 'Persist',
        premise,
        thoroughfare,
        country,
        image,
        id,
        ...rest1,
        ...rest2,
      }
    }
  )

  const handleRowClick = (id, data) => {
    localStorage.setItem('activeNonMotorRisk', JSON.stringify(data))
    history.push(`?action=viewNonMotorRisk&id=${data.id}`)
  }
  return (
    <Table
      title="Property Risks"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 1fr 2fr 1fr`}
      rowClick={handleRowClick}
      breakingPoint="1070px"
      hasAvatar
      noTop
    />
  )
}
