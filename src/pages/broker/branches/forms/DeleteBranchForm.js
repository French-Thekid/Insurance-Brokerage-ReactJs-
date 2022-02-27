import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { FormControl, Core, Colours, Content, Loading } from 'components'
import { useLocation } from 'react-router-dom'

const queryString = require('query-string')

export default function ({ deleteHandler, loading, branchError, close }) {
  const { search } = useLocation()
  const { id: branchId } = queryString.parse(search)

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
          variables: { id: parseInt(branchId) },
        })
          .then(() => {
            close()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const { values, handleChange, handleSubmit, isSubmitting, errors } =
          props
        return (
          <form action="" onSubmit={handleSubmit}>
            {branchError && (
              <Content.Alert
                type="error"
                returnAfter
                message={'Failed to Delete Branch'}
              />
            )}
            {loading && <Loading small />}
            <Core.Text>
              Are you sure you want to delete this Branch?
              <br /> Type <b>delete</b> below to confirm
            </Core.Text>
            <br />
            <FormControl.Input
              id="deleteConfirmation"
              type="text"
              value={values.deleteConfirmation}
              onChange={handleChange}
              placeholder="Type 'delete' Here"
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
