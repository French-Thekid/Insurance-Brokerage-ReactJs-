import React from 'react'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import 'styled-components/macro'
import { PasswordStrength, FormControl, Loading } from 'components'
import { Core, Content } from 'components'
import { usePostFetch } from 'hooks'
import { withCookies } from 'react-cookie'

function NewPasswordForm({
  newPassword = { password: '', passwordConfirmation: '' },
  cookies,
}) {
  const history = useHistory()
  const { newUserToken, newUserAttributes } = cookies.cookies
  const {
    postData: updatePassword,
    error: updateErrors,
    loading,
    data,
  } = usePostFetch({
    method: 'POST',
    url: `/v1/auth/change-temporary-password`,
    useTokens: false,
  })

  let { email } = JSON.parse(newUserAttributes)
  if (data) {
    let {
      AuthenticationResult: { RefreshToken: UserRefreshToken },
    } = data
    // Remove old cookies
    cookies.remove('isNewUser', { path: '/' })
    cookies.remove('newUserToken', { path: '/' })

    localStorage.setItem('refreshToken', UserRefreshToken)
    history.push('/')
  }

  const passwordRegExp1 = /[a-z]/
  const passwordRegExp2 = /[A-Z]/
  const passwordRegExp3 = /[0-9]/

  return (
    <Formik
      initialValues={newPassword}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .matches(passwordRegExp1, 'Lower Case value required')
          .matches(passwordRegExp2, 'Upper Case value required')
          .matches(passwordRegExp3, 'Numeric value required')
          .required('Password is required')
          .min(8),
        passwordConfirmation: Yup.string()
          .required('Password Confirmation is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={async ({ password }, actions) => {
        updatePassword({
          username: email,
          password,
          sessionToken: newUserToken,
        })
        actions.setSubmitting(true)
      }}
    >
      {(props) => {
        const {
          values,
          isSubmitting,
          handleChange,
          handleSubmit,
          errors,
        } = props
        return (
          <>
            <form onSubmit={handleSubmit}>
              {updateErrors && (
                <Content.Alert
                  type="error"
                  message={'Fail to update password.'}
                />
              )}
              {loading && <Loading half small />}
              <section
                css={`
                  width: 100%;
                  text-align: center;
                `}
              >
                <p>Please create a new password. </p>
              </section>
              <section
                css={`
                  display: grid;
                  grid-template-columns: 1fr max-content;
                  grid-column-gap: 5px;
                  align-items: center;
                  margin-top: 20px;
                  width: 294px;
                `}
              >
                <FormControl.Input
                  id="password"
                  label="Password"
                  type="password"
                  onChange={handleChange}
                  value={values.password}
                  error={errors.password}
                  data-testid="new-password-password"
                  style={{ color: '#707070', marginBottom: '2px' }}
                />
                {/* <img
                  alt="eye"
                  height={type === 'password' ? '10px' : '15px'}
                  weight="10px"
                  src={type === 'password' ? reveal : hide}
                  css={`
                    &:hover {
                      cursor: pointer;
                    }
                  `}
                  onClick={() =>
                    setType(type === 'password' ? 'text' : 'password')
                  }
                /> */}
              </section>
              <FormControl.Error
                name="password"
                message={errors.password}
                data-testid="new-password-error"
              />
              <FormControl.Input
                id="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                // type={type}
                onChange={handleChange}
                value={values.passwordConfirmation}
                error={errors.passwordConfirmation}
                data-testid="new-password-passwordConfirmation"
                style={{
                  color: '#707070',
                  marginBottom: '2px',
                  marginTop: '30px',
                }}
              />
              <FormControl.Error
                name="passwordConfirmation"
                message={errors.passwordConfirmation}
                data-testid="new-password-confirmation-error"
              />
              <PasswordStrength password={values.password} />
              <div
                css={`
                  margin-bottom: 40px;
                `}
              />

              <Core.Button
                type="submit"
                id="submit"
                disabled={isSubmitting}
                data-testid="new-password-submit"
                action="READ"
              >
                Update Password
              </Core.Button>
            </form>
          </>
        )
      }}
    </Formik>
  )
}

export default withCookies(NewPasswordForm)
