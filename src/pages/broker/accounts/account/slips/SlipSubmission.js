import React, { useEffect, useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { get, clear } from 'idb-keyval'
import {
  PageHeader,
  Core,
  Colours,
  FormControl,
  Loading,
  Content,
  Icons,
} from 'components'
import { usePermission } from 'hooks'
import { SUBMIT_SLIP } from './mutations'
import { LIST_SLIPS } from './queries'
import { useMutation } from '@apollo/react-hooks'

const queryString = require('query-string')

export default function SlipGeneration() {
  const match = useRouteMatch()
  const [permissions, Access] = usePermission()
  const [slip, setSlip] = useState(null)
  const history = useHistory()
  const {
    params: { accountId },
  } = match

  const { search } = useLocation()
  const { title } = queryString.parse(search)
  const emails = JSON.parse(localStorage.getItem('receivers'))

  useEffect(() => {
    get('Slip').then((val) => {
      setSlip(val)
    })
  }, [])

  const [emailSlip, { loading, error }] = useMutation(SUBMIT_SLIP, {
    refetchQueries: () => [
      {
        query: LIST_SLIPS,
        variables: { accountId: parseInt(accountId) },
      },
    ],
  })

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
      `}
    >
      <PageHeader title="Slip Submission">
        {permissions.SLIP_SUBMIT_TYPEACCOUNT ? (
          <Core.Button bgColour={Colours.green} type="submit" form="SlipSubmit">
            Submit
          </Core.Button>
        ) : null}
      </PageHeader>
      {permissions.SLIP_SUBMIT_TYPEACCOUNT ? (
        <div
          css={`
            display: grid;
            border: 1px solid ${Colours.border};
            height: calc(80% - 22px);
            width: calc(80% - 22px);
            border-radius: 5px;
            margin: auto;
            box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
              0 3.5px 12.6px rgba(0, 0, 0, 0.037),
              0 10px 35px rgba(0, 0, 0, 0.08);
            transform: translateY(-2px);
            display: grid;
            grid-template-rows: max-content 1fr;
            grid-row-gap: 10px;
            padding: 10px;
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-rows: max-content max-content;
              grid-row-gap: 10px;
            `}
          >
            <div
              css={`
                background: RGBA(38, 153, 251, 0.1);
                padding: 5px 10px;
                border-bottom: 1px solid ${Colours.border};
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
              `}
            >
              <Core.Text color={Colours.blue} customSize="20px" weight="550">
                Mailing Details
              </Core.Text>
            </div>
            <Core.Text size="sm">
              Please fill out the fields below with the appropriate subject and
              body message to accompany the Slip generated.
            </Core.Text>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: 2fr 1fr;
              grid-column-gap: 10px;
            `}
          >
            <div
              css={`
                border-radius: 5px;
                border: 1px solid ${Colours.border};
                padding: 10px;
              `}
            >
              <Formik
                initialValues={{
                  body: '',
                  subject: '',
                }}
                validationSchema={object().shape({
                  subject: string().required(
                    'Subject is required to continue.'
                  ),
                  body: string().required('Body is required to continue.'),
                })}
                onSubmit={async ({ subject, body }, action) => {
                  action.setSubmitting(true)

                  await emailSlip({
                    variables: {
                      subject,
                      body,
                      accountId: parseInt(accountId),
                      createdOn: new Date().toDateString(),
                      submitDate: new Date().toDateString(),
                      emails: JSON.parse(localStorage.getItem('receivers'))
                        .Emails,
                      slip: slip,
                      name: title,
                    },
                  })
                    .then(() => {
                      history.push(`/broker/account/slips/${accountId}`)
                      localStorage.removeItem('motorRisks')
                      localStorage.removeItem('nonMotorRisks')
                      localStorage.removeItem('extensions')
                      localStorage.removeItem('limits')
                      localStorage.removeItem('receivers')
                      localStorage.removeItem('Slip')
                      clear()
                    })
                    .catch((e) => console.log(e))
                }}
              >
                {(props) => {
                  const { values, handleChange, handleSubmit, errors } = props
                  const { subject, body } = values
                  return (
                    <form onSubmit={handleSubmit} id="SlipSubmit">
                      {loading && <Loading small />}
                      {error && (
                        <Content.Alert
                          type="error"
                          returnAfter
                          message="Fail to Submit Slip"
                        />
                      )}
                      <section
                        css={`
                          margin-bottom: 10px;
                        `}
                      >
                        <FormControl.Input
                          id="subject"
                          label="Subject"
                          type="text"
                          placeholder="Subject"
                          value={subject}
                          onChange={handleChange}
                          error={errors.subject}
                        />
                        <FormControl.Error
                          name="subject"
                          message={errors.subject}
                        />
                      </section>

                      <section
                        css={`
                          border: 0.3px solid ${Colours.border};
                          border-radius: 5px;
                        `}
                      >
                        <FormControl.Input
                          label="Body"
                          placeholder="Type Body Here"
                          multiline
                          rows={7}
                          id="body"
                          value={body}
                          onChange={handleChange}
                          error={errors.body}
                        />
                        <FormControl.Error name="body" message={errors.body} />
                      </section>
                    </form>
                  )
                }}
              </Formik>
            </div>
            <div
              css={`
                border-left: 1px solid ${Colours.border};
                display: grid;
                grid-template-rows: max-content 1fr;
                grid-row-gap: 20px;
                padding: 5px 10px;
              `}
            >
              <div
                css={`
                  display: grid;
                  grid-template-columns: 40px 1fr;
                  grid-column-gap: 10px;
                  display: grid;
                  place-items: center;
                  background: RGBA(38, 153, 251, 0.1);
                  padding: 5px;
                  border-radius: 5px;
                `}
              >
                <div
                  css={`
                    background: ${Colours.blue};
                    border-radius: 5px;
                    width: 40px;
                    height: 40px;
                    display: grid;
                    place-items: center;
                  `}
                >
                  <Core.Text color="#fff" weight="550">
                    PDF
                  </Core.Text>
                </div>
                <Core.Text weight="550">Generated Slip</Core.Text>
              </div>
              <div
                css={`
                  display: grid;
                  grid-template-columns: 40px 1fr;
                  grid-column-gap: 15px;
                  display: grid;
                  align-items: start;
                  background: RGBA(38, 153, 251, 0.1);
                  padding: 5px;
                  border-radius: 5px;
                `}
              >
                <div
                  css={`
                    background: ${Colours.blue};
                    border-radius: 5px;
                    width: 40px;
                    height: 40px;
                    display: grid;
                    place-items: center;
                  `}
                >
                  <Icons.GroupRounded
                    style={{ color: '#fff', fontSize: '30px' }}
                  />
                </div>
                <div
                  css={`
                    height: 100%;
                    max-height: 215px;
                    overflow-y: auto;
                  `}
                >
                  {emails.Emails.map((email, index) => (
                    <div
                      key={index}
                      css={`
                        padding-bottom: 5px;
                        margin-bottom: 10px;
                        border-bottom: 0.5px solid ${Colours.border};
                      `}
                    >
                      <Core.Text size="sm" Contained>
                        {email.charAt(0).toUpperCase() + email.slice(1)}
                      </Core.Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Access />
      )}
    </div>
  )
}
