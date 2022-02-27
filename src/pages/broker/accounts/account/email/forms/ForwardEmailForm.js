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
} from 'components'
import { emailSchema } from './initialValues'
import { LIST_EMAIL } from '../queries'
import { SEND_MAIL } from '../mutations'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { Logger } from '../../../../../../utils'

export default function ForwardEmailForm({
  data,
  subject = '',
  text,
  attributes,
}) {
  const {
    params: { accountId },
  } = useRouteMatch()
  const history = useHistory()
  const [showBody, setShowBody] = useState(false)

  const [TOs, setTO] = useState({ emails: [] })
  const [CCs, setCC] = useState({ emails: [] })
  const [attachments, setAttachments] = useState({ files: [] })
  const [oldAttachments, setOldAttachments] = useState({
    files: data.getEmail.attachments,
  })
  const [rowHeight, setRowHeight] = useState(
    window.screen.height > 1023 ? 24 : 10.9
  )

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

  window.onresize = function () {
    if (window.screen.height > 1023) setRowHeight(24)
    else setRowHeight(10.9)
  }

  return (
    <Formik
      initialValues={{ subject: subject, body: '', sender: '' }}
      validationSchema={emailSchema}
      onSubmit={async ({ subject, body }, actions) => {
        actions.setSubmitting(true)
        const finalAttachments = []
        attachments.files.map(({ name, base64 }) =>
          finalAttachments.push({ name, body: base64 })
        )
        const TO = TOs.emails.map((receiver) => receiver)
        const CC = CCs.emails.map((receiver) => receiver)

        let finalBody = ''
        text
          ? (finalBody =
              body +
              `<br/><br/><p style='padding:10px;background:#F5F5F5'>Re. ${text}</p>`)
          : (finalBody = body)

        sendMail({
          variables: {
            params: {
              accountId: parseInt(accountId),
              to: TO,
              cc: CC,
              subject,
              html: finalBody,
              attachments: finalAttachments,
            },
          },
        })
          .then(() => {
            Logger('forward an email')
            history.goBack()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const { values, handleSubmit, handleChange, errors } = props
        const { subject, body } = values
        return (
          <>
            <form
              css={`
                height: 100%;
                display: grid;
                grid-template-rows: repeat(2, max-content) 32px 1fr 80px max-content;
                grid-row-gap: 10px;
                margin-bottom: ${showBody ? '50px' : '0px'};
                @media (max-height: 1023px) {
                  margin-bottom: ${showBody ? '180px' : '0px'};
                }
                @media (max-height: 1300px) {
                  margin-bottom: ${showBody ? '180px' : '0px'};
                }
              `}
              onSubmit={handleSubmit}
            >
              {loading && <Loading small />}
              {error && (
                <Content.Alert type="error" message="Fail to send email" />
              )}
              <EmailContent.Input label="To:" email={TOs} setEmails={setTO} />
              <EmailContent.Input label="Cc:" email={CCs} setEmails={setCC} />
              <FormControl.Input
                label="Subject"
                id="subject"
                value={subject}
                onChange={handleChange}
                error={errors.subject}
              />
              <FormControl.Input
                style={{ marginTop: '5px' }}
                label="Body"
                placeholder="Type Body Here"
                multiline
                rows={rowHeight}
                id="body"
                value={body}
                onChange={handleChange}
              />

              <div
                id="Attachment Section"
                css={`
                  margin-top: 5px;
                  display: flex;
                  flex-wrap: wrap;
                  width: 100%;
                  overflow: auto;
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
                        margin: 0px 5px 0px 5px;
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
                        <Core.Text Contained>{name}</Core.Text>
                      </section>
                    </section>
                  )
                })}
              </div>
              {/* Footer */}
              <div
                css={`
                  display: grid;
                  grid-template-columns: max-content max-content 1fr 100px;
                  grid-gap: 10px;
                  padding: 10px;
                  align-items: center;
                  border-top: 1px solid ${Colours.border};
                  border-bottom: 1px solid ${Colours.border};
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
                <div
                  onClick={() => setShowBody(!showBody)}
                  css={`
                    transition: ease-out 0.2s;
                    color: ${Colours.text};
                    &:hover {
                      transition: ease-out 0.2s;
                      transform: translateY(-2px);
                      cursor: pointer;
                      color: ${Colours.blue};
                    }
                  `}
                >
                  {showBody ? (
                    <Icons.ArrowCircleUpRoundedIcon
                      style={{ fontSize: '20px', color: 'inherit' }}
                    />
                  ) : (
                    <Icons.ArrowCircleDownRoundedIcon
                      style={{ fontSize: '20px', color: 'inherit' }}
                    />
                  )}
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
            {showBody && (
              <div
                css={`
                  background: ${Colours.menuHover};
                  border-radius: 5px;
                  height: 200px;
                  overflow: auto;
                  padding: 20px;
                `}
              >
                <div
                  css={`
                    margin: 0px;
                    color: ${Colours.text};
                    overflow: auto;
                  `}
                  dangerouslySetInnerHTML={{
                    __html: `${JSON.parse(attributes).html}`,
                  }}
                />
                <div
                  css={`
                    margin-top: 20px;
                    display: flex;
                  `}
                >
                  {oldAttachments.files.map(({ name }, index) => {
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
                          margin: 0px 5px 0px 5px;
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
                              setOldAttachments((state) => {
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
                          <Core.Text Contained>{name}</Core.Text>
                        </section>
                      </section>
                    )
                  })}
                </div>
              </div>
            )}
          </>
        )
      }}
    </Formik>
  )
}
