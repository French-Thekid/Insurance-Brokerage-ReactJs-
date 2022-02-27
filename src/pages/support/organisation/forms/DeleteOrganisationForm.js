import React from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { Colours, FormControl, Core, Loading, Content } from 'components'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_ORGANIZATION } from '../mutations'
import { LIST_ORGANIZATION } from '../queries'

const queryString = require('query-string')

function DeleteOrganisationForm({ close }) {
  const { search } = useLocation()
  const { organisationId } = queryString.parse(search)

  const [deleteFacility, { loading, error: deleteFacilityFailed }] =
    useMutation(DELETE_ORGANIZATION, {
      refetchQueries: () => [
        {
          query: LIST_ORGANIZATION,
        },
      ],
    })

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
        await deleteFacility({
          variables: {
            id: new Array(organisationId),
          },
        })
          .then(() => close())
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const { values, handleChange, handleSubmit, isSubmitting, errors } =
          props
        return (
          <form action="" onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {deleteFacilityFailed && (
              <Content.Alert
                type="error"
                message="Fail to delete Medical Facility"
              />
            )}
            <Core.Text>
              Are you sure you want to delete? Type <b>delete</b> below to
              confirm
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
              action="READ"
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
