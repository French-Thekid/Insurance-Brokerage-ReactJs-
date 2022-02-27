import React, { useContext } from 'react'
import { AuthContext } from 'context'
import { Formik } from 'formik'
import * as Yup from 'yup'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'

import { FormControl, Colours, PasswordStrength } from 'components'
import { Core } from 'components'

function ForgetPasswordConfirmationForm({
  user = { code: '', password: '', passwordConfirmation: '' },
  email,
  force,
}) {
  const history = useHistory()

  const { resetPassword, resendCode, setForcePasswordResetReq } = useContext(
    AuthContext
  )

  return (
    <Formik
      initialValues={user}
      validationSchema={Yup.object().shape({
        code: Yup.string('Code must be valid!')
          .required('Code is a required field')
          .min(6, 'Please check the length of the code')
          .max(6, 'Please check the length of the code'),
        password: Yup.string().required('Password is required'),
        passwordConfirmation: Yup.string()
          .required('Password Confirmation is required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      onSubmit={async (values, actions) => {
        setForcePasswordResetReq({
          status: false,
          username: '',
        })
        await resetPassword({
          confirmationCode: values.code,
          password: values.password,
          history,
          email,
        })
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleSubmit,
          isSubmitting,
          errors,
        } = props
        return (
          <>
            <form onSubmit={handleSubmit} data-testid="sign-in-form">
              {force === true ? (
                <p>
                  Your <b>Administrator</b> has initiated a{' '}
                  <b style={{ color: Colours.red }}>force password reset</b> on
                  your account,
                  <br /> therefore in order to continue you are required to
                  enter the
                  <b style={{ color: Colours.blue }}> code</b> that <br />
                  was sent to your email as well as{' '}
                  <b style={{ color: Colours.blue }}>create a new password</b>
                </p>
              ) : (
                <p>
                  Please enter the <b style={{ color: Colours.blue }}>code</b>{' '}
                  that was sent to your
                  <br /> email, along with your{' '}
                  <b style={{ color: Colours.blue }}>new password</b>.
                </p>
              )}
              <FormControl.Input
                id="code"
                label="Code"
                type="text"
                onChange={handleChange}
                value={values.code}
                error={errors.code}
                data-testid="forget-password-code"
              />

              <FormControl.Error
                name="code"
                message={errors.code}
                data-testid="forget-password-code-error"
              />
              <FormControl.Input
                id="password"
                label="Password"
                type="text"
                onChange={handleChange}
                value={values.password}
                error={errors.password}
                data-testid="forget-password-email"
                css={`
                  margin-top: 10px;
                `}
              />
              <FormControl.Error
                name="password"
                message={errors.password}
                data-testid="forget-password-password-error"
              />

              <FormControl.Input
                id="passwordConfirmation"
                label="Password Confirmation"
                type="text"
                onChange={handleChange}
                value={values.passwordConfirmation}
                error={errors.passwordConfirmation}
                data-testid="forget-password-passwordConfirmation"
                css={`
                  margin-top: 10px;
                `}
              />
              <FormControl.Error
                name="passwordConfirmation"
                message={errors.passwordConfirmation}
                data-testid="forget-password-passwordConfirmation-error"
              />
              {!force ? (
                <div
                  css={`
                    text-align: right;
                  `}
                >
                  <label
                    css={`
                      font-size: 12px;
                      color: #747474;
                      background-color: white;
                      border: none;
                      &:hover {
                        cursor: pointer;
                      }
                    `}
                    onClick={() => resendCode(email)}
                  >
                    <u>Resend Code</u>
                  </label>
                </div>
              ) : (
                <div />
              )}
              <PasswordStrength password={values.password} />
              <section
                css={`
                  width: 100%;
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  padding: 0px 0px 20px 0px;
                  margin-top: 20px;
                `}
              >
                <section
                  css={`
                    width: 130px;
                    @media only screen and (max-width: 354px) {
                      width: 100%;
                    }
                  `}
                >
                  <Core.Button
                    onClick={() => {
                      history.push('/')
                    }}
                    bgColour="white"
                    type="button"
                    css={`
                      color: ${Colours.blue};
                      border: 1px solid ${Colours.blue};
                    `}
                    data-testid="forget-password-cancel"
                    outline
                    action="READ"
                  >
                    Cancel
                  </Core.Button>
                </section>
                <section
                  css={`
                    width: 130px;
                    @media only screen and (max-width: 354px) {
                      width: 100%;
                    }
                  `}
                >
                  <Core.Button
                    action="READ"
                    type="submit"
                    data-testid="forget-password-submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Core.Button>
                </section>
              </section>
            </form>
          </>
        )
      }}
    </Formik>
  )
}

export default ForgetPasswordConfirmationForm
