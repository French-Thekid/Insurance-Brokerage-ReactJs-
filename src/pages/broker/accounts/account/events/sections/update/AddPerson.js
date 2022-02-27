import React, { useState, useEffect } from 'react'
import { Colours, Core, Content, Icons, FormControl } from 'components'
import search from 'assets/searchIcon.png'
import 'styled-components/macro'
import UsersPlaceholder from 'assets/user.png'
// import { useLazyQuery } from '@apollo/react-hooks'
// import { SEARCH_USERS } from '../queries'

function AdAccounts({
  AccountData,
  blackList = [],
  personsId,
  update = false,
  setPersonsId,
}) {
  const [query, setQuery] = useState('')
  //   const [query, setQuery] = useState('')
  //   const [searchPersons, { loading, data }] = useLazyQuery(SEARCH_PERSONS)

  //   if (data && data.searchPersons.data.length !== 0)
  //     AccountData = data.searchPersons.data

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
        <Core.Text weight="600">Invite Persons</Core.Text>

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
        {AccountData.map((account, index) => {
          //   let accountDetails = {}
          //   if (data && data.searchPersons.data.length !== 0) {
          //     const {
          //       firstName,
          //       id,
          //       companyName,
          //       email,
          //       avatar,
          //       lastName,
          //     } = account
          //     accountDetails = {
          //       firstName,
          //       id,
          //       companyName,
          //       email,
          //       avatar,
          //       lastName,
          //     }
          //   } else
          //   {
          const { firstName, id, companyName, email, avatar, lastName } =
            account
          //   accountDetails = {
          //     firstName,
          //     id,
          //     companyName,
          //     email,
          //     avatar,
          //     lastName,
          //   }
          //   }
          //   const {
          //     firstName,
          //     id,
          //     companyName,
          //     email,
          //     avatar,
          //     lastName,
          //   } = accountDetails
          if (blackList.indexOf(id) === -1) {
            return (
              <div key={index}>
                <AccountCard
                  selected={
                    personsId.personIDs.indexOf(id) !== -1 ? true : false
                  }
                  id={id}
                  image={avatar}
                  email={email}
                  personsId={personsId}
                  companyName={companyName}
                  firstName={firstName}
                  lastName={lastName}
                  setPersonsId={setPersonsId}
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

export default AdAccounts

function AccountCard({
  selected,
  checked,
  image = UsersPlaceholder,
  firstName,
  lastName,
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
        border: 1px solid ${source ? Colours.green : Colours.border};
        height: calc(60px - 20px);
        border-radius: 5px;
        margin: 10px;
        min-width: 100px;
        width: 190px;
        display: grid;
        grid-template-columns: 35px 85px auto;
        grid-column-gap: 20px;
        /* @media (min-width: 1023px) {
          grid-template-columns: 35px 160px 25px;
          width: 245px;
          grid-column-gap: 15px;
          margin: 5px;
        } */
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
        src={image && image[0] !== 'a' ? image : UsersPlaceholder}
        height="35px"
        width="35px"
        alt="person"
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
