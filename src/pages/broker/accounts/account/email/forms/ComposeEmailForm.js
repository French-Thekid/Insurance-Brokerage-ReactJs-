import React, { useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'

import {
  EmailContent,
  FormControl,
  Icons,
  Core,
  Colours,
  Loading,
  Content,
  Notification,
} from 'components'
import { InitalEmail, emailSchema } from './initialValues'
import { LIST_EMAIL } from '../queries'
import { SEND_MAIL } from '../mutations'
import { useHistory, useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Logger } from '../../../../../../utils'

const queryString = require('query-string')

export default function ComposeEmailForm() {
  const { search } = useLocation()
  const history = useHistory()
  const { accountId } = queryString.parse(search)

  const [TOs, setTO] = useState({ emails: [] })
  const [CCs, setCC] = useState({ emails: [] })
  const [attachments, setAttachments] = useState({ files: [] })
  // const [rowHeight, setRowHeight] = useState(
  //   window.screen.height > 1023 ? 24 : 10.9
  // )

  const [sendMail, { loading, error }] = useMutation(SEND_MAIL, {
    refetchQueries: () => [
      {
        query: LIST_EMAIL,
        variables: {
          accountId: parseInt(accountId),
        },
      },
    ],
  })

  // window.onresize = function () {
  //   if (window.screen.height > 1023) setRowHeight(24)
  //   else setRowHeight(10.9)
  // }

  return (
    <Formik
      initialValues={InitalEmail}
      validationSchema={emailSchema}
      onSubmit={async ({ cc, subject, body }, actions) => {
        actions.setSubmitting(true)
        const finalAttachments = []
        let sizeError = { error: false, file: '', size: 0 }
        attachments.files.map(({ name, base64 }) =>
          finalAttachments.push({ name, body: base64 })
        )

        attachments.files.forEach((element) => {
          let totalBytes = element.file.size
          let sizeInMB = Math.ceil(totalBytes / 1000000)
          if (sizeInMB > 4.5) {
            sizeError = {
              error: true,
              file: element.file.name,
              size: element.file.size,
            }
          }
        })

        const TO = TOs.emails.map((receiver) => receiver)
        const CC = CCs.emails.map((receiver) => receiver)

        if (sizeError.error) {
          Notification(
            {
              title: 'File too large',
              body: `"${sizeError.file}" exceeds the maximum file upload size of 4.5mb`,
              titleBackground: Colours.blue,
              titleColour: Colours.foreground,
            },
            { autoClose: 20000 }
          )
        } else {
          sendMail({
            variables: {
              params: {
                accountId: parseInt(accountId),
                to: TO,
                cc: CC,
                subject,
                html: body,
                attachments: finalAttachments,
              },
            },
          })
            .then(() => {
              Logger('sent an email')
              history.push(`/broker/account/email/${accountId}`)
            })
            .catch((e) => console.log(e))
        }
      }}
    >
      {(props) => {
        const { values, handleSubmit, handleChange, errors } = props
        const { subject, body } = values
        return (
          <form
            css={`
              height: 100%;
              display: grid;
              grid-template-rows: 1fr max-content;
              grid-row-gap: 10px;
            `}
            onSubmit={handleSubmit}
          >
            {loading && <Loading small />}
            {error && (
              <Content.Alert type="error" message="Fail to send email" />
            )}
            <div
              css={`
                display: grid;
                padding: 0px 15px;
                grid-template-rows: repeat(3, max-content) 1fr max-content;
                grid-gap: 15px;
              `}
            >
              <EmailContent.Input
                label="To:"
                email={TOs}
                setEmails={setTO}
                data-cy="to"
              />
              <EmailContent.Input
                label="Cc:"
                email={CCs}
                setEmails={setCC}
                data-cy="cc "
              />
              <FormControl.Input
                label="Subject"
                id="subject"
                value={subject}
                onChange={handleChange}
                error={errors.subject}
              />
              <FormControl.Input
                label="Body"
                placeholder="Type Body Here"
                multiline
                rows={7}
                id="body"
                value={body}
                onChange={handleChange}
              />
              <div
                id="Attachment Section"
                css={`
                  margin-top: 5px;
                  display: flex;
                  width: 100%;
                  overflow-x: auto;
                `}
              >
                {attachments.files.map(({ name }, index) => {
                  return (
                    <section
                      key={index}
                      css={`
                        display: grid;
                        grid-template-rows: 10px max-content max-content;
                        grid-row-gap: 2px;
                        justify-items: center;
                        max-width: 63px;
                        padding: 3px;
                        margin: 0px 10px 0px 5px;
                        &:hover {
                          background-color: #f9f9f9;
                        }
                      `}
                    >
                      <div
                        css={`
                          display: grid;
                          grid-template-columns: 1fr auto;
                          justify-items: end;
                          width: 100%;
                        `}
                      >
                        <div />
                        <section
                          css={`
                            position: relative;
                            float: right;
                            margin: 0;
                            padding: 0;
                            &:hover {
                              cursor: pointer;
                            }
                          `}
                          onClick={() =>
                            setAttachments((state) => {
                              const files = state.files.filter(
                                (item, innerIndex) => innerIndex !== index
                              )
                              return { files }
                            })
                          }
                        >
                          <Icons.ClearRounded style={{ fontSize: '10px' }} />
                        </section>
                      </div>
                      <Icons.DescriptionRoundedIcon
                        style={{ fontSize: '35px', color: Colours.blue }}
                      />
                      <section
                        css={`
                          width: 63px;
                        `}
                      >
                        <Core.Text customSize="10px" Contained>
                          {name}
                        </Core.Text>
                      </section>
                    </section>
                  )
                })}
              </div>
            </div>
            {/* Footer */}
            <div
              css={`
                display: grid;
                grid-template-columns: max-content 1fr 100px;
                grid-gap: 10px;
                padding: 10px;
                align-items: center;
                border-top: 1px solid ${Colours.border};
              `}
            >
              <div
                css={`
                  color: ${Colours.text};
                  padding-right: 10px;
                  border-right: 1px solid ${Colours.border};
                  transition: ease-out 0.2s;
                  &:hover {
                    cursor: pointer;
                    transition: ease-out 0.2s;
                    transform: translateY(-2px);
                    color: ${Colours.red};
                  }
                `}
              >
                <Icons.DeleteRounded
                  style={{ fontSize: '20px', color: 'inherit' }}
                />
              </div>
              <div
                css={`
                  transition: ease-out 0.2s;
                  &:hover {
                    transition: ease-out 0.2s;
                    transform: translateY(-2px);
                  }
                `}
              >
                <label
                  htmlFor="file"
                  css={`
                    color: ${Colours.text};
                    &:hover {
                      cursor: pointer;
                      color: ${Colours.blue};
                    }
                  `}
                >
                  <Icons.AttachFileIcon
                    style={{ fontSize: '20px', color: 'inherit' }}
                  />
                </label>
                <EmailContent.FileAttachmentChooser
                  id="file"
                  style={{ display: 'none' }}
                  onDone={(file) => {
                    setAttachments((state) => {
                      const files = state.files.concat(file)
                      return { files }
                    })
                  }}
                />
              </div>
              <Core.Button
                action="WRITE"
                type="submit"
                disabled={TOs.emails.length === 0}
              >
                Send
              </Core.Button>
            </div>
          </form>
        )
      }}
    </Formik>
  )
}
