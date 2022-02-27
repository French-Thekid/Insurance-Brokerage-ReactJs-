import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory, useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { FormControl, Core, Colours, Loading, Content } from 'components'

const queryString = require('query-string')

export default function ({
  isShowing,
  title,
  loading,
  error,
  suspendMultipleAction,
  enableMultipleAction,
  deleteMultipleAction,
  ids,
  setSelectedRow,
}) {
  const { Dialog } = useDialog()
  const history = useHistory()

  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const massAction =
    action === 'massDelete'
      ? deleteMultipleAction
      : action === 'massSuspend'
      ? suspendMultipleAction
      : action === 'massEnable'
      ? enableMultipleAction
      : ''

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title={` ${
        action === 'massDelete'
          ? 'Delete'
          : action === 'massSuspend'
          ? 'Suspend'
          : action === 'massEnable'
          ? 'Enable'
          : ''
      } ${title}`}
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
            Confirmation: '',
          }}
          validationSchema={object().shape({
            Confirmation: string()
              .matches(
                action === 'massDelete'
                  ? /delete/
                  : action === 'massSuspend'
                  ? /suspend/
                  : action === 'massEnable'
                  ? /enable/
                  : '',
                `Please type ${
                  action === 'massDelete'
                    ? 'delete'
                    : action === 'massSuspend'
                    ? 'suspend'
                    : action === 'massEnable'
                    ? 'enable'
                    : ''
                } to confirm.`
              )
              .required(
                `Please type ${
                  action === 'massDelete'
                    ? 'delete'
                    : action === 'massSuspend'
                    ? 'suspend'
                    : action === 'massEnable'
                    ? 'enable'
                    : ''
                } to confirm.`
              ),
          })}
          onSubmit={async (values, action) => {
            action.setSubmitting(true)
            massAction(ids)
            setTimeout(
              () =>
                setSelectedRow((state) => {
                  const rows = []
                  return {
                    rows,
                  }
                }),
              500
            )
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
                {error && (
                  <Content.Alert
                    type="error"
                    returnAfter
                    message={`Failed to ${
                      action === 'massDelete'
                        ? 'delete'
                        : action === 'massSuspend'
                        ? 'suspend'
                        : action === 'massEnable'
                        ? 'enable'
                        : ''
                    } ${title}`}
                  />
                )}
                {loading && <Loading small />}
                <Core.Text>
                  Are you sure you want to{' '}
                  {action === 'massDelete'
                    ? 'delete'
                    : action === 'massSuspend'
                    ? 'suspend'
                    : action === 'massEnable'
                    ? 'enable'
                    : ''}{' '}
                  all these {title}?
                  <br /> Type{' '}
                  <b>
                    {action === 'massDelete'
                      ? 'delete'
                      : action === 'massSuspend'
                      ? 'suspend'
                      : action === 'massEnable'
                      ? 'enable'
                      : ''}
                  </b>{' '}
                  below to confirm
                </Core.Text>
                <br />
                <FormControl.Input
                  id="Confirmation"
                  type="text"
                  value={values.Confirmation}
                  onChange={handleChange}
                />
                <FormControl.Error
                  name="Confirmation"
                  show={errors.Confirmation}
                  message={errors.Confirmation}
                />
                <br />
                <Core.Button
                  bgColour={
                    action === 'massDelete'
                      ? Colours.red
                      : action === 'massSuspend'
                      ? Colours.orange
                      : action === 'massEnable'
                      ? Colours.blue
                      : Colours.red
                  }
                  type="submit"
                  action="READ"
                  disabled={isSubmitting}
                >
                  {action === 'massDelete'
                    ? 'Delete'
                    : action === 'massSuspend'
                    ? 'Suspend'
                    : action === 'massEnable'
                    ? 'Enable'
                    : ''}{' '}
                </Core.Button>
              </form>
            )
          }}
        </Formik>
      </div>
    </Dialog>
  )
}
