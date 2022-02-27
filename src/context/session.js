import jwt from 'jsonwebtoken'
import { useGraph } from '../hooks/HttpGraphHook'
import { READ_USER } from './queries/index'
import React, { useEffect, useState } from 'react'
import { config } from '../config/config'
import { Logger } from '../utils'
// import { Logger } from '../utils/Log'

const container = {
  user: null,
  idToken: '',
  accessToken: '',
  initialize: false,
  refreshError: false,
  hasValidSession: false,
  clearSession: () => null,
  tokenRefreshingOnLoad: false,
  createAuthSession: () => null,
}

export const SessionContext = React.createContext(container)

export function SessionProvider(props) {
  /*
  |--------------------------------------------------------------------------
  | The state of the provider
  |--------------------------------------------------------------------------
  |
  | This is where all provider state is manage by using react state hook.
  |
  */

  const [state, setState] = useState(container)

  /*
  |--------------------------------------------------------------------------
  | Queries And Mutations
  |--------------------------------------------------------------------------
  |
  | Here is where we define all our queries and mutations for the controller.
  |
  */

  const { readUser } = useGraph()

  /*
  |--------------------------------------------------------------------------
  | Has Session
  |--------------------------------------------------------------------------
  |
  | Check if there is a valid session.
  |
  */

  useEffect(() => {
    if (hydrateSession()) {
      attemptTokenRefresh()

      setInterval(attemptTokenRefresh, 1000 * 60)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /*
  |--------------------------------------------------------------------------
  | Update State
  |--------------------------------------------------------------------------
  |
  | This function is used to update the state of the session provider.
  |
  */

  function hydrateSession() {
    const tokens = getTokens()

    if (tokens)
      setState((state) => ({
        ...state,
        user: getUser(),
        idToken: tokens.IdToken,
        accessToken: tokens.AccessToken,
        hasValidSession: hasValidSession(),
        initialize: true,
      }))
    else
      setState((state) => ({
        ...state,
        initialize: true,
      }))

    return tokens !== null
  }

  /*
  |--------------------------------------------------------------------------
  | Attempt Refresh
  |--------------------------------------------------------------------------
  |
  | This function is used to attempt a token refresh.
  |
  */

  function attemptTokenRefresh() {
    const result = calculateTimeToExpiration()

    const request = {
      method: 'POST',
      body: JSON.stringify({
        idToken: result.tokens.IdToken,
        refreshToken: result.tokens.RefreshToken,
      }),
      headers: { Authorization: `cognito ${result.tokens.IdToken}` },
    }

    if (result.time <= 10)
      fetch(`${config.REST_ENDPOINT}/auth/refresh-token`, request)
        .then(async (result) => {
          if (result.status >= 400) throw await result.json()

          handleTokenRefresh(await result.json())

          hydrateSession()
        })
        .catch(handleTokenRefreshError(result.time))
  }

  /*
  |--------------------------------------------------------------------------
  | Calculate Time
  |--------------------------------------------------------------------------
  |
  | This function calculate time to refresh.
  |
  */

  function calculateTimeToExpiration() {
    // Get token from local storage
    const tokens = getTokens()

    // decode the token
    const decodedTokenExpiration = jwt.decode(tokens.IdToken, {
      complete: true,
    }).payload.exp

    // The current time
    const currentTime = new Date(Date.now())

    // Convert token expiration time to milliseconds
    const tokenExpiration = new Date(decodedTokenExpiration * 1000)

    // Convert milliseconds to seconds
    const timeToExpiration = Math.floor((tokenExpiration - currentTime) / 60000)
    // console.log('session expires ', timeToExpiration, ' minutes')

    return { time: timeToExpiration, tokens }
  }

  /*
  |--------------------------------------------------------------------------
  | Update Token Handler
  |--------------------------------------------------------------------------
  |
  | This function is a handle called when the refresh token request is
  | successful.
  |
  */

  function handleTokenRefreshError(timeToExpiration) {
    if (timeToExpiration < 1) {
      return (error) => {
        console.log('Error when refreshing token: ', error)
        localStorage.removeItem('session')
        window.location.reload()
        setState((state) => ({ ...state, refreshError: true }))
      }
    }

    return (error) => {}
  }

  /*
  |--------------------------------------------------------------------------
  | Update Token Handler
  |--------------------------------------------------------------------------
  |
  | This function is a handle called when the refresh token request is
  | successful.
  |
  */

  function handleTokenRefresh(result) {
    console.log('Token Refresh: ', result)

    const currentSession = JSON.parse(localStorage.getItem('session'))

    currentSession.AuthenticationResult.IdToken =
      result.AuthenticationResult.IdToken

    currentSession.AuthenticationResult.AccessToken =
      result.AuthenticationResult.IdToken

    localStorage.setItem('session', JSON.stringify(currentSession))
  }

  /*
  |--------------------------------------------------------------------------
  | Has Session
  |--------------------------------------------------------------------------
  |
  | Check if there is a valid session.
  |
  */

  function hasValidSession() {
    const result = JSON.parse(localStorage.getItem('session') || '{}')

    return (
      result.hasOwnProperty('AuthenticationResult') &&
      result.AuthenticationResult.hasOwnProperty('TokenType') &&
      result.AuthenticationResult.TokenType === 'Bearer'
    )
  }

  /*
  |--------------------------------------------------------------------------
  | Auth User
  |--------------------------------------------------------------------------
  |
  | This function get the authenticated user from the session.
  |
  */

  const getUser = () => JSON.parse(localStorage.getItem('session') || '{}').user

  /*
  |--------------------------------------------------------------------------
  | Build Session
  |--------------------------------------------------------------------------
  |
  | Create a auth session in local storage.
  |
  */

  state.createAuthSession = (params) => {
    localStorage.setItem('session', JSON.stringify(params))
    const userId = jwt.decode(params.AuthenticationResult.IdToken, {
      complete: true,
    }).payload.sub
    localStorage.setItem('user', JSON.stringify({ id: userId, name: null }))
    // Logger('sign in')
    window.location.reload()
    readUser({ id: userId }, READ_USER, {
      idToken: params.AuthenticationResult.IdToken,
    }).then((user) => {
      params.user = { ...user, ...params.user }
      localStorage.setItem('session', JSON.stringify(params))
      window.location.reload()
    })
  }

  /*
  |--------------------------------------------------------------------------
  | Reset Session
  |--------------------------------------------------------------------------
  |
  | This function is used to clear the session and refresh the application,
  |
  |
  */

  state.clearSession = () => {
    localStorage.removeItem('session')
    localStorage.clear()
    Logger('sign out', 'auth', null, () => {
      window.location.reload()
    })
  }

  /*
  |--------------------------------------------------------------------------
  | Auth User
  |--------------------------------------------------------------------------
  |
  | This function get the authenticated user from the session.
  |
  */

  const getTokens = () =>
    JSON.parse(localStorage.getItem('session') || '{}').AuthenticationResult ||
    null

  return (
    <SessionContext.Provider value={state}>
      {state.initialize ? props.children : <div>Loading...</div>}
    </SessionContext.Provider>
  )
}
