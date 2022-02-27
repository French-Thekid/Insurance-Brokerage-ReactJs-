import React, { useContext, useState } from 'react'
import 'styled-components/macro'
import { UserContext } from 'context'
import { useQuery } from '@apollo/react-hooks'
import {
  LIST_USERS,
  ACTIVEINACTIVE_POLICYCOUNT,
  DAILY_EVENT_COUNT,
} from './queries'
import { LIST_ACCOUNTS } from '../accounts/queries'
import { HomeContent, Colours, Loading, Content, POPUP } from 'components'
import Tasks from './tasks'
import { GreetingCard, WidgetContainer } from './Widgets'
import AccountsIcon from 'assets/users.png'
import UsersIcon from 'assets/userIcon.png'
import SlipIcon from 'assets/Slips.png'

function Home() {
  const [completedTaskCreate, setcompletedTaskCreate] = useState(false)
  const [completedTaskUpdate, setcompletedTaskUpdate] = useState(false)
  const [completedTaskDelete, setcompletedTaskDelete] = useState(false)

  let date = new Date()
  date =
    date.getUTCFullYear() +
    '-' +
    ('00' + (date.getUTCMonth() + 1)).slice(-2) +
    '-' +
    ('00' + date.getUTCDate()).slice(-2) +
    ' ' +
    ('00' + date.getUTCHours()).slice(-2) +
    ':' +
    ('00' + date.getUTCMinutes()).slice(-2) +
    ':' +
    ('00' + date.getUTCSeconds()).slice(-2)

  let user = useContext(UserContext)
  const { id: userId } = user.loggedInUser || {}
  const userType = user.userType || {}

  const {
    loading: loadingAccounts,
    error: accountError,
    data: accountData,
  } = useQuery(LIST_ACCOUNTS)
  const {
    loading: loadUsers,
    error: userErrors,
    data: userData,
  } = useQuery(LIST_USERS)
  const { data: activeInactive } = useQuery(ACTIVEINACTIVE_POLICYCOUNT)

  const { data: eventCount } = useQuery(DAILY_EVENT_COUNT, {
    variables: { userId: userId, startDate: date },
  })

  if (loadingAccounts || loadUsers) return <Loading small />
  if (userErrors)
    return <Content.Alert type="error" message={'Failed to load User Count'} />

  const { listUsers } = userData || {}
  const { total: totalUsers } = listUsers || {}

  if (accountError)
    return (
      <Content.Alert type="error" message={'Failed to load Account Count'} />
    )
  const {
    listAccount: { total: totalAccounts },
  } = accountData

  //PopUps
  const showNotificationTaskCreate = () => {
    setcompletedTaskCreate(true)
    setTimeout(() => {
      setcompletedTaskCreate(false)
    }, 6000)
  }
  const showNotificationTaskUpdating = () => {
    setcompletedTaskUpdate(true)
    setTimeout(() => {
      setcompletedTaskUpdate(false)
    }, 6000)
  }
  const showNotificationTaskDelete = () => {
    setcompletedTaskDelete(true)
    setTimeout(() => {
      setcompletedTaskDelete(false)
    }, 6000)
  }

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: 120px 1fr;
        grid-gap: 20px;
      `}
    >
      <POPUP
        setcompleted={setcompletedTaskCreate}
        message="New Task successfully Added."
        notification={completedTaskCreate}
      />
      <POPUP
        setcompleted={setcompletedTaskUpdate}
        message="Task successfully Updated."
        notification={completedTaskUpdate}
      />
      <POPUP
        setcompleted={setcompletedTaskDelete}
        message="Task successfully Deleted."
        notification={completedTaskDelete}
      />
      <div
        css={`
          height: 120px;
          border-radius: 5px;
          overflow-x: auto;
          display: flex;
          align-items: center;
          justify-items: space-between;
        `}
      >
        <GreetingCard />
        <WidgetContainer
          width="35px"
          icon={UsersIcon}
          bgColour="RGBA(8,199,86,0.1)"
          total={loadUsers ? '...' : totalUsers}
          title="Total Users"
          colour={Colours.green}
        />
        <WidgetContainer
          width="30px"
          icon={AccountsIcon}
          bgColour="RGBA(252,195,57,0.1)"
          total={loadingAccounts ? '...' : totalAccounts}
          title="Total Accounts"
          colour={Colours.yellow}
        />
        <WidgetContainer
          width="25px"
          icon={
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABR0lEQVRYR+2YwVHDQAxF33LhSDqADmiBSQqgAF+gAuiApINQAVxcRoJbSQecuYgxYxgbvLYkexknY1/9Zb2VVlprAxN7wsR4OC6gfMeWwC1wZYqk8JqtuDfZVOJohCqYB89Hv2ycUHGgPe/AhRvICdUFJGYY4TkEbgSuf2yNkRobaPNxxvZcKLxQowNlK9Yvbyy8UEmAynR5oZIBeaGSAnmg9EDCptwf9crL9zQrsUUTg8qW7afEqEABCgkUbe0iwEKEx+93/wJk6VvDgSzeFNoZqC9IwyMUqaA+x+X7fMeawFNdOwM1+lWSCGlyY9AMT5nBmUZ6gkBzlf1KvPYk1+yXNH1I49mgOcFNbVi9RuqJ0PBBMU52yJbt43nXKP3nQNSsXKXpaCGdtx9VddwBlypH/aJDNfM3/s3rZsd1HdO/4PEVk4vQJzIt0CU0e3EXAAAAAElFTkSuQmCC'
          }
          bgColour="#DEE7A2"
          total={
            activeInactive === undefined
              ? '0'
              : activeInactive.getActiveInactivePolicyCount.active
          }
          title="Active Policies"
          colour={'#A5BE00'}
        />
        <WidgetContainer
          width="25px"
          icon={
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABmUlEQVRoQ+2ZQVKDQBBF/2Coyk5vIEfITXQZWOkNvIneQFeQpZ7EHMGcQN1ZBclYxEoqZTE09DQzkBq2dM/817+hSUZh4peauH4EAN8OdnKgmC8TVUWPWmEBILEU/ZKW+b3lGsd0EmAvfhu9a+BKalMAYhA0wCx7hcKNoPjDUiIQJMAqzj6Fq39aC2sIEqCIMy1U/brvnxvWsoJwBpCWuSri7E4awilAXX1pCOcA0hBeACQhvAFIQXgFkIDwDmALwQaoX4tN88E0N0zxhzVMbycqbzQAJidGA8Cd5gFA8FuIZcJgDrDUMJICwNm2EGVt327hzg/xOdBX+Mkga/zhRBUqAHAr/j/PeQtJCafWGayFqI2l7geAMAc69pLzh5jqzY66j2EBwFQxbmVG70Bfgdx4qlXZnxJcQX3zAsA5zIEvAJd9rReK36Rl3nomRz8Dwx0x0Ywab2mV37YF0gDzZYJttPbgwjcudov0Z/VhBbD/x6yGqKIn/B2zXtOls4rYQGON2e6BEl/vQjpgJcVBcgBwUOTWLSbvwC/IuhNAOs7lzwAAAABJRU5ErkJggg=='
          }
          bgColour="#F7E8F0"
          total={
            activeInactive === undefined
              ? '0'
              : activeInactive.getActiveInactivePolicyCount.inactive
          }
          title="Inactive Policies"
          colour={'#A7055A'}
        />
        <WidgetContainer
          width="25px"
          icon={
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABgklEQVRoQ+1ZwXGDMBDckwtIOojdAWmCyQ93QlyJTSfwy5AiQgm4gtgFBGUcxhmHsSIdUlDwnL9I2ttdaWU4wsx/NPP6IQRiOzjagSwt9GXxVZ2z1vKdf8ZmgV4W7FuA73wh4Kug73wnB9ZP26XuFltAJwCWEx/YFqCG1MemfNm0JmzjGeiLV28A7icufAh3INU9mkiYCaRFqYEscvFf8ARUZZ2vr9ViJJClxfs/UP9cc1vV+YpL4EfOx3bCdM/85sBtEeDetL6OucasswNCgGmJODBUgClg8OGSQsElZS4oDjAFCz5cHBhKOlTEltvc5zY86wuNLUaFwOArBlcwcSB4zFgWlBSaWvE/T6GpCQXfQhKjEqP9JnZ+J7YdKu5fBdsWtOF5X2SzP8RCgKlA8Bhl4nsPH0FgdwDozhs5xAIa++o1v9qfuN3P632Dg5r4LugjKZ2wGxwn508k0Kmd1khAeAixG5zX0NgToYHqnke1mJyBIg8c3SeOXPc3vBCI7cQnnj1BQDdPmYQAAAAASUVORK5CYII='
          }
          bgColour="#E4E1F4"
          total={
            eventCount === undefined ? '0' : eventCount.getUserDailyEventCount
          }
          title=" Upcoming Events"
          colour={'#4F4691'}
        />
        <WidgetContainer
          width="25px"
          icon={SlipIcon}
          bgColour="RGBA(38,153,251,0.1)"
          total={'0'}
          title="Total Slips"
          colour={Colours.blue}
          last
        />
      </div>
      <div
        css={`
          border-radius: 5px;
          display: grid;
          grid-template-columns: 1fr 2fr;
          overflow-y: auto;
          @media (max-width: 769px) {
            grid-template-columns: 1fr;
          }
          grid-gap: 20px;
        `}
      >
        <div
          css={`
            border-radius: 5px;
            min-height: 400px;
            height: 100%;
          `}
        >
          <HomeContent.CustomCard title="Task Manager">
            <Tasks
              showNotificationTaskUpdating={showNotificationTaskUpdating}
              showNotificationTaskDelete={showNotificationTaskDelete}
              showNotificationTaskCreate={showNotificationTaskCreate}
            />
          </HomeContent.CustomCard>
        </div>
        <div
          css={`
            border-radius: 5px;
            max-height: 100%;
            display: flex;
            flex-direction: column;
            @media (min-width: 769px) {
              overflow-y: auto;
            }
          `}
        >
          <HomeContent.CustomCard
            title="Accounts Recently Added"
            minHeight="500px"
            maxHeight={userType === 'AdminUser' ? '500px' : '100%'}
            right
          >
            <div
              css={`
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                @media (max-width: 769px) {
                  justify-content: space-between;
                }
                @media (min-width: 1050px) {
                  justify-content: start;
                }
              `}
            >
              {accountData.listAccount.data.map(
                ({ type, company, person, id }, index) => {
                  const {
                    avatar,
                    firstName,
                    lastName,
                    email,
                    id: personId,
                  } = person || {}
                  const { companyName, email: companyEmail } = company || {}
                  return (
                    <div data-cy="home-account">
                      <HomeContent.Card
                        avatar={avatar}
                        firstName={firstName}
                        lastName={lastName}
                        companyName={companyName}
                        email={type === 'individual' ? email : companyEmail}
                        key={index}
                        id={id}
                        type={type}
                        personId={personId}
                      />
                    </div>
                  )
                }
              )}
            </div>
          </HomeContent.CustomCard>
          {userType === 'AdminUser' ? (
            <HomeContent.CustomCard
              title="Brokers Recently Added"
              minHeight="500px"
              maxHeight="500px"
              marginTop="20px"
              right
            >
              <div
                css={`
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-between;
                  @media (max-width: 769px) {
                    justify-content: space-between;
                  }
                  @media (min-width: 1050px) {
                    justify-content: start;
                  }
                `}
              >
                {userData.listUsers.data.map(
                  (
                    { avatar, firstName, id, lastName, email, enabled },
                    index
                  ) => (
                    <HomeContent.Card
                      avatar={avatar}
                      firstName={firstName}
                      lastName={lastName}
                      email={email}
                      key={index}
                      id={id}
                      Broker
                      active={enabled}
                    />
                  )
                )}
              </div>
            </HomeContent.CustomCard>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
export default Home
