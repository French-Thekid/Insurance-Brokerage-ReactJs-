import React, { useContext } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { OrganisationContext, ColourContext, SessionContext } from 'context'
import { useFetch } from 'hooks'
import { Avatar, FormControl, Content, Core, Loading } from 'components'
import { createOrganisationSchema } from 'pages/support/organisation/forms/initialValues'

export default function Organization() {
  const { Colours } = useContext(ColourContext)
  const { UpdateOrganisationAttribute } = useContext(OrganisationContext)
  const { idToken } = useContext(SessionContext)
  const {
    loading,
    error,
    data: initialOrganisation,
  } = useFetch({
    url: '/v1/organization/read',
    tokens: idToken,
  })
  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Failed to fetch Organization'} />
    )

  const { organizationId } = initialOrganisation

  return (
    <Formik
      initialValues={initialOrganisation}
      validationSchema={createOrganisationSchema}
      onSubmit={async (values, actions) => {
        if (JSON.stringify(values) !== JSON.stringify(initialOrganisation)) {
          //Single Attribute Updates

          //Updating Organization Name
          if (
            JSON.stringify(values.logoUrl) !==
            JSON.stringify(initialOrganisation.logoUrl)
          ) {
            const body = { logoUrl: values.logoUrl }
            await UpdateOrganisationAttribute({
              body,
              organizationId,
            })
          }

          //Updating Organization Name
          if (
            JSON.stringify(values.name) !==
            JSON.stringify(initialOrganisation.name)
          ) {
            console.log('Name only ', organizationId)
            const body = { name: values.name }
            await UpdateOrganisationAttribute({
              body,
              organizationId,
            })
          }

          //Updating Organization Email
          if (
            JSON.stringify(values.replyToEmail) !==
            JSON.stringify(initialOrganisation.replyToEmail)
          ) {
            const body = { replyToEmail: values.replyToEmail }
            await UpdateOrganisationAttribute({
              body,
              organizationId,
            })
          }

          //Updating Organization Email
          if (
            JSON.stringify(values.taxId) !==
            JSON.stringify(initialOrganisation.taxId)
          ) {
            const body = { taxId: values.taxId }
            await UpdateOrganisationAttribute({
              body,
              organizationId,
            })
          }

          //Object Updates

          //Updating Location
          if (
            JSON.stringify(values.location) !==
            JSON.stringify(initialOrganisation.location)
          ) {
            const body = { location: values.location }
            await UpdateOrganisationAttribute({
              body,
              organizationId,
            })
          }

          //Updating Admin Contact
          if (
            JSON.stringify(values.adminContact) !==
            JSON.stringify(initialOrganisation.adminContact)
          ) {
            values.adminContact.phone = values.adminContact.phone
              .split(' ')
              .join('')
              .replace(')', '-')
              .split('(')[1]
            const body = {
              adminContact: values.adminContact,
            }
            await UpdateOrganisationAttribute({
              body,
              organizationId,
            })
          }

          //Updating Billing Contact
          if (
            JSON.stringify(values.billingContact) !==
            JSON.stringify(initialOrganisation.billingContact)
          ) {
            values.billingContact.phone = values.billingContact.phone
              .split(' ')
              .join('')
              .replace(')', '-')
              .split('(')[1]
            const body = {
              billingContact: values.billingContact,
            }
            await UpdateOrganisationAttribute({
              body,
              organizationId,
            })
          }

          //Updating Technical Contact
          if (
            JSON.stringify(values.technicalContact) !==
            JSON.stringify(initialOrganisation.technicalContact)
          ) {
            values.technicalContact.phone = values.technicalContact.phone
              .split(' ')
              .join('')
              .replace(')', '-')
              .split('(')[1]
            const body = {
              technicalContact: values.technicalContact,
            }
            await UpdateOrganisationAttribute({
              body,
              organizationId,
            })
          }
          setTimeout(() => window.location.reload(), 500)
        } else {
          console.log('No Changes')
        }
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
          errors,
          touched,
        } = props
        const {
          name,
          logoUrl,
          replyToEmail,
          taxId,
          location: { addressOne, addressTwo, city, country },
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
          <div
            css={`
              height: 100%;
              width: 100%;
              display: grid;
              grid-template-columns: max-content 1fr;
              grid-gap: 20px;
              overflow-y: auto;
              @media (max-width: 999px) {
                grid-template-columns: 1fr;
                align-items: start;
                justify-items: center;
                height: max-content;
              }
            `}
          >
            <div
              css={`
                padding: 0px;
                border-radius: 10px;
                display: grid;
                grid-template-rows: 30px 1fr;
                background-color: #c3cbdc;
                background: ${Colours.profileBackground};
                width: 100%;
                min-width: 235px;
                height: calc(100% - 10px);
                @media (max-width: 999px) {
                  height: max-content;
                }
                padding-bottom: 10px;
              `}
            >
              <div
                css={`
                  background: rgb(112, 236, 230);
                  background: linear-gradient(
                    56deg,
                    rgba(112, 236, 230, 1) 0%,
                    rgba(91, 214, 250, 1) 47%,
                    rgba(57, 190, 228, 1) 100%
                  );
                  height: 100px;
                  border-top-left-radius: inherit;
                  border-top-right-radius: inherit;
                  border-bottom-left-radius: 50%;
                  border-bottom-right-radius: 50%;
                `}
              />

              <form action="" onSubmit={handleSubmit}>
                <div
                  css={`
                    width: 235px;
                    @media (max-width: 999px) {
                      width: calc(100% - 20px);
                    }
                    padding: 0px 10px;
                    @media (min-height: 700px) {
                      display: grid;
                      grid-gap: 1px;
                    }
                    @media (min-height: 700px) {
                      display: grid;
                      grid-gap: 10px;
                    }
                  `}
                >
                  <div
                    css={`
                      width: 100%;
                      display: grid;
                      place-items: center;
                    `}
                  >
                    <Avatar
                      shadow
                      src={logoUrl}
                      onDone={({ base64 }) => setFieldValue('logoUrl', base64)}
                    />
                  </div>
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
                  <div
                    css={`
                      @media screen and (max-height: 769px) {
                        display: none;
                      }
                    `}
                  >
                    <FormControl.Section marginTop="15px">
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
                  </div>
                  <FormControl.Section marginTop="15px">
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
                  <FormControl.Section marginTop="15px">
                    <FormControl.Input
                      label="Street"
                      id="location.addressOne"
                      value={addressOne}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Street"
                      data-testid="create-organisation-address-one"
                    />
                    <FormControl.Error
                      name="location.addressOne"
                      show={
                        errors.location && touched.location
                          ? errors.location.addressOne &&
                            touched.location.addressOne
                          : false
                      }
                      message={
                        errors.location ? errors.location.addressOne : ''
                      }
                    />
                  </FormControl.Section>
                  <FormControl.Input
                    label="Town"
                    id="location.addressTwo"
                    value={addressTwo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Town"
                    data-testid="create-organisation-address-two"
                    style={{ marginTop: '10px' }}
                  />
                  <FormControl.Section>
                    <FormControl.Input
                      label="City"
                      id="location.city"
                      value={city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="City"
                      data-testid="create-organisation-city"
                      style={{ marginTop: '10px' }}
                    />
                    <FormControl.Error
                      name="city"
                      show={
                        errors.location && touched.location
                          ? errors.location.city && touched.location.city
                          : false
                      }
                      message={errors.location ? errors.location.city : ''}
                    />
                  </FormControl.Section>
                  <FormControl.Section>
                    <FormControl.Input
                      label="Country"
                      id="location.country"
                      value={country}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Country"
                      data-testid="create-organisation-country"
                      style={{ marginTop: '10px' }}
                    />
                    <FormControl.Error
                      name="country"
                      show={
                        errors.location && touched.location
                          ? errors.location.country && touched.location.country
                          : false
                      }
                      message={errors.location ? errors.location.country : ''}
                    />
                  </FormControl.Section>
                </div>
              </form>
            </div>
            {/* Right Side */}
            <div
              css={`
                overflow-y: auto;
                background-color: #c3cbdc;
                background: ${Colours.profileBackground};
                border-radius: 10px;
                height: calc(100% - 20px);
                width: calc(100% - 20px);
                min-width: 235px;
                padding: 10px;
                @media (max-width: 999px) {
                  height: max-content;
                  width: calc(100% - 20px);
                }
              `}
            >
              <form
                action=""
                onSubmit={handleSubmit}
                css={`
                  height: 100%;
                  display: grid;
                  grid-gap: 20px;
                  @media (max-height: 769px) {
                    height: calc(100% - 20px);
                    grid-gap: 40px;
                    grid-auto-rows: max-content;
                  }
                `}
              >
                <div
                  css={`
                    width: 100%;
                    display: grid;
                    justify-items: end;
                  `}
                >
                  <section
                    css={`
                      width: 150px;
                    `}
                  >
                    <Core.Button type="submit">Save</Core.Button>
                  </section>
                </div>
                <div
                  css={`
                    display: grid;
                    grid-template-columns: 1fr;
                    @media screen and (max-height: 769px) {
                      height: max-content;
                    }
                  `}
                >
                  <FormControl.FieldSet>
                    <FormControl.Legend>
                      Administrator Contact
                    </FormControl.Legend>
                    <TreeTwoOneFlexBox>
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
                            errors.adminContact
                              ? errors.adminContact.firstName
                              : ''
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
                            errors.adminContact
                              ? errors.adminContact.lastName
                              : ''
                          }
                        />
                      </FormControl.Section>
                      <FormControl.Section>
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
                              ? errors.adminContact.email &&
                                touched.adminContact.email
                              : false
                          }
                          message={
                            errors.adminContact ? errors.adminContact.email : ''
                          }
                        />
                      </FormControl.Section>
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
                            errors.adminContact
                              ? errors.adminContact.position
                              : ''
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
                    </TreeTwoOneFlexBox>
                  </FormControl.FieldSet>
                </div>
                <div
                  css={`
                    display: grid;
                    grid-template-columns: 1fr;
                    grid-gap: 20px;
                    @media screen and (max-height: 769px) {
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                    }
                  `}
                >
                  <FormControl.FieldSet>
                    <FormControl.Legend>Billing Contact</FormControl.Legend>
                    <TreeTwoOneFlexBox special>
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
                      <FormControl.Section>
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
                            errors.billingContact
                              ? errors.billingContact.email
                              : ''
                          }
                        />
                      </FormControl.Section>
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
                            errors.billingContact
                              ? errors.billingContact.phone
                              : ''
                          }
                        />
                      </FormControl.Section>
                    </TreeTwoOneFlexBox>
                  </FormControl.FieldSet>
                  <FormControl.FieldSet>
                    <FormControl.Legend>Technical Contact</FormControl.Legend>
                    <TreeTwoOneFlexBox special>
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
                      <FormControl.Section>
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
                            errors.technicalContact
                              ? errors.technicalContact.email
                              : ''
                          }
                        />
                      </FormControl.Section>
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
                    </TreeTwoOneFlexBox>
                  </FormControl.FieldSet>
                </div>
              </form>
            </div>
          </div>
        )
      }}
    </Formik>
  )
}

const TreeTwoOneFlexBox = ({ children, special }) => (
  <div
    css={`
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 20px;
      justify-items: center;
      @media (max-width: 1172px) {
        grid-template-columns: 1fr 1fr;
      }
      @media (max-width: 769px) {
        grid-template-columns: 1fr;
      }
      @media (max-height: 769px) {
        grid-row-gap: 5px;
        grid-column-gap: 10px;
        grid-template-columns: ${special ? '1fr 1fr' : ' 1fr 1fr 1fr'};
      }
    `}
  >
    {children}
  </div>
)
