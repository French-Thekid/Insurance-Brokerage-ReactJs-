import React, { useState, useEffect } from 'react'
import 'styled-components/macro'
import { FormControl } from 'components'

function Location(props) {
  const [parishOrState, setParishOrState] = useState('JA')
  const { Parishes, Countries, States } = FormControl.Data
  const { values, errors, handleBlur, touched, handleChange } = props
  const { streetNumber, streetName, parish, city, country } = values

  /* eslint-disable */
  useEffect(() => {
    if (country === 'Jamaica') {
      setParishOrState('Jamaica')
    } else if (country === 'United States') {
      setParishOrState('United States')
    }
  })
  return (
    <div
      css={`
        width: ${props.edit ? '100%' : '600px'};
        @media (max-width: 376px) {
          width: 100%;
        }
      `}
    >
      <FormControl.FieldSet>
        <FormControl.Legend>Location Details</FormControl.Legend>
        <div
          css={`
            display: grid;
            grid-template-columns: max-content 1fr;
            @media (max-width: 376px) {
              grid-template-columns: 1fr;
            }
            grid-gap: 20px;
          `}
        >
          <FormControl.Input
            id="streetNumber"
            label="Street Number"
            value={streetNumber}
            onChange={handleChange}
            placeholder="Street Number"
            data-testid="create-organisation-address-one"
          />
          <FormControl.Input
            id="streetName"
            label="Street Name"
            value={streetName}
            onChange={handleChange}
            placeholder="Street Name"
            data-testid="create-organisation-address-one"
          />
          <section />
          <FormControl.Error
            name="streetName"
            show={errors.streetName && touched.streetName}
            message={errors ? errors.streetName : ''}
          />
        </div>
        <FormControl.Section>
          <FormControl.Input
            id="city"
            value={city}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="City"
            label="City"
            data-testid="create-organisation-city"
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
            groups={parishOrState === 'Jamaica' ? Parishes : States}
            name="parish"
            defaultText="Select Parish / State"
            label={parishOrState === 'Jamaica' ? 'Parish' : 'State'}
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
    </div>
  )
}

export default Location
