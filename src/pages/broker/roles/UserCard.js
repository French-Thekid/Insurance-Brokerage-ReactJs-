import React, { useState, useContext, useEffect } from 'react'
import { Core, ImageWithStatus, Icons } from 'components'
import 'styled-components/macro'
import UsersPlaceholder from 'assets/user.png'
import { ColourContext } from 'context'

export default function UserCard({
  selected,
  checked,
  enabled,
  image = UsersPlaceholder,
  firstName,
  lastName,
  email,
  setUsersId,
  usersId,
  id,
  small,
  dataCy,
}) {
  const { Colours } = useContext(ColourContext)
  const [source, setSource] = useState(
    selected && usersId.userIDs.indexOf(id) !== -1 ? true : false
  )
  /* eslint-disable */
  //This was used because the lifecycle below was design for a specific behavior, adding other dependecies would defy the logic
  useEffect(() => {
    setSource(selected && usersId.userIDs.indexOf(id) !== -1 ? true : false)
  })

  let mode = localStorage.getItem('Theme') || ''
  return (
    <div
      data-cy={dataCy}
      css={`
        /* flex: 1; */
        border: 1px solid ${source ? Colours.green : Colours.border};
        height: calc(60px - 20px);
        border-radius: 5px;
        margin: 10px;
        min-width: max-content;
        display: grid;
        grid-template-columns: ${small ? '35px 100px 25px' : '35px 140px 25px'};
        grid-column-gap: 15px;
        @media (min-width: 1023px) {
          grid-template-columns: ${small
            ? '35px 100px 25px'
            : '35px 140px 25px'};
          width: max-content;
          grid-column-gap: 15px;
          margin: 5px;
        }
        align-items: center;
        padding: 10px;
        margin-bottom: 10px;
        box-shadow: ${mode === 'Dark'
          ? '0px 3px 2px 0px rgba(16,15,28,0.5)'
          : mode === 'Light' || mode === ''
          ? '0px 3px 2px 0px rgba(166, 166, 166, 1)'
          : 'none'};
        &:hover {
          cursor: pointer;
          box-shadow: ${mode === 'Dark'
            ? '0px 16px 20px 0px rgba(16,15,28,1)'
            : mode === 'Light' || mode === ''
            ? '0px 3px 2px 0px rgba(166, 166, 166, 1)'
            : 'none'};
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
          setUsersId((state) => {
            const userIDs = state.userIDs.concat(id)
            return {
              userIDs,
            }
          })
        } else {
          setSource(false)
          //Removing Person IDs
          setUsersId((state) => {
            let index = state.userIDs.indexOf(id)
            const userIDs = state.userIDs.filter((item, j) => index !== j)
            return {
              userIDs,
            }
          })
        }
      }}
    >
      <ImageWithStatus
        src={image}
        size="medium"
        firstName={firstName}
        lastName={lastName}
        alt="Broker"
        active={enabled}
      />

      <section>
        <Core.Text weight="650" size="sm" Contained>
          {`${firstName} ${lastName}`}
        </Core.Text>
        <Core.Text size="sm" Contained>
          {email}
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
