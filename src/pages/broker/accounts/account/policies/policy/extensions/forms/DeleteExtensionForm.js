import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useLocation, useRouteMatch } from 'react-router-dom'

import { Core, Colours, Content, FormControl, Loading } from 'components'
import { Logger } from '../../../../../../../../utils'

const queryString = require('query-string')

export default function ({ close, deletePolicyExtension, loading, error }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { id: extensionId } = queryString.parse(search)

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
      onSubmit={async () => {
        return deletePolicyExtension({
          variables: {
            policyID: parseInt(policyId),
            accountID: parseInt(accountId),
            extensionID: parseInt(extensionId),
          },
        })
          .then(() => {
            Logger('deleted a policy extension')
            close()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const { values, handleChange, handleSubmit, errors } = props
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            {error && (
              <Content.Alert type="error" message="Fail to Delete Extension" />
            )}
            <Core.Text>
              Are you sure you want to delete? <br />
              Type <b style={{ color: Colours.red }}>delete</b> below to confirm
            </Core.Text>
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
            <br />
            <Core.Button bgColour={Colours.red} type="submit">
              Delete
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
