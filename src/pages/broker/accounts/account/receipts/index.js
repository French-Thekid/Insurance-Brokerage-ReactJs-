import React from 'react'
// import { useQuery } from '@apollo/react-hooks'
// import { useLocation, useRouteMatch } from 'react-router-dom'

// import { Loading, Content } from 'components'
import PolicyTable from './table'
// import { LIST_POLICY } from './queries'

// const queryString = require('query-string')

function Receipts() {
  //   const { search } = useLocation()
  //   const {
  //     params: { accountId },
  //   } = useRouteMatch()
  //   const { action } = queryString.parse(search)

  return (
    <>
      <PolicyTable Receipts={[]} />
    </>
  )
}

export default Receipts
