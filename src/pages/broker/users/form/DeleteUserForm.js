import React from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { Colours, FormControl, Core, Loading } from 'components'
import { Logger } from '../../../../utils'

const queryString = require('query-string')

function DeleteOrganisationForm({ close, deleteHandler, loading }) {
  const { search } = useLocation()
  const { id } = queryString.parse(search)

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
        await deleteHandler({ variables: { id } })
          .then(() => Logger(`deleted a user`))
          .catch((e) => console.log(e))
        close()
      }}
    >
      {(props) => {
        const { values, handleChange, handleSubmit, isSubmitting, errors } =
          props
        return (
          <form action="" onSubmit={handleSubmit}>
            {loading && <Loading small />}
            <Core.Text>
              Are you sure you want to delete? <br />
              Type <b>delete</b> below to confirm
            </Core.Text>
            <br />
            <FormControl.Input
              id="deleteConfirmation"
              type="text"
              value={values.deleteConfirmation}
              onChange={handleChange}
              placeholder="Type 'delete' here"
            />
            <FormControl.Error
              name="deleteConfirmation"
              message={errors.deleteConfirmation}
            />
            <br />
            <Core.Button
              bgColour={Colours.red}
              type="submit"
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

export default DeleteOrganisationForm
