import React, { useState, useEffect } from 'react'
import { Colours, Core, FormControl, Content, Icons } from 'components'
import 'styled-components/macro'
import search from 'assets/searchIcon.png'
// import { useLazyQuery } from '@apollo/react-hooks'
// import { SEARCH_USERS } from '../queries'

export default function Accounts({ AccountData, personsId, setPersonsId }) {
  const [query, setQuery] = useState('')
  //   const [searchUsers, { loading, data: userData }] = useLazyQuery(SEARCH_USERS)

  //   if (userData && userData.searchUsers.data.length !== 0)
  //     data = userData.searchUsers.data

  const data = { searchPersons: { data: [] } }

  if (data && data.searchPersons.data.length !== 0)
    AccountData = data.searchPersons.data

  return (
    <div
      id="Users Section"
      css={`
        width: 100%;
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
        {AccountData.map((account, index) => {
          let accountDetails = {}
          if (data && data.searchPersons.data.length !== 0) {
            const {
              firstName,
              id,
              companyName,
              email,
              gender,
              avatar,
              lastName,
            } = account
            accountDetails = {
              firstName,
              id,
              companyName,
              email,
              gender,
              avatar,
              lastName,
            }
          } else {
            const {
              firstName,
              gender,
              id,
              companyName,
              email,
              avatar,
              lastName,
            } = account
            accountDetails = {
              firstName,
              id,
              companyName,
              gender,
              email,
              avatar,
              lastName,
            }
          }
          const {
            firstName,
            id,
            companyName,
            email,
            avatar,
            lastName,
            gender,
          } = accountDetails
          return (
            <AccountCard
              key={index}
              selected={personsId.personIDs.indexOf(id) !== -1 ? true : false}
              id={id}
              image={avatar}
              email={email}
              gender={gender}
              personsId={personsId}
              companyName={companyName}
              firstName={firstName}
              lastName={lastName}
              setPersonsId={setPersonsId}
            />
          )
        })}
      </div>
    </div>
  )
}

function AccountCard({
  selected,
  checked,
  image,
  firstName,
  lastName,
  gender,
  email,
  companyName,
  personsId,
  setPersonsId,
  id,
}) {
  const [source, setSource] = useState(
    selected && personsId.personIDs.indexOf(id) !== -1 ? true : false
  )
  /* eslint-disable */
  //This was used because the lifecycle below was design for a specific behavior, adding other dependecies would defy the logic
  useEffect(() => {
    setSource(selected && personsId.personIDs.indexOf(id) !== -1 ? true : false)
  })

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
          setPersonsId((state) => {
            const personIDs = state.personIDs.concat(id)
            return {
              personIDs,
            }
          })
        } else {
          setSource(false)
          //Removing Person IDs
          setPersonsId((state) => {
            let index = state.personIDs.indexOf(id)
            const personIDs = state.personIDs.filter((item, j) => index !== j)
            return {
              personIDs,
            }
          })
        }
      }}
    >
      <Content.Avatar
        src={image}
        height="35px"
        width="35px"
        alt="person"
        firstName={gender ? firstName : companyName}
        lastName={gender ? lastName : companyName.split('')[1]}
      />

      <section>
        <Core.Text weight="650" size="sm" Contained>
          {companyName ? companyName : `${firstName} ${lastName}`}
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
