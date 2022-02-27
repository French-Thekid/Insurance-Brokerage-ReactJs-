import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { FORCE_RESET_USER } from '../mutations'
import { LIST_USERS } from '../queries'
import { useHistory } from 'react-router-dom'
import { Colours, FormControl, Core, Content, Loading } from 'components'
import { useMutation } from '@apollo/react-hooks'
import { Logger } from '../../../../utils'

function PasswordResetForm({ userId, firstName, lastName, email }) {
  const history = useHistory()

  const [adminForceResetUserPassword, { error, loading }] = useMutation(
    FORCE_RESET_USER,
    {
      refetchQueries: () => [
        {
          query: LIST_USERS,
        },
      ],
    }
  )

  return (
    <Formik
      initialValues={{
        resetConfirmation: '',
      }}
      validationSchema={object().shape({
        resetConfirmation: string()
          .test(
            'match',
            `Please type the User's ID to confirm.`,
            function (resetConfirmation) {
              return resetConfirmation === userId.toString()
            }
          )
          .required(`Please type the user's ID to confirm.`),
      })}
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true)
        //Execute function here
        adminForceResetUserPassword({
          variables: { email: email },
        })
          .then(() => {
            console.log('Done')
            Logger('force password reset', 'general', userId)
          })
          .catch((e) => console.log(e))
        //Close dialog after action
        history.goBack()
      }}
    >
      {(props) => {
        const { values, isSubmitting, handleChange, handleSubmit, errors } =
          props
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading />}
            {error && (
              <Content.Alert
                type="error"
                message={"Failed to reset this user's password."}
              />
            )}
            <p
              css={`
                color: ${Colours.text};
                line-height: 25px;
              `}
            >
              Are you sure you want to FORCE RESET{' '}
              <b style={{ color: Colours.blue }}>
                {firstName} {lastName}'s
              </b>{' '}
              Password?
              <br />
              Type the user ID <b style={{ color: Colours.blue }}>
                {userId}
              </b>{' '}
              <br />
              below to confirm
            </p>
            <br />
            <FormControl.Input
              label="User ID"
              id="resetConfirmation"
              type="text"
              placeholder="Type 'user Id' here"
              value={values.deleteConfirmation}
              onChange={handleChange}
              style={{ marginBottom: '0' }}
            />
            <FormControl.Error
              name="resetConfirmation"
              show={errors.resetConfirmation}
              message={errors.resetConfirmation}
            />
            <Core.Button
              bgColour={Colours.red}
              type="submit"
              disabled={isSubmitting}
              style={{ marginTop: '10px' }}
            >
              Force Reset Password
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}

export default PasswordResetForm
