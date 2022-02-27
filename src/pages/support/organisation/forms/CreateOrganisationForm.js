import React from 'react'
import { Formik } from 'formik'
import 'styled-components/macro'
import { initialOrganisation, createOrganisationSchema } from './initialValues'
import { FormControl, Avatar, StepForm, Content, Loading } from 'components'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_ORGANIZATION } from '../mutations'
import { LIST_ORGANIZATION } from '../queries'
import Location from './sections/Location'

export default function CreateOrganisationForm({ close }) {
  const [createFacility, { loading, error: createFacilityFailed }] =
    useMutation(CREATE_ORGANIZATION, {
      refetchQueries: () => [
        {
          query: LIST_ORGANIZATION,
        },
      ],
    })

  return (
    <Formik
      initialValues={initialOrganisation}
      validationSchema={createOrganisationSchema}
      onSubmit={async (values, actions) => {
        if (values.logoUrl !== '') values.logoUrl = values.logoUrl.split(',')[1]
        if (values.logoUrl !== '') values.base64Logo = values.logoUrl
        values.organisationEmail = values.replyToEmail
        await createFacility({
          variables: {
            facility: {
              ...values,
            },
          },
        })
          .then(() => close())
          .catch((e) => {
            console.log(e)
            return (
              <FormControl.Error
                name="failed"
                show={true}
                message={createFacilityFailed.message}
              />
            )
          })
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          errors,
          touched,
        } = props
        const {
          name,
          logoUrl,
          replyToEmail,
          taxId,
          adminContact: {
            firstName: adminFirstName,
            lastName: adminLastName,
            position,
            email: adminEmail,
            phone: adminPhone,
          },
          billingContact: {
            firstName: billingFirstName,
            lastName: billingLastName,
            position: billingPosition,
            email: billingEmail,
            phone: billingPhone,
          },
          technicalContact: {
            firstName: techincalFirstName,
            lastName: technicalLastName,
            position: technicalPosition,
            email: technicalEmail,
            phone: technicalPhone,
          },
        } = values
        return (
          <StepForm {...props}>
            <div
              css={`
                width: calc(100% - 20px);
                display: grid;
                justify-items: center;
                padding: 10px;
              `}
            >
              <Avatar
                src={logoUrl}
                onDone={({ base64 }) => setFieldValue('logoUrl', base64)}
              />
              <FormControl.Section>
                <FormControl.Input
                  label="Name"
                  id="name"
                  type="text"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. Sagicor"
                  data-testid="create-organisation-name"
                />
                <FormControl.Error
                  name="name"
                  show={errors.name && touched.name}
                  message={errors.name}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Input
                  label=" Organisation Email"
                  id="replyToEmail"
                  name="replyToEmail"
                  type="text"
                  value={replyToEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. Sagicor"
                  data-testid="create-organisation-email"
                />
                <FormControl.Error
                  name="replyToEmail"
                  show={errors.replyToEmail && touched.replyToEmail}
                  message={errors.replyToEmail}
                />
              </FormControl.Section>
              <FormControl.Section>
                <FormControl.Input
                  mask="999-999-999"
                  label="Tax ID"
                  id="taxId"
                  name="taxId"
                  type="text"
                  value={taxId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="eg. 123-125-139"
                  data-testid="create-organisation-tax-id"
                />
                <FormControl.Error
                  name="taxId"
                  show={errors.taxId && touched.taxId}
                  message={errors.taxId}
                />
              </FormControl.Section>
            </div>
            <div
              css={`
                padding: 10px 0px;
              `}
            >
              <Location {...props} />
            </div>
            <div
              css={`
                padding: 10px 0px;
              `}
            >
              <FormControl.FieldSet>
                <FormControl.Legend>
                  Organisation's Administrator
                </FormControl.Legend>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="adminContact.firstName"
                      value={adminFirstName}
                      onChange={handleChange}
                      placeholder="eg. John"
                      data-testid="create-organisation-administrator-name"
                      label="First Name"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="adminFirstName"
                      show={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.firstName &&
                            touched.adminContact.firstName
                          : false
                      }
                      message={
                        errors.adminContact ? errors.adminContact.firstName : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="adminContact.lastName"
                      value={adminLastName}
                      onChange={handleChange}
                      placeholder="eg. Brown"
                      data-testid="create-organisation-administrator-name"
                      label="Last Name"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="adminLastName"
                      show={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.lastName &&
                            touched.adminContact.lastName
                          : false
                      }
                      message={
                        errors.adminContact ? errors.adminContact.lastName : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Input
                  id="adminContact.email"
                  value={adminEmail}
                  onChange={handleChange}
                  placeholder="abc@xmail.com"
                  data-testid="create-organisation-administrator-email"
                  label="Email"
                  onBlur={handleBlur}
                />
                <FormControl.Error
                  name="adminEmail"
                  show={
                    errors.adminContact && touched.adminContact
                      ? errors.adminContact.email && touched.adminContact.email
                      : false
                  }
                  message={errors.adminContact ? errors.adminContact.email : ''}
                />
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="adminContact.position"
                      value={position}
                      onChange={handleChange}
                      placeholder="Manager"
                      data-testid="create-organisation-administrator-position"
                      label="Position"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="position"
                      show={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.position &&
                            touched.adminContact.position
                          : false
                      }
                      message={
                        errors.adminContact ? errors.adminContact.position : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="adminContact.phone"
                      value={adminPhone}
                      onChange={handleChange}
                      placeholder="eg. (876) 213-2445"
                      data-testid="create-organisation-administrator-phone"
                      mask="(999) 999-9999"
                      label="Contact Number"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="phone"
                      show={
                        errors.adminContact && touched.adminContact
                          ? errors.adminContact.phone &&
                            touched.adminContact.phone
                          : false
                      }
                      message={
                        errors.adminContact ? errors.adminContact.phone : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </div>
            <div
              css={`
                padding: 10px 0px;
              `}
            >
              <FormControl.FieldSet>
                <FormControl.Legend>Billing Contact</FormControl.Legend>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="billingContact.firstName"
                      value={billingFirstName}
                      onChange={handleChange}
                      placeholder="eg. John"
                      data-testid="create-organisation-administrator-name"
                      label="First Name"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="billingFirstName"
                      show={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.firstName &&
                            touched.billingContact.firstName
                          : false
                      }
                      message={
                        errors.billingContact
                          ? errors.billingContact.firstName
                          : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="billingContact.lastName"
                      value={billingLastName}
                      onChange={handleChange}
                      placeholder="eg. Brown"
                      data-testid="create-organisation-administrator-name"
                      label="Last Name"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="billingLastName"
                      show={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.lastName &&
                            touched.billingContact.lastName
                          : false
                      }
                      message={
                        errors.billingContact
                          ? errors.billingContact.lastName
                          : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Input
                  id="billingContact.email"
                  value={billingEmail}
                  onChange={handleChange}
                  placeholder="jb@email.com"
                  data-testid="create-organisation-billing-email"
                  label="Email"
                  onBlur={handleBlur}
                />
                <FormControl.Error
                  name="billingEmail"
                  show={
                    errors.billingContact && touched.billingContact
                      ? errors.billingContact.email &&
                        touched.billingContact.email
                      : false
                  }
                  message={
                    errors.billingContact ? errors.billingContact.email : ''
                  }
                />
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="billingContact.position"
                      value={billingPosition}
                      onChange={handleChange}
                      placeholder="eg. Manager"
                      data-testid="create-organisation-billing-position"
                      label="Position"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="billingPosition"
                      show={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.position &&
                            touched.billingContact.position
                          : false
                      }
                      message={
                        errors.billingContact
                          ? errors.billingContact.position
                          : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="billingContact.phone"
                      value={billingPhone}
                      onChange={handleChange}
                      placeholder="eg. (876) 213-2445"
                      data-testid="create-organisation-billing-phone"
                      mask="(999) 999-9999"
                      label="Contact Number"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="billingPhone"
                      show={
                        errors.billingContact && touched.billingContact
                          ? errors.billingContact.phone &&
                            touched.billingContact.phone
                          : false
                      }
                      message={
                        errors.billingContact ? errors.billingContact.phone : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </div>
            <div
              css={`
                padding: 10px 0px;
              `}
            >
              {loading && <Loading small />}
              {createFacilityFailed && (
                <Content.Alert
                  type="error"
                  message={createFacilityFailed.message}
                />
              )}
              <FormControl.FieldSet>
                <FormControl.Legend>
                  Technical Support Contact
                </FormControl.Legend>
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="technicalContact.firstName"
                      value={techincalFirstName}
                      onChange={handleChange}
                      placeholder="eg. John"
                      data-testid="create-organisation-administrator-name"
                      label="First Name"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="technicalFirstName"
                      show={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.firstName &&
                            touched.technicalContact.firstName
                          : false
                      }
                      message={
                        errors.technicalContact
                          ? errors.technicalContact.firstName
                          : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="technicalContact.lastName"
                      value={technicalLastName}
                      onChange={handleChange}
                      placeholder="eg. Brown"
                      data-testid="create-organisation-administrator-name"
                      label="Last Name"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="technicalLastName"
                      show={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.lastName &&
                            touched.technicalContact.lastName
                          : false
                      }
                      message={
                        errors.technicalContact
                          ? errors.technicalContact.lastName
                          : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
                <FormControl.Input
                  id="technicalContact.email"
                  value={technicalEmail}
                  onChange={handleChange}
                  placeholder="eg. jb@email.com"
                  data-testid="create-organisation-technical-contact-email"
                  label="Email"
                  onBlur={handleBlur}
                />
                <FormControl.Error
                  name="technicalEmail"
                  show={
                    errors.technicalContact && touched.technicalContact
                      ? errors.technicalContact.email &&
                        touched.technicalContact.email
                      : false
                  }
                  message={
                    errors.technicalContact ? errors.technicalContact.email : ''
                  }
                />
                <FormControl.ResponsiveSection>
                  <FormControl.Section>
                    <FormControl.Input
                      id="technicalContact.position"
                      value={technicalPosition}
                      onChange={handleChange}
                      placeholder="eg. Manager"
                      data-testid="create-organisation-technical-contact-position"
                      label="Position"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="technicalPosition"
                      show={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.position &&
                            touched.technicalContact.position
                          : false
                      }
                      message={
                        errors.technicalContact
                          ? errors.technicalContact.position
                          : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      id="technicalContact.phone"
                      value={technicalPhone}
                      onChange={handleChange}
                      placeholder="eg. (876) 287-8121"
                      data-testid="create-organisation-technical-contact-phone"
                      mask="(999) 999-9999"
                      label="Contact Number"
                      onBlur={handleBlur}
                    />
                    <FormControl.Error
                      name="technicalPhone"
                      show={
                        errors.technicalContact && touched.technicalContact
                          ? errors.technicalContact.phone &&
                            touched.technicalContact.phone
                          : false
                      }
                      message={
                        errors.technicalContact
                          ? errors.technicalContact.phone
                          : ''
                      }
                    />
                  </FormControl.Section>
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
            </div>
          </StepForm>
        )
      }}
    </Formik>
  )
}
