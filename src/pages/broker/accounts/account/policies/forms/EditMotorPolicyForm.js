import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'
import { updatePolicyMutation } from './mutations'
import { FormControl, StepForm } from 'components'
import {
  Prefixes,
  Statuses,
  MutualAgreements,
  Currencies,
  editPolicySchema,
} from './initialValues'
import { LIST_POLICY } from '../queries'
import { Logger } from '../../../../../../utils'

export default function ({ close }) {
  const {
    params: { accountId },
  } = useRouteMatch()
  const initialPolicy = JSON.parse(localStorage.getItem('activePolicy'))

  //Updating of Policy mutation
  const [updatePolicy] = useMutation(updatePolicyMutation, {
    refetchQueries: () => [
      {
        query: LIST_POLICY,
        variables: { accountID: parseInt(accountId) },
      },
    ],
    onCompleted() {
      // Logger('edit policy')
    },
  })

  const {
    id,
    prefix,
    status,
    memo,
    usage,
    currency,
    agreedValue,
    thirdParty,
    premium,
    balance,
    inceptionDate,
    startDate,
    endDate,
    dateSigned,
    renewalDate,
    renewalMemo,
    branch,
    country,
    groupName,
    limitGroup,
  } = initialPolicy || {}

  return (
    <Formik
      initialValues={{
        Prefix: prefix,
        Status: status && status.charAt(0).toUpperCase() + status.slice(1),
        Memo: memo,
        Usage: usage,
        Currency: currency,
        MutualAgreement: agreedValue === 1 ? 'Yes' : 'No',
        ThirdParty: thirdParty === 1 ? 'Yes' : 'No',
        Premium: premium ? premium : 0,
        Balance: balance ? balance : 0,
        InceptionDate:
          inceptionDate && inceptionDate !== '0000-00-00'
            ? new Date(parseInt(inceptionDate))
                .toISOString()
                .replace(/T/, ' ')
                .split(' ')[0]
            : '0000-00-00',
        StartDate:
          startDate && startDate !== '0000-00-00'
            ? new Date(startDate).toISOString().replace(/T/, ' ').split(' ')[0]
            : '0000-00-00',
        EndDate:
          endDate && endDate !== '0000-00-00'
            ? new Date(endDate).toISOString().replace(/T/, ' ').split(' ')[0]
            : '0000-00-00',
        DateSigned:
          dateSigned && dateSigned !== '0000-00-00'
            ? new Date(parseInt(dateSigned))
                .toISOString()
                .replace(/T/, ' ')
                .split(' ')[0]
            : '0000-00-00',
        RenewalDate:
          renewalDate && renewalDate !== '0000-00-00'
            ? new Date(parseInt(renewalDate))
                .toISOString()
                .replace(/T/, ' ')
                .split(' ')[0]
            : '0000-00-00',
        RenewalMemo: renewalMemo,
        Branch: branch,
        Country: country,
        GroupName: groupName,
        LimitGroup: limitGroup,
      }}
      validationSchema={editPolicySchema}
      onSubmit={(
        {
          Prefix,
          Status,
          Memo,
          Usage,
          Currency,
          MutualAgreement,
          ThirdParty,
          Premium,
          Balance,
          InceptionDate,
          StartDate,
          EndDate,
          DateSigned,
          RenewalDate,
          RenewalMemo,
          Branch,
          Country,
          GroupName,
          LimitGroup,
        },
        actions
      ) => {
        let finalPremium = 0
        let finalBalance = 0

        if (Premium !== '' && Premium.toString().split(',')[1]) {
          finalPremium = Premium.toString()
            .split('$')[1]
            .split('.')[0]
            .split(',')
            .join('')
        } else {
          finalPremium = Premium
        }
        if (Balance !== '' && Balance.toString().split(',')[1]) {
          finalBalance = Balance.toString()
            .split('$')[1]
            .split('.')[0]
            .split(',')
            .join('')
        } else {
          finalBalance = Balance
        }
        updatePolicy({
          variables: {
            id,
            accountID: parseInt(accountId),
            Prefix,
            Status: Status.toLowerCase(),
            Memo,
            Usage,
            Currency,
            MutualAgreement: MutualAgreement === 'Yes' ? 1 : 0,
            ThirdParty: ThirdParty === 'Yes' ? 1 : 0,
            Premium: parseInt(finalPremium),
            Balance: parseInt(finalBalance),
            InceptionDate,
            StartDate,
            EndDate,
            DateSigned,
            RenewalDate,
            RenewalMemo,
            Branch,
            Country,
            GroupName,
            LimitGroup,
          },
        })
          .then(() => {
            Logger('updated a motor policy')
            close()
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
          GroupName,
          Prefix,
          ThirdParty,
          Status,
          MutualAgreement,
          Balance,
          Premium,
          Currency,
        } = values
        return (
          <StepForm {...props} edit>
            <FormControl.FieldSet>
              <FormControl.Legend>General Details</FormControl.Legend>
              <FormControl.ResponsiveSection cols={3} rowSpace>
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
                <FormControl.Input
                  id="InceptionDate"
                  type="date"
                  value={InceptionDate}
                  label="Inception Issued"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
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
                <FormControl.Section>
                  <FormControl.Input
                    id="GroupName"
                    type="text"
                    value={GroupName}
                    placeholder="Group Name Here"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    label="Group Name"
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
                <FormControl.Select
                  value={ThirdParty}
                  groups={MutualAgreements}
                  label="Third Party"
                  name="ThirdParty"
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
              <FormControl.FieldSet>
                <FormControl.Legend>Financial Details</FormControl.Legend>
                <FormControl.ResponsiveSection cols={3}>
                  <FormControl.Input
                    mask={
                      Premium.toString().replace(/\s/g, '').length <= 10
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
                      Balance.toString().replace(/\s/g, '').length <= 10
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
