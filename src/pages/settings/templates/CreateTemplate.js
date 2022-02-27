import React, { useRef, useState, useContext } from 'react'
import { SessionContext, ColourContext, OrganisationContext } from 'context'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useHistory, useLocation } from 'react-router-dom'
import 'styled-components/macro'
import { Formik } from 'formik'
import {
  Avatar,
  Core,
  Icons,
  FormControl,
  ScreenDisplayWarning,
  Loading,
  Content,
} from 'components'
import { usePostFetch } from 'hooks'
import Canvas from 'components/settings/Canvas'
import 'styled-components/macro'

import { TemplateSidebar, TemplateRow, TemplateArea } from './canvasComponents'
// import { SessionContext } from 'providers'
import ItemTypes from './canvasComponents/types'
import { createTemplateSchema } from './forms/initialValues'

import accounts from 'assets/details.png'
import risks from 'assets/risks.png'
import extensions from 'assets/extensions.png'
import limits from 'assets/limits.png'

const queryString = require('query-string')

function CreateTemplate() {
  const { idToken } = useContext(SessionContext)
  const { emailLogo } = useContext(OrganisationContext)
  const history = useHistory()
  const location = useLocation()
  const { templateName } = queryString.parse(location.search)
  const [borderColor, setBorderColor] = useState('rgba(119,119,119, .7)')
  const nodesRef = useRef()
  const { Account, Premium, Risk, Extension, Limits } = ItemTypes
  const { Colours } = useContext(ColourContext)
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
  if (error)
    return <Content.Alert type="error" message="Failed to Create Template" />

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
              avatar: '',
              headerContent: '',
              templateName: templateName,
              createdDate: new Date().toDateString(),
              body: nodesRef.current,
              footerContent: {},
            }}
            validationSchema={createTemplateSchema}
            onSubmit={async ({ avatar, ...rest }, actions) => {
              try {
                await createSlip({
                  avatar: avatar === '' ? emailLogo : avatar,
                  ...rest,
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
              const { handleSubmit, handleChange, setFieldValue, values } =
                props
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
                      <Core.Text weight="600">Create Template</Core.Text>
                      <Core.Button
                        style={{ margin: '0px' }}
                        type="Submit"
                        bgColour={Colours.green}
                      >
                        Create
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
                            canDrop={true}
                            border={borderColor}
                            align="start"
                          >
                            {({ nodes, handleDelete }) => {
                              //Use a ref to store the current nodes, we dont want a re-render
                              nodesRef.current = nodes
                              values.body = nodes

                              /**
                               * TODO: Refactor to remove Error warning
                               */

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

export default CreateTemplate
