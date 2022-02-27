import React, { createContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { LOGGED_IN_USER } from './queries'
import { Content, Loading } from '../components'

const UserContext = createContext({})
const { Provider } = UserContext
function UserProvider({ children }) {
  const userType = JSON.parse(localStorage.getItem('session'))

  const { user: { role = null } = {} } = userType || {}

  let user = {}
  if (userType === undefined || userType === null) user = {}
  else user = GetUser() || {}

  const { loggedInUser } = user || {}
  persistUser(loggedInUser)
  const Values = { loggedInUser, userType: role }

  return <Provider value={Values}>{children}</Provider>
}

function persistUser(user) {
  if (user) {
    let existing = JSON.parse(localStorage.getItem('user'))
    let name = user.firstName + ' ' + user.lastName
    existing.name = name
    localStorage.setItem('user', JSON.stringify(existing))
  }
}

export { UserContext, UserProvider }

function GetUser() {
  //Query
  const { loading, error, data } = useQuery(LOGGED_IN_USER)
  if (loading) return <Loading />
  if (error) return <Content.Alert type="error" message={error.message} />

  return data
}
