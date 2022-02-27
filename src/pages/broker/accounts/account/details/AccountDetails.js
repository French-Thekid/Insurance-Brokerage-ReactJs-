import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'
import { Core, Loading, Content } from 'components'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { READ_ACCOUNT } from '../../queries'

const AccountCard = ({ children }) => {
  const { Colours } = useContext(ColourContext)
  return (
    <div
      css={`
        border: 1px solid ${Colours.border};
        display: grid;
        grid-template-columns: max-content 1fr;
        grid-column-gap: 10px;
        border-radius: 5px;
        padding: 5px;
      `}
    >
      {children}
    </div>
  )
}
const AccountSubCard = ({ children }) => {
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content max-content 1fr;
        align-items: end;
      `}
    >
      {children}
    </div>
  )
}

const AccountDetailSections = ({ children }) => {
  return (
    <div
      css={`
        height: 100%;
        margin-bottom: 10px;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
        grid-row-gap: 15px;
      `}
    >
      {children}
    </div>
  )
}

const SubPanels = ({ title, children }) => {
  const { Colours } = useContext(ColourContext)
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content max-content;
        grid-gap: 10px;
      `}
    >
      <div
        css={`
          padding-bottom: 3px;
          border-bottom: 2px solid ${Colours.border};
        `}
      >
        <Core.Text weight="600">{title}</Core.Text>
      </div>
      <div
        css={`
          display: flex;
          flex-wrap: wrap;
        `}
      >
        {children}
      </div>
    </div>
  )
}

function InfoCard({ value, title }) {
  const mode = localStorage.getItem('Theme') || ''
  const { Colours } = useContext(ColourContext)
  return (
    <div
      css={`
        @media (min-width: 1367px) {
          width: calc(max-content + 200px);
        }
        display: grid;
        border-radius: 5px;
        border: 1px solid ${Colours.border};
        width: max-content;
        height: max-content;
        padding: 5px 10px;
        background: ${Colours.cardBackground};
        grid-template-rows: max-content max-content;
        grid-row-gap: 5px;
        margin-right: 10px;
        margin-bottom: 10px;
        transition: ease-out 0.2s;
        &:hover {
          box-shadow: ${mode === 'Dark'
            ? '0px 8px 20px -2px rgba(16,15,28,1)'
            : mode === 'Light' || mode === ''
            ? '0px 8px 20px -2px rgba(196, 196, 196, 1)'
            : 'none'};
          transition: ease-out 0.2s;
          transform: translateY(-1px);
        }
      `}
    >
      <Core.Text color={Colours.text} size="sm" weight="400">
        {title}
      </Core.Text>
      <Core.Text color={Colours.darkBlue} size="sm" weight="400">
        {value ? value : '-'}
      </Core.Text>
    </div>
  )
}

export default function AccountDetails() {
  const { Colours } = useContext(ColourContext)
  const {
    params: { accountId },
  } = useRouteMatch()

  const { loading, error, data } = useQuery(READ_ACCOUNT, {
    variables: { accountId: parseInt(accountId) },
  })

  if (loading) return <Loading />
  if (error)
    return (
      <Content.Alert type="error" message="Failed to load account details" />
    )

  const { person, company, type } = data.readAccount
  const {
    firstName,
    lastName,
    dateOfBirth,
    avatar,
    maritalStatus,
    email,
    nationality,
    occupation,
    dlType,
    dlNumber,
    employmentType,
    dlDateIssued,
    dlExpirationDate,
    dlCountry,
    streetNumber: Psn,
    streetName: Psna,
    city: Pc,
    parish: Pp,
    country: Pco,
    number: pP,
    carrier: pC,
    extensionRange: pE,
  } = person || {}

  const {
    avatar: CAvatar,
    companyName,
    industry,
    email: companyEmail,
    streetNumber: Csn,
    streetName: Csna,
    city: Cc,
    parish: Cp,
    country: Cco,
    phoneNumber: cP,
    phoneCarrier: CPc,
    phoneExtension: cPe,
  } = company || {}

  const contact =
    type === 'individual'
      ? {
          phoneNumber: pP,
          phoneCarrier: pC,
          phoneExtension: pE,
        }
      : {
          phoneNumber: cP,
          phoneCarrier: CPc,
          phoneExtension: cPe,
        }

  const location =
    type === 'individual'
      ? {
          streetNumber: Psn,
          streetName: Psna,
          city: Pc,
          parish: Pp,
          country: Pco,
        }
      : {
          streetNumber: Csn,
          streetName: Csna,
          city: Cc,
          parish: Cp,
          country: Cco,
        }

  const { streetNumber, streetName, city, parish, country } = location || {}
  const { phoneNumber, phoneCarrier, phoneExtension } = contact || {}

  let formattedDl = null
  if (type === 'individual') {
    //Formatting DL
    formattedDl = dlNumber.toString().split('')
    formattedDl.splice(3, 0, '-')
    formattedDl.splice(7, 0, '-')
    formattedDl.join('')
  }

  return (
    <div
      css={`
        height: max-content;
        margin-bottom: 10px;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-row-gap: 10px;
      `}
    >
      <AccountCard>
        <Content.Avatar
          size="large+"
          src={type === 'individual' ? avatar : CAvatar}
          firstName={type === 'individual' ? firstName : companyName}
          lastName={type === 'individual' ? lastName : companyName}
        />

        <AccountSubCard>
          <Core.Text color={Colours.blue} weight="700" size="md">
            {type === 'individual' ? `${firstName} ${lastName}` : companyName}
          </Core.Text>
          <Core.Text>{type === 'individual' ? email : companyEmail}</Core.Text>
          <Core.Text color={Colours.darkBlue}>
            {`${streetNumber ? streetNumber : ''} ${
              streetName ? streetName + ', ' : ''
            } ${city ? city + ', ' : ''} ${parish ? parish : ''} ${
              country ? country : ''
            }`}
          </Core.Text>
        </AccountSubCard>
      </AccountCard>
      <AccountDetailSections>
        {type === 'individual' && (
          <SubPanels title="Identification Details">
            <InfoCard title="Type" value={dlType} />
            <InfoCard title="Number" value={formattedDl.join('')} />
            <InfoCard
              title="Issue Date"
              value={
                dlDateIssued !== '0000-00-00' && dlDateIssued !== null
                  ? new Date(
                      new Date(parseInt(dlDateIssued)).setDate(
                        new Date(parseInt(dlDateIssued)).getDate() + 1
                      )
                    ).toDateString()
                  : '-'
              }
            />
            <InfoCard
              title="Exp. Date"
              value={
                dlExpirationDate !== '0000-00-00' && dlExpirationDate !== null
                  ? new Date(
                      new Date(parseInt(dlExpirationDate)).setDate(
                        new Date(parseInt(dlExpirationDate)).getDate() + 1
                      )
                    ).toDateString()
                  : '-'
              }
            />
            <InfoCard title="Country Issued" value={dlCountry} />
          </SubPanels>
        )}
        <SubPanels title="Contact Details">
          <InfoCard title="Type" value={type} />
          <InfoCard title="Carrier" value={phoneCarrier} />
          <InfoCard title="Number" value={phoneNumber} />
          <InfoCard title="Extension Range" value={phoneExtension} />
        </SubPanels>
        <SubPanels title="Other Details">
          {type === 'individual' ? (
            <>
              <InfoCard
                title="Date Of Birth"
                value={
                  dateOfBirth !== '0000-00-00' && dateOfBirth !== null
                    ? new Date(
                        new Date(parseInt(dateOfBirth)).setDate(
                          new Date(parseInt(dateOfBirth)).getDate() + 1
                        )
                      ).toDateString()
                    : '-'
                }
              />
              <InfoCard title="Occupation" value={occupation} />
              <InfoCard title="Marital Status" value={maritalStatus} />
              <InfoCard title="Nationality" value={nationality} />
              <InfoCard title="Employment Type" value={employmentType} />
            </>
          ) : (
            <InfoCard title="Industry" value={industry} />
          )}
        </SubPanels>
      </AccountDetailSections>
    </div>
  )
}
