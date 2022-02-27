import React from 'react'
import 'styled-components/macro'
import { useDialog } from 'hooks'
import { useHistory } from 'react-router-dom'

import { Colours, Icons, Core } from 'components'
import admin from 'assets/admin.png'
import billing from 'assets/billing.png'
import tech from 'assets/tech.png'
import logo from 'assets/logo.svg'

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const Organisation = JSON.parse(localStorage.getItem('selectedOrg'))

  const {
    name,
    logoUrl,
    organizationId,
    replyToEmail,
    taxId,
    location: { addressOne, addressTwo, city, country } = {},
    adminContact,
    billingContact,
    technicalContact,
  } = Organisation || {}

  const Details = () => (
    <div
      css={`
        display: grid;
        grid-template-rows: repeat(5, max-content);
        grid-row-gap: 5px;
      `}
    >
      <Container>
        <section aria-label="Name" data-balloon-pos="right">
          <Icons.AccountBalanceRoundedIcon style={{ color: Colours.blue }} />
        </section>
        <Core.Text weight="600" customSize="15px">
          {name}
        </Core.Text>
      </Container>
      <Container>
        <section aria-label="ID" data-balloon-pos="right">
          <Icons.RecentActorsRounded style={{ color: Colours.blue }} />
        </section>
        <Core.Text weight="600" Contained>
          {organizationId}
        </Core.Text>
      </Container>
      <Container>
        <section aria-label="Email" data-balloon-pos="right">
          <Icons.MailRounded style={{ color: Colours.blue }} />
        </section>
        <Core.Text weight="600">{replyToEmail}</Core.Text>
      </Container>
      <Container>
        <section aria-label="Tax ID" data-balloon-pos="right">
          <Icons.PaymentRounded style={{ color: Colours.blue }} />
        </section>
        <Core.Text weight="600">{taxId}</Core.Text>
      </Container>
      <Container last>
        <section aria-label="Address" data-balloon-pos="right">
          <Icons.LocationOnRounded style={{ color: Colours.blue }} />
        </section>
        <Core.Text weight="600">
          {`${addressOne}, ${
            addressTwo ? `${addressTwo}, ` : ''
          } ${city}, ${country}`}
        </Core.Text>
      </Container>
    </div>
  )

  const Container = ({ children, last }) => (
    <div
      css={`
        padding: 3.5px;
        display: grid;
        grid-template-columns: 40px 1fr;
        border-bottom: ${last ? 'none' : `1px solid ${Colours.border}`};
        @media (max-width: 376px) {
          max-width: 300px;
          padding: 10px;
        }
      `}
    >
      {children}
    </div>
  )

  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('selectedOrg')
        history.goBack()
      }}
      width="650px"
      title="View Organisation"
    >
      <div
        css={`
          display: grid;
          grid-template-rows: 1fr auto;
          grid-row-gap: 20px;
          overflow-y: auto;
          @media (max-height: 376px) {
            overflow-y: auto;
            max-height: 280px;
            grid-template-rows: 1fr;
            padding-right: 3px;
          }
          @media (max-width: 376px) {
            overflow-y: auto;
            max-height: 600px;
            grid-template-rows: 1fr;
            padding-right: 3px;
          }
        `}
      >
        <div
          css={`
            border: 1px solid ${Colours.border};
            background: ${Colours.card};
            border-radius: 10px;
            padding: 10px;
            display: grid;
            grid-template-columns: max-content 1fr;
            @media (max-width: 376px) {
              grid-template-columns: 1fr;
            }
            grid-gap: 10px;
          `}
        >
          <section
            css={`
              display: grid;
              grid-template-rows: 1fr;
              grid-row-gap: 10px;
              justify-items: center;
              border-right: 1px solid ${Colours.border};
              padding-right: 15px;
              @media (max-width: 376px) {
                border-right: none;
                padding-right: none;
                border-bottom: 1px solid ${Colours.border};
                padding-bottom: 15px;
              }

              justify-items: Center;
            `}
          >
            <img
              src={logoUrl ? logoUrl : logo}
              alt="avatar"
              css={`
                height: 200px;
                width: 200px;
                border-radius: 50%;
              `}
            />
          </section>
          <Details />
        </div>

        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-gap: 10px;
            @media (max-width: 376px) {
              grid-template-columns: 1fr;
              overflow-y: auto;
            }
          `}
        >
          <ContactCard contact={adminContact} type="Administrator Contact" />
          <ContactCard contact={billingContact} type="Billing Contact" />
          <ContactCard contact={technicalContact} type="Technical Contact" />
        </div>
      </div>
    </Dialog>
  )
}

const Section = ({ children, noBorder }) => (
  <section
    css={`
      padding: 5px 0px;
      display: grid;
      grid-template-columns: 40px max-content;
      grid-column-gap: 10px;
      align-items: Center;
      border-bottom: ${noBorder ? 'none' : `0.5px solid ${Colours.border}`};
    `}
  >
    {children}
  </section>
)

const ContactCard = ({ contact = {}, type }) => {
  const { firstName, lastName, position, email, phone } = contact
  return (
    <fieldset
      css={`
        border: 1px solid ${Colours.border};
        border-radius: 10px;
        display: grid;
        grid-template-rows: max-content max-content;
        grid-row-gap: 10px;
        justify-items: center;
        padding: 10px;
        padding-bottom: 0px;
        background: ${Colours.card};
      `}
    >
      <legend
        css={`
          text-align: center;
          color: ${Colours.blue};
        `}
      >
        {type}
      </legend>
      <div
        css={`
          display: grid;
          grid-template-rows: max-content max-content;
          justify-items: center;
          grid-row-gap: 10px;
          padding-bottom: 5px;
        `}
      >
        <img
          src={
            type === 'Administrator Contact'
              ? admin
              : type === 'Billing Contact'
              ? billing
              : type === 'Technical Contact'
              ? tech
              : ''
          }
          alt="avatar"
          css={`
            height: 80px;
            width: 80px;
            border-radius: 50%;
          `}
        />
        <h4
          css={`
            color: ${Colours.text};
          `}
        >{`${firstName} ${lastName}`}</h4>
      </div>
      <div
        css={`
          display: grid;
          grid-template-rows: repeat(3, max-content);
          grid-row-gap: 0px;
          margin-top: 10px;
        `}
      >
        <Section>
          <div
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <section aria-label="Position" data-balloon-pos="right">
              <Icons.AccountCircleRounded style={{ color: Colours.blue }} />
            </section>
          </div>
          <h6
            css={`
              color: ${Colours.text};
            `}
          >
            {position}
          </h6>
        </Section>
        <Section>
          <div
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <section aria-label="Email" data-balloon-pos="right">
              <Icons.MailRounded style={{ color: Colours.blue }} />
            </section>
          </div>
          <h6
            css={`
              color: ${Colours.text};
            `}
          >
            {email}
          </h6>
        </Section>
        <Section noBorder>
          <div
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <section aria-label="Contact Number" data-balloon-pos="right">
              <Icons.PhoneRounded style={{ color: Colours.blue }} />
            </section>
          </div>
          <h6
            css={`
              color: ${Colours.text};
            `}
          >
            {phone}
          </h6>
        </Section>
      </div>
    </fieldset>
  )
}
