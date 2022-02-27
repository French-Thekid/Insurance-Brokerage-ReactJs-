import React, { useContext, useState } from 'react'
import 'styled-components/macro'
import { Page } from './widgets/Page'
import { WidgetCard } from './widgets/WidgetCard'
import { useQuery } from '@apollo/react-hooks'
import { LIST_ACCOUNTS } from 'pages/broker/accounts/queries'
import {
  LIST_USERS,
  ACTIVEINACTIVE_POLICYCOUNT,
  DAILY_EVENT_COUNT,
} from './widgets/queries'
import AccountsIcon from 'images/users.png'
import UsersIcon from 'images/userIcon.png'
import SlipIcon from 'images/Slips.png'
import Calendar from 'images/red_calendar.png'
import GreetingCard from './widgets/GreetingCard'
import RecentAccounts from './widgets/RecentAccounts'
import RecentUsers from './widgets/RecentUsers'
import Task from './widgets/tasks'
import {
  Loading,
  ErrorNotification,
  Widgetcontainer,
  Colours,
  Flex,
  Can,
} from 'components'
import { UserContext } from '../../../context'

function Home() {
  const { uId } = useContext(UserContext)
  const [width, setWidth] = useState(
    window.innerWidth > 1600
      ? '75%'
      : window.innerWidth > 1300
      ? '70%'
      : window.innerWidth > 1000
      ? '65%'
      : '60%'
  )

  window.addEventListener('resize', () => {
    window.innerWidth > 1600
      ? setWidth('75%')
      : window.innerWidth > 1300
      ? setWidth('70%')
      : window.innerWidth > 1000
      ? setWidth('65%')
      : setWidth('60%')
  })

  return (
    <Page>
      <Flex
        direction="column"
        justify="center"
        style={{ maxWidth: 'calc(100vw-calc(2vw*4))' }}
      >
        <Flex align="start">
          <Flex
            direction="column"
            style={{ position: 'sticky', zIndex: 2, top: '0px' }}
          >
            <div
              css={`
                height: 90px;
                width: 360px;
                border-radius: 5px;
                margin: 18px auto;
                align-items: center;
                background-color: ${Colours.foreground};
                box-shadow: 0px 0px 0px 2px ${Colours.border};
              `}
            >
              <GreetingCard />
            </div>
            <Can
              i={[
                {
                  endpoint: 'Task:Read',
                  objectType: 'User',
                  objectId: uId,
                },
              ]}
            >
              <WidgetCard
                title="Tasks"
                style={{ minWidth: '360px', height: '490px' }}
              >
                <Task height="340px" />
              </WidgetCard>
            </Can>
          </Flex>

          <Flex
            direction="column"
            style={{
              width,
            }}
          >
            <Flex style={{ overflowX: 'auto' }}>
              <Widgets />
            </Flex>
            <Can
              i={[
                {
                  endpoint: 'Account:Read',
                  objectType: 'Account',
                  objectId: '*',
                },
              ]}
            >
              <WidgetCard
                title="Accounts recently added"
                style={{
                  minHeight: 'max-content',
                }}
              >
                <RecentAccounts
                  style={{ overflowY: 'auto', height: '400px' }}
                />
              </WidgetCard>
            </Can>
            <Can
              i={[
                {
                  endpoint: 'User:Read',
                  objectType: 'User',
                  objectId: '*',
                },
              ]}
            >
              <WidgetCard title="Users recently added">
                <RecentUsers style={{ overflowY: 'auto', height: '400px' }} />
              </WidgetCard>
            </Can>
          </Flex>
        </Flex>
      </Flex>
    </Page>
  )
}

function Widgets() {
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
  const { loading, error, data: accountData } = useQuery(LIST_ACCOUNTS)
  const { loading: loadUsers, error: userErrors, data: userData } = useQuery(
    LIST_USERS
  )
  const { data: activeInactive } = useQuery(ACTIVEINACTIVE_POLICYCOUNT)

  const { data: eventCount } = useQuery(DAILY_EVENT_COUNT, {
    variables: { userId: user.id, startDate: date },
  })

  if (loading || loadUsers) return <Loading small />
  if (userErrors)
    return <ErrorNotification message={'ErrorMessages.sessionExpired'} />

  const {
    listUsers: { total: totalUsers },
  } = userData

  if (error) return <ErrorNotification messgae={'error.message'} />
  const {
    listAccount: { total },
  } = accountData

  const P = ({ colour, children }) => (
    <p
      css={`
        font-size: 22px;
        font-family: sans-serif;
        margin: 0;
        padding: 0;
        color: ${colour};
      `}
    >
      {children}
    </p>
  )
  return (
    <>
      <Flex
        align="flex-start"
        justify="start"
        direction="row"
        wrap="no-wrap"
        style={{ overflowX: 'auto' }}
      >
        <div
          css={`
            & > div > div {
              margin: 18px;
            }
          `}
        >
          <Flex justify="space-between" wrap="no-wrap">
            <Widgetcontainer
              width="35px"
              icon={UsersIcon}
              bgColour="RGBA(8,199,86,0.1)"
            >
              <div>
                <P colour={Colours.green}>
                  <b>{loadUsers ? <Loading small /> : totalUsers}</b>
                </P>
              </div>
              <div>
                <h5
                  css={`
                    margin: 0;
                    padding: 0;
                    color: ${Colours.text};
                  `}
                >
                  Total Users
                </h5>
              </div>
            </Widgetcontainer>
            <Widgetcontainer
              width="30px"
              icon={AccountsIcon}
              bgColour="RGBA(252,195,57,0.1)"
            >
              <div>
                <P colour={Colours.yellow}>
                  <b>{loading ? <Loading small /> : total}</b>
                </P>
              </div>
              <div>
                <h5
                  css={`
                    margin: 0;
                    padding: 0;
                    color: ${Colours.text};
                  `}
                >
                  Total Accounts
                </h5>
              </div>
            </Widgetcontainer>
            <Widgetcontainer
              icon={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAABR0lEQVRYR+2YwVHDQAxF33LhSDqADmiBSQqgAF+gAuiApINQAVxcRoJbSQecuYgxYxgbvLYkexknY1/9Zb2VVlprAxN7wsR4OC6gfMeWwC1wZYqk8JqtuDfZVOJohCqYB89Hv2ycUHGgPe/AhRvICdUFJGYY4TkEbgSuf2yNkRobaPNxxvZcKLxQowNlK9Yvbyy8UEmAynR5oZIBeaGSAnmg9EDCptwf9crL9zQrsUUTg8qW7afEqEABCgkUbe0iwEKEx+93/wJk6VvDgSzeFNoZqC9IwyMUqaA+x+X7fMeawFNdOwM1+lWSCGlyY9AMT5nBmUZ6gkBzlf1KvPYk1+yXNH1I49mgOcFNbVi9RuqJ0PBBMU52yJbt43nXKP3nQNSsXKXpaCGdtx9VddwBlypH/aJDNfM3/s3rZsd1HdO/4PEVk4vQJzIt0CU0e3EXAAAAAElFTkSuQmCC`}
              width="25px"
              bgColour="#DEE7A2"
            >
              <div>
                <P colour="#A5BE00">
                  <b>
                    {activeInactive === undefined
                      ? '0'
                      : activeInactive.getActiveInactivePolicyCount.active}
                  </b>
                </P>
              </div>
              <div>
                <h5
                  css={`
                    margin: 0px;
                    padding: 0px;
                    color: ${Colours.text};
                  `}
                >
                  Active Policies
                </h5>
              </div>
            </Widgetcontainer>
            <Widgetcontainer
              icon={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABmUlEQVRoQ+2ZQVKDQBBF/2Coyk5vIEfITXQZWOkNvIneQFeQpZ7EHMGcQN1ZBclYxEoqZTE09DQzkBq2dM/817+hSUZh4peauH4EAN8OdnKgmC8TVUWPWmEBILEU/ZKW+b3lGsd0EmAvfhu9a+BKalMAYhA0wCx7hcKNoPjDUiIQJMAqzj6Fq39aC2sIEqCIMy1U/brvnxvWsoJwBpCWuSri7E4awilAXX1pCOcA0hBeACQhvAFIQXgFkIDwDmALwQaoX4tN88E0N0zxhzVMbycqbzQAJidGA8Cd5gFA8FuIZcJgDrDUMJICwNm2EGVt327hzg/xOdBX+Mkga/zhRBUqAHAr/j/PeQtJCafWGayFqI2l7geAMAc69pLzh5jqzY66j2EBwFQxbmVG70Bfgdx4qlXZnxJcQX3zAsA5zIEvAJd9rReK36Rl3nomRz8Dwx0x0Ywab2mV37YF0gDzZYJttPbgwjcudov0Z/VhBbD/x6yGqKIn/B2zXtOls4rYQGON2e6BEl/vQjpgJcVBcgBwUOTWLSbvwC/IuhNAOs7lzwAAAABJRU5ErkJggg=='
              }
              width="25px"
              bgColour="#F7E8F0"
            >
              <div>
                <P colour="#A7055A">
                  <b>
                    {activeInactive === undefined
                      ? '0'
                      : activeInactive.getActiveInactivePolicyCount.inactive}
                  </b>
                </P>
              </div>
              <div>
                <h5
                  css={`
                    margin: 0px;
                    padding: 0px;
                    color: ${Colours.text};
                  `}
                >
                  Inactive Policies
                </h5>
              </div>
            </Widgetcontainer>
            <Widgetcontainer
              width="25px"
              bgColour="#E4E1F4"
              icon={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAABgklEQVRoQ+1ZwXGDMBDckwtIOojdAWmCyQ93QlyJTSfwy5AiQgm4gtgFBGUcxhmHsSIdUlDwnL9I2ttdaWU4wsx/NPP6IQRiOzjagSwt9GXxVZ2z1vKdf8ZmgV4W7FuA73wh4Kug73wnB9ZP26XuFltAJwCWEx/YFqCG1MemfNm0JmzjGeiLV28A7icufAh3INU9mkiYCaRFqYEscvFf8ARUZZ2vr9ViJJClxfs/UP9cc1vV+YpL4EfOx3bCdM/85sBtEeDetL6OucasswNCgGmJODBUgClg8OGSQsElZS4oDjAFCz5cHBhKOlTEltvc5zY86wuNLUaFwOArBlcwcSB4zFgWlBSaWvE/T6GpCQXfQhKjEqP9JnZ+J7YdKu5fBdsWtOF5X2SzP8RCgKlA8Bhl4nsPH0FgdwDozhs5xAIa++o1v9qfuN3P632Dg5r4LugjKZ2wGxwn508k0Kmd1khAeAixG5zX0NgToYHqnke1mJyBIg8c3SeOXPc3vBCI7cQnnj1BQDdPmYQAAAAASUVORK5CYII='
              }
            >
              <div>
                <P colour="#4F4691">
                  <b>
                    {eventCount === undefined
                      ? '0'
                      : eventCount.getUserDailyEventCount}
                  </b>
                </P>
              </div>
              <div>
                <h5
                  css={`
                    margin: 0;
                    padding: 0;
                    color: ${Colours.text};
                  `}
                >
                  Upcoming Events
                </h5>
              </div>
            </Widgetcontainer>
            <Widgetcontainer
              icon={SlipIcon}
              width="25px"
              bgColour="RGBA(38,153,251,0.1)"
            >
              <div>
                <P colour={Colours.blue}>
                  <b>{'0'}</b>
                </P>
              </div>
              <div>
                <h5
                  css={`
                    margin: 0;
                    padding: 0;
                    color: ${Colours.text};
                  `}
                >
                  Total Slips
                </h5>
              </div>
            </Widgetcontainer>
            <Widgetcontainer
              icon={Calendar}
              width="25px"
              bgColour="rgba(251, 38, 215, 0.1)"
            >
              <div>
                <P colour={Colours.red}>
                  <b>{'0'}</b>
                </P>
              </div>
              <div>
                <h5
                  css={`
                    margin: 0;
                    padding: 0;
                    color: ${Colours.text};
                  `}
                >
                  Upcoming Events
                </h5>
              </div>
            </Widgetcontainer>
          </Flex>
        </div>
      </Flex>
    </>
  )
}
export default Home
