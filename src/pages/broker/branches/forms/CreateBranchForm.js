import React, { useState, useEffect } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { LIST_BRANCHES } from './queries'
import { CREATE_BRANCH } from './mutations'
import { useMutation } from '@apollo/react-hooks'
import { FormControl, Core, Avatar, Content, Loading } from 'components'

import { initialBranch, createBranchSchema } from './initialValues'

export default function ({ close }) {
  const [createBranch, { loading: creating, error: BranchError }] = useMutation(
    CREATE_BRANCH,
    {
      refetchQueries: () => [
        {
          query: LIST_BRANCHES,
        },
      ],
    }
  )

  return (
    <Formik
      initialValues={initialBranch}
      validationSchema={createBranchSchema}
      onSubmit={async (
        { logo, streetNumber, streetName, city, parish, country, branchName },
        actions
      ) => {
        createBranch({
          variables: {
            branch: {
              streetNumber,
              streetName,
              city,
              parish,
              country,
              branchName,
            },
          },
        })
          .then(() => {
            close()
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
          handleSubmit,
          isSubmitting,
        } = props
        const { logo, branchName } = values

        return (
          <form action="" onSubmit={handleSubmit}>
            {creating && <Loading small Contained />}
            {BranchError && (
              <Content.Alert type="error" message="Failed to create branch" />
            )}
            <div
              css={`
                min-width: 600px;
                width: 100%;
                @media (max-width: 376px) {
                  width: 100%;
                }
                display: grid;
                justify-items: center;
              `}
            >
              <Avatar
                src={logo}
                onDone={({ base64 }) => {
                  setFieldValue('logo', base64)
                }}
              />
              <br />
              <div>
                <FormControl.Section>
                  <FormControl.Input
                    style={{ width: '250px' }}
                    id="branchName"
                    type="text"
                    value={branchName}
                    placeholder="eg. sagicor"
                    label="Branch Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="branchName"
                    show={errors.branchName && touched.branchName}
                    message={errors.branchName}
                  />
                </FormControl.Section>
              </div>
              <br />
              <div
                css={`
                  width: 100%;
                `}
              >
                <Location {...props} />
              </div>
            </div>
            <div
              css={`
                display: grid;
                justify-items: end;
                margin-top: 20px;
              `}
            >
              <Core.Button type="submit" width="150px" disabled={isSubmitting}>
                Create
              </Core.Button>
            </div>
          </form>
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
      <FormControl.Legend>Branch Location Details</FormControl.Legend>
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
          data-testid="create-Branch-address-one"
        />
        <FormControl.Input
          id="streetName"
          label="Street Name"
          value={streetName}
          onChange={handleChange}
          placeholder="Street Name"
          data-testid="create-Branch-address-one"
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
          data-testid="create-Branch-city"
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
