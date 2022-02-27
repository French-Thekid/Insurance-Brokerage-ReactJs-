import React, { useContext } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { UserContext } from 'context'
import { Colours, Core, FormControl, Content, Layout } from 'components'
import { SEND_MAIL } from '../../email/mutations'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router'
import { READ_USER } from '../../../../../../context/queries'

function DenialForm({ cancel, account }) {
  const user = useContext(UserContext)
  const { email, firstName, lastName } = user.loggedInUser || {}
  const { workflowRanBy, person } = account
  const match = useRouteMatch()
  const [sendMail, { error }] = useMutation(SEND_MAIL)

  const { loading: userLoading, data: userData } = useQuery(READ_USER, {
    variables: { id: workflowRanBy },
  })

  if (userLoading) {
    return (
      <>
        <Core.Text>Loading...</Core.Text>
      </>
    )
  }
  return (
    <>
      {error && (
        <Content.Alert
          type="error"
          message={
            'There was an error processing your response, please try again later.'
          }
          mb="16px"
        />
      )}
      <Formik
        initialValues={{
          reason: 'Approval denied due to',
        }}
        validationSchema={object().shape({
          reason: string()
            .required('Please enter a reason.')
            .min(4, 'Too short'),
        })}
        onSubmit={(values, action) => {
          action.setSubmitting(true)
          let data = {
            reason: values.reason,
            account: parseInt(match.params.accountId),
            deniedByUser: {
              name: `${firstName} ${lastName}`,
              email: email,
            },
            ranbyUser: {
              name: `${userData.firstName} ${userData.lastName}`,
              email: userData.email,
            },
          }
          sendMail({
            variables: {
              params: {
                accountId: data.account,
                to: 'tevondavisjc@gmail.com',
                cc: data.ranbyUser.email,
                subject: `Workflow for account ${person.firstName} ${person.lastName} denied by ${data.deniedByUser.name}`,
                html: values.reason,
              },
            },
          })
            .then(() => {
              setTimeout(() => window.location.reload(), 1000)
            })
            .catch((e) => console.log(e))
          action.setSubmitting(false)
        }}
      >
        {(props) => {
          const { values, handleChange, handleSubmit, isSubmitting, errors } =
            props
          return (
            <form onSubmit={handleSubmit}>
              <FormControl.Input
                id="reason"
                label="Reason"
                multiline
                type="text"
                value={values.reason}
                onChange={handleChange}
              />
              {errors.reason && (
                <Core.Text size="sm" color="red">
                  {errors.reason}
                </Core.Text>
              )}
              <br />
              <br />
              <Layout.Flex justify="space-between">
                <Core.Button
                  bgColour={Colours.blue}
                  disabled={isSubmitting}
                  style={{ margiRight: '12px' }}
                  width="100px"
                  type="submit"
                >
                  Send
                </Core.Button>
                <Core.Button
                  width="70px"
                  bgColour="#111"
                  onClick={() => cancel(false)}
                >
                  Cancel
                </Core.Button>
              </Layout.Flex>
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default DenialForm
