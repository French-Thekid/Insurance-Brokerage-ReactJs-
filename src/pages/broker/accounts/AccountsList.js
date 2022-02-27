import React, { useState } from 'react'
import AccountsTable from './table'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Layout, Content, Loading, POPUP, MenuNavigation } from 'components'
import {
  CreateAccount,
  CreateIndividualAccount,
  CreateCompanyAccount,
} from './modals'
import { LIST_ACCOUNTS } from './queries'
import 'styled-components/macro'

const queryString = require('query-string')

function AccountsList() {
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const [filter, setFilter] = useState('All Accounts')
  const [completedCreate, setcompletedCreate] = useState(false)

  //TODO rbac to prevent network request
  const { loading, error, data: accountData } = useQuery(LIST_ACCOUNTS)
  if (loading) return <Loading small />

  if (error)
    return <Content.Alert type="error" message={'Failed to load Accounts'} />

  //PopUps
  const showNotificationCreate = () => {
    setcompletedCreate(true)
    setTimeout(() => {
      setcompletedCreate(false)
    }, 6000)
  }

  //Filtering Data for respective filter
  let filteredList = accountData.listAccount.data || []
  filteredList = accountData.listAccount.data
    .map((account, index) => {
      const { type } = account || {}
      if (filter === 'All Accounts') {
        return account
      }
      if (filter === 'Individual Accounts') {
        if (type === 'individual') return account
        else return null
      }
      if (filter === 'Company Accounts') {
        if (type === 'company') return account
        else return null
      }
    })
    .filter((item, index) => item !== null)

  return (
    <Layout.Container>
      <div
        css={`
          height: 100%;
          display: grid;
          grid-template-rows: max-content 1fr;
          grid-gap: 20px;
        `}
      >
        <MenuNavigation.Container>
          <MenuNavigation.MainItem
            handler={setFilter}
            active={filter === 'All Accounts'}
          >
            All Accounts
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            handler={setFilter}
            active={filter === 'Individual Accounts'}
          >
            Individual Accounts
          </MenuNavigation.MainItem>
          <MenuNavigation.MainItem
            handler={setFilter}
            active={filter === 'Company Accounts'}
          >
            Company Accounts
          </MenuNavigation.MainItem>
        </MenuNavigation.Container>

        <POPUP
          setcompleted={setcompletedCreate}
          message="New Account successfully Created."
          notification={completedCreate}
        />
        <AccountsTable Accounts={{ data: filteredList }} />
        <CreateAccount isShowing={action === 'createAccount'} />
        <CreateIndividualAccount
          isShowing={action === 'createIndividualAccount'}
          showNotificationCreate={showNotificationCreate}
        />
        <CreateCompanyAccount
          isShowing={action === 'createCompanyAccount'}
          showNotificationCreate={showNotificationCreate}
        />
      </div>
    </Layout.Container>
  )
}

export default AccountsList
