import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useRouteMatch } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/react-hooks'

import { FormControl, StepForm, Avatar, Loading, Content } from 'components'
import { Contact, Location } from './sections'
import { editOrganizationAccountSchema } from './initialValues'
import { UPDATE_ACCOUNT } from '../mutations'
import { READ_ACCOUNT } from '../queries'
import { Logger } from '../../../../utils'

export default function ({ close }) {
  const match = useRouteMatch()
  const {
    params: { accountId },
  } = match

  //QUERY
  const { loading, error, data } = useQuery(READ_ACCOUNT, {
    variables: { accountId: parseInt(accountId) },
  })

  const [updateAccount, { loading: updatingAccount, errors: accountErrors }] =
    useMutation(UPDATE_ACCOUNT, {
      refetchQueries: () => [
        {
          query: READ_ACCOUNT,
          variables: { accountId: parseInt(accountId) },
        },
      ],
    })

  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Fail to load Account Details'} />
    )

  const { company } = data.readAccount || {}

  const {
    id,
    email,
    avatar,
    companyName,
    industry,
    taxIdNumber,
    streetNumber,
    streetName,
    parish,
    city,
    country,
    phoneType,
    phoneCarrier,
    phoneNumber,
    phoneExtension,
  } = company || {}

  return (
    <Formik
      initialValues={{
        phoneType,
        phoneCarrier,
        phoneNumber,
        phoneExtension,
        streetNumber,
        streetName,
        parish,
        city,
        country,
        id,
        email,
        companyName,
        industry,
        taxIdNumber,
        avatar,
      }}
      validationSchema={editOrganizationAccountSchema}
      onSubmit={async ({ updatedAvatar, avatar, ...rest }, actions) => {
        let a = ''
        if (updatedAvatar) a = updatedAvatar.split(',')[1]

        const company = {
          ...rest,
        }
        if (a !== '') company.avatar = a

        await updateAccount({
          variables: {
            account: {
              id: parseInt(accountId),
              type: 'individual',
              company,
            },
          },
        })
          .then(() => {
            Logger('edit organisation account')
          })
          .catch((e) => console.log(e))
        close()
      }}
    >
      {(props) => {
        const {
          values,
          setFieldValue,
          handleBlur,
          touched,
          errors,
          handleChange,
        } = props
        const { email, companyName, taxIdNumber, industry } = values

        return (
          <StepForm {...props} edit>
            {updatingAccount && <Loading small />}
            {accountErrors && (
              <Content.Alert type="error" message="Failed to update account" />
            )}

            <div
              css={`
                width: 100%;
                display: grid;
                justify-items: center;
              `}
            >
              <Avatar
                src={avatar}
                onDone={({ base64 }) => {
                  return setFieldValue('updatedAvatar', base64)
                }}
              />
              <br />
              <FormControl.ResponsiveSection>
                <FormControl.Section>
                  <FormControl.Input
                    id="companyName"
                    type="text"
                    value={companyName}
                    placeholder="eg. Sagicor"
                    label="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="companyName"
                    show={errors.companyName && touched.companyName}
                    message={errors.companyName}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="taxIdNumber"
                    type="text"
                    value={taxIdNumber}
                    placeholder="eg. 123-456-789"
                    label="TRN"
                    mask="999-999-999"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="taxIdNumber"
                    show={errors.taxIdNumber && touched.taxIdNumber}
                    message={errors.taxIdNumber}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="industry"
                    type="text"
                    value={industry}
                    placeholder="eg. Insurance"
                    label="Industry"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="email"
                    type="text"
                    value={email}
                    placeholder="eg. john@gmail.com"
                    label="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="email"
                    show={errors.email && touched.email}
                    message={errors.email}
                  />
                </FormControl.Section>
              </FormControl.ResponsiveSection>
            </div>

            <Contact {...props} edit />

            <Location {...props} edit />
          </StepForm>
        )
      }}
    </Formik>
  )
}
