import React, { useContext } from 'react'
import 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { usePostFetch } from 'hooks'
import { SessionContext } from 'context'
import { Colours, Core, FormControl, Content } from 'components'
import { Logger } from '../../../../utils'
// import { Logger } from '../../../../../utils/Log'

const queryString = require('query-string')

function DeleteWorkflowForm({ isShowing, close }) {
  const { idToken } = useContext(SessionContext)
  const { search } = useLocation()
  const { workflowId } = queryString.parse(search)
  const history = useHistory()

  const { postData: deleteWorkflow, error } = usePostFetch({
    method: 'DELETE',
    url: `/v1/organization/workflow/delete?query=${workflowId}`,
    tokens: idToken,
  })
  return (
    <>
      {error && <Content.Alert type="warning" message={error.message} />}
      <Formik
        initialValues={{
          deleteConfirmation: '',
        }}
        validationSchema={object().shape({
          deleteConfirmation: string()
            .matches(/delete/, 'Please enter delete to confirm.')
            .required('Please enter delete to confirm.'),
        })}
        onSubmit={async (values, action) => {
          action.setSubmitting(true)
          await deleteWorkflow()
            .then(() => {
              Logger('delete workflow')
              history.push('/broker/settings/workflows')
            })
            .finally(() => {
              window.location.reload()
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
            <form onSubmit={handleSubmit}>
              <p>
                Are you sure you want to delete?
                <br /> Type{' '}
                <b
                  css={`
                    color: ${Colours.red};
                  `}
                >
                  delete
                </b>{' '}
                below to confirm
              </p>
              <br />
              <FormControl.Input
                id="deleteConfirmation"
                type="text"
                value={values.deleteConfirmation}
                onChange={handleChange}
              />
              {errors.deleteConfirmation && (
                <Core.Text size="sm" color="red">
                  {errors.deleteConfirmation}
                </Core.Text>
              )}
              <br />
              <br />
              <Core.Button
                bgColour={Colours.red}
                disabled={isSubmitting}
                type="submit"
              >
                Delete
              </Core.Button>
            </form>
          )
        }}
      </Formik>
    </>
  )
}

export default DeleteWorkflowForm
