import React from 'react'
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom'
import { LIST_SLIPS } from '../queries'
import { DELETE_SLIP } from '../mutations'

import { useQuery, useMutation } from '@apollo/react-hooks'
import { Table, Loading, Content } from 'components'
import { DeleteSlip } from '../modal'
import { Logger } from '../../../../../../utils'

const queryString = require('query-string')

export default function () {
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const {
    params: { accountId },
  } = useRouteMatch()

  //MUTATION
  const [
    deleteSlip,
    { loading: deleting, error: failedDeleting },
  ] = useMutation(DELETE_SLIP, {
    refetchQueries: () => [
      {
        query: LIST_SLIPS,
        variables: {
          accountId: parseInt(accountId),
        },
      },
    ],
  })

  //QUERY
  const { loading, error, data: slipData } = useQuery(LIST_SLIPS, {
    variables: { accountId: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error) return <Content.Alert type="error" message={'Fail to load slip'} />

  // Sorting Slips
  slipData.listSlip.data.sort(
    (a, b) => new Date(b.submittedon) - new Date(a.submittedon)
  )

  const HeaderData = ['Icon', 'Slip Number', 'Created On', 'Submitted On']
  const RowData = slipData.listSlip.data.map(
    ({ id, createdon, submittedon, url }, index) => {
      return {
        icon: '',
        number: id.substring(0, 4),
        createdon,
        submittedon,
        url,
        id,
      }
    }
  )

  const deleteMultipleAction = (ids) => {
    ids.map((id, index) => 
      deleteSlip({
        variables: {
          id,
          accountId: parseInt(accountId),
        },
      })
        .then(() => {
          Logger('deleted a policy slip')
        })
        .catch((e) => console.log(e))
    )
    history.goBack()
  }
  const DeleteAction = (id) => history.push(`?action=deleteSlip&&id=${id}`)

  const handleRowClick = (slipId, url) => {
    localStorage.setItem('selectedSlip', url)
    history.push(`/broker/account/slips/${accountId}/view-slip/`)
  }

  return (
    <>
      <Table
        MainButtonpath={`/broker/account/slips/${accountId}/policy-selection/${accountId}`}
        title="Slips"
        RowData={RowData}
        HeaderData={HeaderData}
        Columns={`1fr 1fr 1fr 1fr`}
        buttonTitle="Create Slip"
        checkBoxNeeded
        deleteAction={DeleteAction}
        rowClick={handleRowClick}
        breakingPoint="858px"
        deleteMultipleAction={deleteMultipleAction}
        massLoading={deleting}
        massError={failedDeleting}
      />
      <DeleteSlip
        isShowing={action === 'deleteSlip'}
        loading={deleting}
        error={failedDeleting}
        deleteSlip={deleteSlip}
      />
    </>
  )
}
