import React from 'react'
import 'styled-components/macro'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import { SEARCH_PERSON, LIST_PERSON } from '../queries'
import { Formik } from 'formik'
import searchIcon from 'assets/searchIcon.png'
import { Core, Colours, Icons, Content, Loading, FormControl } from 'components'

export default function ({
  setMainInsureds,
  mainInsureds,
  filteredList,
  setFilteredList,
  selInsured,
  setSelInsured,
  setAddNewInsured,
}) {
  const [searchPersons, { loading: searching, error, data: searchResult }] =
    useLazyQuery(SEARCH_PERSON)
  const { loading: loadingPersons, data: PersonData } = useQuery(LIST_PERSON)

  let { listPerson: { data = [] } = {} } = PersonData ? PersonData : {}

  //Checking Search Result
  if (searchResult && searchResult.searchPersons.data.length !== 0)
    data = searchResult.searchPersons.data

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: repeat(3, max-content) 1fr 1fr;
        grid-row-gap: 10px;
        min-height: 500px;
        max-height: 600px;
        @media (max-width: 769px) {
          max-width: 650px;
        }
      `}
    >
      <Core.Text>Add Existing Accounts to this Policy</Core.Text>
      <Core.Text customSize="12px" color={Colours.blue}>
        <u
          css={`
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() => setAddNewInsured(true)}
        >
          Generate Step to create new insured and add to this Policy
        </u>
      </Core.Text>
      <Formik
        initialValues={{ query: '' }}
        onSubmit={({ query }, actions) => {
          searchPersons({ variables: { query } })
        }}
        render={(props) => (
          <div
            css={`
              display: grid;
              grid-template-columns: 1fr;
              grid-column-gap: 10px;
            `}
          >
            <FormControl.Section>
              <FormControl.InputWithImage
                bntImage={searchIcon}
                containerWidth="480px"
                name="query"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.query}
                placeholder="Search Persons....."
                action={props.handleSubmit}
              />
              {props.errors.name && <div id="query">{props.errors.query}</div>}
            </FormControl.Section>
          </div>
        )}
      />
      <div
        css={`
          height: calc(100% - 2px);
          overflow-y: auto;
          display: grid;
          grid-template-rows: max-content 1fr;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: repeat(3, 1fr) 60px;
            grid-column-gap: 10px;
            justify-items: center;
            background: #f5f6fb;
            padding: 5px 10px 5px 5px;
            border-bottom: 1px solid ${Colours.border};
          `}
        >
          <Core.Text weight="600">Name</Core.Text>
          <Core.Text weight="600">Email</Core.Text>
          <Core.Text weight="600">Nationality</Core.Text>
          <Core.Text weight="600">Action</Core.Text>
        </div>
        <div
          css={`
            height: 100%;
            overflow-y: auto;
          `}
        >
          {(searching || loadingPersons) && <Loading small />}
          {error && (
            <Content.Alert type="error" message={'Failed to populate list'} />
          )}
          {data.map(
            (
              {
                firstName,
                lastName,
                companyName,
                gender,
                email,
                taxIdNumber,
                nationality,
                id,
                dlDateIssued,
                dlExpirationDate,
                isMain,
              },
              index
            ) => {
              if (filteredList.ids.indexOf(id) === -1)
                return (
                  <div
                    key={index}
                    css={`
                      display: grid;
                      grid-template-columns: repeat(3, 1fr) 60px;
                      grid-column-gap: 10px;
                      justify-items: center;
                      padding: 5px;
                      margin-right: 5px;
                      align-items: center;
                      border-bottom: 1px solid ${Colours.border};
                    `}
                  >
                    {gender ? (
                      <Core.Text Contained customSize="12px">
                        {`${firstName || '-'} ${lastName || '-'} `}{' '}
                      </Core.Text>
                    ) : (
                      <Core.Text Contained customSize="12px">
                        {companyName || '-'}
                      </Core.Text>
                    )}
                    <section
                      css={`
                        max-width: 180px;
                      `}
                    >
                      <Core.Text Contained customSize="12px">
                        {email || '-'}
                      </Core.Text>
                    </section>

                    <Core.Text Contained customSize="12px">
                      {nationality || '-'}
                    </Core.Text>
                    <Core.Button
                      selfContained
                      style={{ padding: '3px 5px' }}
                      onClick={() => {
                        setSelInsured((state) => {
                          const list = state.list.concat({
                            id,
                            email,
                            firstName,
                            lastName,
                            gender,
                            companyName,
                            taxIdNumber,
                            nationality,
                            dlDateIssued,
                            dlExpirationDate,
                            isMain,
                          })
                          return {
                            list,
                          }
                        })
                        setFilteredList((state) => {
                          const ids = state.ids.concat(id)
                          return {
                            ids,
                          }
                        })
                      }}
                    >
                      <Icons.AddRounded style={{ fontSize: '15px' }} />
                    </Core.Button>
                  </div>
                )
              return null
            }
          )}
        </div>
      </div>

      <div
        css={`
          height: 100%;
          overflow-y: auto;
          display: grid;
          grid-template-rows: max-content 1fr;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr 1fr 80px 60px;
            grid-column-gap: 10px;
            justify-items: center;
            background: ${Colours.menuHover};
            padding: 5px 10px 5px 5px;
            border-bottom: 1px solid ${Colours.border};
          `}
        >
          <Core.Text weight="600">Name</Core.Text>
          <Core.Text weight="600">Email</Core.Text>
          <Core.Text weight="600">Main</Core.Text>
          <Core.Text weight="600">Action</Core.Text>
        </div>
        <div
          css={`
            height: 100%;
            overflow-y: auto;
          `}
        >
          {selInsured ? (
            selInsured.list.map(
              (
                { firstName, lastName, companyName, gender, email, id },
                index
              ) => {
                return (
                  <div
                    key={index}
                    css={`
                      display: grid;
                      grid-template-columns: 1fr 1fr 80px 60px;
                      grid-column-gap: 10px;
                      justify-items: center;
                      padding: 5px;
                      margin-right: 5px;
                      align-items: center;
                      border-bottom: 1px solid ${Colours.border};
                    `}
                  >
                    <Core.Text Contained customSize="12px">
                      {gender
                        ? `${firstName || '-'} ${lastName || '-'}`
                        : companyName}
                    </Core.Text>
                    <section
                      css={`
                        max-width: 180px;
                      `}
                    >
                      <Core.Text Contained customSize="12px">
                        {email || '-'}
                      </Core.Text>
                    </section>

                    <FormControl.Checkbox
                      startwithoff={
                        mainInsureds.ids.indexOf(id) === -1 ? false : true
                      }
                      onChange={(event) => {
                        event.persist()
                        if (event.target.checked) {
                          setMainInsureds((state) => {
                            const ids = state.ids.concat(id)
                            return {
                              ids,
                            }
                          })
                        } else {
                          setMainInsureds((state) => {
                            let index = state.ids.indexOf(id)
                            const ids = state.ids.filter(
                              (item, innerIndex) => index !== innerIndex
                            )
                            return {
                              ids,
                            }
                          })
                        }
                      }}
                    />
                    <section
                      css={`
                        &:hover {
                          cursor: pointer;
                        }
                      `}
                      onClick={() => {
                        setSelInsured((state) => {
                          const list = state.list.filter(
                            (item, j) => index !== j
                          )
                          return {
                            list,
                          }
                        })
                        setMainInsureds((state) => {
                          let index = state.ids.indexOf(id)
                          const ids = state.ids.filter(
                            (item, innerIndex) => index !== innerIndex
                          )
                          return {
                            ids,
                          }
                        })
                        setFilteredList((state) => {
                          let index = state.ids.indexOf(id)
                          const ids = state.ids.filter(
                            (item, innerIndex) => index !== innerIndex
                          )
                          return {
                            ids,
                          }
                        })
                      }}
                    >
                      <Icons.DeleteRounded style={{ color: 'red' }} />
                    </section>
                  </div>
                )
              }
            )
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
