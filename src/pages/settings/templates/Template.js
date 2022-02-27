import React, { useContext } from 'react'
import 'styled-components/macro'

import { Core, Icons } from 'components'
import createTemplate from 'assets/createTemplate.png'
import { useHistory, useLocation } from 'react-router-dom'
import { OrganisationContext, ColourContext } from 'context'
import { CreateTemplateTitle } from './modal'

const queryString = require('query-string')

export default function Templates() {
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  let slipData = null
  const {
    templates: { slip },
  } = useContext(OrganisationContext)
  const { Colours } = useContext(ColourContext)
  Object.keys(slip).length > 0 ? (slipData = [slip]) : (slipData = [])

  return (
    <>
      <div
        css={`
          height: 100%;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 2fr;
          grid-gap: 20px;
          @media (max-width: 768px) {
            grid-template-columns: 1fr;
            align-items: start;
            justify-items: center;
            height: max-content;
          }
        `}
      >
        <div
          css={`
            padding: 0px;
            border-radius: 10px;
            border: 1px solid ${Colours.border};
            width: calc(100% - 20px);
            min-width: 235px;
            height: calc(100% - 20px);

            @media (max-width: 768px) {
              height: max-content;
            }
            padding: 10px;
          `}
        >
          <Core.Text size="md" weight="500">
            Slip Template
          </Core.Text>
          <hr
            css={`
              border: 1px solid ${Colours.border};
            `}
          />
          <div
            css={`
              display: grid;
              grid-template-columns: 1fr 60px;
              justify-items: space-between;
              margin-top: 10px;
            `}
          >
            <Core.Text size="rg" weight="500">
              Title
            </Core.Text>
            <Core.Text size="rg" weight="500">
              Actions
            </Core.Text>
          </div>
          <section
            css={`
              margin-top: 20px;
              display: grid;
              grid-template-columns: 1fr 45px;
              justify-items: space-between;
              border-top: 1px solid ${Colours.border};
              border-bottom: 1px solid ${Colours.border};
              padding: 10px 5px;
              background: ${Colours.menuHover};
            `}
          >
            {slipData.length !== 0 ? (
              <>
                <Core.Text size="rg" weight="500" color={Colours.text}>
                  {slipData[0].templateName}
                </Core.Text>
                <section
                  css={`
                    &:hover {
                      cursor: pointer;
                    }
                  `}
                >
                  <Icons.EditRounded
                    style={{ color: Colours.blue }}
                    onClick={() => history.push('update')}
                  />
                </section>
              </>
            ) : (
              ''
            )}
          </section>
        </div>
        {/* Right Side */}
        <div
          css={`
            border: 1px solid ${Colours.border};
            border-radius: 10px;
            padding: 10px;
            width: calc(100% - 20px);
            background: rgb(255, 255, 255);
            background: ${Colours.profileBackground};
          `}
        >
          <section
            css={`
              height: 100%;
              width: 100%;
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-row-gap: 10px;
            `}
          >
            <OutContainer colTemplate="1fr 1fr 1fr">
              {/* Logo */}
              <InnerContainer>
                {slipData.length !== 0 ? (
                  <img
                    src={slipData[0].avatar}
                    alt="organizationLogo"
                    css={`
                      height: 78px;
                      width: 80px;
                      border-radius: 50%;
                      object-fit: cover;
                    `}
                  />
                ) : null}
              </InnerContainer>
              {/* Title */}
              <InnerContainer>
                {/* eslint-disable*/}
                {slipData.length !== 0 ? (
                  <Core.Text customSize="1.9vw" weight="500">
                    {slipData[0].headerContent.replace(/[]/g, ' ')}
                  </Core.Text>
                ) : null}
              </InnerContainer>
              <div
                css={`
                  margin: 10px;
                  display: grid;
                  place-items: Center;
                  height: max-content;
                `}
              >
                <Core.Text customSize="1.9vw" color={Colours.blue} weight="500">
                  Policy No. ---
                </Core.Text>
                <Core.Text customSize="1.2vw" weight="500">
                  Markup and Return.
                </Core.Text>
              </div>
            </OutContainer>
            {/* Body Section */}
            <OutContainer>
              {slipData.length !== 0 &&
                slipData[0].body.map((section, index) => (
                  <InnerContainer key={index}>
                    <Core.Text
                      color={Colours.text}
                      weight="600"
                      customSize="20px"
                    >
                      {section.title}
                    </Core.Text>
                  </InnerContainer>
                ))}
              {slipData.length === 0 && (
                <div
                  css={`
                    display: grid;
                    place-items: center;
                  `}
                >
                  <div
                    css={`
                      display: grid;
                      grid-template-rows: max-content max-content max-content;
                      grid-row-gap: 20px;
                      justify-items: center;
                      padding: 20px;
                    `}
                  >
                    <Core.Text weight="500">
                      Create Your Slip Template with our amazing drag and drop
                      interface
                    </Core.Text>
                    <img
                      src={createTemplate}
                      alt="templateAvatar"
                      css={`
                        height: 300px;
                        @media screen and (max-width: 1190px) {
                          height: 200px;
                        }
                      `}
                    />

                    <Core.Button
                      bgColour={Colours.blue}
                      onClick={() => history.push('?action=createTemplate')}
                      style={{ width: 'max-content' }}
                    >
                      Create My Template
                    </Core.Button>
                  </div>
                </div>
              )}
            </OutContainer>
          </section>
        </div>
      </div>
      <CreateTemplateTitle isShowing={action === 'createTemplate'} />
    </>
  )
}

const OutContainer = ({
  children,
  colTemplate = '1fr',
  rowTemplate = '1fr',
}) => {
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        width: calc(100% - 26px);
        border: 3px dashed ${Colours.border};
        border-radius: 5px;
        display: grid;
        grid-template-columns: ${colTemplate};
        grid-auto-rows: ${rowTemplate};
        padding: 10px;
      `}
    >
      {children}
    </div>
  )
}

const InnerContainer = ({ children }) => {
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        width: calc(100% - 10px);
        border: 2px dashed ${Colours.blue};
        border-radius: 3px;
        margin: 5px;
        display: grid;
        place-items: center;
      `}
    >
      {children}
    </div>
  )
}
