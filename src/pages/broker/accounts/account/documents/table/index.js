import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'

import { Table, Loading } from 'components'
import { LIST_FILES } from '../queries'
import { DELETE_FILE } from '../mutations'
import { useMutation } from '@apollo/react-hooks'
import { Logger } from '../../../../../../utils'

export default function ({ setDocURL, documentList }) {
  const history = useHistory()
  const {
    params: { accountId },
  } = useRouteMatch()

  const [deleteAccountFile, { loading: deletingDoc, error }] = useMutation(
    DELETE_FILE,
    {
      refetchQueries: () => [
        {
          query: LIST_FILES,
          variables: { accountId: parseInt(accountId) },
        },
      ],
    }
  )

  const HeaderData = ['Titles']
  const RowData = documentList.map(({ name, id, url, description }, index) => {
    return {
      name,
      id,
      url,
      description,
    }
  })

  const deleteMultipleAction = (ids) => {
    ids.map((id, index) =>
      deleteAccountFile({
        variables: {
          accountId: parseInt(accountId),
          fileId: id,
        },
      })
        .then(() => {
          Logger('deleted a document')
        })
        .catch((e) => console.log(e))
    )
    history.goBack()
  }

  const DeleteAction = (id) =>
    deleteAccountFile({
      variables: {
        accountId: parseInt(accountId),
        fileId: id,
      },
    })
      .then(() => {
        Logger('deleted a document')
      })
      .catch((e) => console.log(e))

  const handleRowClick = (id, url) => {
    history.push(`?docId=${id}`)
    setDocURL(url)
  }

  return (
    <>
      {deletingDoc && <Loading small />}
      <Table
        title="Documents"
        alignment="start"
        justify="start"
        RowData={RowData}
        HeaderData={HeaderData}
        Columns={`1fr`}
        noTop
        checkBoxNeeded
        deleteAction={DeleteAction}
        breakingPoint="376px"
        rowClick={handleRowClick}
        deleteMultipleAction={deleteMultipleAction}
        massLoading={deletingDoc}
        massError={error}
        squeeze
      />
    </>
  )
}
