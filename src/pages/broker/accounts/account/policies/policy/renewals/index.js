import React from 'react'
import { useLocation } from 'react-router-dom'
import { CreateRenewals } from './modals'
import ExtensionTable from './table'

const queryString = require('query-string')

export default function () {
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  return (
    <>
      <ExtensionTable renewals={[]} />
      {action === 'renewPolicy' && (
        <CreateRenewals isShowing={action === 'renewPolicy'} />
      )}
    </>
  )
}
