import React from 'react'
import 'styled-components/macro'
import { object, string } from 'yup'
import { useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import { Colours, Core, FormControl, Loading, Content } from 'components'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_ORGANIZATION } from '../mutations'
import { LIST_ORGANIZATION } from '../queries'

const queryString = require('query-string')

function SuspendOrganisationForm({ close }) {
  const { search } = useLocation()
  const { organisationId, status } = queryString.parse(search)

  //Setting up mutation
  const [updateFacility, { loading, error: updateFacilityFailed }] =
    useMutation(UPDATE_ORGANIZATION, {
      refetchQueries: () => [
        {
          query: LIST_ORGANIZATION,
        },
      ],
    })

  return (
    <Formik
      initialValues={{
        suspendConfirmation: '',
      }}
      validationSchema={object().shape({
        suspendConfirmation: string()
          .matches(/suspend/, 'Please type suspend to confirm.')
          .required('Please type suspend to confirm.'),
      })}
      onSubmit={async (values, action) => {
        action.setSubmitting(true)
        await updateFacility({
          variables: {
            facility: {
              organizationId: organisationId,
              status,
            },
          },
        })
          .then(() => close())
          .catch((e) => {
            console.log(e)
            return (
              <FormControl.Error
                name="failed"
                show={true}
                message={'Failed to Suspend'}
              />
            )
          })
      }}
    >
      {(props) => {
        const { values, isSubmitting, handleChange, handleSubmit, errors } =
          props
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {updateFacilityFailed && (
              <Content.Alert
                type="error"
                message={updateFacilityFailed.message}
              />
            )}
            <Core.Text>
              Are you sure you want to suspend this Organization?
              <br />
              Type <b>suspend</b> below to confirm
            </Core.Text>
            <br />
            <FormControl.Input
              id="suspendConfirmation"
              type="text"
              placeholder="type 'suspend' here"
              value={values.deleteConfirmation}
              onChange={handleChange}
              style={{ marginBottom: '0' }}
            />
            <FormControl.Error
              name="suspendConfirmation"
              message={errors.suspendConfirmation}
            />
            <Core.Button
              bgColour={Colours.yellow}
              type="submit"
              action="READ"
              disabled={isSubmitting}
              style={{ marginTop: '10px' }}
            >
              Suspend
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}

export default SuspendOrganisationForm
