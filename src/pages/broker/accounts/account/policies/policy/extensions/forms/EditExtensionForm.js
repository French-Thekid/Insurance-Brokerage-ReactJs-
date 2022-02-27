import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useLocation, useRouteMatch } from 'react-router-dom'

import { FormControl, Core, Loading, Content } from 'components'
import { createExtensionSchema } from './initialValues'
import { LIST_EXTENSIONS } from '../../queries'
import { UPDATE_EXTENSION } from '../../mutations'
import { Logger } from '../../../../../../../../utils'

const queryString = require('query-string')

export default function ({ close }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const { search } = useLocation()
  const { id: extensionId } = queryString.parse(search)

  const [updatePolicyExtension, { loading, error }] = useMutation(
    UPDATE_EXTENSION,
    {
      refetchQueries: () => [
        {
          query: LIST_EXTENSIONS,
          variables: {
            policyID: parseInt(policyId),
            accountID: parseInt(accountId),
          },
        },
      ],
    }
  )

  const { description, type, limit, name } = JSON.parse(
    localStorage.getItem('activeExtension')
  )

  return (
    <Formik
      initialValues={{
        description,
        type,
        limit,
        name,
      }}
      validationSchema={createExtensionSchema}
      onSubmit={async ({ description, limit, type, name }, actions) => {
        updatePolicyExtension({
          variables: {
            extensionID: parseInt(extensionId),
            policyID: parseInt(policyId),
            accountID: parseInt(accountId),
            name,
            limit: parseInt(
              limit
                .toString()
                .replace('$', '')
                .replace(',', '')
                .replace(',', '')
                .replace(/\s/g, '')
            ),
            type,
            description,
          },
        })
          .then(() => {
            Logger('updated a policy extension')
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

        const { description, limit, type, name } = values

        return (
          <form
            onSubmit={handleSubmit}
            css={`
              width: 400px;
            `}
          >
            {loading && <Loading small />}
            {error && (
              <Content.Alert type="error" message="Fail to Edit Extension" />
            )}
            <FormControl.Section>
              <FormControl.Input
                id="name"
                type="text"
                value={name}
                placeholder="eg. 1 Bedroom Apartment"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Name"
              />
              <FormControl.Error
                show={errors.name && touched.name}
                message={errors.name}
              />
            </FormControl.Section>
            <FormControl.Section>
              <FormControl.Input
                mask={
                  limit.toString().replace(/\s/g, '').length <= 10
                    ? '$9,999,9999'
                    : '$99,999,999'
                }
                id="limit"
                type="text"
                value={limit}
                placeholder="$0. 00"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Limit"
              />
              <FormControl.Error
                show={errors.limit && touched.limit}
                message={errors.limit}
              />
            </FormControl.Section>
            <FormControl.Section>
              <FormControl.Input
                id="type"
                type="text"
                value={type}
                placeholder="eg. Non-Motor"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Type"
              />
              <FormControl.Error
                show={errors.type && touched.type}
                message={errors.type}
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
            <br />
            <Core.Button type="submit">Upgrade</Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
