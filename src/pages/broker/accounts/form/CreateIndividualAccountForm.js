import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'

import { FormControl, StepForm, Avatar, Loading, Content } from 'components'
import { Contact, DriverLicense, Location } from './sections'
import {
  createIndividualAccountSchema,
  initialAccount,
  Titles,
  employmentTypes,
  maritalStatuses,
  genders,
} from './initialValues'
import { CREATE_ACCOUNT } from '../mutations'
import { LIST_ACCOUNTS } from '../queries'
import { useMutation } from '@apollo/react-hooks'
import { Logger } from '../../../../utils'

export default function ({ close, showNotificationCreate }) {
  const [createAccount, { loading: creatingAccount, errors: accountErrors }] =
    useMutation(CREATE_ACCOUNT, {
      refetchQueries: () => [
        {
          query: LIST_ACCOUNTS,
        },
      ],
      onCompleted() {
        showNotificationCreate()
      },
    })

  return (
    <Formik
      initialValues={initialAccount}
      validationSchema={createIndividualAccountSchema}
      onSubmit={async (
        {
          avatar,
          phoneType,
          phoneCarrier,
          phoneNumber,
          phoneExtension,
          ...rest
        },
        actions
      ) => {
        if (avatar) avatar = avatar.split(',')[1]

        await createAccount({
          variables: {
            account: {
              type: 'individual',
              person: {
                avatar,
                type: phoneType,
                carrier: phoneCarrier,
                number: phoneNumber,
                extensionRange: phoneExtension,
                ...rest,
              },
            },
          },
        })
          .then((res) => {
            Logger('create individual account')
            console.log(res)
            showNotificationCreate()
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
          <StepForm {...props}>
            {creatingAccount && <Loading small />}
            {accountErrors && (
              <Content.Alert type="error" message="Fail to create account" />
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
                    id="gender"
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
                </FormControl.Section>{' '}
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
                <section>
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
                </section>
              </FormControl.ResponsiveSection>
            </div>

            <DriverLicense {...props} />

            <Contact loading={creatingAccount} {...props} />

            <Location {...props} />
          </StepForm>
        )
      }}
    </Formik>
  )
}
