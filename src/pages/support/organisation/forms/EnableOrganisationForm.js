import React from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import { Colours, Core, FormControl, Loading, Content } from 'components'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_ORGANIZATION } from '../mutations'
import { LIST_ORGANIZATION } from '../queries'

const queryString = require('query-string')

function EnableOrganisationForm({ close }) {
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
                message={'Failed to Enable'}
              />
            )
          })
      }}
    >
      {(props) => {
        const { isSubmitting, handleSubmit } = props
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
              Are you sure you want to enable this organization?
              <br />
              press <b>continue</b> below to confirm
            </Core.Text>
            <br />
            <Core.Button
              bgColour={Colours.blue}
              type="submit"
              action="READ"
              disabled={isSubmitting}
              style={{ marginTop: '10px' }}
            >
              Continue
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}

export default EnableOrganisationForm
