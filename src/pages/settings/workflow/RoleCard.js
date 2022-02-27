import React, { useState, useEffect } from 'react'
import { Colours, Core, Icons } from 'components'
import 'styled-components/macro'

export default function RoleCard({
  selected,
  checked,
  name,
  description,
  setRolesId,
  rolesId,
  id,
  small,
}) {
  const [source, setSource] = useState(
    selected && rolesId.roleIDs.indexOf(id) !== -1 ? true : false
  )
  /* eslint-disable */
  //This was used because the lifecycle below was design for a specific behavior, adding other dependecies would defy the logic
  useEffect(() => {
    setSource(selected && rolesId.roleIDs.indexOf(id) !== -1 ? true : false)
  })

  return (
    <div
      css={`
        /* flex: 1; */
        border: 1px solid ${source ? Colours.green : Colours.border};
        height: calc(60px - 20px);
        border-radius: 5px;
        margin: 10px;
        min-width: max-content;
        display: grid;
        grid-template-columns: ${small ? '100px 25px' : '140px 25px'};
        grid-column-gap: 15px;
        @media (min-width: 1023px) {
          grid-template-columns: ${small ? '100px 25px' : '140px 25px'};
          width: max-content;
          grid-column-gap: 15px;
          margin: 5px;
        }
        align-items: center;
        padding: 10px;
        margin-bottom: 10px;
        &:hover {
          cursor: pointer;
          box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
            0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
          border: 0.1px solid ${Colours.blue};
        }
        transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
        transition-duration: 0.3s;
      `}
      onClick={() => {
        if (source === false && !checked) {
          setSource(true)
          //Adding Person IDs
          setRolesId((state) => {
            const roleIDs = state.roleIDs.concat(id)
            return {
              roleIDs,
            }
          })
        } else {
          setSource(false)
          //Removing Person IDs
          setRolesId((state) => {
            let index = state.roleIDs.indexOf(id)
            const roleIDs = state.roleIDs.filter((item, j) => index !== j)
            return {
              roleIDs,
            }
          })
        }
      }}
    >
      <section>
        <Core.Text weight="650" size="sm" Contained>
          {name}
        </Core.Text>
        <Core.Text size="sm" Contained>
          {description}
        </Core.Text>
      </section>
      <div
        css={`
          display: ${source ? 'visible' : 'none'};
        `}
      >
        <Icons.CheckCircleRounded style={{ color: Colours.green }} />
      </div>
      <div
        css={`
          height: 100%;
          display: ${source ? 'none' : 'visible'};
        `}
      >
        <Icons.AddRounded style={{ fontSize: '20px', color: Colours.blue }} />
      </div>
    </div>
  )
}
