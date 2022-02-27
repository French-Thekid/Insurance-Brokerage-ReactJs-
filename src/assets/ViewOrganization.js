import React from 'react'
import 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'
import { Dialog, Card, Colours } from 'components'
import admin from 'images/admin.png'
import avatar from 'images/user.jpg'
import billing from 'images/billing.png'
import tech from 'images/tech.png'
import phoneIcon from 'images/phone.png'
import mailIcon from 'images/mailIcon.png'
import positionIcon from 'images/position.png'
import IDIcon from 'images/ID.png'
import OrgIDIcon from 'images/IDIcon.png'
import OrgNameIcon from 'images/OrgName.png'
import OrgNameLocation from 'images/OrgLocation.png'

const queryString = require('query-string')

function ViewOrganization({ isShowing, close }) {
  const { search } = useLocation()
  const { organisationId } = queryString.parse(search)
  const history = useHistory()
  const organisations = JSON.parse(localStorage.getItem('organisations'))

  let organization = null

  organisations.map((organisation) =>
    organisation.organizationId === organisationId
      ? (organization = organisation)
      : null
  )

  const {
    name,
    logoUrl,
    organizationId,
    replyToEmail,
    taxId,
    location: { addressOne, addressTwo, city, country },
    adminContact,
    billingContact,
    technicalContact,
  } = organization

  const Details = () => (
    <div>
      <div
        css={`
          display: grid;
          grid-template-rows: repeat(5, 40px);
        `}
      >
        <Section>
          <section
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <img
              src={OrgNameIcon}
              alt="orgName"
              css={`
                height: max-content;
                width: max-content;
              `}
            />
          </section>
          <h5
            css={`
              color: ${Colours.text};
            `}
          >
            {name}
          </h5>
        </Section>
        <Section>
          <section
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <img
              src={OrgIDIcon}
              alt="orgId"
              css={`
                height: max-content;
                width: max-content;
              `}
            />
          </section>
          <h5
            css={`
              color: ${Colours.text};
            `}
          >
            {organizationId}
          </h5>
        </Section>
        <Section>
          <section
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <img
              src={mailIcon}
              alt="avatar"
              css={`
                height: 15px;
                width: 24px;
              `}
            />
          </section>
          <h5
            css={`
              color: ${Colours.text};
            `}
          >
            {replyToEmail}
          </h5>
        </Section>
        <Section>
          <section
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <img
              src={IDIcon}
              alt="IDIcon"
              css={`
                height: max-content;
                width: max-content;
              `}
            />
          </section>
          <h5
            css={`
              color: ${Colours.text};
            `}
          >
            {taxId}
          </h5>
        </Section>
        <Section noBorder>
          <section
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <img
              src={OrgNameLocation}
              alt="LocationIcon"
              css={`
                height: max-content;
                width: max-content;
              `}
            />
          </section>
          <h5
            css={`
              color: ${Colours.text};
            `}
          >
            {`${addressOne}, ${
              addressTwo ? `${addressTwo}, ` : ''
            } ${city}, ${country}`}
          </h5>
        </Section>
      </div>
    </div>
  )
  return (
    <Dialog isShowing={isShowing}>
      <Card
        close={() => {
          close()
          history.goBack()
        }}
        title="View Organization"
      >
        <div
          css={`
            display: grid;
            grid-template-rows: 1fr max-content;
            grid-row-gap: 10px;
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
              grid-column-gap: 10px;
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
                justify-items: Center;
              `}
            >
              <img
                src={logoUrl}
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
              grid-column-gap: 10px;
              margin-top: 10px;
            `}
          >
            <ContactCard contact={adminContact} type="Administrator Contact" />
            <ContactCard contact={billingContact} type="Billing Contact" />
            <ContactCard contact={technicalContact} type="Technical Contact" />
          </div>
        </div>
      </Card>
    </Dialog>
  )
}

const Section = ({ children, noBorder }) => (
  <section
    css={`
      display: grid;
      grid-template-columns: 50px max-content;
      grid-column-gap: 10px;
      align-items: Center;
      border-bottom: ${noBorder ? 'none' : `0.5px solid ${Colours.border}`};
    `}
  >
    {children}
  </section>
)

const ContactCard = ({ contact, type }) => {
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
              : avatar
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
          grid-template-rows: 50px 50px 50px;
          grid-row-gap: 0px;
          margin-top: 20px;
        `}
      >
        <Section>
          <div
            css={`
              display: grid;
              justify-items: center;
            `}
          >
            <img
              src={positionIcon}
              alt="icon"
              css={`
                height: 20px;
                width: 20px;
              `}
            />
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
            <img
              src={mailIcon}
              alt="icon"
              css={`
                height: 15px;
                width: 20px;
              `}
            />
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
            <img
              src={phoneIcon}
              alt="icon"
              css={`
                height: 20px;
                width: 15px;
              `}
            />
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

export default ViewOrganization
