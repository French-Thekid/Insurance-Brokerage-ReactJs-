import React, { useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useLocation, useRouteMatch } from 'react-router-dom'

import { FormControl, Loading, Content, StepForm } from 'components'
import {
  updateNonMotorRiskSchema,
  Countries,
  States,
  Parishes,
  RoofTypes,
  WallTypes,
  OccupancyTypes,
  ApartmentTypes,
  Usages,
} from '../../../forms/initialValues'

import { LIST_NONMOTOR_RISKS } from '../../queries'
import { UPDATE_RISK, UPDATE_NONMOTOR_RISK } from '../../mutations'
import { Logger } from '../../../../../../../../utils'

const queryString = require('query-string')

export default function ({ close }) {
  const [parishOrState, setParishOrState] = useState('JA')
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { search } = useLocation()
  const { id: riskID } = queryString.parse(search)

  //Mutations
  // --Create non motor risk mutation
  const [updateNonMotorRisk, { loading, error: nonMotorRiskError }] =
    useMutation(UPDATE_NONMOTOR_RISK, {
      refetchQueries: () => [
        {
          query: LIST_NONMOTOR_RISKS,
          variables: {
            accountId: parseInt(accountId),
            policyId: parseInt(policyId),
          },
        },
      ],
    })

  //--Create non motor risk mutation
  const [updateRisk, { loading: loadingR, error: riskError }] = useMutation(
    UPDATE_RISK,
    {
      refetchQueries: () => [
        {
          query: LIST_NONMOTOR_RISKS,
          variables: {
            accountId: parseInt(accountId),
            policyId: parseInt(policyId),
          },
        },
      ],
    }
  )

  const {
    type,
    storeys,
    roofConstruction,
    wallConstruction,
    occupancy,
    country,
    streetNumber,
    details,
    description,
    thoroughfare,
    subPremise,
    premise,
    id,
    year,
    usage,
    sumInsured,
  } = JSON.parse(localStorage.getItem('activeNonMotorRisk')) || {}

  const initialNonMotorRisk = {
    riskId: id,
    year: year,
    usage: usage,
    sumInsured: sumInsured,
    type: type,
    storeys: storeys,
    roofConstruction: roofConstruction,
    wallConstruction: wallConstruction,
    occupancy: occupancy,
    country: country === 'Ja' ? 'Jamaica' : 'United States',
    details: details,
    description: description,
    thoroughfare: thoroughfare,
    subPremise: subPremise,
    premise: premise,
    streetNumber: streetNumber,
  }

  if (nonMotorRiskError)
    return <Content.Alert type="error" message="Fail to Update Risk" />

  return (
    <Formik
      initialValues={initialNonMotorRisk}
      validationSchema={updateNonMotorRiskSchema}
      onSubmit={(
        {
          type,
          storeys,
          roofConstruction,
          wallConstruction,
          occupancy,
          country,
          streetNumber,
          thoroughfare,
          subPremise,
          premise,
          year,
          sumInsured,
          usage,
          details,
          description,
        },
        actions
      ) => {
        let finalSumInsured = 0
        if (sumInsured !== '' && sumInsured.toString().split(',')[1]) {
          finalSumInsured = sumInsured
            .toString()
            .split('$')[1]
            .split('.')[0]
            .split(',')
            .join('')
        } else {
          finalSumInsured = sumInsured
        }

        updateRisk({
          variables: {
            accountID: parseInt(accountId),
            policyID: parseInt(policyId),
            year,
            riskID: parseInt(riskID),
            sumInsured: parseFloat(finalSumInsured),
            usage,
          },
        })
          .then(() => {
            //Updating Non Motor Risk
            updateNonMotorRisk({
              variables: {
                accountID: parseInt(accountId),
                riskID: parseInt(riskID),
                type,
                storeys: storeys.toString(),
                occupancy,
                roofConstruction,
                wallConstruction,
                usage,
                details,
                country,
                description,
                subPremise,
                premise,
                streetNumber,
                thoroughfare,
              },
            }).catch((e) => console.log(e))
          })
          .then(() => {
            Logger('updated a non-motor risk')
            close()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const { values, handleBlur, touched, errors, handleChange } = props

        const {
          type,
          storeys,
          occupancy,
          roofConstruction,
          wallConstruction,
          usage,
          details,
          country,
          description,
          subPremise,
          premise,
          streetNumber,
          thoroughfare,
          year,
          sumInsured,
        } = values
        return (
          <StepForm {...props} edit>
            {(loading || loadingR) && <Loading small />}

            {riskError && (
              <Content.Alert type="error" message="Fail to Update Risk" />
            )}
            {nonMotorRiskError && (
              <Content.Alert
                type="error"
                message="Fail to Update NonMotor Risk"
              />
            )}

            <div>
              <FormControl.FieldSet>
                <FormControl.Legend>General Details</FormControl.Legend>
                <FormControl.ResponsiveSection cols={3}>
                  <FormControl.Section>
                    <FormControl.Select
                      value={type}
                      groups={ApartmentTypes}
                      label="Type"
                      name="type"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      show={errors.type && touched.type}
                      message={errors.type}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Select
                      value={occupancy}
                      groups={OccupancyTypes}
                      label="Occupancy"
                      name="occupancy"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      show={errors.occupancy && touched.occupancy}
                      message={errors.occupancy}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="storeys"
                      type="number"
                      value={storeys}
                      placeholder="eg. 2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label=" No. of Storeys"
                    />
                    <FormControl.Error
                      show={errors.storeys && touched.storeys}
                      message={errors.storeys}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Select
                      value={wallConstruction}
                      groups={WallTypes}
                      label="Wall Construction"
                      name="wallConstruction"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      show={errors.wallConstruction && touched.wallConstruction}
                      message={errors.wallConstruction}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Select
                      value={roofConstruction}
                      groups={RoofTypes}
                      label="Roof Construction"
                      name="roofConstruction"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      show={errors.roofConstruction && touched.roofConstruction}
                      message={errors.roofConstruction}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Select
                      value={usage}
                      groups={Usages}
                      label="Usage"
                      name="usage"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="year"
                      type="number"
                      value={year}
                      placeholder="eg. 2005"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Year"
                    />
                    <FormControl.Error
                      show={errors.year && touched.year}
                      message={errors.year}
                    />
                  </FormControl.Section>{' '}
                  <FormControl.Section>
                    <FormControl.Input
                      mask={
                        sumInsured.toString().replace(/\s/g, '').length <= 10
                          ? '$9,999,9999'
                          : '$99,999,999'
                      }
                      id="sumInsured"
                      type="text"
                      value={sumInsured}
                      placeholder="$0. 00"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Sum Insured"
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Section>
                  <FormControl.Input
                    id="details"
                    type="text"
                    multiline
                    rows={4}
                    value={details}
                    placeholder="Details here"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Details"
                  />
                  <FormControl.Error
                    show={errors.details && touched.details}
                    message={errors.details}
                  />
                </FormControl.Section>
                <FormControl.Input
                  id="description"
                  type="text"
                  multiline
                  rows={4}
                  value={description}
                  placeholder="Description here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Description"
                />
              </FormControl.FieldSet>
            </div>
            <div>
              <FormControl.FieldSet>
                <FormControl.Legend>Location Details</FormControl.Legend>
                <div
                  css={`
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    grid-column-gap: 10px;
                    @media (max-width: 376px) {
                      grid-template-columns: 1fr;
                    }
                  `}
                >
                  <FormControl.Section>
                    <FormControl.Input
                      id="streetNumber"
                      type="text"
                      value={streetNumber}
                      placeholder="eg. 5"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Street Number"
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="subPremise"
                      type="text"
                      value={subPremise}
                      placeholder="eg. Seymour Drive"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Street Name"
                    />
                    <FormControl.Error
                      show={errors.subPremise && touched.subPremise}
                      message={errors.subPremise}
                    />
                  </FormControl.Section>
                </div>
                <FormControl.Section>
                  <FormControl.Input
                    id="premise"
                    type="text"
                    value={premise}
                    placeholder="eg. Kingston 5"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="City"
                  />
                  <FormControl.Error
                    show={errors.premise && touched.premise}
                    message={errors.premise}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Select
                    value={thoroughfare}
                    groups={
                      parishOrState === 'JA' || parishOrState === 'Jamaica'
                        ? Parishes
                        : States
                    }
                    label={
                      parishOrState === 'JA' || parishOrState === 'Jamaica'
                        ? 'Parish'
                        : 'State'
                    }
                    name="thoroughfare"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    show={errors.thoroughfare && touched.thoroughfare}
                    message={errors.thoroughfare}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Select
                    value={country}
                    groups={Countries}
                    label="Country"
                    name="country"
                    action={setParishOrState}
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    show={errors.country && touched.country}
                    message={errors.country}
                  />
                </FormControl.Section>
              </FormControl.FieldSet>
            </div>
          </StepForm>
        )
      }}
    </Formik>
  )
}
