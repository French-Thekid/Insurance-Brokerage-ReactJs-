import React from 'react'
import 'styled-components/macro'
import { FormControl, Core, Colours } from 'components'

export default function Insureds(props) {
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    I1Ismain,
    setI1Ismain,
    I2Ismain,
    setI2Ismain,
    setAddNewInsured,
  } = props
  const {
    I1firstName,
    I1lastName,
    I1nationality,
    I1email,
    I1taxIdNum,
    I1dlExpirationDate,
    I1dlIssueDate,
    I2firstName,
    I2lastName,
    I2nationality,
    I2email,
    I2taxIdNum,
    I2dlExpirationDate,
    I2dlIssueDate,
  } = values
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content max-content 1fr 10px 1fr;
        grid-row-gap: 10px;
      `}
    >
      <Core.Text>
        Use the fields below to create new person(s) and add them to this
        policy. More can be added Later.
      </Core.Text>
      <Core.Text customSize="12px" color={Colours.blue}>
        <u
          css={`
            color: ${Colours.red};
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() => setAddNewInsured(false)}
        >
          Remove this step
        </u>
      </Core.Text>
      <FormControl.FieldSet>
        <FormControl.Legend>New Insured 1</FormControl.Legend>
        <FormControl.ResponsiveSection cols={4} rowSpace>
          <FormControl.Section>
            <FormControl.Input
              id="I1firstName"
              type="text"
              value={I1firstName}
              placeholder="eg. Jim"
              onChange={handleChange}
              onBlur={handleBlur}
              label="First Name"
            />
            <FormControl.Error
              name="I1firstName"
              show={errors.I1firstName && touched.I1firstName}
              message={errors.I1firstName}
            />
          </FormControl.Section>
          <FormControl.Section>
            <FormControl.Input
              id="I1lastName"
              type="text"
              value={I1lastName}
              placeholder="eg. Brown"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Last Name"
            />
            <FormControl.Error
              name="I1lastName"
              show={errors.I1lastName && touched.I1lastName}
              message={errors.I1lastName}
            />
          </FormControl.Section>
          <FormControl.Input
            id="I1nationality"
            type="text"
            value={I1nationality}
            placeholder="eg. Jamaican"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Nationality"
          />
          <FormControl.Section>
            <FormControl.Input
              id="I1email"
              type="text"
              value={I1email}
              placeholder="eg. abx@gmail.com"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Email"
            />
            <FormControl.Error
              name="I1email"
              show={errors.I1email && touched.I1email}
              message={errors.I1email}
            />
          </FormControl.Section>

          <FormControl.Section>
            <FormControl.Input
              mask="999-999-999"
              id="I1taxIdNum"
              type="text"
              value={I1taxIdNum}
              placeholder="eg. 123-132-123"
              onChange={handleChange}
              onBlur={handleBlur}
              label="ID Number"
            />
            <FormControl.Error
              name="I1taxIdNum"
              show={errors.I1taxIdNum && touched.I1taxIdNum}
              message={errors.I1taxIdNum}
            />
          </FormControl.Section>
          <FormControl.Input
            id="I1dlIssueDate"
            type="date"
            value={I1dlIssueDate}
            label="Issue Date"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormControl.Input
            id="I1dlExpirationDate"
            type="date"
            value={I1dlExpirationDate}
            label="Exp. Date"
            onChange={handleChange}
            onBlur={handleBlur}
            min={I1dlIssueDate}
          />
          <section
            css={`
              display: grid;
              grid-template-rows: auto auto;
              padding-top: 2px;
            `}
          >
            <Core.Text customSize="12px">Main Person on this policy?</Core.Text>
            <FormControl.Checkbox
              startwithoff={I1Ismain}
              onChange={(event) => {
                if (event.target.checked) setI1Ismain(true)
                else setI1Ismain(false)
              }}
            />
          </section>
        </FormControl.ResponsiveSection>
      </FormControl.FieldSet>
      <section />
      <FormControl.FieldSet>
        <FormControl.Legend>New Insured 2</FormControl.Legend>
        <FormControl.ResponsiveSection cols={4} rowSpace>
          <FormControl.Section>
            <FormControl.Input
              id="I2firstName"
              type="text"
              value={I2firstName}
              placeholder="eg. Jim"
              onChange={handleChange}
              onBlur={handleBlur}
              label="First Name"
            />
            <FormControl.Error
              name="I2firstName"
              show={errors.I2firstName && touched.I2firstName}
              message={errors.I2firstName}
            />
          </FormControl.Section>
          <FormControl.Section>
            <FormControl.Input
              id="I2lastName"
              type="text"
              value={I2lastName}
              placeholder="eg. Brown"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Last Name"
            />
            <FormControl.Error
              name="I2lastName"
              show={errors.I2lastName && touched.I2lastName}
              message={errors.I2lastName}
            />
          </FormControl.Section>
          <FormControl.Input
            id="I2nationality"
            type="text"
            value={I2nationality}
            placeholder="eg. Jamaican"
            onChange={handleChange}
            onBlur={handleBlur}
            label="Nationality"
          />
          <FormControl.Section>
            <FormControl.Input
              id="I2email"
              type="text"
              value={I2email}
              placeholder="eg. abx@gmail.com"
              onChange={handleChange}
              onBlur={handleBlur}
              label="Email"
            />
            <FormControl.Error
              name="I2email"
              show={errors.I2email && touched.I2email}
              message={errors.I2email}
            />
          </FormControl.Section>

          <FormControl.Section>
            <FormControl.Input
              mask="999-999-999"
              id="I2taxIdNum"
              type="text"
              value={I2taxIdNum}
              placeholder="eg. 123-132-123"
              onChange={handleChange}
              onBlur={handleBlur}
              label="ID Number"
            />
            <FormControl.Error
              name="I2taxIdNum"
              show={errors.I2taxIdNum && touched.I2taxIdNum}
              message={errors.I2taxIdNum}
            />
          </FormControl.Section>
          <FormControl.Input
            id="I2dlIssueDate"
            type="date"
            value={I2dlIssueDate}
            label="Issue Date"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormControl.Input
            id="I2dlExpirationDate"
            type="date"
            value={I2dlExpirationDate}
            label="Exp. Date"
            onChange={handleChange}
            onBlur={handleBlur}
            min={I2dlIssueDate}
          />
          <section
            css={`
              display: grid;
              grid-template-rows: auto auto;
              padding-top: 2px;
            `}
          >
            <Core.Text customSize="12px">Main Person on this policy?</Core.Text>
            <FormControl.Checkbox
              startwithoff={I2Ismain}
              onChange={(event) => {
                if (event.target.checked) setI2Ismain(true)
                else setI2Ismain(false)
              }}
            />
          </section>
        </FormControl.ResponsiveSection>
      </FormControl.FieldSet>
    </div>
  )
}
