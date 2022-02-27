import React, { useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { AuthContext } from 'context'
import {} from 'components'
import { user } from './initialValues'
import { Core, Content, FormControl, Colours } from 'components'

function ForgetPasswordForm() {
  const history = useHistory()
  const { forgetPassword, emailErrors } = useContext(AuthContext)
  return (
    <Formik
      initialValues={user}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email must be valid!')
          .required('Email is a required field'),
      })}
      onSubmit={async ({ email }, actions) => {
        forgetPassword({
          username: email,
          history,
        })
      }}
    >
      {(props) => {
        const { values, isSubmitting, handleChange, handleSubmit, errors } =
          props
        return (
          <>
            <form onSubmit={handleSubmit} data-testid="sign-in-form">
              <p>Enter your email to receive a password reset code.</p>
              {emailErrors && (
                <Content.Alert type="error" message={emailErrors.message} />
              )}
              <br />
              <FormControl.Input
                id="email"
                label="Email"
                type="text"
                onChange={handleChange}
                value={values.email}
                error={errors.email}
                data-testid="sign-in-email"
                css={`
                  margin-top: 20px;
                `}
              />
              <FormControl.Error
                name="email"
                message={errors.email}
                data-testid="sign-in-email-error"
              />
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
                    Send
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

export default ForgetPasswordForm
