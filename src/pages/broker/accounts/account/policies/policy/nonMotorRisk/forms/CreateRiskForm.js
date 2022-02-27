import React, { useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'
import { object, string, number, array } from 'yup'

import { FormControl, Loading, Content, StepForm } from 'components'
import {
  initialNonMotorRisk,
  Countries,
  States,
  Parishes,
  RoofTypes,
  WallTypes,
  OccupancyTypes,
  ApartmentTypes,
  Usages,
} from '../../../forms/initialValues'
import { Items, Mortgagees } from './partials'

import { LIST_NONMOTOR_RISKS } from '../../queries'
import {
  CREATE_RISK,
  CREATE_NONMOTOR_RISK,
  CREATE_MORTGAGEES,
  CREATE_NONMOTOR_RISK_ITEM,
} from '../../mutations'
import { Logger } from '../../../../../../../../utils'

export default function ({ close }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const [activateItemsVal, setActivateItemsVal] = useState(false)
  const [activeMotgageesVal, setActivateMotgageesVal] = useState(false)
  const [Risk, setRisk] = useState(null)
  const [parishOrState, setParishOrState] = useState('JA')

  const trnRegExp = /^([[0-9][0-9][0-9][-][0-9][0-9][0-9][-][0-9][0-9][0-9]$)/

  //MUTATIONS
  // --Create non motor risk mutation
  const [createNonMotorRisk, { loading, error: nonMotorRiskError }] =
    useMutation(CREATE_NONMOTOR_RISK, {
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

  // --Create non motor risk mortgagees mutation
  const [createRiskMortgagee, { loading: loadingM, error: MortgageeError }] =
    useMutation(CREATE_MORTGAGEES)

  //--Create non motor risk item mutation
  const [createNonMotorRiskItem, { error: nonMotorRiskItemError }] =
    useMutation(CREATE_NONMOTOR_RISK_ITEM)

  //--Create non motor risk mutation
  const [createRisk, { loading: loadingR, error: riskError }] = useMutation(
    CREATE_RISK,
    {
      onCompleted({ createRisk }) {
        const {
          Mortgagees,
          Items,
          type,
          storeys,
          occupancy,
          roofConstruction,
          wallConstruction,
          details,
          country,
          description,
          subPremise,
          premise,
          streetNumber,
          thoroughfare,
        } = Risk
        //Creating Non Motor Risk
        createNonMotorRisk({
          variables: {
            accountID: parseInt(accountId),
            riskID: createRisk.id,
            type,
            storeys: storeys.toString(),
            occupancy,
            roofConstruction,
            wallConstruction,
            details,
            country,
            description,
            subPremise,
            premise,
            streetNumber,
            thoroughfare,
          },
        }).catch((error) => console.log(error))
        //Creating Risk Mortgagees
        if (Mortgagees.length > 0 && Mortgagees.nationalIdType !== '')
          Mortgagees.map((Mortgagee) =>
            createRiskMortgagee({
              variables: {
                accountID: parseInt(accountId),
                riskID: createRisk.id,
                notes: Mortgagee.notes,
                loanAmount:
                  Mortgagee.loanAmount === '' ? 0 : Mortgagee.loanAmount,
                currency: Mortgagee.currency,
                Branch: Mortgagee.Branch,
                nationalIdNum: Mortgagee.nationalIdNum,
                nationalIdType: Mortgagee.nationalIdType,
              },
            }).catch((error) => console.log(error))
          )
        //Creating Risk Item
        if (Items.length > 0 && Items.value !== '')
          Items.map((Item) =>
            createNonMotorRiskItem({
              variables: {
                accountID: parseInt(accountId),
                riskID: createRisk.id,
                type: Item.type,
                value: parseFloat(Item.value),
                description: Item.description,
              },
            })
              .then(() => {
                // Logger('create non motor risk')
              })
              .catch((error) => console.log(error))
          )
      },

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

  return (
    <Formik
      initialValues={initialNonMotorRisk}
      validationSchema={object().shape({
        type: string().required('Type is required'),
        details: string().required('Details is required'),
        description: string(),
        occupancy: string().required('Occupancy is required'),
        roofConstruction: string().required('Roof Construction is required'),
        wallConstruction: string().required('Wall Construction is required'),
        year: number('must be a number')
          .moreThan(1900, 'the provided year is invalid')
          .lessThan(2200, 'the provided year is invalid')
          .required('Year is required'),
        usage: string(),
        sumInsured: string(),
        storeys: string().required('Storeys is required'),
        subPremise: string().required('Sub Premise is required'),
        premise: string().required('Premise is required'),
        streetNumber: string(),
        thoroughfare: string().required('City is required'),
        country: string().required('Country is required'),
        Mortgagees: array().of(
          object().shape({
            loanAmount: activeMotgageesVal
              ? string().required('A loan amount is required')
              : string(),
            nationalIdType: activeMotgageesVal
              ? string().required('A national ID type is required')
              : string(),
            notes: string(),
            currency: activeMotgageesVal
              ? string().required('A currency is required')
              : string(),
            Branch: activeMotgageesVal
              ? string().required('A Branch is required')
              : string(),
            nationalIdNum: activeMotgageesVal
              ? string()
                  .matches(
                    trnRegExp,
                    'National ID format should be XXX-XXX-XXX'
                  )
                  .required('Drivers License number is required')
              : string(),
          })
        ),
        Items: array().of(
          object().shape({
            value: activateItemsVal
              ? string().required('Value is required')
              : string(),
            type: activateItemsVal
              ? string().required('Type is required')
              : string(),
            description: string(),
          })
        ),
      })}
      onSubmit={async (values, actions) => {
        setRisk(values)
        createRisk({
          variables: {
            accountID: parseInt(accountId),
            policyID: parseInt(policyId),
            year: values.year,
            sumInsured:
              values.sumInsured === ''
                ? 0.0
                : parseFloat(
                    values.sumInsured
                      .split('$')[1]
                      .split('.')[0]
                      .split(',')
                      .join('')
                  ),
            usage: values.usage,
          },
        })
          .then(() => {
            Logger('created a non-motor risk')
            close()
          })
          .catch((error) => console.log(error))
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
          <StepForm {...props}>
            {(loading || loadingM || loadingR) && <Loading small />}

            {riskError && (
              <Content.Alert type="error" message="Fail to create Risk" />
            )}
            {nonMotorRiskError && (
              <Content.Alert
                type="error"
                message="Fail to create NonMotor Risk"
              />
            )}
            {MortgageeError && (
              <Content.Alert type="error" message="Fail to add mortgagees" />
            )}
            {nonMotorRiskItemError && (
              <Content.Alert type="error" message="Fail to add Item" />
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
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      mask={
                        sumInsured.replace(/\s/g, '').length <= 10
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
            <div>
              {(loading || loadingM || loadingR) && <Loading small />}

              <Items {...props} setActivateItemsVal={setActivateItemsVal} />
            </div>
            <div>
              {(loading || loadingM || loadingR) && <Loading small />}
              <Mortgagees
                {...props}
                setActivateMotgageesVal={setActivateMotgageesVal}
              />
            </div>
          </StepForm>
        )
      }}
    </Formik>
  )
}
