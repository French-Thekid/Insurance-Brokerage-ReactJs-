import React, { useRef, useState, useContext } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'
import { Formik } from 'formik'
import {
  Avatar,
  Core,
  Icons,
  FormControl,
  ScreenDisplayWarning,
  Loading,
} from 'components'
import Canvas from 'components/settings/Canvas'
import { SessionContext, ColourContext } from 'context'
import { TemplateSidebar, TemplateRow, TemplateArea } from './canvasComponents'
import ItemTypes from './canvasComponents/types'
import { createTemplateSchema } from './forms/initialValues'
import { usePostFetch } from 'hooks'
import accounts from 'assets/details.png'
import risks from 'assets/risks.png'
import extensions from 'assets/extensions.png'
import limits from 'assets/limits.png'

function EditTemplate() {
  const { Colours } = useContext(ColourContext)
  const { idToken } = useContext(SessionContext)
  const history = useHistory()
  const nodesRef = useRef()
  const [validationStatus, setValidationStatus] = useState(null)
  const [slipTitle, setSlipTitle] = useState(null)
  const [borderColor, setBorderColor] = useState('rgba(119,119,119, .7)')
  const { Account, Premium, Risk, Extension, Limits } = ItemTypes
  const {
    slip: {
      avatar: avatarLogo,
      footer,
      templateName: name,
      body,
      headerContent,
    },
  } = JSON.parse(localStorage.getItem('templates')) || {}

  const sections = body.map((item) => item.title)
  /*eslint-disable-next-line */

  const {
    postData: createSlip,
    error,
    loading,
  } = usePostFetch({
    method: 'POST',
    url: '/v1/organization/slip',
    tokens: idToken,
  })

  if (loading) return <Loading small />
  if (error) return <h1>{JSON.stringify(error)}</h1>

  return (
    <div
      css={`
        height: 100%;
      `}
    >
      <div
        css={`
          @media (orientation: portrait) {
            @media (max-width: 376px) {
              display: visible;
            }
          }
          @media (orientation: landScape) {
            @media (max-height: 376px) {
              display: visible;
            }
          }
          @media (orientation: portrait) {
            @media (min-width: 376px) {
              display: none;
            }
          }
          @media (orientation: landScape) {
            @media (min-height: 376px) {
              display: none;
            }
          }
        `}
      >
        <ScreenDisplayWarning />
      </div>
      <div
        css={`
          height: 100%;
          @media (orientation: portrait) {
            @media (max-width: 376px) {
              display: none;
            }
          }
          @media (orientation: landScape) {
            @media (max-height: 376px) {
              display: none;
            }
          }
        `}
      >
        <DndProvider backend={HTML5Backend}>
          <Formik
            initialValues={{
              avatar: avatarLogo,
              /*eslint-disable-next-line */
              headerContent: headerContent.replace(/[]/g, ''),
              // templateName: name,
              createdDate: new Date().toDateString(),
              body: nodesRef.current,
              footerContent: footer,
            }}
            validationSchema={createTemplateSchema}
            onSubmit={async (values, actions) => {
              const templateName = slipTitle ? slipTitle : name
              try {
                await createSlip({
                  ...values,
                  templateName,
                  body: nodesRef.current,
                })
                setTimeout(() => {
                  history.push('/broker/settings/templates/')
                  window.location.reload()
                }, 500)
              } catch (errors) {}
            }}
          >
            {(props) => {
              const {
                handleSubmit,
                handleChange,
                setFieldValue,
                errors,
                values,
              } = props
              const slipTempTitle = slipTitle ? slipTitle : name
              return (
                <form
                  onSubmit={handleSubmit}
                  css={`
                    height: 100%;
                  `}
                >
                  <div
                    css={`
                      height: 100%;
                      display: grid;
                      grid-template-rows: 45px 1fr;
                      grid-row-gap: 15px;
                    `}
                  >
                    <div
                      css={`
                        display: grid;
                        grid-template-columns: 50px 1fr 170px;
                        grid-gap: 10px;
                        align-items: center;
                        padding-top: 10px;
                        padding-bottom: 5px;
                        border-bottom: 0.5px solid ${Colours.border};
                        align-items: Center;
                      `}
                    >
                      <button
                        css={`
                          border: none;
                          background-color: inherit;
                          text-align: left;
                          outline: none;
                          &:hover {
                            cursor: pointer;
                          }
                        `}
                        onClick={() =>
                          history.push(`/broker/settings/templates/`)
                        }
                      >
                        <Icons.ArrowBackIosRounded
                          style={{ fontSize: '18px', color: Colours.text }}
                        />
                      </button>
                      <FormControl.Input
                        type="text"
                        onChange={(event) => setSlipTitle(event.target.value)}
                        value={slipTempTitle}
                      />
                      <Core.Button
                        type="Submit"
                        bgColour={Colours.green}
                        disabled={validationStatus}
                      >
                        Update
                      </Core.Button>
                    </div>

                    <div
                      css={`
                        display: grid;
                        grid-template-columns: 1fr 250px;
                        grid-column-gap: 10px;
                      `}
                    >
                      <Canvas>
                        <div
                          css={`
                            height: 100%;
                            display: grid;
                            grid-template-rows: 130px 1fr;
                            grid-row-gap: 10px;
                          `}
                        >
                          <div
                            css={`
                              display: grid;
                              grid-template-columns: max-content 1fr max-content;
                              grid-column-gap: 10px;
                              max-height: 110px;
                            `}
                          >
                            <TemplateArea contained>
                              <div
                                css={`
                                  height: 100%;
                                  display: Grid;
                                  place-items: center;
                                `}
                              >
                                <Avatar
                                  src={avatarLogo}
                                  onDone={({ base64 }) =>
                                    setFieldValue('avatar', base64)
                                  }
                                />
                              </div>
                            </TemplateArea>
                            <TemplateArea
                              border={
                                values.headerContent === ''
                                  ? Colours.red
                                  : 'rgba(119,119,119, .7)'
                              }
                              special
                            >
                              <div
                                css={`
                                  background: #fff;
                                  width: 100%;
                                  height: 100%;
                                `}
                              >
                                <FormControl.Input
                                  label="Template Title"
                                  multiline
                                  rows={3.5}
                                  id="headerContent"
                                  value={values.headerContent}
                                  onChange={handleChange}
                                />
                              </div>
                            </TemplateArea>
                            <section
                              css={`
                                margin: auto;
                              `}
                            >
                              <Core.Text color="blue" weight="600">
                                Policy No. -
                              </Core.Text>
                              <Core.Text weight="600">
                                Markup and return
                              </Core.Text>
                            </section>
                          </div>

                          <TemplateArea
                            sections={sections}
                            canDrop={true}
                            border={borderColor}
                          >
                            {({ nodes, handleDelete }) => {
                              //Use a ref to store the current nodes, we dont want a re-render

                              /**
                               * TODO: Refactor to remove Error warning
                               */

                              nodesRef.current = nodes
                              values.body = nodes
                              setValidationStatus(
                                Object.keys(errors).length !== 0 ? true : false
                              )

                              setBorderColor(
                                nodesRef.current.length === 0
                                  ? Colours.red
                                  : 'rgba(119,119,119, .7)'
                              )
                              return nodes.length === 0 ? (
                                <div
                                  css={`
                                    height: 100%;
                                    display: grid;
                                    justify-items: center;
                                    align-items: center;
                                  `}
                                >
                                  <section
                                    css={`
                                      display: grid;
                                      justify-items: Center;
                                    `}
                                  >
                                    <Core.Text customSize="30px" weight="600">
                                      Drag Components Here
                                    </Core.Text>
                                    <Core.Text
                                      color={Colours.red}
                                      customSize="30px"
                                      weight="600"
                                    >
                                      (Required)
                                    </Core.Text>
                                  </section>
                                </div>
                              ) : (
                                nodes.map((node, index) => (
                                  <TemplateRow
                                    key={index}
                                    index={index}
                                    {...node}
                                    hasDropped
                                    onDelete={handleDelete}
                                  />
                                ))
                              )
                            }}
                          </TemplateArea>
                        </div>
                      </Canvas>
                      {/* Sidebar */}
                      <TemplateSidebar>
                        <TemplateRow
                          title="Account Details"
                          type={Account}
                          icon={accounts}
                        />
                        <TemplateRow
                          title="Premium"
                          type={Premium}
                          icon={accounts}
                        />
                        <TemplateRow title="Risk" type={Risk} icon={risks} />
                        <TemplateRow
                          title="Extensions"
                          type={Extension}
                          icon={extensions}
                        />
                        <TemplateRow
                          title="Limit"
                          type={Limits}
                          icon={limits}
                        />
                      </TemplateSidebar>
                    </div>
                  </div>
                </form>
              )
            }}
          </Formik>
        </DndProvider>
      </div>
    </div>
  )
}

export default EditTemplate
