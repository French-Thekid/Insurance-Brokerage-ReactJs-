import React from 'react'
import 'styled-components/macro'
import { useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import { Colours, Core, Loading } from 'components'
import { Logger } from '../../../../utils'

const queryString = require('query-string')

function EnableOrganisationForm({ close, enableHandler, loading }) {
  const { search } = useLocation()
  const { id } = queryString.parse(search)

  return (
    <Formik
      initialValues={{
        suspendConfirmation: '',
      }}
      onSubmit={async (values, action) => {
        action.setSubmitting(true)
        await enableHandler({ variables: { id } })
          .then(() => Logger(`unsuspend a user`))
          .catch((e) => console.log(e))
        //Close dialog after submission
        close()
      }}
    >
      {(props) => {
        const { isSubmitting, handleSubmit } = props
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            <Core.Text>
              Are you sure you want to enable this User?
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
