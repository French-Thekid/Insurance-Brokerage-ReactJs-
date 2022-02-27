import React from 'react'
import { Table } from 'components'
import { useHistory } from 'react-router-dom'

export default function ({ data }) {
  const history = useHistory()
  const HeaderData = [
    'Image',
    'Reg. Number',
    'Make',
    'Model',
    'Year',
    'Mileage',
    'CC Ratings',
    'Status',
  ]

  const RowData = data.map(
    (
      {
        risk: { id, image, usage, year, ...rest1 },
        ccRating,
        mileage,
        make,
        model,
        regNum,
        ...rest2
      },
      index
    ) => {
      return {
        image,
        regNum,
        make: make || '--',
        model: model || '--',
        year,
        mileage: mileage || '--',
        ccRating: ccRating || '--',
        status: 'Persist',
        id,
        ...rest1,
        ...rest2,
      }
    }
  )

  const handleRowClick = (id, data) => {
    localStorage.setItem('activeMotorRisk', JSON.stringify(data))
    history.push(`?action=viewMotorRisk&id=${data.id}`)
  }

  return (
    <Table
      title="Risks"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`repeat(8,1fr)`}
      rowClick={handleRowClick}
      breakingPoint="1110px"
      hasAvatar
      noTop
    />
  )
}
