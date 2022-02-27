import React from 'react'
import 'styled-components/macro'
import { contactTypes, types } from '../initialValues'
import { FormControl, Loading } from 'components'
function Contact(props) {
  const { values, errors, handleBlur, touched, handleChange, loading } = props
  const {
    phoneType,
    phoneNumber,
    phoneExtension,
    phoneCarrier,
  } = values

  return (
    <div
      css={`
        width: ${props.edit ? '100%' : '600px'};
        @media (max-width: 376px) {
          width: 100%;
        }
      `}
    >
      {loading && <Loading small />}
      <FormControl.FieldSet>
        <FormControl.Legend>Contact Details</FormControl.Legend>
        <FormControl.ResponsiveSection>
          <FormControl.Select
            value={phoneType}
            groups={types}
            label="Type"
            name="phoneType"
            handlechange={handleChange}
            onBlur={handleBlur}
          />
          <FormControl.Select
            value={phoneCarrier}
            groups={contactTypes}
            label="Carrier"
            name="phoneCarrier"
            handlechange={handleChange}
            onBlur={handleBlur}
          />
          <FormControl.Section>
            <FormControl.Input
              label="Number"
              mask="(999) 999-9999"
              id="phoneNumber"
              type="text"
              value={phoneNumber}
              placeholder="eg. (876) 432-5464"
              onChange={handleChange}
              onBlur={handleBlur}
              inputtype="phone"
            />
            <FormControl.Error
              name="phoneNumber"
              show={errors.phoneNumber && touched.phoneNumber}
              message={errors.phoneNumber}
            />
          </FormControl.Section>
          <FormControl.Section>
            <FormControl.Input
              id="phoneExtension"
              type="text"
              value={phoneExtension}
              label="Extensions"
              placeholder="eg. 32"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl.Section>
        </FormControl.ResponsiveSection>
      </FormControl.FieldSet>
    </div>
  )
}

export default Contact
