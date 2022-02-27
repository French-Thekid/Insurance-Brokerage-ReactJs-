import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import 'styled-components/macro'
import { Link } from 'react-router-dom'
import { FormControl, Core, Content, Loading } from 'components'
// import microsoftLogo from 'assets/microsoft.png'
// import googleLogo from 'assets/google.png'
import { usePostFetch } from '../../../hooks'
import { useCookies } from 'react-cookie'
import { SessionContext, AuthContext } from '../../../context'

function SignInForm() {
  // const history = useHistory()
  const { createAuthSession } = useContext(SessionContext)
  const [, setCookie] = useCookies(['isNewUser'])
  const {
    setForcePasswordResetReq,
    isForcePasswordResetReq: { status },
  } = useContext(AuthContext)
  const {
    errorCode = {},
    bodyData = {},
    postData: login,
    error: loginErrors,
    loading,
    data,
  } = usePostFetch({
    method: 'POST',
    url: `/v1/auth/signin`,
    useTokens: false,
  })

  const setNewUserType = (data) => {
    const {
      ChallengeParameters: { userAttributes },
    } = data
    setCookie('isNewUser', true, { path: '/' })
    setCookie('newUserToken', data.Session, { path: '/' })
    setCookie('newUserAttributes', userAttributes, { path: '/' })
  }

  //Checking if user has to forcibly change password
  if (errorCode && errorCode.code === 'PasswordResetRequiredException') {
    setForcePasswordResetReq({
      status: true,
      username: bodyData && bodyData.username,
    })
  }

  if (data) {
    //If Session present, then user is new
    if (data.Session) {
      setNewUserType(data)
    } else {
      createAuthSession(data)
    }
  }
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email must be valid!')
          .required('Email is a required field'),
        password: Yup.string().required('Password is a required field'),
      })}
      onSubmit={async ({ email, password }, actions) => {
        await login({
          username: email,
          password: password.trim(),
        })
        sessionStorage.removeItem('lastSession')
        actions.setSubmitting(false)
      }}
    >
      {(props) => {
        const {
          values: { email, password },
          isSubmitting,
          handleChange,
          handleSubmit,
          handleBlur,
          setFieldTouched,
          errors,
          touched,
        } = props

        const change = (name, e) => {
          e.persist()
          handleChange(e)
          setFieldTouched(name, true, false)
        }

        return (
          <>
            <form onSubmit={handleSubmit} data-testid="sign-in-form">
              {loading && <Loading overlay half small />}
              <Core.Text mb="12px" color="#767988">
                Welcome, please login to your account.
              </Core.Text>
              {loginErrors && !status && (
                <Content.Alert
                  type="error"
                  message={
                    loginErrors === 'Incorrect username or password.'
                      ? loginErrors
                      : loginErrors === 'User is disabled.'
                      ? 'Account Suspended'
                      : 'Fail to Login'
                  }
                />
              )}

              <FormControl.Input
                id="email"
                name="email"
                label="Email"
                type="text"
                onChange={change.bind(null, 'email')}
                onBlur={handleBlur}
                value={email}
                error={errors.email}
                data-testid="sign-in-email"
              />
              <FormControl.Error
                name="email"
                message={errors.email}
                show={touched.email && errors.email}
                data-testid="sign-in-email-error"
              />
              <br />
              <FormControl.Input
                id="password"
                label="Password"
                name="password"
                type="password"
                onChange={handleChange}
                value={password}
                data-testid="sign-in-password"
              />
              <FormControl.Error
                name="password"
                message={errors.password}
                data-testid="sign-in-email-error"
              />
              <div
                css={`
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  margin-bottom: 40px;
                `}
              >
                <div
                  css={`
                    display: grid;
                    grid-template-columns: max-content max-content;
                    grid-column-gap: 5px;
                    margin-top: 10px;
                  `}
                >
                  {/* <Checkbox id="remember-me" data-testid="sign-in-checkbox" /> */}
                  <FormControl.Checkbox
                    id="remember-me"
                    data-testid="sign-in-checkbox"
                  />
                  <label
                    htmlFor="remember-me"
                    css={`
                      font-size: 13px;
                      margin-bottom: 10px;
                      @media only screen and (max-width: 280px) {
                        font-size: 9px;
                      }
                      color: #767988;
                    `}
                  >
                    Remember Me
                  </label>
                </div>
                <div
                  css={`
                    text-align: right;
                    margin-top: 5px;
                  `}
                >
                  <Link
                    css={`
                      font-size: 12px;
                      color: #747474;
                      color: #767988;
                      @media only screen and (max-width: 280px) {
                        font-size: 9px;
                      }
                    `}
                    to="/forget-password"
                  >
                    Forgot Password
                  </Link>
                </div>
              </div>
              <Core.Button
                id="signup-submit"
                type="submit"
                disabled={isSubmitting}
                data-testid="sign-in-submit"
                action="READ"
              >
                Login
              </Core.Button>

              {/* <br />
              <Core.ButtonWithImage
                bottomMargin="10px"
                bgColour="#F5F5F5"
                fontColour="#707070"
                src={microsoftLogo}
                onClick={() => history.push(`/support/organisation`)}
              >
                Sign in with Microsoft
              </Core.ButtonWithImage>
              <Core.ButtonWithImage
                bottomMargin="10px"
                bgColour="#dc4e41"
                src={googleLogo}
              >
                Sign in with Google
              </Core.ButtonWithImage> */}
            </form>
          </>
        )
      }}
    </Formik>
  )
}

export default SignInForm
