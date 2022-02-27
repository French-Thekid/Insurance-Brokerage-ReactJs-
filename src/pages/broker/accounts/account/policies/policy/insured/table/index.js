import React from 'react'
import { useHistory } from 'react-router-dom'

import { Table } from 'components'

export default function ({
  Insureds,
  deleteHandler,
  massLoading,
  massError,
  accountId,
  policyId,
}) {
  const history = useHistory()
  const HeaderData = ['Name', 'ID Number', 'Email', 'Main Insured']
  const RowData = Insureds.map(
    (
      {
        person: {
          gender,
          firstName,
          companyName,
          lastName,
          dlNumber,
          email,
          id,
          ...rest
        },
        isMain,
      },
      index
    ) => {
      let formattedDl = dlNumber

      // eslint-disable-next-line
      if (dlNumber != null || dlNumber != undefined) {
        formattedDl = dlNumber?.toString().split('')
        formattedDl.splice(3, 0, '-')
        formattedDl.splice(7, 0, '-')
        formattedDl.join('')
      }

      return {
        name: gender ? `${firstName} ${lastName}` : companyName,
        number: formattedDl || 'None Provided',
        email,
        isMain: isMain ? 'Yes' : 'No',
        id,
        dlNumber,
        firstName,
        lastName,
        gender,
        companyName,
        ...rest,
      }
    }
  )

  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteHandler({
        variables: {
          policyId: parseInt(policyId),
          accountId: parseInt(accountId),
          personId: parseInt(id),
        },
      }).catch((e) => console.log(e))
    )
    history.goBack()
  }

  const EditAction = (data) => {
    localStorage.setItem('activeInsured', JSON.stringify(data))
    history.push(`?action=editInsured&id=${data.id}`)
  }
  const DeleteAction = (id) => history.push(`?action=deleteInsured&id=${id}`)

  return (
    <Table
      title="Insureds on Policy"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 2fr 1fr`}
      breakingPoint="1280px"
      deleteAction={DeleteAction}
      editAction={EditAction}
      checkBoxNeeded
      noTopButton
      deleteMultipleAction={deleteMultipleAction}
      massLoading={massLoading}
      massError={massError}
    />
  )
}
