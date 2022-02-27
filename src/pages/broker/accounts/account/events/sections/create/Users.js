import React, { useState, useEffect } from 'react'
import { Colours, Core, FormControl, ImageWithStatus, Icons } from 'components'
import 'styled-components/macro'
import search from 'assets/searchIcon.png'
// import { useLazyQuery } from '@apollo/react-hooks'
// import { SEARCH_USERS } from '../queries'

function Users({ data, usersId, state, setUsersId }) {
  const [query, setQuery] = useState('')
  //   const [searchUsers, { loading, data: userData }] = useLazyQuery(SEARCH_USERS)

  //   if (userData && userData.searchUsers.data.length !== 0)
  //     data = userData.searchUsers.data

  return (
    <div
      id="Users Section"
      css={`
        padding-top: '20px';
        height: 426px;
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-row-gap: 10px;
        margin-top: 10px;
      `}
    >
      <div>
        <FormControl.InputWithImage
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email"
          bntImage={search}
          //   action={() => searchUsers({ variables: { query } })}
        />
      </div>
      <div
        css={`
          height: calc(100% - 5px);
          width: 100%;
          max-width: 650px;
          overflow-y: auto;
          display: grid;
          grid-template-columns: 1fr max-content;
          grid-row-gap: 20px;
          justify-items: space-between;
          grid-auto-rows: 50px;
          padding-top: 5px;
        `}
      >
        {data.map((user, index) => {
          const { firstName, id, enabled, email, avatar, lastName } = user
          return (
            <UserCard
              state={state}
              key={index}
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
          )
        })}
      </div>
    </div>
  )
}

export default Users

function UserCard({
  selected,
  checked,
  enabled,
  image,
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
        flex: 1;
        border: 1px solid ${source ? Colours.green : Colours.border};
        height: max-content;
        border-radius: 5px;
        min-width: 280px;
        width: 145px;
        display: grid;
        grid-template-columns: 35px 190px 20px;
        grid-column-gap: 20px;
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
        alt="Broker"
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
              : 'Free'}
          </Core.Text>
        </div>
      </div>
    </div>
  )
}
