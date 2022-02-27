import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { FormControl, Core, Colours, Content, Loading } from 'components'
import { useHistory, useLocation } from 'react-router-dom'
import { Logger } from '../../../../utils'

const queryString = require('query-string')

export default function ({
  showNotificationDelete,
  deleteHandler,
  loading,
  insurerError,
}) {
  const { search } = useLocation()
  const { id: insurerId } = queryString.parse(search)

  const history = useHistory()

  return (
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
        console.log('here')
        await deleteHandler({
          variables: { id: parseInt(insurerId) },
        })
          .then(() => {
            Logger('deleted an insurer')
            showNotificationDelete()
            history.goBack()
          })
          .catch((e) => console.log(e))
        // console.log('Deleting: ', insurerId)
      }}
    >
      {(props) => {
        const { values, handleChange, handleSubmit, isSubmitting, errors } =
          props
        return (
          <form action="" onSubmit={handleSubmit}>
            {insurerError && (
              <Content.Alert
                type="error"
                returnAfter
                message={'Failed to Delete Insurer'}
              />
            )}
            {loading && <Loading small />}
            <Core.Text>
              Are you sure you want to delete this Insurer?
              <br /> Type <b>delete</b> below to confirm
            </Core.Text>
            <br />
            <FormControl.Input
              id="deleteConfirmation"
              type="text"
              value={values.deleteConfirmation}
              onChange={handleChange}
              placeholder="type 'delete' here"
            />
            <FormControl.Error
              name="deleteConfirmation"
              message={errors.deleteConfirmation}
            />
            <br />
            <Core.Button
              bgColour={Colours.red}
              type="submit"
              // action="READ"
              disabled={isSubmitting}
            >
              Delete
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
