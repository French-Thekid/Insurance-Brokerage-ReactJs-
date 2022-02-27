import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'

import { FormControl, Core, Loading, Content } from 'components'
import { options, initialLimit, createLimitSchema } from './initialValues'
import { LIST_LIMITS } from '../../queries'
import { CreateLimit } from '../../mutations'
import { Logger } from '../../../../../../../../utils'

export default function ({ close }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const [createPolicyLimit, { loading, error }] = useMutation(CreateLimit, {
    refetchQueries: () => [
      {
        query: LIST_LIMITS,
        variables: {
          policyID: parseInt(policyId),
          accountID: parseInt(accountId),
        },
      },
    ],
  })

  return (
    <Formik
      initialValues={initialLimit}
      validationSchema={createLimitSchema}
      onSubmit={async (
        { header, amount, thirdparty, description },
        actions
      ) => {
        createPolicyLimit({
          variables: {
            policyID: parseInt(policyId),
            accountID: parseInt(accountId),
            header,
            amount: parseInt(
              amount
                .replace('$', '')
                .replace(',', '')
                .replace(',', '')
                .replace(/\s/g, '')
            ),
            thirdparty: thirdparty === 'Yes' ? 1 : 0,
            description,
          },
        })
          .then(() => {
            Logger('created a policy limit')
            // history.goBack()
            close()
          })
          .catch((error) => {
            console.log(error)
          })
      }}
    >
      {(props) => {
        const {
          values,
          handleBlur,
          touched,
          errors,
          handleChange,
          handleSubmit,
        } = props

        const { header, amount, thirdparty, description } = values

        return (
          <form
            onSubmit={handleSubmit}
            css={`
              width: 400px;
            `}
          >
            {loading && <Loading small />}
            {error && (
              <Content.Alert type="error" message="Fail to create Limit" />
            )}
            <FormControl.Section>
              <FormControl.Input
                id="header"
                type="text"
                value={header}
                placeholder="eg. Fire and Flood Protection"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Header"
              />
              <FormControl.Error
                show={errors.header && touched.header}
                message={errors.header}
              />
            </FormControl.Section>
            <FormControl.Section>
              <FormControl.Input
                mask={
                  amount.replace(/\s/g, '').length <= 10
                    ? '$9,999,9999'
                    : '$99,999,999'
                }
                id="amount"
                type="text"
                value={amount}
                placeholder="$0. 00"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Amount"
              />
              <FormControl.Error
                show={errors.amount && touched.amount}
                message={errors.amount}
              />
            </FormControl.Section>
            <FormControl.Section>
              <FormControl.Select
                value={thirdparty}
                groups={options}
                label="Third Party"
                name="thirdparty"
                handlechange={handleChange}
                onBlur={handleBlur}
              />
              <FormControl.Error
                show={errors.thirdparty && touched.thirdparty}
                message={errors.thirdparty}
              />
            </FormControl.Section>
            <FormControl.Section>
              <FormControl.Input
                multiline
                rows={5}
                id="description"
                type="text"
                value={description}
                placeholder="Type Description Here"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Description"
              />
              <FormControl.Error
                show={errors.description && touched.description}
                message={errors.description}
              />
            </FormControl.Section>
            <Core.Button type="submit">Create</Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
