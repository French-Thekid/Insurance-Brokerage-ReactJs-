import React, { useState, useEffect } from 'react'
import { Colours, Core, FormControl, ImageWithStatus, Icons } from 'components'
import 'styled-components/macro'
import UsersPlaceholder from 'assets/user.png'
import search from 'assets/searchIcon.png'
// import { useLazyQuery } from '@apollo/react-hooks'
// import { SEARCH_USERS } from '../queries'

function AddUsers({ data, blackList = [], usersId, state, setUsersId }) {
  const [query, setQuery] = useState('')
  //   const [searchUsers, { loading, data: userData }] = useLazyQuery(SEARCH_USERS)

  //   if (userData && userData.searchUsers.data.length !== 0)
  //     data = userData.searchUsers.data

  return (
    <div
      css={`
        height: calc(100% - 2px);
        overflow-y: auto;
        display: grid;
        grid-template-rows: 40px 1fr;
        border: 1px solid ${Colours.border};
        border-radius: 5px;
      `}
    >
      <div
        css={`
          background: ${Colours.menuHover};
          border-bottom: 1px solid ${Colours.border};
          display: grid;
          grid-template-columns: max-content 1fr;
          grid-column-gap: 10px;
          align-items: center;
          padding: 0px 10px;
        `}
      >
        <Core.Text weight="600">Invite Users</Core.Text>

        <FormControl.InputWithImage
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Name, Emails"
          bntImage={search}
          //   action={() => searchUsers({ variables: { query } })}
        />
      </div>

      <div
        css={`
          height: 100%;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          overflow-y: auto;
        `}
      >
        {data.map((user, index) => {
          const { firstName, id, enabled, email, avatar, lastName } = user
          if (blackList.indexOf(id) === -1) {
            return (
              <div key={index}>
                <UserCard
                  state={state}
                  selected={usersId.userIDs.indexOf(id) !== -1 ? true : false}
                  id={id}
                  enabled={enabled}
                  image={avatar}
                  email={email}
                  firstName={firstName}
                  lastName={lastName}
                  usersId={usersId}
                  setUsersId={setUsersId}
                />
              </div>
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default AddUsers

function UserCard({
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
  state,
}) {
  const [source, setSource] = useState(
    selected && usersId.userIDs.indexOf(id) !== -1 ? true : false
  )
  /* eslint-disable */
  //This was used because the lifecycle below was design for a specific behavior, adding other dependecies would defy the logic
  useEffect(() => {
    setSource(selected && usersId.userIDs.indexOf(id) !== -1 ? true : false)
  })

  const data = { checkUserAvailability: { available: 1 } }

  return (
    <div
      css={`
        border: 1px solid ${source ? Colours.green : Colours.border};
        height: calc(60px - 20px);
        border-radius: 5px;
        margin: 10px;
        min-width: 100px;
        width: 190px;
        display: grid;
        grid-template-columns: 35px 100px auto;
        grid-column-gap: 10px;
        /* @media (min-width: 1023px) {
          grid-template-columns: 35px 160px 25px;
          width: 245px;
          grid-column-gap: 15px;
          margin: 5px;
        } */
        align-items: center;
        padding: 10px;
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
        active={enabled}
        firstName={firstName}
        lastName={lastName}
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
        <div
          css={`
            display: grid;
            grid-template-rows: max-content max-content;
          `}
        >
          <Icons.AddRounded style={{ fontSize: '20px', color: Colours.blue }} />
          <Core.Text
            color={
              data && data.checkUserAvailability.available === 0
                ? Colours.red
                : Colours.blue
            }
            customSize="10px"
          >
            {data && data.checkUserAvailability.available === 0
              ? 'Busy'
              : 'Ready'}
          </Core.Text>
        </div>
      </div>
    </div>
  )
}
