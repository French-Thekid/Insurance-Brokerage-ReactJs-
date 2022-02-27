import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { FormControl, StepForm, Avatar, Content } from 'components'
import { Contact, Location } from './sections'
import {
  createOrganizationAccountSchema,
  initialCompanyAccount,
} from './initialValues'
import { useMutation } from '@apollo/react-hooks'
import { LIST_ACCOUNTS } from '../queries'
import { CREATE_ACCOUNT } from '../mutations'
import { Logger } from '../../../../utils'

export default function ({ close, showNotificationCreate }) {
  const [createAccount, { errors: accountErrors }] = useMutation(
    CREATE_ACCOUNT,
    {
      refetchQueries: () => [
        {
          query: LIST_ACCOUNTS,
        },
      ],
      onCompleted() {
        showNotificationCreate()
      },
    }
  )

  return (
    <Formik
      initialValues={initialCompanyAccount}
      validationSchema={createOrganizationAccountSchema}
      onSubmit={async ({ avatar, ...rest }, actions) => {
        if (avatar) avatar = avatar.split(',')[1]

        await createAccount({
          variables: {
            account: {
              type: 'company',
              company: {
                avatar,
                ...rest,
              },
            },
          },
        })
          .then((res) => {
            Logger('create organisation account')
            console.log(res)
            showNotificationCreate()
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
        const { avatar, email, companyName, taxIdNumber, industry } = values
        return (
          <StepForm {...props}>
            {accountErrors && (
              <Content.Alert type="error" message={'Fail to create Account'} />
            )}
            <div
              css={`
                width: 500px;
                @media (max-width: 376px) {
                  width: 100%;
                }
                display: grid;
                justify-items: center;
              `}
            >
              <Avatar
                src={avatar}
                onDone={({ base64 }) => {
                  console.log(base64)
                  return setFieldValue('avatar', base64)
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

            <Contact {...props} />

            <Location {...props} />
          </StepForm>
        )
      }}
    </Formik>
  )
}
