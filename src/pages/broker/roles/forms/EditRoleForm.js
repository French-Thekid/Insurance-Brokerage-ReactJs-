import React from 'react'
import 'styled-components/macro'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { FormControl, Core, Loading, Content } from 'components'
import { Logger } from '../../../../utils'

function EditRoleForm({ updateAction, updateError, loading, close }) {
  const { description, name, id } = JSON.parse(
    localStorage.getItem('activeRole')
  )
  return (
    <Formik
      initialValues={{
        roleDescription: description,
        roleName: name,
      }}
      validationSchema={object().shape({
        roleName: string('Enter a valid role name').required(
          'Role name is required'
        ),
        roleDescription: string('Enter a valid role description').required(
          'Role description is required'
        ),
      })}
      onSubmit={(values, action) => {
        updateAction({
          variables: {
            id,
            name: values.roleName,
            description: values.roleDescription,
          },
        })
          .then(() => {
            Logger(`update role ${values.roleName}`)
            close()
          })
          .catch((e) => console.log(e))
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          touched,
          handleBlur,
          handleSubmit,
          errors,
        } = props
        return (
          <form
            id="editRoleForm"
            onSubmit={handleSubmit}
            css={`
              width: 500px;
              padding-top: 20px;
              @media (max-width: 376px) {
                width: 300px;
              }
            `}
          >
            {updateError && (
              <Content.Alert
                returnAfter
                type="error"
                message="Failed to Update Role"
              />
            )}
            {loading && <Loading small />}

            <FormControl.Input
              label="Role Name"
              id="roleName"
              type="text"
              placeholder="eg. Broker"
              value={values.roleName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormControl.Error
              name="roleName"
              show={errors.roleName && touched.roleName}
              message={errors.roleName}
            />
            <br />
            <FormControl.Input
              label="Description"
              id="roleDescription"
              value={values.roleDescription}
              multiline
              rows={4}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Type Description here"
            />
            <FormControl.Error
              name="roleDescription"
              show={errors.roleDescription && touched.roleDescription}
              message={errors.roleDescription}
            />
            <Core.Button type="submit" style={{ marginTop: '10px' }}>
              Update Role
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}

export default EditRoleForm
