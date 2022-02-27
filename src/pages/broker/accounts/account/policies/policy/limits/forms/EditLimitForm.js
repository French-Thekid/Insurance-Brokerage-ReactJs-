import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useLocation, useRouteMatch } from 'react-router-dom'

import { FormControl, Core, Loading, Content } from 'components'
import { options, createLimitSchema } from './initialValues'
import { LIST_LIMITS } from '../../queries'
import { UPDATE_LIMIT } from '../../mutations'
import { Logger } from '../../../../../../../../utils'

const queryString = require('query-string')

export default function ({ close }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const { search } = useLocation()
  const { id: limitId } = queryString.parse(search)

  const [updatePolicyLimit, { loading, error }] = useMutation(UPDATE_LIMIT, {
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

  const { heading, amount, thirdParty, description } = JSON.parse(
    localStorage.getItem('activeLimit')
  )

  return (
    <Formik
      initialValues={{
        header: heading,
        amount,
        thirdparty: thirdParty,
        description,
      }}
      validationSchema={createLimitSchema}
      onSubmit={async (
        { header, amount, thirdparty, description },
        actions
      ) => {
        updatePolicyLimit({
          variables: {
            limitID: parseInt(limitId),
            policyID: parseInt(policyId),
            accountID: parseInt(accountId),
            header: header,
            amount: parseInt(
              amount
                .toString()
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
            Logger('updated a policy limit')
            close()
          })
          .catch((e) => console.log(e))
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
              <Content.Alert type="error" message="Fail to edit Limit" />
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
                  amount.toString().replace(/\s/g, '').length <= 10
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
            <Core.Button type="submit">Update</Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
