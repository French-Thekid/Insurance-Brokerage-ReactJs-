import React from 'react'
import BranchTable from './table'
import { Layout, Loading, Content } from 'components'
import { useLocation } from 'react-router-dom'
import { LIST_BRANCHES } from './forms/queries'
import { DELETE_BRANCH } from './forms/mutations'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CreateBranch, EditBranch, DeleteBranch, ViewBranch } from './modals'

const queryString = require('query-string')

export default function Branchs() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const [deleteBranch, { loading: deleting, error: BranchError }] = useMutation(
    DELETE_BRANCH,
    {
      refetchQueries: () => [
        {
          query: LIST_BRANCHES,
        },
      ],
    }
  )

  const {
    loading: isBranchsLoading,
    error: BranchErrors,
    data: BranchList,
  } = useQuery(LIST_BRANCHES)

  if (isBranchsLoading) return <Loading small />
  if (BranchErrors)
    return <Content.Alert type="error" message={'Failed to load Branchs'} />

  const { listBranches } = BranchList || {}
  const { data = [] } = listBranches || {}

  return (
    <Layout.Container>
      <BranchTable
        deleteHandler={deleteBranch}
        massLoading={deleting}
        massError={BranchError}
        Branches={data}
      />
      <CreateBranch isShowing={action === 'createBranch'} />
      <EditBranch isShowing={action === 'editBranch'} />
      <DeleteBranch
        deleteHandler={deleteBranch}
        loading={deleting}
        BranchError={BranchError}
        isShowing={action === 'deleteBranch'}
      />
      <ViewBranch isShowing={action === 'viewBranch'} />
    </Layout.Container>
  )
}
