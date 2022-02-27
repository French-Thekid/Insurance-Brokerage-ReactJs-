import React, { useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'
import { object, string, number, array } from 'yup'

import { FormControl, Avatar, Loading, Content, StepForm } from 'components'
import {
  initialMotorRisk,
  Transmission,
  BodyTypes,
  Seats,
  Usages,
  Engines,
  Options,
  Roofs,
} from '../../../forms/initialValues'
import { Accessories, Mortgagees } from './partials'

import { LIST_MOTOR_RISKS } from '../../queries'
import {
  CREATE_RISK,
  CREATE_MOTOR_RISK,
  CREATE_MORTGAGEES,
  CREATE_MOTOR_RISK_ACCESSORY,
} from '../../mutations'
import { Logger } from '../../../../../../../../utils'

export default function ({ close }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const [activeTypeVal, setActivateTypeVal] = useState(false)
  const [activeMotgageesVal, setActivateMotgageesVal] = useState(false)
  const [Risk, setRisk] = useState(null)

  const trnRegExp = /^([[0-9][0-9][0-9][-][0-9][0-9][0-9][-][0-9][0-9][0-9]$)/

  //Mutations
  //--Create Motor risk mutation
  const [createMotorRisk, { loading, error: motorRiskError }] = useMutation(
    CREATE_MOTOR_RISK,
    {
      refetchQueries: () => [
        {
          query: LIST_MOTOR_RISKS,
          variables: {
            accountId: parseInt(accountId),
            policyId: parseInt(policyId),
          },
        },
      ],
    }
  )

  //--Create Motor risk mortgagees mutation
  const [createRiskMortgagee, { loading: loadingM, error: MortgageeError }] =
    useMutation(CREATE_MORTGAGEES)

  //--Create Motor risk Accessory mutation
  const [
    createMotorRiskAccessory,
    { loading: loadingA, error: motorRiskAccessoryError },
  ] = useMutation(CREATE_MOTOR_RISK_ACCESSORY)

  //--Create Risk mutation
  const [createRisk, { loading: loadingR, error: riskError }] = useMutation(
    CREATE_RISK,
    {
      onCompleted({ createRisk }) {
        const {
          Accessories,
          Mortgagees,
          NumberOfCylinders,
          authorizedDriverClause,
          bodyShape,
          bodyType,
          ccRating,
          colour,
          electricDoors,
          electricMirrors,
          electricWindows,
          engineModified,
          engineNum,
          engineType,
          leftHandDrive,
          make,
          mileage,
          model,
          modelType,
          numOfDoors,
          numberOfEngines,
          powersteering,
          regNum,
          roofType,
          seatType,
          seating,
          tonnage,
          transmissionType,
          vin,
        } = Risk

        //create motor risk
        createMotorRisk({
          variables: {
            accountID: parseInt(accountId),
            riskId: createRisk.id,
            NumberOfCylinders: NumberOfCylinders === '' ? 0 : NumberOfCylinders,
            authorizedDriverClause,
            bodyShape,
            bodyType,
            ccRating: ccRating === '' ? 0 : ccRating,
            colour,
            electricDoors: electricDoors === 'Yes' ? true : false,
            electricMirrors: electricMirrors === 'Yes' ? true : false,
            electricWindows: electricWindows === 'Yes' ? true : false,
            engineModified: engineModified === 'Yes' ? true : false,
            engineNum,
            engineType,
            leftHandDrive: leftHandDrive === 'Yes' ? true : false,
            make,
            mileage: mileage === '' ? 0 : mileage,
            model,
            modelType,
            numOfDoors: numOfDoors === '' ? 0 : numOfDoors,
            numberOfEngines: numberOfEngines === '' ? 0 : numberOfEngines,
            powersteering: powersteering === 'Yes' ? true : false,
            regNum: regNum.toString(),
            roofType,
            seatType,
            seating: seating === '' ? 0 : seating,
            tonnage: tonnage === '' ? 0 : tonnage,
            transmissionType,
            vin,
          },
        }).catch((e) => console.log(e))

        //create mortgagees
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
            }).catch((e) => console.log(e))
          )

        //create accessories
        if (Accessories.length > 0 && Accessories[0].type !== '')
          Accessories.map((accessory) =>
            createMotorRiskAccessory({
              variables: {
                accountID: parseInt(accountId),
                riskID: createRisk.id,
                type: accessory.type,
                description: accessory.description,
              },
            }).catch((e) => console.log(e))
          )
      },

      refetchQueries: () => [
        {
          query: LIST_MOTOR_RISKS,
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
      initialValues={initialMotorRisk}
      validationSchema={object().shape({
        vin: string().required('Chassis / VIN is required'),
        regNum: string().required(),
        make: string().required(),
        model: string().required(),
        colour: string(),
        modelType: string(),
        bodyType: string(),
        bodyShape: string(),
        engineNum: string(),
        engineType: string(),
        engineModified: string(),
        numberOfEngines: number(),
        NumberOfCylinders: number(),
        ccRating: string(),
        mileage: string(),
        transmissionType: string(),
        tonnage: string(),
        numOfDoors: number(),
        electricDoors: string(),
        electricWindows: string(),
        electricMirrors: string(),
        leftHandDrive: string(),
        powersteering: string(),
        roofType: string(),
        seating: number(),
        seatType: string(),
        authorizedDriverClause: string(),
        year: number('must be a number')
          .moreThan(1900, 'the provided year is invalid')
          .lessThan(2200, 'the provided year is invalid')
          .required('Year is required'),
        usage: string(),
        sumInsured: string(),
        Accessories: array().of(
          object().shape({
            type: activeTypeVal
              ? string().required('Type is required')
              : string(),
            description: activeTypeVal
              ? string().required('Description is required')
              : string(),
          })
        ),
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
      })}
      onSubmit={async (values, actions) => {
        setRisk(values)
        let base64Image = null
        if (values.riskImage) base64Image = values.riskImage.split(',')[1]
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
            base64Image,
          },
        }).then(() => {
          Logger('create motor risk')
          close()
          // history.push(match.url.split('?')[0])
        })
      }}
    >
      {(props) => {
        const {
          values,
          handleBlur,
          touched,
          errors,
          handleChange,
          setFieldValue,
        } = props

        const {
          vin,
          riskImage,
          regNum,
          make,
          model,
          colour,
          modelType,
          bodyShape,
          engineNum,
          numberOfEngines,
          NumberOfCylinders,
          ccRating,
          mileage,
          tonnage,
          numOfDoors,
          seating,
          authorizedDriverClause,
          year,
          usage,
          sumInsured,
          roofType,
          bodyType,
          leftHandDrive,
          electricDoors,
          electricMirrors,
          electricWindows,
          powersteering,
          seatType,
          engineModified,
          engineType,
          transmissionType,
        } = values
        return (
          <StepForm {...props}>
            {(loading || loadingM || loadingR || loadingA) && <Loading small />}

            {riskError && (
              <Content.Alert type="error" message="Fail to create Risk" />
            )}
            {motorRiskError && (
              <Content.Alert type="error" message="Fail to create Motor Risk" />
            )}
            {MortgageeError && (
              <Content.Alert type="error" message="Fail to add mortgagees" />
            )}
            {motorRiskAccessoryError && (
              <Content.Alert type="error" message="Fail to add accessories" />
            )}
            <div>
              <div
                css={`
                  width: 100%;
                  display: grid;
                  place-items: Center;
                `}
              >
                <Avatar
                  src={riskImage}
                  onDone={({ base64 }) => setFieldValue('riskImage', base64)}
                />
              </div>
              <br />
              <FormControl.FieldSet>
                <FormControl.Legend>General Details</FormControl.Legend>
                <FormControl.ResponsiveSection cols={4}>
                  <FormControl.Section>
                    <FormControl.Input
                      id="vin"
                      type="text"
                      value={vin}
                      placeholder="eg. AS234ASDASFASS"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Chassis/Vin number"
                    />
                    <FormControl.Error
                      show={errors.vin && touched.vin}
                      message={errors.vin}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="regNum"
                      type="text"
                      value={regNum}
                      placeholder="eg. 6542GG"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Registration Number"
                    />
                    <FormControl.Error
                      show={errors.regNum && touched.regNum}
                      message={errors.regNum}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="make"
                      type="text"
                      value={make}
                      placeholder="eg. BWM"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Make"
                    />
                    <FormControl.Error
                      show={errors.make && touched.make}
                      message={errors.make}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="model"
                      type="text"
                      value={model}
                      placeholder="eg. 3-Series"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Model"
                    />
                    <FormControl.Error
                      show={errors.model && touched.model}
                      message={errors.model}
                    />
                  </FormControl.Section>
                  <FormControl.Input
                    id="modelType"
                    type="text"
                    value={modelType}
                    placeholder="eg. M3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Model Type"
                  />
                  <FormControl.Select
                    value={bodyType}
                    groups={BodyTypes}
                    label="Body Type"
                    name="bodyType"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Input
                    id="bodyShape"
                    type="text"
                    value={bodyShape}
                    placeholder="eg. Wide"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Body Shape"
                  />
                  <FormControl.Input
                    id="colour"
                    type="text"
                    value={colour}
                    placeholder="eg. Yellow"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Colour"
                  />
                  <FormControl.Section>
                    <FormControl.Select
                      value={powersteering}
                      groups={Options}
                      label="Power Steering"
                      name="powersteering"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl.Section>{' '}
                  <FormControl.Section>
                    <FormControl.Input
                      id="seating"
                      type="number"
                      value={seating}
                      placeholder="eg. 5"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Seating"
                    />{' '}
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Select
                      value={seatType}
                      groups={Seats}
                      label="Seat Type"
                      name="seatType"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="year"
                      type="number"
                      value={year}
                      placeholder="eg. 2015"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Year"
                    />
                    <FormControl.Error
                      show={errors.year && touched.year}
                      message={errors.year}
                    />
                  </FormControl.Section>
                  <FormControl.Select
                    value={leftHandDrive}
                    groups={Options}
                    label="Left Hand Drive"
                    name="leftHandDrive"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Select
                    value={roofType}
                    groups={Roofs}
                    label="Roof Type"
                    name="roofType"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Select
                    value={electricWindows}
                    groups={Options}
                    label="Electric Windows"
                    name="electricWindows"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Select
                    value={electricDoors}
                    groups={Options}
                    label="Electric Doors"
                    name="electricDoors"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Select
                    value={electricMirrors}
                    groups={Options}
                    label="Electric Mirrors"
                    name="electricMirrors"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Input
                    id="numOfDoors"
                    type="number"
                    value={numOfDoors}
                    placeholder="eg. 5"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="No. of Doors"
                  />
                  <FormControl.Input
                    id="mileage"
                    type="number"
                    value={mileage}
                    placeholder="eg. 50000"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Mileage"
                  />
                  <FormControl.Select
                    value={usage}
                    groups={Usages}
                    label="Usage"
                    name="usage"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
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
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </div>
            <div>
              <FormControl.FieldSet>
                <FormControl.Legend>Engine Details</FormControl.Legend>
                <FormControl.ResponsiveSection cols={3} rowGap>
                  <FormControl.Select
                    value={engineType}
                    groups={Engines}
                    label="Engine Type"
                    name="engineType"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Input
                    id="engineNum"
                    type="text"
                    value={engineNum}
                    placeholder="eg. SGSDF45G3G3"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Engine Number"
                  />
                  <FormControl.Select
                    value={engineModified}
                    groups={Options}
                    label="Engine Modified"
                    name="engineModified"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Section>
                    <FormControl.Input
                      id="numberOfEngines"
                      type="number"
                      value={numberOfEngines}
                      placeholder="eg. 1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="No. of Engines"
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="ccRating"
                      type="number"
                      value={ccRating}
                      placeholder="eg. 1500"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="CC Ratings"
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="NumberOfCylinders"
                      type="number"
                      value={NumberOfCylinders}
                      placeholder="eg. 6"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="No. of Cylinders"
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Select
                      value={transmissionType}
                      groups={Transmission}
                      label=" Transmission Type"
                      name="transmissionType"
                      handlechange={handleChange}
                      onBlur={handleBlur}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="tonnage"
                      type="number"
                      value={tonnage}
                      placeholder="eg. 1500"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Tonnage"
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Input
                  id="authorizedDriverClause"
                  type="text"
                  multiline
                  rows={4}
                  value={authorizedDriverClause}
                  placeholder="Placeholder here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Authorized Driver Clause"
                />
              </FormControl.FieldSet>
            </div>
            <div>
              {(loading || loadingM || loadingR || loadingA) && (
                <Loading small />
              )}

              <Accessories {...props} setActivateTypeVal={setActivateTypeVal} />
            </div>
            <div>
              {(loading || loadingM || loadingR || loadingA) && (
                <Loading small />
              )}
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
