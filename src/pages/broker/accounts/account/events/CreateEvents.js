import React, { useState } from 'react'
import 'styled-components/macro'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { Formik } from 'formik'
import moment from 'moment'
import { object, string } from 'yup'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { LIST_EVENTS, GETUSERS } from './queries'

import { useDialog } from 'hooks'
import { Headers } from './sections'
import {
  Core,
  FormControl,
  Colours,
  ScreenDisplayWarning,
  Loading,
  Content,
} from 'components'
import { Events, Users, Reminder } from './sections/create'
import {
  CREATE_CALENDAR_EVENT,
  ADD_USER_TO_EVENT,
  CREATE_REMINDER,
} from './mutations'
import { Logger } from '../../../../../utils'

const queryString = require('query-string')
const format = 'hh:mm:ss a'

function onChange(value, type, setState) {
  switch (type) {
    case 'Start':
      setState((state) => ({
        startDate: state.startDate,
        endDate: state.endDate,
        startTime: value && value,
        endTime: state.endTime,
      }))
      break
    case 'End':
      setState((state) => ({
        startDate: state.startDate,
        endDate: state.endDate,
        startTime: state.startTime,
        endTime: value && value,
      }))
      break
    default:
      break
  }
}

export default function ({ isShowing, close }) {
  const { search } = useLocation()
  const history = useHistory()
  const match = useRouteMatch()
  const {
    params: { accountId },
  } = match

  const { mark } = queryString.parse(search)

  const [reminderSubmission, setReminderSubmission] = useState({})
  // const [personsId, setPersonsId] = useState({ personIDs: [] })
  const [usersId, setUsersId] = useState({ userIDs: [] })
  const [active, setActive] = useState('EVENTS')
  const [addReminder, setAddReminder] = useState(false)
  const [state, setState] = useState({
    startDate: moment(new Date(mark)),
    endDate: moment(new Date(mark)),
    startTime: moment().hour(moment).minute(moment),
    endTime: moment().hour(moment).add(1, 'hours').minute(moment),
    focusedInput: null,
    reminderDate: null,
    reminderTime: null,
    triggerDate: null,
    duration: 0,
  })
  const { Dialog } = useDialog()

  //Declaring mutations to be executed
  const [createUserCalendarEvent, { loading: loadingU, error: errorU }] =
    useMutation(ADD_USER_TO_EVENT)

  const [createReminder, { loading: loadingR, error: errorR }] =
    useMutation(CREATE_REMINDER)

  //Declaration of dependent mutation
  const [createCalendarEvent, { loading: loadingE, error: errorE }] =
    useMutation(CREATE_CALENDAR_EVENT, {
      onCompleted({ createCalendarEvent: { id } }) {
        //ADDING USERS TO ACCOUNT
        if (usersId.userIDs.length !== 0) {
          const Attendees = usersId.userIDs.map((user) => {
            return {
              userId: user,
              eventId: parseInt(id),
              accountId: parseInt(accountId),
            }
          })
          createUserCalendarEvent({ variables: { Attendees } }).catch((e) =>
            console.log(e)
          )
        }

        //CREATING REMINDER
        if (addReminder) {
          const {
            trigger,
            duration,
            repeat,
            repeatCount,
            reminderSummary,
            reminderDescription,
          } = reminderSubmission
          const Reminder = {
            eventId: parseInt(id),
            accountId: parseInt(accountId),
            trigger: trigger,
            summary: reminderSummary,
            description: reminderDescription,
          }
          if (repeat !== 'Does Not Repeat') {
            Reminder.repeat = repeatCount
            Reminder.duration = duration.toString()
          }
          createReminder({
            variables: { Reminder },
          }).catch((e) => console.log(e))
        }
      },
      refetchQueries: () => [
        {
          query: LIST_EVENTS,
          variables: {
            accountId: parseInt(accountId),
            calendarId: parseInt(localStorage.getItem('CalendarId')),
          },
        },
      ],
    })

  //Declaring Query to get Users and Accounts
  const {
    loading,
    errors: attendeesError,
    data: attendeesData,
  } = useQuery(GETUSERS)

  if (loading) return <Loading small />
  if (attendeesError)
    return (
      <Content.Alert
        type="error"
        message={'Failed to fetch Accounts & Brokers'}
      />
    )

  const { listUsers: { data } = {} } = attendeesData || {}

  return (
    <>
      <Dialog
        open={isShowing}
        close={() => close()}
        width="650px"
        title="New Event"
      >
        <>
          <div
            css={`
              @media only screen and (orientation: portrait) {
                @media (min-width: 376px) {
                  display: none;
                }
              }
              @media only screen and (orientation: landscape) {
                @media (min-height: 376px) {
                  display: none;
                }
              }
              @media only screen and (orientation: portrait) {
                @media (max-width: 376px) {
                  display: visible;
                }
              }
              @media only screen and (orientation: landscape) {
                @media (max-height: 376px) {
                  display: visible;
                }
              }
            `}
          >
            <ScreenDisplayWarning />
          </div>
          <div
            css={`
              @media only screen and (orientation: portrait) {
                @media (max-width: 376px) {
                  display: none;
                }
              }
              @media only screen and (orientation: landscape) {
                @media (max-height: 376px) {
                  display: none;
                }
              }
            `}
          >
            <Formik
              initialValues={{
                title: '',
                description: '',
                reminderDescription: '',
                reminderSummary: '',
                parish: '',
                country: '',
                streetName: '',
                streetNumber: '',
                city: '',
                repeat: 'Does Not Repeat',
                repeatCount: 1,
                hours: 0,
                minutes: 3,
              }}
              validationSchema={object().shape({
                title: string().required('Title is required!'),
                reminderSummary: addReminder
                  ? string().required('Summary is required!')
                  : string().nullable(),
                reminderDescription: addReminder
                  ? string().required('Description is required!')
                  : string().nullable(),
              })}
              onSubmit={({
                title,
                description,
                parish,
                country,
                streetName,
                streetNumber,
                city,
                repeat,
                repeatCount,
                reminderSummary,
                reminderDescription,
              }) => {
                let {
                  startDate,
                  startTime,
                  endTime,
                  endDate,
                  reminderDate,
                  reminderTime,
                  triggerDate,
                  duration,
                } = state
                /*
              
              Date Section 
              
              */
                //Formatting Start Date
                const FormattedStartDate = new Date(startDate)
                  .toISOString()
                  .split('T')[0]

                //Formatting End Date
                const FormattedEndDate = new Date(endDate)
                  .toISOString()
                  .split('T')[0]

                //Formatting Start Time
                const FormattedStartTime = new Date(
                  startTime + 1000 * 60 * 60 * -5
                )
                  .toISOString()
                  .split('T')[1]
                  .split('.')[0]

                //Formatting End Time
                const FormattedEndTime = new Date(endTime + 1000 * 60 * 60 * -5)
                  .toISOString()
                  .split('T')[1]
                  .split('.')[0]

                const Start = `${FormattedStartDate} ${FormattedStartTime}`
                const End = `${FormattedEndDate} ${FormattedEndTime}`

                /*
              
              Reminder Section 
              
              */
                let FormattedReminderStartDate
                let FormattedReminderStartTime
                let ReminderStart
                //Formating Reminder Start Date
                if (repeat !== 'Does Not Repeat') {
                  if (reminderDate === null || reminderDate === undefined)
                    reminderDate = startDate

                  if (triggerDate === null || triggerDate === undefined)
                    triggerDate = startTime

                  FormattedReminderStartDate = new Date(reminderDate)
                    .toISOString()
                    .split('T')[0]

                  FormattedReminderStartTime = new Date(
                    triggerDate + 1000 * 60 * 60 * -5
                  )
                    .toISOString()
                    .split('T')[1]
                    .split('.')[0]

                  ReminderStart = `${FormattedReminderStartDate} ${FormattedReminderStartTime}`
                }
                if (repeat === 'Does Not Repeat') {
                  if (triggerDate === null || triggerDate === undefined)
                    triggerDate = startDate

                  if (reminderTime === null || reminderTime === undefined)
                    reminderTime = startTime
                  else reminderTime = reminderTime.format(format)

                  FormattedReminderStartDate = new Date(triggerDate)
                    .toISOString()
                    .split('T')[0]

                  FormattedReminderStartTime = new Date(
                    reminderTime + 1000 * 60 * 60 * -5
                  )
                    .toISOString()
                    .split('T')[1]
                    .split('.')[0]

                  ReminderStart = `${FormattedReminderStartDate} ${FormattedReminderStartTime}`
                }

                setReminderSubmission({
                  trigger: ReminderStart,
                  duration,
                  repeatCount,
                  repeat,
                  reminderSummary,
                  reminderDescription,
                })

                // Creating Event
                createCalendarEvent({
                  variables: {
                    accountId: parseInt(accountId),
                    status: 'confirmed',
                    title,
                    description,
                    Start,
                    End,
                    parish,
                    country,
                    streetName,
                    streetNumber,
                    city,
                  },
                })
                  .then((res) => {
                    Logger(`created event "${title}"`)
                    history.goBack()
                  })
                  .catch(() => {
                    // Notification({ eventType: 'Email FormControl.Error' })
                  })
              }}
            >
              {(props) => {
                const {
                  values,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  errors,
                } = props
                const { title } = values
                return (
                  <form onSubmit={handleSubmit} id="event">
                    {(loadingU || loadingE || loadingR) && <Loading small />}
                    {errorE && (
                      <Content.Alert
                        type="error"
                        message="Failed to create event"
                      />
                    )}
                    {errorU && (
                      <Content.Alert
                        type="error"
                        message="Failed to Invite Users to event"
                      />
                    )}

                    {errorR && (
                      <Content.Alert
                        type="error"
                        message="Failed to create Reminder"
                      />
                    )}
                    <FormControl.Input
                      label="Title"
                      id="title"
                      type="text"
                      value={title}
                      onChange={handleChange}
                      placeholder="Add Title"
                      style={{ width: '650px', margin: '0px' }}
                    />
                    <FormControl.Error name="title" message={errors.title} />
                    <Headers
                      active={active}
                      errors={errors}
                      setActive={setActive}
                    />
                    {active === 'EVENTS' ? (
                      <Events
                        state={state}
                        setState={setState}
                        onChange={onChange}
                        format={format}
                        props={props}
                      />
                    ) : active === 'REMINDER' ? (
                      <Reminder
                        state={state}
                        setState={setState}
                        setAddReminder={setAddReminder}
                        addReminder={addReminder}
                        onChange={onChange}
                        format={format}
                        props={props}
                      />
                    ) : active === 'USERS' ? (
                      <Users
                        usersId={usersId}
                        setUsersId={setUsersId}
                        data={data}
                        state={state}
                      />
                    ) : null}
                    <div
                      css={`
                        margin-top: 10px;
                      `}
                    >
                      <Core.Button
                        style={{
                          width: '150px',
                          float: 'right',
                          margin: '0px',
                        }}
                        type="submit"
                        form="event"
                        bgColour={Colours.green}
                        disabled={isSubmitting}
                      >
                        Save
                      </Core.Button>
                    </div>
                  </form>
                )
              }}
            </Formik>
          </div>
        </>
      </Dialog>
    </>
  )
}
