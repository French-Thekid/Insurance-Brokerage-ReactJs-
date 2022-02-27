import React, { useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import {
  FormControl,
  StepForm,
  Avatar,
  Loading,
  Core,
  Content,
} from 'components'
import { Contact, DriverLicense, Location } from '../../../../../form/sections'
import {
  initialAccount,
  Titles,
  employmentTypes,
  maritalStatuses,
  genders,
} from '../../../../../form/initialValues'
import { CREATE_INSURED } from './mutations'
import { POLICY_HAVE_INSURED } from '../../../forms/mutations'
import { GET_INSUREDS } from '../../queries'
import { useMutation } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'
import { Logger } from '../../../../../../../../utils'

export default function ({ close }) {
  const [location, setLocation] = useState('')

  const match = useRouteMatch()
  const [InsuredStatus, setInsuredStatus] = useState(false)
  const {
    params: { accountId, policyId },
  } = match

  //Creation of PolicyHaveInsured mutation
  const [
    createPolicyHaveInsured,
    { loading: addingInsured, error: AddingInsuredFailed },
  ] = useMutation(POLICY_HAVE_INSURED, {
    refetchQueries: () => [
      {
        query: GET_INSUREDS,
        variables: {
          policyID: parseInt(policyId),
          accountID: parseInt(accountId),
        },
      },
    ],
  }) //catch errors

  //Creation of person mutation
  const [createPerson, { loading: creatingInsured, error: createPersonError }] =
    useMutation(CREATE_INSURED, {
      //catch errors
      onCompleted({ createPerson }) {
        //Assigning Locations
        const finalLocation = location
        finalLocation.personId = parseInt(createPerson.id)
        finalLocation.isMain = 0

        //Execution of policy have insured for newly created insured persons
        createPolicyHaveInsured({
          variables: {
            personId: parseInt(createPerson.id),
            accountID: parseInt(accountId),
            policyID: parseInt(policyId),
            isMain: InsuredStatus,
          },
        }).catch((e) => console.log(e))
      },
    })

  return (
    <Formik
      initialValues={initialAccount}
      //   validationSchema={createIndividualAccountSchema}
      onSubmit={async (
        {
          name,
          streetNumber,
          subPremise,
          premise,
          thoroughfare,
          country,
          type,
          carrier,
          number,
          dlNumber,
          extension,
          avatar,
          ...rest
        },
        actions
      ) => {
        setLocation({
          streetNumber,
          subPremise,
          premise,
          thoroughfare,
          country,
        })
        //Ask backend to change number from int to longInt
        let numberFormat = 0
        if (number !== '') {
          numberFormat = number.substring(4).split('-').join('').split(' ')[1]
        }

        let DLFormat = 0
        if (dlNumber !== '') {
          DLFormat = dlNumber.split('-').join('')
        }

        await createPerson({
          variables: {
            person: {
              dlNumber: parseInt(DLFormat),
              avatar: avatar === '' ? null : avatar,
              ...rest,
            },
          },
        })
          .then(() => {
            Logger('create insured')
          })
          .catch((e) => console.log(e))
        close()
      }}
    >
      {(props) => {
        const {
          values,
          setFieldValue,
          touched,
          handleChange,
          handleBlur,
          errors,
        } = props
        const {
          avatar,
          firstName,
          middleName,
          lastName,
          email,
          dateOfBirth,
          placeOfBirth,
          employmentType,
          occupation,
          nationality,
          gender,
          maritalStatus,
          title,
        } = values

        return (
          <StepForm {...props}>
            {(creatingInsured || addingInsured) && <Loading small />}
            {(createPersonError || AddingInsuredFailed) && (
              <Content.Alert type="error" message="Fail to execute" />
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
                onDone={({ base64 }) => setFieldValue('avatar', base64)}
              />
              <br />
              <section
                css={`
                  display: grid;
                  grid-template-columns: max-content max-content;
                  grid-column-gap: 10px;
                  align-items: Center;
                `}
              >
                <Core.Text>Main Insured</Core.Text>
                <FormControl.Toggle
                  onChange={(event) => {
                    event.persist()
                    if (event.target.checked) setInsuredStatus(true)
                    else setInsuredStatus(false)
                  }}
                  startwithoff={InsuredStatus ? null : 'true'}
                />
              </section>
              <br />
              <FormControl.ResponsiveSection cols={4}>
                <FormControl.Section>
                  <FormControl.Select
                    value={title}
                    groups={Titles}
                    label="Title"
                    name="title"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    placeholder="eg. John"
                    label="First Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="firstName"
                    show={errors.firstName && touched.firstName}
                    message={errors.firstName}
                  />
                </FormControl.Section>
                <FormControl.Input
                  id="middleName"
                  type="text"
                  value={middleName}
                  placeholder="eg. Anthony"
                  label="Middle Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Section>
                  <FormControl.Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    placeholder="eg. Brown"
                    label="Last Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="lastName"
                    show={errors.lastName && touched.lastName}
                    message={errors.lastName}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Select
                    value={gender}
                    groups={genders}
                    label="Gender"
                    name="gender"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Error
                    name="gender"
                    show={errors.gender && touched.gender}
                    message={errors.gender}
                  />
                </FormControl.Section>
                <FormControl.Select
                  value={maritalStatus}
                  groups={maritalStatuses}
                  label="Marital Status"
                  name="maritalStatus"
                  handlechange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="dateOfBirth"
                  type="date"
                  value={dateOfBirth}
                  label="Date of Birth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="placeOfBirth"
                  type="text"
                  value={placeOfBirth}
                  placeholder="eg. Mandeville"
                  label="Place of Birth"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Select
                  value={employmentType}
                  groups={employmentTypes}
                  label="Employment Type"
                  name="employmentType"
                  handlechange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="occupation"
                  type="text"
                  value={occupation}
                  placeholder="eg. Software Engineer"
                  label="Occupation"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="nationality"
                  type="text"
                  value={nationality}
                  placeholder="eg. Jamaican"
                  label="Nationality"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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

            <DriverLicense {...props} />

            <Contact {...props} />

            <Location {...props} />
          </StepForm>
        )
      }}
    </Formik>
  )
}
