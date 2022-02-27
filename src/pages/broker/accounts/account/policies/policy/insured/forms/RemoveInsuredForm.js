import React from 'react'
import 'styled-components/macro'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { Colours, FormControl, Core, Loading } from 'components'
import { Logger } from '../../../../../../../../utils'

const queryString = require('query-string')

function DeleteOrganisationForm({ close, deletePolicyHaveInsured, deleting }) {
  const { search } = useLocation()
  const { id: personId } = queryString.parse(search)
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

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
        deletePolicyHaveInsured({
          variables: {
            policyId: parseInt(policyId),
            accountId: parseInt(accountId),
            personId: parseInt(personId),
          },
        })
          .then(() => {
            Logger('remove insured')
            close()
          })
          .catch((e) => console.log(e))
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
          <form action="" onSubmit={handleSubmit}>
            {deleting && <Loading small />}
            <Core.Text>
              Are you sure you want to delete? <br />
              Type{' '}
              <b
                css={`
                  color: ${Colours.red};
                `}
              >
                delete
              </b>{' '}
              below to confirm
            </Core.Text>
            <br />
            <FormControl.Input
              id="deleteConfirmation"
              type="text"
              value={values.deleteConfirmation}
              onChange={handleChange}
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
