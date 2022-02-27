import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useRouteMatch } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { FormControl, StepForm, Avatar, Loading, Content } from 'components'
import { Contact, DriverLicense, Location } from './sections'
import {
  createIndividualAccountSchema,
  Titles,
  employmentTypes,
  maritalStatuses,
  genders,
} from './initialValues'
import { READ_ACCOUNT } from '../queries'
import { UPDATE_ACCOUNT } from '../mutations'
import { Logger } from '../../../../utils'

export default function ({ close }) {
  const match = useRouteMatch()
  const {
    params: { accountId },
  } = match

  //QUERY
  const { loading, error, data } = useQuery(READ_ACCOUNT, {
    variables: { accountId: parseInt(accountId) },
  })

  const [updateAccount, { loading: updatingAccount, errors: accountErrors }] =
    useMutation(UPDATE_ACCOUNT, {
      refetchQueries: () => [
        {
          query: READ_ACCOUNT,
          variables: { accountId: parseInt(accountId) },
        },
      ],
    })

  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Fail to load Account Details'} />
    )

  const { person } = data.readAccount || {}
  const {
    id,
    avatar,
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
    streetNumber,
    streetName,
    city,
    parish,
    country,
    number,
    carrier,
    extensionRange,
    type,
  } = person || {}

  return (
    <Formik
      initialValues={{
        phoneType: type,
        phoneNumber: number,
        phoneExtension: extensionRange,
        phoneCarrier: carrier,
        streetNumber,
        streetName,
        city,
        parish,
        country,
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
        industry,
        taxIdNumber,
        taxIdType,
        employmentType,
        dlNumber,
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
          phoneType,
          phoneNumber,
          phoneCarrier,
          phoneExtension,
          ...rest
        },
        actions
      ) => {
        let a = ''
        if (updatedAvatar) a = updatedAvatar.split(',')[1]

        const person = {
          type: phoneType,
          carrier: phoneCarrier,
          number: phoneNumber,
          extensionRange: phoneExtension,
          ...rest,
        }

        if (a !== '') person.avatar = a

        await updateAccount({
          variables: {
            account: {
              id: parseInt(accountId),
              type: 'individual',
              person,
            },
          },
        })
          .then(() => {
            Logger('edit individual account')
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
            {updatingAccount && <Loading small />}
            {accountErrors && (
              <Content.Alert type="error" message="Failed to update account" />
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
                onDone={({ base64 }) => setFieldValue('updatedAvatar', base64)}
              />
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
                <FormControl.Section>
                  <FormControl.Input
                    id="middleName"
                    type="text"
                    value={middleName}
                    placeholder="eg. Anthony"
                    label="Middle Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
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
                <FormControl.Section>
                  <FormControl.Select
                    value={maritalStatus}
                    groups={maritalStatuses}
                    label="Marital Status"
                    name="maritalStatus"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="dateOfBirth"
                    type="date"
                    value={dateOfBirth}
                    label="Date of Birth"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="placeOfBirth"
                    type="text"
                    value={placeOfBirth}
                    placeholder="eg. Mandeville"
                    label="Place of Birth"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Select
                    value={employmentType}
                    groups={employmentTypes}
                    label="Employment Type"
                    name="employmentType"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="occupation"
                    type="text"
                    value={occupation}
                    placeholder="eg. Software Engineer"
                    label="Occupation"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="nationality"
                    type="text"
                    value={nationality}
                    placeholder="eg. Jamaican"
                    label="Nationality"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
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
