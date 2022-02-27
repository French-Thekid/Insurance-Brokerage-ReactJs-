import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { Core, FormControl, Colours } from 'components'

const uuid = require('uuid/v4')
const queryString = require('query-string')

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()

  return (
    <Dialog
      open={isShowing}
      close={() => history.push('/broker/settings/templates/')}
      width="650px"
      title="Create Template"
    >
      <div
        css={`
          @media (max-height: 376px) {
            overflow-y: auto;
            max-height: 280px;
            grid-template-rows: 1fr;
            padding-right: 3px;
          }
          @media (max-width: 376px) {
            overflow-y: auto;
            max-height: 600px;
            max-width: 300px;
            grid-template-rows: 1fr;
            padding-right: 3px;
          }
        `}
      >
        <Formik
          initialValues={{
            templateName: '',
          }}
          validationSchema={object().shape({
            templateName: string().required(),
          })}
          onSubmit={({ templateName }, actions) => {
            actions.setSubmitting(true)
            let query = queryString.stringify({
              templateName,
              id: uuid(),
            })
            history.push(`/broker/settings/templates/create?${query}`)
          }}
        >
          {(props) => {
            const {
              values,
              handleSubmit,
              handleChange,
              isSubmitting,
              errors,
            } = props
            return (
              <form onSubmit={handleSubmit}>
                <p
                  css={`
                    color: ${Colours.text};
                  `}
                >
                  Choose a name for your new template.
                </p>
                <br />
                <FormControl.Input
                  id="templateName"
                  type="text"
                  placeholder="eg. Main Slip"
                  value={values.templateName}
                  onChange={handleChange}
                />
                <FormControl.Error
                  name="suspendConfirmation"
                  message={errors.suspendConfirmation}
                />
                <Core.Button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ marginTop: '10px' }}
                >
                  Continue
                </Core.Button>
              </form>
            )
          }}
        </Formik>
      </div>
    </Dialog>
  )
}
