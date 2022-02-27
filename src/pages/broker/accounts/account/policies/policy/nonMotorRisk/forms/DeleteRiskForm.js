import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { Colours, FormControl, Core, Loading } from 'components'
import { useLocation, useRouteMatch } from 'react-router-dom'
import { Logger } from '../../../../../../../../utils'
// import { Logger } from '../../utils/Log'

const queryString = require('query-string')

export default function ({ close, deleteNonMotorRisk, loading }) {
  const {
    params: { accountId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { id: riskID } = queryString.parse(search)

  return (
    <Formik
      initialValues={{
        deleteConfirmation: '',
      }}
      validationSchema={object().shape({
        deleteConfirmation: string()
          .test('match', `Please type the Risk ID to confirm.`, function (
            deleteConfirmation
          ) {
            return deleteConfirmation === riskID.toString()
          })
          .required('Please type the Risk ID to confirm.'),
      })}
      onSubmit={(values, action) => {
        deleteNonMotorRisk({
          variables: {
            accountID: parseInt(accountId),
            riskID: parseInt(riskID),
          },
        })
          .then(() => {
            Logger('deleted a non-motor risk')
            close()
            // refetch1()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const { values, handleChange, handleSubmit, errors } = props
        return (
          <form onSubmit={handleSubmit}>
            {loading && <Loading small />}
            <p
              css={`
                color: ${Colours.text};
              `}
            >
              Are you sure you want to delete? <br />
              Type the Risk ID <b style={{ color: Colours.blue }}>
                {riskID}
              </b>{' '}
              below to confirm
            </p>
            <br />
            <FormControl.Input
              id="deleteConfirmation"
              type="text"
              placeholder="type 'Risk ID' here"
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
