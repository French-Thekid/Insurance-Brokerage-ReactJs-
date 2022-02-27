import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import CollapsibleContainer from './CollapsibleContainer'
import { Core, Loading, Layout } from 'components'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { LIST_PERMISSION } from '../forms/queries'
import { REVOKE_PERMISSION } from '../forms/mutations'
import { useMutation } from '@apollo/react-hooks'
import { ColourContext } from 'context'

import DeletePermissions from './forms/DeletePermissions'

const queryString = require('query-string')

function PermissionsDisplay({ data }) {
  const { Colours } = useContext(ColourContext)
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)

  const {
    params: { roleID: roleId },
  } = useRouteMatch()

  let finalArray = []
  const [containData, setContainData] = useState(true)
  const [FinalArray, setFinalArray] = useState([])
  const [Resources, setResources] = useState({ Resources: [] })

  // Removing Permissions
  const [revokePermissionsFromRole, { loading: revokingPermission }] =
    useMutation(REVOKE_PERMISSION, {
      refetchQueries: () => [
        {
          query: LIST_PERMISSION,
          variables: { roleId: parseInt(roleId) },
        },
      ],
    })

  if (data.length === 0) {
    return (
      <>
        <h1
          css={`
            text-align: center;
            color: ${Colours.text};
          `}
        >
          There are no permissions set
        </h1>
        <Layout.Flex justify="center">
          <Core.Button
            style={{ marginTop: '20px', width: '170px' }}
            bgColour={Colours.blue}
            onClick={() =>
              history.push(`/broker/roles/modify-permissions/${roleId}`)
            }
          >
            Get Started
          </Core.Button>
        </Layout.Flex>
      </>
    )
  } else
    return (
      <div>
        {revokingPermission && <Loading small />}
        {data.map((object, index) => (
          <div
            css={`
              margin-bottom: 10px;
            `}
          >
            <CollapsibleContainer
              key={index}
              mainTitleSize="20px"
              title={object.objectType}
              displayType="none"
              id={object.objectType}
              main={() => {
                const submissionArray = [
                  {
                    roleId: parseInt(roleId),
                    permissionEndpoints: object.data.map((endPoint) => {
                      return endPoint.endpoint
                    }),
                    objectType: object.objectType,
                    objectIds: object.data
                      .map((ObjectId) => {
                        return ObjectId.objectIds.map((id) => id)
                      })
                      .flat(1),
                  },
                ]
                revokePermissionsFromRole({
                  variables: { permissions: submissionArray },
                }).catch((e) => console.log(e))
              }}
            >
              {object.data.map((action, outerIndex) => {
                return (
                  <div
                    css={`
                      margin-bottom: 10px;
                    `}
                  >
                    <CollapsibleContainer
                      displayType="none"
                      key={outerIndex}
                      flow="none"
                      title={`${action.endpoint.split(':')[1]} ${
                        action.endpoint.split(':')[0]
                      }`}
                      main={() => {
                        const submissionArray = [
                          {
                            roleId: parseInt(roleId),
                            permissionEndpoints: action.endpoint,
                            objectType: object.objectType,
                            objectIds: action.objectIds,
                          },
                        ]
                        revokePermissionsFromRole({
                          variables: { permissions: submissionArray },
                        })
                      }}
                    >
                      <div
                        css={`
                          display: grid;
                          grid-template-columns: repeat(8, auto);
                          grid-column-gap: 15px;
                          grid-row-gap: 10px;
                          align-items: center;
                          font-size: 12px;
                        `}
                      >
                        {action.objectIds.map((resource, index) => {
                          return (
                            <section
                              key={index}
                              css={`
                                display: grid;
                                grid-template-columns: max-content max-content;
                                grid-column-gap: 10px;
                                grid-auto-rows: max-content;
                                align-items: center;
                              `}
                            >
                              <input
                                type="checkbox"
                                style={{ margin: '0px' }}
                                id={`${action.endpoint}/${resource}/${object.objectType}`}
                                onChange={(event) => {
                                  event.persist()
                                  if (event.target.checked === true) {
                                    setResources((state) => {
                                      const Resources = state.Resources.concat(
                                        `${action.endpoint}/${resource}/${object.objectType}`
                                      )
                                      if (Resources.length !== 0)
                                        setContainData(false)
                                      else setContainData(true)
                                      return {
                                        Resources,
                                      }
                                    })
                                  } else {
                                    setResources((state) => {
                                      const Resources = state.Resources.filter(
                                        (item) => item !== event.target.id
                                      )
                                      if (Resources.length !== 0)
                                        setContainData(false)
                                      else setContainData(true)
                                      return {
                                        Resources,
                                      }
                                    })
                                  }
                                }}
                              />
                              <label
                                css={`
                                  color: ${Colours.text};
                                `}
                              >
                                {resource === '*'
                                  ? 'All Future Resources'
                                  : resource}
                              </label>
                            </section>
                          )
                        })}
                      </div>
                    </CollapsibleContainer>{' '}
                  </div>
                )
              })}
            </CollapsibleContainer>
          </div>
        ))}
        <Core.Button
          disabled={containData}
          style={{
            width: '200px',
            margin: '0px',
            marginTop: '10px',
            float: 'right',
          }}
          bgColour={Colours.red}
          onClick={(event) => {
            setContainData(true)
            event.persist()
            const resourcePair = []
            Resources.Resources.map((resource) => {
              const endpoint = resource.split('/')[0]
              const resources = resource.split('/')[1]
              const objectType = resource.split('/')[2]
              return resourcePair.push({ endpoint, resources, objectType })
            })
            const provissionedArray = []
            for (let count = 0; count < resourcePair.length; count++) {
              let mark = resourcePair[count].endpoint
              provissionedArray.push({
                permissionEndpoints: mark,
                objectType: resourcePair[count].objectType,
                objectIds: resourcePair
                  .map((endpoints) => {
                    if (endpoints.endpoint === mark) return endpoints.resources
                    return null
                  })
                  .filter((endpoint) => endpoint !== null),
              })
            }
            let obj = {}
            for (let i = 0, len = provissionedArray.length; i < len; i++) {
              if (!obj[provissionedArray[i]['permissionEndpoints']])
                obj[provissionedArray[i]['permissionEndpoints']] =
                  provissionedArray[i]
            }
            var submissionArray = []
            for (var key in obj) submissionArray.push(obj[key])
            submissionArray.map((keys) => {
              return finalArray.push({
                roleId: parseInt(roleId),
                permissionEndpoints: keys.permissionEndpoints,
                objectType: keys.objectType,
                objectIds: keys.objectIds,
              })
            })

            if (finalArray) {
              setFinalArray(finalArray)
              history.push(`?action=removePermissions`)
            }
          }}
        >
          Remove Selected Resources
        </Core.Button>
        <DeletePermissions
          roleId={roleId}
          finalArray={FinalArray}
          setContainData={setContainData}
          isShowing={action === 'removePermissions'}
          close={() => history.goBack()}
        />
      </div>
    )
}

export default PermissionsDisplay
