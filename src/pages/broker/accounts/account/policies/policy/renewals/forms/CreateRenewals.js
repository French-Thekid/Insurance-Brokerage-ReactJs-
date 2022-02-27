import React, { useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { initialRenewal, renewSchema } from './initialValues'
import { StepForm } from 'components'

import {
  GeneralDetails,
  LimitSection,
  ExtensionSection,
  RiskSelection,
} from './steps'

export default function ({ close }) {
  const [risks, setRisks] = useState([])
  const [extensions, setExtensions] = useState([])
  const [limits, setLimits] = useState([])
  const initialPolicy = JSON.parse(localStorage.getItem('activePolicy'))
  const { renewalMemo, branch } = initialPolicy || {}

  initialRenewal.branch = branch
  initialRenewal.memo = renewalMemo || ''

  return (
    <Formik
      initialValues={initialRenewal}
      validationSchema={renewSchema}
      onSubmit={async (values, actions) => {
        console.log('Submitting')
        const oldRisk = JSON.parse(
          localStorage.getItem('existingRisks') || '[]'
        )
        const oldLimit = JSON.parse(
          localStorage.getItem('existingLimits') || '[]'
        )
        const oldExtensions = JSON.parse(
          localStorage.getItem('existingExtensions') || '[]'
        )
        const riskToAdd = oldRisk
          .map((exId, index) => {
            if (risks.indexOf(exId) === -1) return exId
            return null
          })
          .filter((i, j) => i !== null)

        const limitToAdd = oldLimit
          .map((exId, index) => {
            if (limits.indexOf(exId) === -1) return exId
            return null
          })
          .filter((i, j) => i !== null)

        const extensionsToAdd = oldExtensions
          .map((exId, index) => {
            if (extensions.indexOf(exId) === -1) return exId
            return null
          })
          .filter((i, j) => i !== null)

        console.log({ riskToAdd, limitToAdd, extensionsToAdd })

        close()
      }}
    >
      {(props) => {
        return (
          <StepForm {...props} specialSubmit="Generate Receipt and Submit">
            <GeneralDetails props={props} />
            <RiskSelection risks={risks} setRisks={setRisks} />
            <ExtensionSection
              extensions={extensions}
              setExtensions={setExtensions}
            />
            <LimitSection limits={limits} setLimits={setLimits} />
          </StepForm>
        )
      }}
    </Formik>
  )
}
