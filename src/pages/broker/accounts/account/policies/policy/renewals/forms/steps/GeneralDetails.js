import React from 'react'
import 'styled-components/macro'
import { FormControl } from 'components'

export default function GeneralDetailsForm({ props }) {
  const { handleChange, handleBlur, values } = props

  const {
    valueA,
    valueB,
    valueC,
    premium,
    branch,
    startDate,
    endDate,
    DateSigned,
    RenewalDate,
    memo,
  } = values

  return (
    <div
      css={`
        margin-top: 10px;
        margin-bottom: 20px;
      `}
    >
      <FormControl.FieldSet>
        <FormControl.Legend>Renewals Details</FormControl.Legend>
        <FormControl.ResponsiveSection cols={4} rowSpace>
          <FormControl.Input
            id="branch"
            type="text"
            value={branch}
            placeholder="eg. New Kingston"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Branch Location"
          />
          <FormControl.Input
            id="startDate"
            type="date"
            value={startDate}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Start Date"
          />
          <FormControl.Input
            id="endDate"
            type="date"
            value={endDate}
            onChange={handleChange}
            onBlur={handleBlur}
            label="End Date"
          />
          <FormControl.Input
            id="DateSigned"
            type="date"
            value={DateSigned}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Date Signed"
          />
        </FormControl.ResponsiveSection>
        <div
          css={`
            display: grid;
            grid-template-columns: 185px 1fr;
            grid-gap: 20px;
            margin-top: 20px;
          `}
        >
          <div
            css={`
              display: grid;
              grid-gap: 26px;
            `}
          >
            <FormControl.Input
              id="RenewalDate"
              type="date"
              value={RenewalDate}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Renewal Date"
            />
            <FormControl.Input
              id="DateSigned"
              type="date"
              value={DateSigned}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Date Signed"
            />
          </div>
          <FormControl.Input
            id="memo"
            type="text"
            multiline
            rows={5}
            value={memo}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Memo"
          />
        </div>
      </FormControl.FieldSet>
      <br />
      <br />
      <FormControl.FieldSet>
        <FormControl.Legend>Premium Details</FormControl.Legend>
        <FormControl.ResponsiveSection cols={4} rowSpace>
          <FormControl.Input
            id="valueA"
            type="text"
            value={valueA}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Value A"
          />
          <FormControl.Input
            id="valueB"
            type="text"
            value={valueB}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Value B"
          />
          <FormControl.Input
            id="valueC"
            type="text"
            value={valueC}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Value C"
          />
          <FormControl.Input
            id="premium"
            type="text"
            value={premium}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Premium"
          />
        </FormControl.ResponsiveSection>
      </FormControl.FieldSet>
    </div>
  )
}
