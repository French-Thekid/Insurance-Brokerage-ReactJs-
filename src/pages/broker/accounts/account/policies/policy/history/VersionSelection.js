import React from 'react'
import PolicyTable from './table'

export default function () {
  let versions = [JSON.parse(localStorage.getItem('activePolicy'))]

  return <PolicyTable versions={versions} />
}
