import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import House from 'assets/house.png'

import { Table } from 'components'

export default function ({ data, deleteHandler, massLoading, massError }) {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const HeaderData = [
    'Image',
    'Year Built',
    'Type',
    'Storeys',
    'Usage',
    'Location',
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
        usage,
        location: `${premise}, ${thoroughfare}, ${country}`,
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

  const EditAction = (data) => {
    localStorage.setItem('activeNonMotorRisk', JSON.stringify(data))
    history.push(`?action=editNonMotorRisk&id=${data.id}`)
  }
  const DeleteAction = (id) =>
    history.push(`?action=deleteNonMotorRisk&id=${id}`)
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

  const handleRowClick = (id, data) => {
  
    localStorage.setItem('activeNonMotorRisk', JSON.stringify(data))
    history.push(`?action=viewNonMotorRisk&id=${data.id}`)
  }
  return (
    <Table
      title="Motor Risks"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 1fr 1fr 2fr`}
      checkBoxNeeded
      editAction={EditAction}
      deleteAction={DeleteAction}
      rowClick={handleRowClick}
      breakingPoint="1070px"
      hasAvatar
      noTop
      deleteMultipleAction={deleteMultipleAction}
      massLoading={massLoading}
      massError={massError}
    />
  )
}
