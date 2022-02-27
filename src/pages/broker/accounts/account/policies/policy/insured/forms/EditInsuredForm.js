import React, { useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { useLocation, useRouteMatch } from 'react-router-dom'

import {
  FormControl,
  StepForm,
  Avatar,
  Loading,
  Core,
  Content,
} from 'components'
import { Contact, DriverLicense, Location } from '../../../../../form/sections'
import {
  createIndividualAccountSchema,
  Titles,
  employmentTypes,
  maritalStatuses,
  genders,
} from '../../../../../form/initialValues'
import { UPDATE_INDIVIDUAL_INSURED, UPDATE_MAIN_INSURED } from './mutations'

import { GET_INSUREDS } from '../../queries'
import { Logger } from '../../../../../../../../utils'

const queryString = require('query-string')

export default function ({ close }) {
  const match = useRouteMatch()
  const {
    params: { accountId, policyId },
  } = match

  const { search } = useLocation()
  const { id: personId } = queryString.parse(search)

  const Insured = JSON.parse(localStorage.getItem('activeInsured'))
  const {
    id,
    title,
    email,
    dateOfBirth,
    firstName,
    middleName,
    lastName,
    maritalStatus,
    salutationName,
    placeOfBirth,
    nationality,
    gender,
    occupation,
    companyName,
    industry,
    taxIdNumber,
    taxIdType,
    employmentType,
    dlNumber,
    dlCountry,
    dlDateIssued,
    dlDateFirstIssued,
    dlType,
    dlExpirationDate,
    isMain,
  } = Insured || {}
  const [InsuredStatus, setInsuredStatus] = useState(
    isMain === 'Yes' ? true : false
  )

  //MUTATIONS
  const [
    updatePolicyHaveInsured,
    { loading: updatingInsured, error: errorUpdatingInsured },
  ] = useMutation(UPDATE_MAIN_INSURED, {
    refetchQueries: () => [
      {
        query: GET_INSUREDS,
        variables: {
          policyID: parseInt(policyId),
          accountID: parseInt(accountId),
        },
      },
    ],
  })
  const [updatePerson, { loading: updatingPerson, errors: accountErrors }] =
    useMutation(UPDATE_INDIVIDUAL_INSURED, {
      refetchQueries: () => [
        {
          query: GET_INSUREDS,
          variables: {
            policyID: parseInt(policyId),
            accountID: parseInt(accountId),
          },
        },
      ],
    })

  //Getting contact info
  const { data: contacts } = {}
  const { id: contactId, type, number, extensionRange, carrier } = {}

  //Getting location info
  const { data: locationData } = {}
  const {
    id: locationId,
    streetNumber,
    subPremise,
    premise,
    thoroughfare,
    country,
  } = {}

  //Temporary until backend change
  const ext = '876'
  const numExted = `${ext}${number && number.toString()}`
  let formattednumber = numExted.toString().split('')
  formattednumber.splice(3, 0, '-')
  formattednumber.splice(7, 0, '-')
  formattednumber.join('')

  //Formatting DL
  let formattedDl = dlNumber.toString().split('')
  formattedDl.splice(3, 0, '-')
  formattedDl.splice(7, 0, '-')
  formattedDl.join('')

  return (
    <Formik
      initialValues={{
        type,
        number: number ? formattednumber.join('') : '',
        extension: extensionRange,
        carrier,
        streetNumber,
        subPremise,
        premise,
        thoroughfare,
        country:
          country === 'Ja'
            ? 'Jamaica'
            : country === 'Un'
            ? 'United States'
            : '',
        id,
        title,
        email,
        firstName,
        middleName,
        lastName,
        dateOfBirth:
          dateOfBirth !== '0000-00-00' && dateOfBirth !== null
            ? new Date(parseInt(dateOfBirth))
                .toISOString()
                .replace(/T/, ' ')
                .split(' ')[0]
            : null,
        maritalStatus,
        salutationName,
        placeOfBirth,
        nationality,
        gender: gender === 'M' ? 'Male' : gender === 'F' ? 'Female' : '',
        occupation,
        companyName,
        industry,
        taxIdNumber,
        taxIdType,
        employmentType,
        dlNumber: dlNumber ? formattedDl.join('') : '',
        dlCountry: dlCountry === 'Ja' ? 'Jamaica' : 'United States',
        dlType,
        dlDateIssued:
          dlDateIssued !== '0000-00-00' && dlDateIssued !== null
            ? new Date(parseInt(dlDateIssued))
                .toISOString()
                .replace(/T/, ' ')
                .split(' ')[0]
            : null,
        dlDateFirstIssued:
          dlDateFirstIssued !== '0000-00-00' && dlDateFirstIssued !== null
            ? new Date(parseInt(dlDateFirstIssued))
                .toISOString()
                .replace(/T/, ' ')
                .split(' ')[0]
            : null,

        dlExpirationDate:
          dlExpirationDate !== '0000-00-00' && dlExpirationDate !== null
            ? new Date(parseInt(dlExpirationDate))
                .toISOString()
                .replace(/T/, ' ')
                .split(' ')[0]
            : null,
      }}
      validationSchema={createIndividualAccountSchema}
      onSubmit={async (
        {
          updatedAvatar,
          id,
          title,
          email,
          salutationName,
          firstName,
          middleName,
          lastName,
          maritalStatus,
          dateOfBirth,
          placeOfBirth,
          nationality,
          gender,
          occupation,
          companyName,
          industry,
          taxIdNumber,
          taxIdType,
          employmentType,
          dlNumber,
          dlCountry,
          dlDateIssued,
          dlDateFirstIssued,
          dlType,
          dlExpirationDate,
          type,
          number,
          extension,
          carrier,
          streetNumber,
          subPremise,
          premise,
          thoroughfare,
          country,
        },
        actions
      ) => {
        let numberFormat = 0

        if (number !== '' && number.toString().split('-')[1]) {
          if (number.toString().split(' ')[1])
            numberFormat = number.toString().split(' ')[1].split('-').join('')
          else
            numberFormat = `${number.toString().split('-')[1]}${
              number.toString().split('-')[2]
            }`
        } else numberFormat = number.substr(number.length - 7)

        let DLFormat = 0
        if (dlNumber !== '' && dlNumber.toString().split('-')[1]) {
          DLFormat = dlNumber.toString().split('-').join('')
        } else {
          DLFormat = dlNumber
        }

        const contact = {
          personId: parseInt(personId),
          id: contactId,
          type,
          carrier,
          number: parseInt(numberFormat),
          extensionRange: extension,
        }
        const location = {
          personId: parseInt(personId),
          id: locationId,
          streetNumber,
          subPremise,
          premise,
          thoroughfare,
          country,
        }

        const person = {
          dlNumber: parseInt(DLFormat),
          id: parseInt(personId),
          title,
          email,
          salutationName,
          firstName,
          middleName,
          lastName,
          maritalStatus,
          dateOfBirth,
          placeOfBirth,
          nationality,
          gender,
          occupation,
          companyName,
          industry,
          taxIdNumber,
          taxIdType,
          employmentType,
          dlCountry,
          dlDateIssued,
          dlDateFirstIssued,
          dlType,
          dlExpirationDate,
        }
        if (updatedAvatar) person.avatar = updatedAvatar

        if (InsuredStatus !== Insured.isMain) {
          updatePolicyHaveInsured({
            variables: {
              personId: parseInt(personId),
              accountId: parseInt(accountId),
              policyId: parseInt(policyId),
              isMain: InsuredStatus,
            },
          }).catch((e) => console.log(e))
        }

        

        await updatePerson({
          variables: {
            person,
          },
        })
          .then(() => {
            Logger('update insured')
          })
          .catch((e) => console.log(e))

        close()
      }}
    >
      {(props) => {
        const {
          values,
          setFieldValue,
          touched,
          handleChange,
          handleBlur,
          errors,
        } = props
        const {
          avatar,
          firstName,
          middleName,
          lastName,
          email,
          dateOfBirth,
          placeOfBirth,
          employmentType,
          occupation,
          nationality,
          gender,
          maritalStatus,
          title,
        } = values

        return (
          <StepForm {...props} edit>
            {(updatingInsured || updatingPerson ) && (
              <Loading small />
            )}
            {(errorUpdatingInsured || accountErrors) && (
              <Content.Alert type="error" message="Fail to Update Insured" />
            )}
            <div
              css={`
                width: 100%;
                display: grid;
                justify-items: center;
              `}
            >
              <Avatar
                src={avatar}
                onDone={({ base64 }) => setFieldValue('avatar', base64)}
              />
              <br />
              <section
                css={`
                  display: grid;
                  grid-template-columns: max-content max-content;
                  grid-column-gap: 10px;
                  align-items: Center;
                `}
              >
                <Core.Text>Main Insured</Core.Text>
                <FormControl.Toggle
                  onChange={(event) => {
                    event.persist()
                    if (event.target.checked) setInsuredStatus(true)
                    else setInsuredStatus(false)
                  }}
                  startwithoff={InsuredStatus ? null : 'true'}
                />
              </section>
              <br />
              <FormControl.ResponsiveSection cols={4}>
                <FormControl.Section>
                  <FormControl.Select
                    value={title}
                    groups={Titles}
                    label="Title"
                    name="title"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    placeholder="eg. John"
                    label="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="firstName"
                    show={errors.firstName && touched.firstName}
                    message={errors.firstName}
                  />
                </FormControl.Section>
                <FormControl.Input
                  id="middleName"
                  type="text"
                  value={middleName}
                  placeholder="eg. Anthony"
                  label="Middle Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Section>
                  <FormControl.Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    placeholder="eg. Brown"
                    label="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="lastName"
                    show={errors.lastName && touched.lastName}
                    message={errors.lastName}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Select
                    value={gender}
                    groups={genders}
                    label="Gender"
                    name="gender"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="gender"
                    show={errors.gender && touched.gender}
                    message={errors.gender}
                  />
                </FormControl.Section>
                <FormControl.Select
                  value={maritalStatus}
                  groups={maritalStatuses}
                  label="Marital Status"
                  name="maritalStatus"
                  handlechange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  label="Date of Birth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="placeOfBirth"
                  type="text"
                  value={placeOfBirth}
                  placeholder="eg. Mandeville"
                  label="Place of Birth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Select
                  value={employmentType}
                  groups={employmentTypes}
                  label="Employment Type"
                  name="employmentType"
                  handlechange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="occupation"
                  type="text"
                  value={occupation}
                  placeholder="eg. Software Engineer"
                  label="Occupation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="nationality"
                  type="text"
                  value={nationality}
                  placeholder="eg. Jamaican"
                  label="Nationality"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Section>
                  <FormControl.Input
                    id="email"
                    type="text"
                    value={email}
                    placeholder="eg. john@gmail.com"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="email"
                    show={errors.email && touched.email}
                    message={errors.email}
                  />
                </FormControl.Section>
              </FormControl.ResponsiveSection>
            </div>

            <DriverLicense {...props} />

            <Contact {...props} />

            <Location {...props} />
          </StepForm>
        )
      }}
    </Formik>
  )
}
