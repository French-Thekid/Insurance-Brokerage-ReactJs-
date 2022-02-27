import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'

import { FormControl, Avatar, Loading, Content, StepForm } from 'components'
import {
  createMotorRiskSchema,
  Transmission,
  BodyTypes,
  Seats,
  Usages,
  Engines,
  Options,
  Roofs,
} from '../../../forms/initialValues'

import { LIST_MOTOR_RISKS } from '../../queries'
import { UPDATE_RISK, UPDATE_MOTOR_RISK } from '../../mutations'
import { Logger } from '../../../../../../../../utils'

export default function ({ close }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { id: riskId } =
    JSON.parse(localStorage.getItem('activeMotorRisk')) || {}

  const {
    vin,
    image,
    id,
    year,
    usage,
    sumInsured,
    regNum,
    make,
    model,
    colour,
    modelType,
    bodyType,
    bodyShape,
    engineType,
    engineNum,
    engineModified,
    numberOfEngines,
    NumberOfCylinders,
    numOfDoors,
    electricDoors,
    electricWindows,
    electricMirrors,
    ccRating,
    mileage,
    transmissionType,
    tonnage,
    leftHandDrive,
    powersteering,
    roofType,
    seatType,
    seating,
    authorizedDriverClause,
  } = JSON.parse(localStorage.getItem('activeMotorRisk')) || {}

  const initialMotorRisk = {
    riskImage: image,
    vin: vin,
    riskId: id,
    regNum: regNum,
    make: make,
    model: model,
    colour: colour,
    modelType: modelType,
    bodyType: bodyType,
    bodyShape: bodyShape,
    engineNum: engineNum,
    engineType: engineType,
    engineModified: engineModified === true ? 'Yes' : 'No',
    numberOfEngines: numberOfEngines,
    NumberOfCylinders: NumberOfCylinders,
    ccRating: ccRating,
    mileage: mileage,
    transmissionType: transmissionType,
    tonnage: tonnage,
    numOfDoors: numOfDoors,
    electricDoors: electricDoors === true ? 'Yes' : 'No',
    electricWindows: electricWindows === true ? 'Yes' : 'No',
    electricMirrors: electricMirrors === true ? 'Yes' : 'No',
    leftHandDrive: leftHandDrive === true ? 'Yes' : 'No',
    powersteering: powersteering === true ? 'Yes' : 'No',
    roofType: roofType,
    seating: seating,
    seatType: seatType,
    authorizedDriverClause: authorizedDriverClause,
    year: year,
    usage: usage,
    sumInsured: sumInsured,
  }

  //Mutations
  // Mutations
  //--Create Motor risk mutation
  const [updateMotorRisk, { loading, error: motorRiskError }] = useMutation(
    UPDATE_MOTOR_RISK,
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
  if (motorRiskError)
    return <Content.Alert type="error" message="Failed to updateMotor Risk" />

  //--Create Risk mutation
  const [updateRisk, { loading: loadingR, error: riskError }] = useMutation(
    UPDATE_RISK,
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
  if (riskError)
    return <Content.Alert type="error" message="Failed to Update Risk" />

  return (
    <Formik
      initialValues={initialMotorRisk}
      validationSchema={createMotorRiskSchema}
      onSubmit={(
        {
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
          year,
          sumInsured,
          usage,
          riskImage,
        },
        actions
      ) => {
        let base64Image = null
        if (riskImage) base64Image = riskImage.split(',')[1]
        updateRisk({
          variables: {
            accountID: parseInt(accountId),
            policyID: parseInt(policyId),
            year,
            riskID: parseInt(riskId),
            sumInsured: sumInsured === '' ? 0.0 : sumInsured,
            usage,
            base64Image,
          },
        })
          .then(() => {
            // update motor risk
            updateMotorRisk({
              variables: {
                accountID: parseInt(accountId),
                riskId: parseInt(riskId),
                NumberOfCylinders,
                authorizedDriverClause,
                bodyShape,
                bodyType,
                ccRating,
                colour,
                electricDoors: electricDoors === 'Yes' ? true : false,
                electricMirrors: electricMirrors === 'Yes' ? true : false,
                electricWindows: electricWindows === 'Yes' ? true : false,
                engineModified: engineModified === 'Yes' ? true : false,
                engineNum,
                engineType,
                leftHandDrive: leftHandDrive === 'Yes' ? true : false,
                make,
                mileage,
                model,
                modelType,
                numOfDoors,
                numberOfEngines,
                powersteering: powersteering === 'Yes' ? true : false,
                regNum: regNum ? regNum.toString() : '',
                roofType,
                seatType,
                seating,
                tonnage,
                transmissionType,
                vin,
              },
            }).catch((e) => console.log(e))
          })
          .then(() => {
            Logger('edit motor risk')
            close()
          })
          .catch((e) => console.log(e))
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
          <StepForm {...props} edit>
            {(loading || loadingR) && <Loading small />}

            {riskError && (
              <Content.Alert type="error" message="Fail to create Risk" />
            )}
            {motorRiskError && (
              <Content.Alert type="error" message="Fail to create Motor Risk" />
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
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="seating"
                      type="number"
                      value={seating}
                      placeholder="eg. 5"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="Seating"
                    />
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
                      sumInsured &&
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
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </div>
            <div>
              {(loading || loadingR) && <Loading small />}
              <FormControl.FieldSet>
                <FormControl.Legend>Engine Details</FormControl.Legend>
                <FormControl.ResponsiveSection cols={4} rowGap>
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
                  <FormControl.Input
                    id="numberOfEngines"
                    type="number"
                    value={numberOfEngines}
                    placeholder="eg. 1"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="No. of Engines"
                  />
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
            {/* <div>
             

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
            </div> */}
          </StepForm>
        )
      }}
    </Formik>
  )
}
