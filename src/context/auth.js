import React, { useState, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Request } from '../utils'
// import { Logger } from '../utils/Log'
// import { SessionContext } from './session'

const AuthContext = React.createContext()
const { Provider } = AuthContext
// const { ...session } = SessionContext

function getInitialUserToken() {
  let tokens = {
    AuthenticationResult: {
      AccessToken: '',
      RefreshToken: '',
    },
  }
  let newUserTokens = {
    ChallengeParameters: {
      userAttributes: {
        email: '',
      },
    },
    Session: '',
  }
  return { tokens, newUserTokens }
}

function AuthProvider({ children }) {
  const initialUserTokens = getInitialUserToken()
  const [tokens, setTokens] = useState(initialUserTokens.tokens)
  const [newUserTokens] = useState(initialUserTokens.newUserTokens)
  const [cookies, setCookie] = useCookies(['sessionToken', 'isLoggedIn'])
  const { sessionToken, isLoggedIn } = cookies
  const refreshToken = localStorage.getItem('refreshToken')
  const [errors, setErrors] = useState(null)
  const [, setLoggedIn] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [isForcePasswordResetReq, setForcePasswordResetReq] = useState({
    status: false,
    username: '',
  })
  const [isBrokerUser] = useState(false)
  const [, , removeCookie] = useCookies([
    'isLoggedIn',
    'isBrokerUser',
    'isSupportUser',
    'sessionToken',
    'accessToken',
  ])

  const halfHour = 3400000
  let [emailErrors, setEmailErrors] = useState(null)
  /**Fetch the refresh token if user has logged in */
  useEffect(() => {
    const timerId = setInterval(() => {
      const fetchRefreshToken = async () => {
        const result = await Request({
          url: 'v1/auth/refresh-token',
          type: 'post',
          body: {
            refreshToken,
          },
          authorization: sessionToken,
        })
        const json = await result.json()
        if (result.ok) {
          //Set the new tokens and merge the refresh token, back into state
          let {
            AuthenticationResult: { IdToken, AccessToken },
          } = json
          setCookie('sessionToken', IdToken, { path: '/' })
          setCookie('accessToken', AccessToken, { path: '/' })
        } else {
          setErrors(json)
        }
      }
      isLoggedIn && fetchRefreshToken()
    }, halfHour)
    return () => clearInterval(timerId)
  }, [sessionToken, refreshToken, isLoggedIn, setCookie])

  const updatePassword = async ({ password, email }) => {
    try {
      const { Session } = newUserTokens
      const result = await Request({
        url: `v1/auth/change-temporary-password`,
        type: 'post',
        body: {
          username: email,
          password,
          sessionToken: Session,
        },
      })
      const json = await result.json()

      //Catch 4XX errors
      if (!result.ok) {
        setErrors(json)
      } else {
        setTokens(json)
        setLoggedIn(true)
        setIsNewUser(false)
      }
    } catch (error) {
      setErrors(error)
    }
  }

  const forgetPassword = async ({ username, history }) => {
    try {
      const result = await Request({
        type: 'post',
        url: 'v1/auth/forgot-password',
        body: {
          username: username,
        },
      })
      let { status } = result
      const json = await result.json()
      if (json.CodeDeliveryDetails) {
        setEmailErrors(null)
        history.push('/forget-password-confirmation', { username })
      } else if (json.code) {
        if (json.code === 'UserNotFoundException') {
          setEmailErrors({ message: 'Email not found.' })
        } else {
          setEmailErrors(json)
        }
      } else if (status !== 200) {
        setEmailErrors(json)
        return
      }
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setEmailErrors({
          message:
            'Failed to fetch, Please check your internet connection and try again',
        })
      } else {
        setEmailErrors(error)
      }
    }
  }

  const resendCode = async (email) => {
    try {
      const result = await Request({
        type: 'post',
        url: 'v1/auth/forgot-password',
        body: {
          username: email,
        },
      })
      let { status } = result
      const json = await result.json()
      if (json.CodeDeliveryDetails) {
      } else if (json.code) {
        if (json.code === 'UserNotFoundException') {
          setEmailErrors({ message: 'Email not found.' })
        } else {
          setEmailErrors(json)
        }
      } else if (status !== 200) {
        setEmailErrors(json)
        return
      }
    } catch (error) {
      if (error.message === 'Failed to fetch') {
        setEmailErrors({
          message: 'Please check your internet connection and try again',
        })
      } else {
        setEmailErrors(error)
      }
    }
  }

  const resetPassword = async ({
    confirmationCode,
    password,
    history,
    email,
  }) => {
    try {
      const result = await Request({
        type: 'post',
        url: 'v1/auth/confirm-forgot-password',
        body: {
          username: email,
          password: password,
          confirmationCode: confirmationCode,
        },
      })
      const json = await result.json()
      if (result.ok) {
        setEmailErrors(null)
        history.push('/')
      } else {
        setEmailErrors(json)
        return
      }
    } catch (error) {
      setEmailErrors(error)
    }
  }

  const logout = () => {
    // Logger('sign out')
    removeCookie('sessionToken', { path: '/' })
    removeCookie('accessToken', { path: '/' })
    setTokens({})
    setLoggedIn(false)
    localStorage.removeItem('selectedDocument')
    localStorage.removeItem('organisations')
    localStorage.removeItem('CalendarId')
    localStorage.removeItem('currentUserId')
    localStorage.removeItem('template')
    localStorage.removeItem('workflow')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('organisations')
    localStorage.removeItem('currentUser')
    localStorage.removeItem('selectedSlip')
    localStorage.removeItem('users')
    localStorage.removeItem('Slip')
    localStorage.removeItem('tokens')
    localStorage.removeItem('isLoggedIn')
  }

  const loginSSO = (event) => {
    const { data: json } = event
    if (json.AuthenticationResult) {
      setTokens(json)
      setLoggedIn(true)
    } else if (json.Session) {
      setTokens(json)
    } else if (json.code) {
      setErrors(json)
      return
    }
  }

  //TODO: find better way to listen out for SSO events
  window.addEventListener('message', loginSSO)
  return (
    <Provider
      value={{
        isLoggedIn,
        isNewUser,
        isForcePasswordResetReq,
        setForcePasswordResetReq,
        isBrokerUser,
        forgetPassword,
        resendCode,
        resetPassword,
        loginSSO,
        tokens,
        newUserTokens,
        errors,
        emailErrors,
        setEmailErrors,
        updatePassword,
        logout,
      }}
    >
      {children}
    </Provider>
  )
}

export { AuthContext, AuthProvider }
