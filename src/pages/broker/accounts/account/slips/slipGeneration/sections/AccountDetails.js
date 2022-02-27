import React, { useContext } from 'react'
import 'styled-components/macro'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { ColourContext } from 'context'

import { Core, Loading, Content } from 'components'
import { READ_ACCOUNT } from '../../../../queries'

function AccountsDetails(props) {
  const match = useRouteMatch()
  const { Colours, mode } = useContext(ColourContext)
  const {
    params: { accountId },
  } = match

  const { loading, error, data } = useQuery(READ_ACCOUNT, {
    variables: { accountId: parseInt(accountId) },
  })

  if (loading) return <Loading />
  if (error)
    return (
      <Content.Error type="alert" message="Failed to load account details" />
    )

  const { person, company, type } = data.readAccount
  const {
    firstName,
    lastName,
    gender,
    dateOfBirth,
    industry,
    dlDateIssued,
    maritalStatus,
    occupation,
    title,
    nationality,
    email,
    dlExpirationDate,
    streetNumber: Psn,
    streetName: Psna,
    city: Pc,
    parish: Pp,
    country: Pco,
  } = person || {}

  const {
    companyName,
    streetNumber: Csn,
    streetName: Csna,
    city: Cc,
    parish: Cp,
    country: Cco,
  } = company || {}

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

  return (
    <>
      {error && (
        <Content.Alert
          type="error"
          message={'Failed to Fetch Account details'}
        />
      )}
      <div
        css={`
          height: max-content;
          margin-bottom: 10px;
          background-color: ${Colours.header};
          border: 0.5px solid ${Colours.border};
          padding: 5px;
          margin-top: 10px;
          border-radius: 2px;
        `}
      >
        <Core.Text customSize="12px" weight="600">
          Account Details
        </Core.Text>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: repeat(${gender ? 5 : 4}, 1fr);
          @media only screen and (orientation: portrait) {
            grid-template-columns: repeat(${gender ? 4 : 3}, 1fr);
          }
          grid-gap: 10px;
          padding: 5px;
          margin-bottom: 25px;
        `}
      >
        {gender ? (
          <>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Title
              </Core.Text>
              <Core.Text customSize="12px">{title ? title : '--'}</Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Name
              </Core.Text>
              <Core.Text customSize="12px">{`${firstName} ${lastName}`}</Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Date of Birth
              </Core.Text>
              <Core.Text customSize="12px">
                {dateOfBirth !== '0000-00-00'
                  ? new Date(
                      new Date(parseInt(dateOfBirth)).setDate(
                        new Date(parseInt(dateOfBirth)).getDate() + 1
                      )
                    ).toLocaleDateString()
                  : '-'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Gender
              </Core.Text>
              <Core.Text customSize="12px">{gender}</Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Email
              </Core.Text>
              <Core.Text customSize="12px">{email}</Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Marital Status
              </Core.Text>
              <Core.Text customSize="12px">
                {maritalStatus ? maritalStatus : '--'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Occupation
              </Core.Text>
              <Core.Text customSize="12px">
                {occupation ? occupation : '--'}
              </Core.Text>
            </section>

            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Nationality
              </Core.Text>
              <Core.Text customSize="12px">
                {nationality ? nationality : '--'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                ID Issue Date
              </Core.Text>
              <Core.Text customSize="12px">
                {dlDateIssued !== '0000-00-00'
                  ? new Date(
                      new Date(parseInt(dlDateIssued)).setDate(
                        new Date(parseInt(dlDateIssued)).getDate() + 1
                      )
                    ).toLocaleDateString()
                  : '-'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                ID Exp. Date
              </Core.Text>
              <Core.Text customSize="12px">
                {dlExpirationDate !== '0000-00-00'
                  ? new Date(
                      new Date(parseInt(dlExpirationDate)).setDate(
                        new Date(parseInt(dlExpirationDate)).getDate() + 1
                      )
                    ).toLocaleDateString()
                  : '-'}
              </Core.Text>
            </section>
          </>
        ) : (
          <>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Name
              </Core.Text>
              <Core.Text customSize="12px">
                {companyName ? companyName : '--'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Email
              </Core.Text>
              <Core.Text customSize="12px">{email}</Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Industry
              </Core.Text>
              <Core.Text customSize="12px">
                {industry ? industry : '--'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Location
              </Core.Text>
              <Core.Text customSize="12px">
                {`${streetNumber ? streetNumber : ''} ${
                  streetName ? streetName + ', ' : ''
                } ${city ? city + ', ' : ''} ${parish ? parish : ''} ${
                  country ? country : ''
                }`}
              </Core.Text>
            </section>
          </>
        )}
      </div>
    </>
  )
}

export default AccountsDetails
