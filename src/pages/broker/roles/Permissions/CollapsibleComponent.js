import React, { useState, useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import 'styled-components/macro'
import CollapsibleContainer from './CollapsibleContainer'
import { LIST_PERMISSIONS, LIST_RESOURCES } from '../forms/queries'
import { ColourContext } from 'context'
// import '../resources/css/input.css'
// import info from 'images/info.png'
import { Loading, Content, Icons } from 'components'

function CollapsibleComponent(props) {
  const { outerIndex, setPerms, setResources, Perms, setAction } = props
  const { Colours } = useContext(ColourContext)

  const [title, setTitle] = useState('Select Item')
  const [allSelected, setAllSelected] = useState(false)
  const array = []
  const array1 = []

  // Getting Objects/Resources
  const { data: ResourcesList } = useQuery(LIST_RESOURCES, {
    variables: { type: title },
  })
  // Getting Permissions
  const {
    loading: isPermissionsLoading,
    error: PermissionErrors,
    data: PermissionList,
  } = useQuery(LIST_PERMISSIONS)
  if (isPermissionsLoading) return <Loading small />
  if (PermissionErrors)
    return <Content.Alert type="error" message={'Fail to load permissions'} />

  PermissionList.listPermissions.map((permission, index) => {
    array1.push({
      service: permission.objectType,
      actions: permission.name,
      description: permission.description,
      endpoint: permission.endpoint,
    })
    return array.push(permission.objectType)
  })

  const Services = array.filter((item, index) => {
    return array.indexOf(item) === index
  })

  return (
    <CollapsibleContainer
      {...props.remove}
      main={() => props.remove()}
      title={title}
      mainTitleSize="20px"
      outer
    >
      <CollapsibleContainer title="Services">
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            @media (max-width: 769px) {
              grid-template-columns: repeat(6, auto);
            }
            grid-column-gap: 15px;
            grid-row-gap: 10px;
          `}
        >
          {Services.map((service, index) => {
            return (
              <section
                css={`
                  display: grid;
                  grid-template-columns: auto 1fr;
                  grid-column-gap: 3px;
                  align-items: center;
                `}
                key={index}
              >
                <input
                  type="radio"
                  name={`service${outerIndex}`}
                  onChange={() => {
                    setTitle(service)
                    setPerms((state) => {
                      let found = 0
                      let Permissionlist = state.Permissionlist
                      if (state.Permissionlist.length === 0) {
                        //Add first service
                        Permissionlist = state.Permissionlist.concat(
                          `${service}/${outerIndex}`
                        )
                        return {
                          Permissionlist,
                        }
                      } else {
                        for (let i = 0; i < state.Permissionlist.length; i++) {
                          if (
                            parseInt(state.Permissionlist[i].split('/')[1]) ===
                            outerIndex
                          ) {
                            //Already Exist
                            found = 1
                          }
                        }
                        if (found === 0) {
                          Permissionlist = state.Permissionlist.concat(
                            `${service}/${outerIndex}`
                          )
                          found = 0
                        } else {
                          state.Permissionlist[
                            outerIndex
                          ] = `${service}/${outerIndex}`
                        }
                        return {
                          Permissionlist,
                        }
                      }
                    })
                    // services[outerIndex].service = service
                  }}
                />
                <label
                  css={`
                    color: ${Colours.text};
                  `}
                >
                  {service}
                </label>
              </section>
            )
          })}
        </div>
      </CollapsibleContainer>
      <CollapsibleContainer flow="none" title="Actions">
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(6, auto);
            @media (max-width: 769px) {
              grid-template-columns: repeat(3, auto);
            }
            @media (max-width: 1025px) {
              @media (max-height: 769px) {
                grid-template-columns: repeat(4, auto);
              }
            }
            grid-column-gap: 15px;
            grid-row-gap: 10px;
            align-items: center;
          `}
        >
          {array1.map((action, index) => {
            if (action.service === title) {
              return (
                <section
                  key={index}
                  css={`
                    display: grid;
                    grid-template-columns: max-content max-content 20px;
                    grid-column-gap: 10px;
                    align-items: center;
                  `}
                >
                  <input
                    type="checkbox"
                    style={{ margin: '0px' }}
                    id={`actions${index}`}
                    onChange={(event) => {
                      if (event.target.checked === true) {
                        setAction((state) => {
                          const Actions = state.Actions.concat(
                            `${action.endpoint}/${outerIndex}`
                          )
                          return {
                            Actions,
                          }
                        })
                      } else {
                        setAction((state) => {
                          const Actions = state.Actions.filter(
                            (item, j) => index !== j
                          )
                          return {
                            Actions,
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
                    {action.actions}
                  </label>
                  <section
                    data-balloon-length="small"
                    aria-label={action.description}
                    data-balloon-pos="left"
                  >
                    <Icons.HelpRoundedIcon style={{ color: '#CDCDCD' }} />
                  </section>
                </section>
              )
            }
            return null
          })}
        </div>
      </CollapsibleContainer>
      <CollapsibleContainer title="Resources">
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(8, auto);
            @media (max-width: 769px) {
              grid-template-columns: repeat(3, auto);
            }
            @media (max-width: 1025px) {
              @media (max-height: 769px) {
                grid-template-columns: repeat(3, auto);
              }
            }
            grid-column-gap: 15px;
            grid-row-gap: 10px;
            align-items: center;
          `}
        >
          <section
            css={`
              display: grid;
              grid-template-columns: max-content max-content 20px;
              grid-column-gap: 10px;
              align-items: center;
            `}
          >
            <input
              type="checkbox"
              style={{
                margin: '0px',
                visibility:
                  Perms.Permissionlist.length > 0 ? 'visible' : 'hidden',
              }}
              id={`*`}
              onChange={(event) => {
                if (event.target.checked === true) {
                  setAllSelected(true)
                  setResources((state) => {
                    const Resources = state.Resources.concat(`*/${outerIndex}`)
                    return {
                      Resources,
                    }
                  })
                } else {
                  setAllSelected(false)
                  setResources((state) => {
                    const Resources = state.Resources.filter(
                      (item, j) => item.split('/')[0] !== '*'
                    )
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
                visibility: ${Perms.Permissionlist.length > 0
                  ? 'visible'
                  : 'hidden'};
              `}
            >
              All Resources
            </label>
          </section>
          {ResourcesList &&
            ResourcesList.listObjectsForType.map((resource, index) => {
              return (
                <section
                  key={index}
                  css={`
                    display: grid;
                    grid-template-columns: max-content max-content 20px;
                    grid-column-gap: 10px;
                    align-items: center;
                  `}
                >
                  <input
                    type="checkbox"
                    disabled={allSelected}
                    style={{ margin: '0px' }}
                    id={`actions${index}`}
                    onChange={(event) => {
                      if (event.target.checked === true) {
                        setResources((state) => {
                          const Resources = state.Resources.concat(
                            `${resource.id}/${outerIndex}`
                          )
                          return {
                            Resources,
                          }
                        })
                      } else {
                        setResources((state) => {
                          const Resources = state.Resources.filter(
                            (item, j) => index !== j
                          )
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
                    {resource.id}
                  </label>
                </section>
              )
            })}
        </div>
      </CollapsibleContainer>
    </CollapsibleContainer>
  )
}

export default CollapsibleComponent
