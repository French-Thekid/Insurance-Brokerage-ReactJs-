import React, { useEffect, useState } from 'react'
import { FormControl } from 'components'
import { Parishes, States, Countries } from '../initialValues'

export default function Location(props) {
  const [parishOrState, setParishOrState] = useState('JA')
  const { values, errors, handleBlur, touched, handleChange } = props
  const { streetNumber, streetName, province, city, country } =
    values.location || {}

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
      <FormControl.Legend>Location</FormControl.Legend>
      <FormControl.ResponsiveSection col="150px 2fr">
        <section>
          <FormControl.Input
            label="Street Number"
            id="location.streetNumber"
            value={streetNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Street Number"
            data-testid="create-organisation-street-number"
          />
        </section>
        <section>
          <FormControl.Input
            label="Street Name"
            id="location.streetName"
            value={streetName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Street Name"
            data-testid="create-organisation-Street-Name-two"
            error={
              errors.location && touched.location
                ? errors.location.streetName && touched.location.streetName
                : false
            }
          />
          <FormControl.Error
            name="location.streetName"
            error={
              errors.location && touched.location
                ? errors.location.streetName && touched.location.streetName
                : false
            }
            message={errors.location ? errors.location.streetName : ''}
          />
        </section>
      </FormControl.ResponsiveSection>

      <FormControl.Section>
        <FormControl.Input
          label="City"
          id="location.city"
          value={city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="City"
          data-testid="create-organisation-city"
          style={{ marginTop: '10px' }}
          error={
            errors.location && touched.location
              ? errors.location.city && touched.location.city
              : false
          }
        />
        <FormControl.Error
          name="city"
          error={
            errors.location && touched.location
              ? errors.location.city && touched.location.city
              : false
          }
          message={errors.location ? errors.location.city : ''}
        />
      </FormControl.Section>
      <br />
      <FormControl.Section>
        <FormControl.Select
          value={province}
          groups={parishOrState === 'JA' ? Parishes : States}
          label="Province"
          name="location.province"
          handlechange={handleChange}
          handleblur={handleBlur}
          error={
            errors.location && touched.location
              ? errors.location.province && touched.location.province
              : false
          }
        />
        <FormControl.Error
          name="province"
          show={
            errors.location && touched.location
              ? errors.location.province && touched.location.province
              : false
          }
          message={errors.location ? errors.location.province : ''}
        />
      </FormControl.Section>
      <br />
      <FormControl.Section>
        <FormControl.Select
          value={country}
          groups={Countries}
          name="location.country"
          label="Country"
          onBlur={handleBlur}
          handlechange={handleChange}
          error={
            errors.location && touched.location
              ? errors.location.country && touched.location.country
              : false
          }
        />
        <FormControl.Error
          name="country"
          show={
            errors.location && touched.location
              ? errors.location.country && touched.location.country
              : false
          }
          message={errors.location ? errors.location.country : ''}
        />
      </FormControl.Section>
    </FormControl.FieldSet>
  )
}
