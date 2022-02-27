import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { useRouteMatch } from 'react-router-dom'

import { FormControl, Core, Loading, Content } from 'components'
import { initialExtension, createExtensionSchema } from './initialValues'
import { LIST_EXTENSIONS } from '../../queries'
import { CreateExtension } from '../../mutations'
import { Logger } from '../../../../../../../../utils'

export default function ({ close }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()

  const [createPolicyExtension, { loading, error }] = useMutation(
    CreateExtension,
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

  return (
    <Formik
      initialValues={initialExtension}
      validationSchema={createExtensionSchema}
      onSubmit={async ({ description, limit, type, name }, actions) => {
        createPolicyExtension({
          variables: {
            policyID: parseInt(policyId),
            accountID: parseInt(accountId),
            name,
            limit: parseInt(
              limit
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
            Logger('created a policy extension')
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
              <Content.Alert type="error" message="Fail to create Extension" />
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
                  limit.replace(/\s/g, '').length <= 10
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
            <Core.Button type="submit">Create</Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
