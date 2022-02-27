import React from 'react'
import ExtensionTable from './table'
import { CreateExtension, DeleteExtension, EditExtension } from './modal'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_EXTENSIONS } from '../queries'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { deletePolicyExtensionMutation } from '../mutations'
import { Loading, Content } from 'components'

const queryString = require('query-string')

export default function () {
  const { search } = useLocation()
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { action } = queryString.parse(search)

  //MUTATION
  const [
    deletePolicyExtension,
    { loading: deleting, error: failedDeleting },
  ] = useMutation(deletePolicyExtensionMutation, {
    refetchQueries: () => [
      {
        query: LIST_EXTENSIONS,
        variables: {
          policyID: parseInt(policyId),
          accountID: parseInt(accountId),
        },
      },
    ],
  })

  //QUERY
  const { loading, error, data } = useQuery(LIST_EXTENSIONS, {
    variables: { policyID: parseInt(policyId), accountID: parseInt(accountId) },
  })
  if (loading) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Fail to load Extensions'} />

  return (
    <>
      <ExtensionTable
        deleteHandler={deletePolicyExtension}
        massLoading={deleting}
        massError={failedDeleting}
        Extensions={data.listPolicyExtension}
      />
      <CreateExtension isShowing={action === 'createExtension'} />
      <DeleteExtension
        loading={deleting}
        error={failedDeleting}
        deletePolicyExtension={deletePolicyExtension}
        isShowing={action === 'deleteExtension'}
      />
      {action === 'editExtension' && (
        <EditExtension isShowing={action === 'editExtension'} />
      )}
    </>
  )
}
