import React from 'react'
import { useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import 'styled-components/macro'
import { object, string } from 'yup'
import {
  Dialog,
  Card,
  Error,
  Input,
  Button,
  Colours,
  Can,
  PermissionCard,
} from 'components'

//No default ES6 import
const uuid = require('uuid/v4')
const queryString = require('query-string')

function CreateTemplateForm({ isShowing, close }) {
  let history = useHistory()
  return (
    <Dialog isShowing={isShowing}>
      <Card title="Create Template" close={close} small>
        <Can
          noLoad
          i={[
            {
              endpoint: 'Slip:Create',
              objectType: 'Account',
              objectId: '*',
            },
          ]}
          else={<PermissionCard />}
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
            {props => {
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
                  <Input
                    id="templateName"
                    type="text"
                    placeholder="eg. Main Slip"
                    value={values.templateName}
                    onChange={handleChange}
                  />
                  <Error
                    name="suspendConfirmation"
                    message={errors.suspendConfirmation}
                  />
                  <Button
                    bgColour={Colours.green}
                    type="submit"
                    disabled={isSubmitting}
                    style={{ marginTop: '10px' }}
                  >
                    Create Template
                  </Button>
                </form>
              )
            }}
          </Formik>
        </Can>
      </Card>
    </Dialog>
  )
}

export default CreateTemplateForm
