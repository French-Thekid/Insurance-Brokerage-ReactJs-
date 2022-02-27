import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
import { LIST_PERMISSION } from '../../forms/queries'
import { REVOKE_PERMISSION } from '../../forms/mutations'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { Core, Colours, Content, Loading } from 'components'
import { Logger } from '../../../../../utils'

export default function ({
  setContainData,
  finalArray,
  isShowing,
  roleId,
  close,
}) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permission, Access] = usePermission()

  // Removing Permissions
  const [
    revokePermissionsFromRole,
    { loading, error: revokePermissionError },
  ] = useMutation(REVOKE_PERMISSION, {
    refetchQueries: () => [
      {
        query: LIST_PERMISSION,
        variables: { roleId: parseInt(roleId) },
      },
    ],
  })

  return (
    <Dialog
      open={isShowing}
      close={() => history.goBack()}
      width="650px"
      title="Remove Permission"
    >
      {permission.ROLEPERMISSIONS_DELETE_TYPEOBJECT ? (
        <Formik
          initialValues={{
            deleteConfirmation: '',
          }}
          validationSchema={object().shape({
            deleteConfirmation: string(),
          })}
          onSubmit={async (values, action) => {
            if (finalArray)
              finalArray.map((submissionArray) =>
                revokePermissionsFromRole({
                  variables: { permissions: submissionArray },
                })
                  .then(() => {
                    Logger('deleted a role permission')
                  })
                  .catch((e) => console.log(e))
              )
            close()
            setContainData(true)
          }}
        >
          {(props) => {
            const { handleSubmit } = props
            return (
              <form onSubmit={handleSubmit}>
                {loading && <Loading small />}
                {revokePermissionError && (
                  <Content.Alert
                    type="error"
                    message="Fail to remove permissions"
                  />
                )}
                <Core.Text>
                  Are you sure you want to Delete All selected resources?
                  <br />
                  press <b style={{ color: Colours.red }}>Delete</b> below to
                  confirm
                </Core.Text>
                <br />

                <Core.Button bgColour={Colours.red} type="submit">
                  Delete
                </Core.Button>
              </form>
            )
          }}
        </Formik>
      ) : (
        <Access />
      )}
    </Dialog>
  )
}
