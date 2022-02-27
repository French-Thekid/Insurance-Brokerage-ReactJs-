import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Table } from 'components'

export default function ({ data, deleteHandler, massLoading, massError }) {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const HeaderData = [
    'Image',
    'Reg. Number',
    'Make',
    'Model',
    'Year',
    'Mileage',
    'CC Ratings',
    'Usage',
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
        usage,
        id,
        ...rest1,
        ...rest2,
      }
    }
  )

  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteHandler({
        variables: {
          accountID: parseInt(accountId),
          riskID: parseInt(id),
        },
      }).catch((e) => console.log(e))
    )
    history.goBack()
  }

  const EditAction = (data) => {
    localStorage.setItem('activeMotorRisk', JSON.stringify(data))
    history.push(`?action=editMotorRisk`)
  }
  const DeleteAction = (id) => history.push(`?action=deleteMotorRisk&id=${id}`)
  const handleRowClick = (id, data) => {
    localStorage.setItem('activeMotorRisk', JSON.stringify(data))
    history.push(`?action=viewMotorRisk&id=${data.id}`)
  }

  return (
    <Table
      title="Motor Risks"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`repeat(8,1fr)`}
      checkBoxNeeded
      editAction={EditAction}
      deleteAction={DeleteAction}
      rowClick={handleRowClick}
      breakingPoint="1110px"
      hasAvatar
      noTop
      deleteMultipleAction={deleteMultipleAction}
      massLoading={massLoading}
      massError={massError}
    />
  )
}
