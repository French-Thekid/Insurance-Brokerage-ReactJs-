import React from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import Templates from './Template'
import CreateTemplate from './CreateTemplate'
import EditTemplate from './EditTemplate'

export default function () {
  const match = useRouteMatch()
  return (
    <>
      <Route exact path={`${match.url}`} component={Templates} />
      <Route exact path={`${match.url}/create`} component={CreateTemplate} />
      <Route exact path={`${match.url}/update`} component={EditTemplate} />
    </>
  )
}
