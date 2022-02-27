import React from 'react'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { FormControl } from 'components'
import { useHistory } from 'react-router-dom'
import { Logger } from '../../../../utils'

export default function RoleDetails({ createRole }) {
  const history = useHistory()
  return (
    <Formik
      initialValues={{
        roleDescription: '',
        roleName: '',
      }}
      validationSchema={object().shape({
        roleName: string('Enter a valid role name').required(
          'Role name is required'
        ),
        roleDescription: string('Enter a valid role description').required(
          'Role description is required'
        ),
      })}
      //   validate={(values) => {
      //     const errors = {}
      //     roles.map((role) => {
      //       if (role.name.trimStart().trimLeft() === values.roleName) {
      //         errors.roleName = 'this role name already exists'
      //       }
      //       return errors
      //     })
      //     return errors
      //   }}
      onSubmit={(values, errors) => {
        createRole({
          variables: {
            name: values.roleName,
            description: values.roleDescription,
          },
        })
          .then(() => {
            Logger(`create a role ${values.roleName}`)
            history.push('/broker/roles')
          })
          .catch((e) => console.log(e))
      }}
    >
      {({
        errors,
        handleChange,
        values,
        touched,
        handleBlur,
        handleSubmit,
      }) => (
        <form id="createRoleForm" onSubmit={handleSubmit}>
          <FormControl.Input
            label="Role Name"
            value={values.roleName}
            name="roleName"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormControl.Error
            show={touched.roleName && errors.roleName}
            message={errors.roleName}
          />
          <br />
          <FormControl.Input
            label="Role Description"
            name="roleDescription"
            value={values.roleDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            multiline
            rows={5}
          />
          <FormControl.Error
            show={touched.roleDescription && errors.roleDescription}
            message={errors.roleDescription}
          />
        </form>
      )}
    </Formik>
  )
}
