import React from 'react'
import 'styled-components/macro'
import { object, string } from 'yup'
import { useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import { Colours, Core, FormControl, Loading } from 'components'
import { Logger } from '../../../../utils'

const queryString = require('query-string')

function SuspendOrganisationForm({ close, suspendHandler, loading }) {
  const { search } = useLocation()
  const { id } = queryString.parse(search)


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
        await suspendHandler({ variables: { id } })
          .then(() => Logger(`suspended a user`))
          .catch((e) => console.log(e))
        //Close dialog after action
        close()
      }}
    >
      {(props) => {
        const {
          values,
          isSubmitting,
          handleChange,
          handleSubmit,
          errors,
        } = props
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            <Core.Text>
              Are you sure you want to suspend this User?
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
