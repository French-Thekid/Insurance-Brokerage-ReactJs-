import React, { useContext, useState } from 'react'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useHttpPost } from 'hooks'
import { UserContext } from 'context'
import { Colours, Core, FormControl, Content } from '../../../../components'
import { Logger } from '../../../../utils'

function CreateWorkflowForm({ workflow }) {
  const request = useHttpPost('/organization/workflow')
  const [error, setError] = useState(false)
  const user = useContext(UserContext)
  const { id } = user.loggedInUser || {}
  const history = useHistory()
  const validate = (values) => {
    const errors = {}
    if (values.name === 'none' || values.name === 'None') {
      errors.name = 'Name cannot be none'
    }
    return errors
  }
  if (workflow.Step.getAll().length < 1) {
    return (
      <Content.Alert
        type="warning"
        message="It looks like you havent selected any steps, try inserting a few steps before saving."
      />
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
      {workflow.Step.getAll().length < 2 ? (
        <Content.Alert
          mb="20px"
          type="info"
          message={`For the best experience with workflows try using more than ${
            workflow.Step.getAll().length
          } steps.`}
        />
      ) : null}
      <Formik
        initialValues={{
          name: workflow.Details.get().name,
          description: workflow.Details.get().description,
        }}
        validate={validate}
        validationSchema={object().shape({
          name: string().required('Please enter a name.').min(2),
          description: string()
            .required('Please enter a description.')
            .min(4, 'Too short'),
        })}
        onSubmit={(values, action) => {
          action.setSubmitting(true)
          let data = {
            ...workflow.get(),
            name: values.name,
            description: values.description,
            createdBy: id,
          }
          request(data)
            .then(() => {
              Logger('create workflow')
              history.push('/broker/settings/workflows')
              setTimeout(() => window.location.reload(), 1000)
            })
            .catch((err) => {
              setError(err)
            })
          action.setSubmitting(false)
        }}
      >
        {(props) => {
          const { values, handleChange, handleSubmit, isSubmitting, errors } =
            props
          return (
            <form onSubmit={handleSubmit}>
              <FormControl.Input
                id="name"
                label="Name"
                type="text"
                value={values.name}
                onChange={handleChange}
              />
              {errors.name && (
                <Core.Text size="sm" color="red">
                  {errors.name}
                </Core.Text>
              )}
              <br />
              <br />
              <FormControl.Input
                id="description"
                label="Description"
                multiline
                rows={4}
                type="text"
                value={values.description}
                onChange={handleChange}
              />
              {errors.description && (
                <Core.Text size="sm" color="red">
                  {errors.description}
                </Core.Text>
              )}

              <br />
              <br />
              <Core.Button
                bgColour={Colours.blue}
                disabled={isSubmitting}
                type="submit"
              >
                Save & exit
              </Core.Button>
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default CreateWorkflowForm
