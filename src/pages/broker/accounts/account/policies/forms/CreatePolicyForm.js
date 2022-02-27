import React, { useState } from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'
import { object, string, number } from 'yup'
import {
  createPolicyMutation,
  CREATE_PERSON,
  POLICY_HAVE_INSURED,
} from './mutations'
import { FormControl, Content, StepForm } from 'components'
import {
  initialPolicy,
  Prefixes,
  Statuses,
  MutualAgreements,
  Currencies,
} from './initialValues'
import { InsuredExist, Insureds } from './partials'
import { LIST_POLICY } from '../queries'
import { Logger } from '../../../../../../utils'

function checkTouched({
  firstName,
  lastName,
  nationality,
  email,
  taxIdnum,
  startDate,
  endDate,
}) {
  if (
    firstName !== '' ||
    lastName !== '' ||
    nationality !== '' ||
    email !== '' ||
    taxIdnum !== '' ||
    startDate !== '' ||
    endDate !== ''
  )
    return true
  return false
}

export default function ({ type = '', close }) {
  const {
    params: { accountId },
  } = useRouteMatch()
  const [main, setMain] = useState({ emails: [] })
  const [mainInsureds, setMainInsureds] = useState({ ids: [] })
  const [filteredList, setFilteredList] = useState({ ids: [] })
  const [I1Ismain, setI1Ismain] = useState(false)
  const [I2Ismain, setI2Ismain] = useState(false)
  const [policyID, setPolicyId] = useState(null)
  const [selInsured, setSelInsured] = useState({ list: [] })
  const [addNewInsured, setAddNewInsured] = useState(false)

  //Creation of Policy mutation
  const [createPolicy, { errors: policyErrors }] = useMutation(
    createPolicyMutation,
    {
      onCompleted({ createPolicy }) {
        setPolicyId(createPolicy.id)
        if (selInsured)
          selInsured.list.map((insured) =>
            //Execution of policy have insured for selected insured
            createPolicyHaveInsured({
              variables: {
                personId: insured.id,
                accountID: parseInt(accountId),
                policyID: parseInt(createPolicy.id),
                isMain:
                  mainInsureds.ids.indexOf(insured.id) !== -1 ? true : false,
              },
            }).then(() => {
              setSelInsured({ list: [] })
            })
          )
      },
      refetchQueries: () => [
        {
          query: LIST_POLICY,
          variables: { accountID: parseInt(accountId) },
        },
      ],
    }
  )

  //Creation of PolicyHaveInsured mutation
  const [createPolicyHaveInsured] = useMutation(POLICY_HAVE_INSURED) //catch errors

  //Creation of person mutation
  const [createPerson] = useMutation(CREATE_PERSON, {
    //catch errors
    onCompleted({ createPerson }) {
      //Execution of policy have insured for newly created insured persons

      createPolicyHaveInsured({
        variables: {
          personId: createPerson.id,
          accountID: parseInt(accountId),
          policyID: policyID,
          isMain: main.emails.indexOf(createPerson.email) !== -1 ? true : false,
        },
      })
    },
  })

  return (
    <Formik
      initialValues={initialPolicy}
      validationSchema={object().shape({
        Prefix: string(),
        Status: string(),
        Memo: string(),
        Usage: string(),
        Currency: string(),
        MutualAgreement: string(),
        ThirdParty: string(),
        Premium: string(),
        Balance: string(),
        InceptionDate: string(),
        StartDate: string(),
        EndDate: string(),
        DateSigned: string(),
        RenewalDate: string(),
        RenewalMemo: string(),
        Branch: string(),
        Country: string(),
        Occupancy: string(),
        GroupName: string(),
        LimitGroup: string(),
        Name: string(),
        Type: string(),
        Limit: string(),
        Description: string(),
        firstName: string(),
        lastName: string(),
        email: string().email('Email must be valid!'),
        isMain: number(),
        taxIDNum: number(),
        dlExpirationDate: string(),
        dlIssueDate: string(),
        nationality: string(),
        I1firstName: I1Ismain
          ? string().required('First Name is required!')
          : string().nullable(),
        I1lastName: I1Ismain
          ? string().required('Last Name is required!')
          : string().nullable(),
        I1nationality: string(),
        I1email: I1Ismain
          ? string().required('Email is required!')
          : string().nullable(),
        I1dlExpirationDate: string(),
        I1taxIdNum: I1Ismain
          ? string().required('Drivers License number is required')
          : string().nullable(),
        I1dlIssueDate: string(),
        I1isMain: string(),
        I2firstName: I2Ismain
          ? string().required('First Name is required!')
          : string().nullable(),
        I2lastName: I2Ismain
          ? string().required('Last Name is required!')
          : string().nullable(),
        I2nationality: string(),
        I2email: I2Ismain
          ? string().required('Email is required!')
          : string().nullable(),
        I2dlExpirationDate: string(),
        I2taxIdNum: I2Ismain
          ? string().required('Drivers License number is required')
          : string().nullable(),
        I2dlIssueDate: string(),
        I2isMain: string(),
      })}
      onSubmit={async (
        {
          Prefix,
          Status,
          Memo,
          Usage,
          Currency,
          MutualAgreement,
          Premium,
          Balance,
          InceptionDate,
          StartDate,
          EndDate,
          DateSigned,
          RenewalDate,
          Branch,
          Country,
          Occupancy,
          LimitGroup,
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
        },
        actions
      ) => {
        setMain((state) => {
          let emails = []
          if (I1Ismain) {
            emails = state.emails.concat(I1email)
          }
          if (I2Ismain) {
            emails = state.emails.concat(I2email)
          }
          return { emails }
        })
        createPolicy({
          variables: {
            accountID: parseInt(accountId),
            Prefix,
            Status: Status.toLowerCase(),
            Memo,
            Usage,
            Currency,
            MutualAgreement: MutualAgreement === 'Yes' ? 1 : 0,
            Premium: Premium
              ? parseInt(
                  Premium.split('$')[1].split('.')[0].split(',').join('')
                )
              : 0,
            Balance: Balance
              ? parseInt(
                  Balance.split('$')[1].split('.')[0].split(',').join('')
                )
              : 0,
            InceptionDate,
            StartDate,
            EndDate,
            DateSigned,
            RenewalDate,
            Branch,
            Country,
            Occupancy,
            GroupName: type,
            LimitGroup,
          },
        })
          .then(() => {
            Logger('created a policy')
            if (
              checkTouched({
                firstName: I1firstName,
                lastName: I1lastName,
                nationality: I1nationality,
                email: I1email,
                taxIdnum: I1taxIdNum,
                endDate: I1dlExpirationDate,
                startDate: I1dlIssueDate,
              })
            ) {
              let DLFormat = 0
              if (I1taxIdNum !== '') {
                DLFormat = I1taxIdNum.split('-').join('')
              }
              if (addNewInsured)
                createPerson({
                  variables: {
                    email: I1email,
                    firstName: I1firstName,
                    lastName: I1lastName,
                    dlNumber: parseInt(DLFormat),
                    dlDateIssued: I1dlIssueDate,
                    dlExpirationDate: I1dlExpirationDate,
                  },
                }).catch((e) => console.log(e))
            }
            if (
              checkTouched({
                firstName: I2firstName,
                lastName: I2lastName,
                nationality: I2nationality,
                email: I2email,
                taxIdnum: I2taxIdNum,
                endDate: I2dlExpirationDate,
                startDate: I2dlIssueDate,
              })
            ) {
              let DLFormat = 0
              if (I2taxIdNum !== '') {
                DLFormat = I2taxIdNum.split('-').join('')
              }
              if (addNewInsured)
                createPerson({
                  variables: {
                    email: I2email,
                    firstName: I2firstName,
                    lastName: I2lastName,
                    dlNumber: parseInt(DLFormat),
                    dlDateIssued: I2dlIssueDate,
                    dlExpirationDate: I2dlExpirationDate,
                  },
                }).catch((e) => console.log(e))
            }
          })
          .then(() => {
            // Logger('create policy')
            close()
            setMainInsureds({ ids: [] })
            setSelInsured({ list: [] })
            setMain({ emails: [] })
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const { values, handleBlur, handleChange } = props
        const {
          Memo,
          Usage,
          InceptionDate,
          StartDate,
          EndDate,
          DateSigned,
          RenewalDate,
          Branch,
          LimitGroup,
          Occupancy,
          Prefix,
          Status,
          MutualAgreement,
          Balance,
          Premium,
          Currency,
        } = values

        return (
          <StepForm {...props}>
            <FormControl.FieldSet>
              <FormControl.Legend>General Details</FormControl.Legend>
              <FormControl.ResponsiveSection cols={3} rowSpace>
                <FormControl.Input
                  id="Occupancy"
                  type="text"
                  value={Occupancy}
                  placeholder="eg. Occupied"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Occupancy"
                />
                <FormControl.Input
                  id="Branch"
                  type="text"
                  value={Branch}
                  placeholder="eg. New Kingston"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Insurer's Branch"
                />
                <FormControl.Input
                  id="DateSigned"
                  type="date"
                  value={DateSigned}
                  label="Date First Issued"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Section>
                  <FormControl.Input
                    id="InceptionDate"
                    type="date"
                    value={InceptionDate}
                    label="Inception Issued"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="StartDate"
                    type="date"
                    value={StartDate}
                    label="Start Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Section>
                  <FormControl.Input
                    id="EndDate"
                    type="date"
                    value={EndDate}
                    label="End Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.Section>
                <FormControl.Select
                  value={Prefix}
                  groups={Prefixes}
                  label="Prefix"
                  name="Prefix"
                  handlechange={handleChange}
                  onBlur={handleBlur}
                />
                <FormControl.Input
                  id="LimitGroup"
                  type="text"
                  value={LimitGroup}
                  placeholder="Limited Group Here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Limit Group"
                />
                <FormControl.Select
                  value={Status}
                  groups={Statuses}
                  label="Status"
                  name="Status"
                  handlechange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl.ResponsiveSection>
            </FormControl.FieldSet>

            <div>
              {policyErrors && (
                <Content.Alert type="Alert" message="Failed to create policy" />
              )}
              <InsuredExist
                setAddNewInsured={setAddNewInsured}
                {...props}
                filteredList={filteredList}
                setFilteredList={setFilteredList}
                selInsured={selInsured}
                mainInsureds={mainInsureds}
                setMainInsureds={setMainInsureds}
                setSelInsured={setSelInsured}
              />
            </div>

            {addNewInsured && (
              <div>
                {policyErrors && (
                  <Content.Alert
                    type="Alert"
                    message="Failed to create policy"
                  />
                )}
                <Insureds
                  {...props}
                  setAddNewInsured={setAddNewInsured}
                  I1Ismain={I1Ismain}
                  setI1Ismain={setI1Ismain}
                  I2Ismain={I2Ismain}
                  setI2Ismain={setI2Ismain}
                />
              </div>
            )}
            <div>
              <FormControl.FieldSet>
                <FormControl.Legend>Financial Details</FormControl.Legend>
                <FormControl.ResponsiveSection cols={3}>
                  <FormControl.Input
                    mask={
                      Premium.replace(/\s/g, '').length <= 10
                        ? '$9,999,9999'
                        : '$99,999,999'
                    }
                    id="Premium"
                    type="text"
                    value={Premium}
                    placeholder="$0.00"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Premium"
                  />
                  <FormControl.Select
                    value={Currency}
                    groups={Currencies}
                    label="Currency"
                    name="Currency"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Input
                    mask={
                      Balance.replace(/\s/g, '').length <= 10
                        ? '$9,999,9999'
                        : '$99,999,999'
                    }
                    id="Balance"
                    type="text"
                    value={Balance}
                    placeholder="$0. 00"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Balance"
                  />
                </FormControl.ResponsiveSection>
              </FormControl.FieldSet>
              <br />
              <FormControl.FieldSet>
                <FormControl.Legend>
                  Usage and Renewal Details
                </FormControl.Legend>
                <FormControl.ResponsiveSection cols={3}>
                  <FormControl.Select
                    value={MutualAgreement}
                    groups={MutualAgreements}
                    label="Mutual Agreement"
                    name="MutualAgreement"
                    handlechange={handleChange}
                    onBlur={handleBlur}
                  />
                  <FormControl.Input
                    id="Usage"
                    type="text"
                    value={Usage}
                    placeholder="eg. Commercial"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Usage"
                  />
                  <FormControl.Input
                    id="RenewalDate"
                    type="date"
                    value={RenewalDate}
                    label="Renewal Date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </FormControl.ResponsiveSection>
                <FormControl.Input
                  multiline
                  rows={4}
                  id="Memo"
                  type="date"
                  value={Memo}
                  label="Renewal Memo"
                  placeholder="Type Memo Here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </FormControl.FieldSet>
            </div>
          </StepForm>
        )
      }}
    </Formik>
  )
}
