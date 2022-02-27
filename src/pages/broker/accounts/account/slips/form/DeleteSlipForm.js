import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { Colours, FormControl, Core, Content, Loading } from 'components'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { Logger } from '../../../../../../utils'

// import { Logger } from '../../../../utils/Log'
const queryString = require('query-string')

export default function ({ close, loading, error, deleteSlip }) {
  const { search } = useLocation()
  const { id } = queryString.parse(search)

  const {
    params: { accountId },
  } = useRouteMatch()

  return (
    <Formik
      initialValues={{
        deleteConfirmation: '',
      }}
      validationSchema={object().shape({
        deleteConfirmation: string()
          .matches(/delete/, 'Please type delete to confirm.')
          .required('Please type delete to confirm.'),
      })}
      onSubmit={(values, action) => {
        deleteSlip({
          variables: {
            id,
            accountId: parseInt(accountId),
          },
        })
          .then(() => {
            Logger('deleted a policy slip')
            close()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const { values, handleChange, handleSubmit, errors } = props
        return (
          <form onSubmit={handleSubmit}>
            {error && (
              <Content.Alert
                returnAfter
                type="error"
                message="Failed to Delete Slip"
              />
            )}
            {loading && <Loading small />}
            <p
              css={`
                color: ${Colours.text};
              `}
            >
              Are you sure you want to delete? <br />
              Type <b style={{ color: Colours.red }}>delete</b> below to confirm
            </p>
            <br />
            <FormControl.Input
              id="deleteConfirmation"
              type="text"
              placeholder="type 'delete' here"
              value={values.deleteConfirmation}
              onChange={handleChange}
              style={{ marginBottom: '0' }}
            />
            <FormControl.Error
              name="deleteConfirmation"
              message={errors.deleteConfirmation}
            />
            <Core.Button
              bgColour={Colours.red}
              type="submit"
              style={{ marginTop: '10px' }}
            >
              Delete
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
