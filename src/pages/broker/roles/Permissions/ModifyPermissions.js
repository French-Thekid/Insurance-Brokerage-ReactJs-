import React, { useContext, useState } from 'react'
import { Formik, Form, FieldArray } from 'formik'
import 'styled-components/macro'
import { ArrayHelper } from 'utils'
import { useMutation } from '@apollo/react-hooks'
import { LIST_PERMISSION } from '../forms/queries'
import { ASSIGN_PERMISSION } from '../forms/mutations'
import { Core, Content, Loading, PageHeader } from 'components'
import CollapsibleComponent from './CollapsibleComponent'
import { useHistory } from 'react-router-dom'
import { Logger } from '../../../../utils'
import { ColourContext } from 'context'

function ModifyPermissions() {
  const history = useHistory()
  const { name, id } = JSON.parse(localStorage.getItem('selectedPermission'))
  const { Colours } = useContext(ColourContext)

  const SubmissionArray = []
  const [index, setIndex] = useState(null)
  const [Perms, setPerms] = useState({ Permissionlist: [] })
  const [Action, setAction] = useState({ Actions: [] })
  const [Resources, setResources] = useState({ Resources: [] })

  //Mutation
  const [
    assignPermissionsToRole,
    { error: assignPermissionsToRoleError, loading },
  ] = useMutation(ASSIGN_PERMISSION, {
    refetchQueries: () => [
      {
        query: LIST_PERMISSION,
        variables: { roleId: parseInt(id) },
      },
    ],
  })
  if (loading) return <Loading small />
  if (assignPermissionsToRoleError) {
    if (assignPermissionsToRoleError.message.includes('"Duplicate entry')) {
      setTimeout(() => {
        window.location.reload()
      }, 5000)
      return (
        <Content.Alert
          type="error"
          message={'Duplicate Permissions Selected, Refreshing in 5s'}
        />
      )
    }

    return (
      <Content.Alert
        type="error"
        message={'Failed to Assign Permissions, please refresh and try again'}
      />
    )
  }
  return (
    <>
      <PageHeader title={`${name} : Modify Permissions `} />
      {assignPermissionsToRoleError && (
        <Content.Alert
          type="error"
          message={'Failed to Assign Permissions, please try again'}
        />
      )}
      {/* <Can
        i={[
          {
            endpoint: 'RolePermissions:Create',
            objectType: 'Object',
            objectId: String(match.params.id),
          },
        ]}
        else={<PermissionCard />}
      > */}
      <Formik
        initialValues={{
          services: [{}],
        }}
        onSubmit={(values) => {
          let found = 'Non Found'
          Perms.Permissionlist.map((Permission, index) => {
            let ActiveIndex = Permission.split('/')[1]
            let ActivePermission = Permission.split('/')[0] //end result
            found = 'Non Found'
            let exception = false
            // eslint-disable-next-line
            Resources.Resources.map((innerObject) => {
              if (innerObject.split('/')[0] === '*') exception = true
            })
            SubmissionArray.push({
              roleId: parseInt(id),
              objectType: ActivePermission,
              permissionEndpoints: Action.Actions.map((endpoint, index) => {
                if (endpoint.split('/')[1] === ActiveIndex) {
                  //end result
                  if (endpoint.split('/')[0].split(':')[1] === 'Create') {
                    found = endpoint.split('/')[0]
                    return null
                  } else return endpoint.split('/')[0]
                } else return null
              }).filter((endpoint) => endpoint !== null),
              action: true,
              objectIds: Resources.Resources.map((ObjectID, index) => {
                //Checking if select all was checked
                if (exception) {
                  if (index === 0) return '*'
                  else return null
                } else {
                  if (ObjectID.split('/')[1] === ActiveIndex) {
                    return ObjectID.split('/')[0]
                  } else return null
                }
              }).filter((Id) => Id !== null),
            })

            if (found !== 'Non Found') {
              SubmissionArray.push({
                roleId: parseInt(id),
                objectType: ActivePermission,
                permissionEndpoints: [found],
                action: true,
                objectIds: ['*'],
              })
            }
            return SubmissionArray
          })
          /*Check for duplicate permissions*/
          if (
            ArrayHelper.ArrayObjectDuplicateAttribute(
              SubmissionArray.filter(
                (item) => item.permissionEndpoints.length !== 0
              ),
              'permissionEndpoints'
            ).length > 0
          ) {
            /*Format services with issues in english */
            // const formatter = new Intl.ListFormat('en', {
            //   style: 'long',
            //   type: 'conjunction',
            // })
            /*Show error notification*/
            // Notification(
            //   {
            //     eventType: 'Validation Error',
            //     title: 'Duplcate Services',
            //     titleBackground: 'red',
            //     body: `You cannot select the same service more than once ${formatter.format(
            //       ArrayHelper.ArrayObjectDuplicateAttribute(
            //         SubmissionArray,
            //         'objectType'
            //       )
            //     )}`,
            //   },
            //   { autoClose: 8000 }
            // )
          } else {
            /*Execute mutation*/
            assignPermissionsToRole({
              variables: {
                permission: SubmissionArray.filter(
                  (item) => item.permissionEndpoints.length !== 0
                ),
              },
            })
              .then(() => {
                Logger('modify role permission')
                history.goBack()
              })
              .catch((error) => {
                console.log(error)
              })
          }
        }}
      >
        {(props) => (
          <Form>
            <FieldArray
              name="services"
              render={(arrayHelpers) => (
                <>
                  <div
                    css={`
                      height: calc(100vh - 210px);
                      overflow: auto;
                    `}
                  >
                    {props.values.services &&
                    props.values.services.length > 0 ? (
                      props.values.services.map((service, index) => (
                        <div key={`ass${index}`}>
                          {setIndex(index)}
                          <CollapsibleComponent
                            outerIndex={index}
                            setPerms={setPerms}
                            setAction={setAction}
                            Perms={Perms}
                            setResources={setResources}
                            {...props}
                            remove={() => {
                              arrayHelpers.remove(index)
                              setPerms((state) => {
                                const Permissionlist =
                                  state.Permissionlist.filter(
                                    (item, j) => index !== j
                                  )
                                return {
                                  Permissionlist,
                                }
                              })
                              setAction((state) => {
                                const Actions = state.Actions.filter(
                                  (item, j) =>
                                    index !== parseInt(item.split('/')[1])
                                )
                                return {
                                  Actions,
                                }
                              })
                              setResources((state) => {
                                const Resources = state.Resources.filter(
                                  (item, j) =>
                                    index !== parseInt(item.split('/')[1])
                                )
                                return {
                                  Resources,
                                }
                              })
                            }}
                          />
                        </div>
                      ))
                    ) : (
                      <Core.Button
                        type="button"
                        onClick={() =>
                          arrayHelpers.push(<CollapsibleComponent />)
                        }
                      >
                        {/* show this when user has removed all services from the list */}
                        Add a Service
                      </Core.Button>
                    )}

                    <div></div>
                  </div>
                  <div
                    css={`
                      display: grid;
                      grid-template-columns: 5fr 170px 170px;
                      grid-column-gap: 10px;
                      margin-top: 10px;
                      border-top: 1px solid ${Colours.border};
                      padding-top: 5px;
                    `}
                  >
                    <p />
                    <Core.Button
                      type="button"
                      bgColour={Colours.blue}
                      onClick={() => {
                        arrayHelpers.push(
                          index,
                          { service: '', action: '', resource: '' },
                          <CollapsibleComponent {...props} />
                        )
                      }}
                    >
                      Add Service
                    </Core.Button>
                    <Core.Button type="submit" bgColour={Colours.green}>
                      Save
                    </Core.Button>
                  </div>
                </>
              )}
            />
          </Form>
        )}
      </Formik>

      {/* </Can> */}
    </>
  )
}

export default ModifyPermissions
