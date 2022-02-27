import React, { useContext } from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'
import { ColourContext } from 'context'

import { Content, Core, Icons } from 'components'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const { Colours } = useContext(ColourContext)

  const initialInsurer = JSON.parse(localStorage.getItem('activeInsurer'))

  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    phoneExtension,
    streetNumber,
    city,
    parish,
    streetName,
    country,
    company,
    avatar,
  } = initialInsurer || {}

  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeInsurer')
        history.push('/broker/insurers')
      }}
      minWidth="550px"
      title="View Insurer"
    >
      <div
        css={`
          width: calc(100% - 20px);
          padding: 10px;
          display: grid;
          justify-items: center;
          @media (max-height: 376px) {
            width: 100%;
            overflow-y: auto;
            max-height: 280px;
            grid-template-rows: 1fr;
            padding-right: 3px;
          }
          @media (max-width: 376px) {
            width: calc(100% - 23px);
            overflow-y: auto;
            max-height: 600px;
            max-width: 350px;
            grid-template-rows: 1fr;
            /* padding-right: 3px; */
            border: 1px solid red;
          }
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-rows: repeat(5, max-content);
            grid-row-gap: 20px;
            justify-items: center;
            width: 100%;
          `}
        >
          <Content.Avatar src={avatar} size="huge" />
          <div
            css={`
              width: calc(100% - 20px);
              padding: 10px;
              border-bottom: 1px solid ${Colours.border};
              display: grid;
              justify-items: center;
            `}
          >
            <Core.Text weight="600" customSize="20px">
              {company}
            </Core.Text>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: 1fr 1fr;
              width: calc(100% - 20px);
              @media (max-width: 376px) {
                grid-template-columns: 1fr;
                max-width: 300px;
                width: calc(100% - 50px);
              }
              grid-gap: 20px;
            `}
          >
            <Card
              type="rep"
              value={`${firstName} ${lastName}`}
              label="Representative"
            />
            <Card type="email" value={email} label="Email" />
            <Card type="contact" value={phoneNumber} label="Phone Contact" />
            <Card type="ext" value={phoneExtension} label="Phone Extension" />
          </div>
          <div
            css={`
              @media (max-width: 376px) {
                max-width: 300px;
                width: calc(100% - 50px);
              }
            `}
          >
            <Card
              type="address"
              value={
                streetNumber === null &&
                streetName === null &&
                country === null &&
                parish === null &&
                city === null
                  ? 'No Address Provided'
                  : `${streetNumber ? streetNumber : ''} ${
                      streetName ? `${streetName}, ` : ''
                    } ${city ? city : ''} ${parish ? ',' : ''} ${parish} ${
                      country ? ',' : ''
                    } ${country}`
              }
              label="Address"
            />
          </div>
        </div>
      </div>
    </Dialog>
  )
}

const Card = ({ type, label, value }) => {
  const { Colours, mode } = useContext(ColourContext)
  return (
    <div
      css={`
        width: calc(100% - 20px);
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: 10px;
        border-radius: 5px;
        border: 1px solid ${Colours.border};
        padding: 10px;
      `}
    >
      {type === 'rep' ? (
        <Icons.AccountCircleRounded
          style={{ fontSize: '50px', color: Colours.blue }}
        />
      ) : type === 'email' ? (
        <Icons.MailRounded style={{ fontSize: '50px', color: Colours.blue }} />
      ) : type === 'contact' ? (
        <Icons.PhoneRounded style={{ fontSize: '50px', color: Colours.blue }} />
      ) : type === 'ext' ? (
        <Icons.DialerSipRounded
          style={{ fontSize: '50px', color: Colours.blue }}
        />
      ) : type === 'address' ? (
        <Icons.LocationOnRounded
          style={{ fontSize: '50px', color: Colours.blue }}
        />
      ) : null}
      <div
        css={`
          width: 100%;
          display: grid;
          grid-template-rows: 1fr 1fr;
          grid-gap: 5px;
        `}
      >
        <Core.Text
          color={mode === 'Dark' ? Colours.softGrey : 'inherit'}
          weight="650"
        >
          {label}
        </Core.Text>
        <Core.Text Contained>{value}</Core.Text>
      </div>
    </div>
  )
}
