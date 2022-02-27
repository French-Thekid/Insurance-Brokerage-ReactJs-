import React from 'react'
import 'styled-components/macro'
import { FormControl } from 'components'
import { Licenses } from '../initialValues'

function DriverLicense(props) {
  const { Countries } = FormControl.Data
  const { values, handleChange, handleBlur, touched, errors } = props
  let {
    dlNumber,
    dlCountry,
    dlDateIssued,
    dlDateFirstIssued,
    dlExpirationDate,
    dlType,
  } = values
  return (
    <div
      css={`
        width: 600px;
        @media (max-width: 376px) {
          width: 100%;
        }
      `}
    >
      <FormControl.FieldSet>
        <FormControl.Legend>Drivers License Details</FormControl.Legend>
        <FormControl.ResponsiveSection>
          <FormControl.Select
            value={dlType}
            groups={Licenses}
            label="Type"
            name="dlType"
            handlechange={handleChange}
            onBlur={handleBlur}
          />
          <section>
            <FormControl.Input
              mask="999-999-999"
              id="dlNumber"
              type="text"
              value={dlNumber}
              placeholder="eg. 437-483-024"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Number"
            />
            <FormControl.Error
              name="dlNumber"
              show={errors.dlNumber && touched.dlNumber}
              message={errors.dlNumber}
            />
          </section>{' '}
          <FormControl.Section>
            <FormControl.Select
              value={dlCountry}
              groups={Countries}
              label="Country"
              name="dlCountry"
              handlechange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl.Section>
          <FormControl.Section>
            <FormControl.Input
              id="dlDateIssued"
              type="date"
              value={dlDateIssued}
              label="Date Issued"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl.Section>
          <FormControl.Section>
            <FormControl.Input
              id="dlDateFirstIssued"
              type="date"
              value={dlDateFirstIssued}
              label="Date First Issued"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl.Section>
          <FormControl.Section>
            <FormControl.Input
              id="dlExpirationDate"
              type="date"
              value={dlExpirationDate}
              label="Expiration Date"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl.Section>
        </FormControl.ResponsiveSection>
      </FormControl.FieldSet>
    </div>
  )
}

export default DriverLicense
