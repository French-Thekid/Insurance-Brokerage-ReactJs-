import React, { useState } from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { LIST_INSURERS } from '../queries'
import { useMutation } from '@apollo/react-hooks'
import {
  Input,
  Dialog,
  Card,
  StepForm,
  Colours,
  Select,
  FormSection,
  Error,
  SpecialInput,
  Avatar,
  ErrorNotification,
  Can,
  PermissionCard,
} from 'components'
import { CREATE_INSURER } from './mutations'
import { States, Parishes, Countries } from 'forms/policy/initialValues'
import { Carriers, initialInsurer, createInsurerSchema } from './initialValues'
import { LIST_INSURERS as EXTQUERY } from '../../../settings/insurers/queries'
import { Logger } from '../../../../../utils/Log'

function CreateInsurerForm({ isShowing, close }) {
  const [parishOrState, setParishOrState] = useState('JA')
  const [createInsurer, { error }] = useMutation(CREATE_INSURER, {
    refetchQueries: () => [
      {
        query: LIST_INSURERS,
      },
      {
        query: EXTQUERY,
      },
    ],
  })

  return (
    <Dialog isShowing={isShowing}>
      <Card close={close} title="Create Insurer">
        {error && <ErrorNotification message={error.message} />}
        <Can
          i={[
            {
              endpoint: 'Insurer:Create',
              objectType: 'Insurer',
              objectId: '*',
            },
          ]}
          else={<PermissionCard />}
        >
          <Formik
            initialValues={initialInsurer}
            validationSchema={createInsurerSchema}
            onSubmit={(
              {
                firstName,
                lastName,
                email,
                phoneNumber,
                phoneCarrier,
                phoneExtension,
                phoneType,
                streetNumber,
                subPremise,
                premise,
                thoroughfare,
                country,
                company,
                avatar,
              },
              actions
            ) => {
              let base64Avatar = null
              if (avatar) base64Avatar = avatar.split(',')[1]
              let numberFormat = 0
              //first part '(876) 554-8487'.split(' ')[0].split('(')[1].split(')')[0])
              if (phoneNumber !== '') {
                numberFormat = phoneNumber
                  .split(' ')[1]
                  .split('-')
                  .join('')
              }
              createInsurer({
                variables: {
                  firstName,
                  lastName,
                  email,
                  company,
                  phoneNumber: numberFormat.toString(),
                  phoneCarrier,
                  phoneExtension,
                  phoneType,
                  streetNumber,
                  subPremise,
                  premise,
                  thoroughfare,
                  country,
                  base64Avatar,
                },
              })
                .then(() => {
                  Logger('create insurer')
                  close()
                })
                .catch(e => console.log(e))
            }}
          >
            {props => {
              const { values, handleChange, setFieldValue, errors } = props
              const {
                avatar,
                firstName,
                lastName,
                email,
                phoneNumber,
                phoneExtension,
                phoneType,
                streetNumber,
                subPremise,
                premise,
                thoroughfare,
                country,
                phoneCarrier,
                company,
              } = values
              return (
                <StepForm {...props}>
                  <div>
                    <FormSection justify="center" columns="1fr">
                      <section
                        css={`
                          text-align: center;
                          margin-bottom: 10px;
                        `}
                      >
                        <Avatar
                          src={avatar}
                          onDone={({ base64 }) => {
                            setFieldValue('avatar', base64)
                          }}
                        />
                      </section>
                      <section
                        css={`
                          width: 270px;
                          margin: auto;
                        `}
                      >
                        <Input
                          id="company"
                          type="text"
                          placeholder="Company Name"
                          value={company}
                          onChange={handleChange}
                          style={{
                            marginBottom: '0',
                          }}
                        />
                        <Error name="company" message={errors.company} />
                      </section>
                    </FormSection>

                    <fieldset
                      css={`
                        border: 0.5px solid ${Colours.border};
                        border-radius: 5px;
                        margin-top: 10px;
                      `}
                    >
                      <legend
                        css={`
                          color: ${Colours.blue};
                        `}
                      >
                        Representative General Details
                      </legend>
                      <FormSection columns="1fr 1fr 1fr">
                        <section>
                          <label
                            css={`
                              color: ${Colours.text};
                            `}
                          >
                            First Name
                          </label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="eg. John"
                            value={firstName}
                            onChange={handleChange}
                            style={{
                              marginBottom: '0',
                            }}
                          />
                          <Error name="firstName" message={errors.firstName} />
                        </section>
                        <section>
                          <label
                            css={`
                              color: ${Colours.text};
                            `}
                          >
                            Last Name
                          </label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="eg. Doe"
                            value={lastName}
                            onChange={handleChange}
                            style={{
                              marginBottom: '0',
                            }}
                          />
                          <Error name="lastName" message={errors.lastName} />
                        </section>
                        <section>
                          <label
                            css={`
                              color: ${Colours.text};
                            `}
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            type="text"
                            placeholder="eg. abc@xmail.com"
                            value={email}
                            onChange={handleChange}
                            style={{
                              marginBottom: '0',
                            }}
                          />
                          <Error name="email" message={errors.email} />
                        </section>
                      </FormSection>
                    </fieldset>
                    <fieldset
                      css={`
                        border: 0.5px solid ${Colours.border};
                        border-radius: 5px;
                        margin-top: 20px;
                      `}
                    >
                      <legend
                        css={`
                          color: ${Colours.blue};
                        `}
                      >
                        Representative Contact Details
                      </legend>
                      <FormSection columns="1fr 1fr 1fr">
                        <section
                          css={`
                            margin-bottom: 15px;
                          `}
                        >
                          <label
                            css={`
                              color: ${Colours.text};
                            `}
                          >
                            Phone Number
                          </label>
                          <SpecialInput
                            id="phoneNumber"
                            type="text"
                            placeholder="eg. (876) 545-6603"
                            value={phoneNumber}
                            onChange={handleChange}
                            style={{
                              marginBottom: '0',
                            }}
                            inputtype="phone"
                          />

                          <Error
                            name="phoneNumber"
                            message={errors.phoneNumber}
                          />
                        </section>
                        <section>
                          <label
                            css={`
                              color: ${Colours.text};
                            `}
                          >
                            Phone Type
                          </label>
                          <Input
                            id="phoneType"
                            type="text"
                            placeholder="eg. Mobile"
                            value={phoneType}
                            onChange={handleChange}
                            style={{
                              marginBottom: '0',
                            }}
                          />
                        </section>
                        <section>
                          <label
                            css={`
                              color: ${Colours.text};
                            `}
                          >
                            Phone Carrier
                          </label>
                          <Select
                            value={phoneCarrier}
                            name="phoneCarrier"
                            groups={Carriers}
                          />
                        </section>
                        <section>
                          <label
                            css={`
                              color: ${Colours.text};
                            `}
                          >
                            Phone Extension
                          </label>
                          <Input
                            id="phoneExtension"
                            type="string"
                            placeholder="eg. 1897"
                            value={phoneExtension}
                            onChange={handleChange}
                            style={{
                              marginBottom: '0',
                            }}
                          />
                        </section>
                      </FormSection>
                    </fieldset>
                  </div>

                  <div>
                    <fieldset
                      css={`
                        border: 0.5px solid ${Colours.border};
                        border-radius: 5px;
                      `}
                    >
                      <legend
                        css={`
                          color: ${Colours.blue};
                        `}
                      >
                        Location Details
                      </legend>
                      <div
                        css={`
                          display: grid;
                          grid-template-columns: max-content auto;
                          grid-column-gap: 10px;
                          margin-bottom: 20px;
                          margin-top: 10px;
                        `}
                      >
                        <Input
                          style={{ minWidth: '25px', margin: '0px' }}
                          id="streetNumber"
                          value={streetNumber}
                          onChange={handleChange}
                          placeholder="Street Number"
                          data-testid="create-organisation-address-one"
                        />
                        <Input
                          id="subPremise"
                          style={{ margin: '0px' }}
                          value={subPremise}
                          onChange={handleChange}
                          placeholder="Street Name"
                          data-testid="create-organisation-address-one"
                        />
                        <section />
                        <Error
                          name="subPremise"
                          message={errors ? errors.subPremise : ''}
                        />
                      </div>
                      <section
                        css={`
                          margin-bottom: 20px;
                        `}
                      >
                        <Input
                          id="premise"
                          value={premise}
                          onChange={handleChange}
                          placeholder="City"
                          data-testid="create-organisation-city"
                          style={{ margin: '0px' }}
                        />
                        <Error
                          name="premise"
                          message={errors ? errors.premise : ''}
                        />
                      </section>
                      <section
                        css={`
                          margin-bottom: 20px;
                        `}
                      >
                        <Select
                          style={{
                            minWidth: 'inherit',
                            margin: '0px',
                          }}
                          value={thoroughfare}
                          groups={
                            parishOrState === 'JA' ||
                            parishOrState === 'Jamaica'
                              ? Parishes
                              : States
                          }
                          name="thoroughfare"
                          defaultText="Select Parish / State"
                        />
                        <Error
                          name="parish"
                          message={errors ? errors.thoroughfare : ''}
                        />
                      </section>
                      <section
                        css={`
                          margin-bottom: 20px;
                        `}
                      >
                        <Select
                          style={{
                            minWidth: 'inherit',
                            margin: '0px',
                          }}
                          value={country}
                          groups={Countries}
                          name="country"
                          defaultText="Select Country"
                          action={setParishOrState}
                        />
                        <Error
                          name="country"
                          message={errors ? errors.country : ''}
                        />
                      </section>
                    </fieldset>
                  </div>
                </StepForm>
              )
            }}
          </Formik>
        </Can>
      </Card>
    </Dialog>
  )
}

export default CreateInsurerForm
