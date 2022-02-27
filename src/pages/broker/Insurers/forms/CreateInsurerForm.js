import React, { useState, useEffect } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'

import { FormControl, StepForm, Avatar, Content, Loading } from 'components'
import { LIST_INSURERS } from './queries'
import { CREATE_INSURER } from './mutations'
import { useMutation } from '@apollo/react-hooks'

import {
  Carriers,
  types,
  initialInsurer,
  createInsurerSchema,
} from './initialValues'
import { Logger } from '../../../../utils'

export default function ({ showNotificationCreate, close }) {


  const [createInsurer, { loading, error: insurerError }] = useMutation(
    CREATE_INSURER,
    {
      refetchQueries: () => [
        {
          query: LIST_INSURERS,
        },
      ],
    }
  )

  return (
    <Formik
      initialValues={initialInsurer}
      validationSchema={createInsurerSchema}
      onSubmit={async (
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          phoneCarrier,
          phoneExtension,
          phoneType,
          streetNumber,
          city,
          parish,
          streetName,
          country,
          company,
          avatar,
        },
        actions
      ) => {
        let base64Avatar = null
        let numberFormat = 0
        if (phoneNumber !== '' && phoneNumber.toString().split('-')[1]) {
          numberFormat = phoneNumber.toString().split(' ')[1].replace('-', '')
        }
        if (avatar) base64Avatar = avatar.split(',')[1]
        createInsurer({
          variables: {
            insurer: {
              base64Avatar,
              company,
              email,
              firstName,
              lastName,
              phoneNumber,
              phoneCarrier,
              phoneType,
              phoneExtension,
              streetNumber,
              streetName,
              city,
              parish,
              country,
            },
          },
        })
          .then(() => {
            Logger(`created an insurer ${company}`)
            close()
            showNotificationCreate()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const {
          values,
          setFieldValue,
          handleBlur,
          touched,
          errors,
          handleChange,
        } = props
        const {
          avatar,
          firstName,
          lastName,
          email,
          phoneNumber,
          phoneExtension,
          phoneType,
          company,
          phoneCarrier,
        } = values

        return (
          <StepForm {...props}>
            <div
              css={`
                width: 100%;
                @media (max-width: 376px) {
                  width: 100%;
                }
                display: grid;
                justify-items: center;
              `}
            >
              {loading && <Loading small />}
              {insurerError && (
                <Content.Alert
                  type="error"
                  returnAfter
                  message={'Failed to Create Insurer'}
                />
              )}
              <Avatar
                src={avatar}
                onDone={({ base64 }) => {
                  setFieldValue('avatar', base64)
                }}
              />
              <br />
              <div>
                <FormControl.Section>
                  <FormControl.Input
                    style={{ width: '250px' }}
                    id="company"
                    type="text"
                    value={company}
                    placeholder="eg. sagicor"
                    label="Company Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="company"
                    show={errors.company && touched.company}
                    message={errors.company}
                  />
                </FormControl.Section>
              </div>
              <br />
              <FormControl.FieldSet>
                <FormControl.Legend>
                  Representative General Details
                </FormControl.Legend>
                <FormControl.ResponsiveSection cols={3}>
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
                    <FormControl.Input
                      id="email"
                      type="text"
                      value={email}
                      placeholder="eg. abc@xmail.com"
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
              </FormControl.FieldSet>
              <br />
              <FormControl.FieldSet>
                <FormControl.Legend>
                  Representative Contact Details
                </FormControl.Legend>
                <FormControl.ResponsiveSection cols={3}>
                  <FormControl.Section>
                    <FormControl.Input
                      id="phoneNumber"
                      mask="(999) 999-9999"
                      type="text"
                      value={phoneNumber}
                      placeholder="eg. (876) 451-6685"
                      label="Phone Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="phoneNumber"
                      show={errors.phoneNumber && touched.phoneNumber}
                      message={errors.phoneNumber}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Select
                      value={phoneType}
                      groups={types}
                      label="Phone Type"
                      name="phoneType"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="phoneType"
                      show={errors.phoneType && touched.phoneType}
                      message={errors.phoneType}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Select
                      value={phoneCarrier}
                      groups={Carriers}
                      label="Phone Carrier"
                      name="phoneCarrier"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl.Section>
                  <FormControl.Input
                    id="phoneExtension"
                    type="text"
                    value={phoneExtension}
                    placeholder="eg. 354"
                    label=" Phone Extension"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </div>
            <div
              css={`
                width: 600px;
                @media (max-width: 376px) {
                  width: 100%;
                }
              `}
            >
              {' '}
              {insurerError && (
                <Content.Alert
                  type="error"
                  returnAfter
                  message={'Failed to Create Insurer'}
                />
              )}
              <Location {...props} />
            </div>
          </StepForm>
        )
      }}
    </Formik>
  )
}

function Location(props) {
  const [parishOrState, setParishOrState] = useState('JA')
  const { Parishes, Countries, States } = FormControl.Data
  const { values, errors, handleBlur, touched, handleChange } = props
  const { streetNumber, streetName, city, parish, country } = values

  /* eslint-disable */
  useEffect(() => {
    if (country === 'Jamaica') {
      setParishOrState('JA')
    } else if (country === 'United States') {
      setParishOrState('USA')
    }
  })

  return (
    <FormControl.FieldSet>
      <FormControl.Legend>Location Details</FormControl.Legend>
      <div
        css={`
          display: grid;
          grid-template-columns: max-content 1fr;
          @media (max-width: 376px) {
            grid-template-columns: 1fr;
          }
          grid-gap: 10px;
        `}
      >
        <FormControl.Input
          id="streetNumber"
          label="Street Number"
          value={streetNumber}
          onChange={handleChange}
          placeholder="Street Number"
          data-testid="create-Insurer-address-one"
        />
        <FormControl.Input
          id="streetName"
          label="Street Name"
          value={streetName}
          onChange={handleChange}
          placeholder="Street Name"
          data-testid="create-Insurer-address-one"
        />
        <section />
        <FormControl.Error
          name="streetName"
          show={errors.streetName && touched.streetName}
          message={errors ? errors.streetName : ''}
        />
      </div>
      <FormControl.Section marginTop="20px">
        <FormControl.Input
          id="city"
          value={city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="City"
          label="City"
          data-testid="create-Insurer-city"
        />
        <FormControl.Error
          name="city"
          show={errors.city && touched.city}
          message={errors ? errors.city : ''}
        />
      </FormControl.Section>
      <FormControl.Section marginTop="20px">
        <FormControl.Select
          value={parish}
          groups={parishOrState === 'JA' ? Parishes : States}
          name="parish"
          defaultText="FormControl.Select Parish / State"
          label={parishOrState === 'JA' ? 'Parish' : 'State'}
          onBlur={handleBlur}
          handlechange={handleChange}
        />
        <FormControl.Error
          name="parish"
          show={errors.parish && touched.parish}
          message={errors ? errors.parish : ''}
        />
      </FormControl.Section>
      <FormControl.Section marginTop="20px">
        <FormControl.Select
          value={country}
          groups={Countries}
          name="country"
          label="Country"
          onBlur={handleBlur}
          handlechange={handleChange}
        />
        <FormControl.Error
          name="country"
          show={errors.country && touched.country}
          message={errors ? errors.country : ''}
        />
      </FormControl.Section>
    </FormControl.FieldSet>
  )
}
