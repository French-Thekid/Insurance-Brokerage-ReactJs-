import React, { useState } from 'react'
import 'styled-components/macro'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Formik } from 'formik'
import moment from 'moment'
import { object, string } from 'yup'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { usePermission } from 'hooks'
import {
  UPDATE_CALENDAR_EVENT,
  ADD_USER_TO_EVENT,
  ADD_ACCOUNT_TO_EVENT,
  CREATE_REMINDER,
  UPDATE_REMINDER,
} from './mutations'
import { GETUSERS, LIST_EVENTS, GET_EVENT } from './queries'
import {
  Core,
  FormControl,
  Colours,
  PageHeader,
  ScreenDisplayWarning,
  Loading,
  Content,
} from 'components'
import {
  Events,
  Users,
  Accounts,
  Reminder,
  AddUsers,
  AddAccounts,
} from './sections/update'
import Headers from './sections/Headers'
import { Logger } from '../../../../../utils'

const format = 'hh:mm:ss a'

export default function () {
  const history = useHistory()
  const match = useRouteMatch()
  const [permissions, Access] = usePermission()
  const {
    params: { id: eventId, accountId },
  } = match

  const {
    loading: loadEvent,
    error,
    data: eventDetails,
  } = useQuery(GET_EVENT, {
    variables: {
      id: parseInt(eventId),
      accountId: parseInt(accountId),
      calendarId: parseInt(localStorage.getItem('CalendarId')),
    },
  })

  //Declaring Mutations for mutations needed
  const [createUserCalendarEvent] = useMutation(ADD_USER_TO_EVENT, {
    refetchQueries: () => [
      {
        query: GET_EVENT,
        variables: {
          id: parseInt(eventId),
          accountId: parseInt(accountId),
          calendarId: parseInt(localStorage.getItem('CalendarId')),
        },
      },
    ],
    onCompleted() {
      setUsersId({ userIDs: [] })
    },
  })

  const [updateReminder, { loading: UpdatingReminder }] = useMutation(
    UPDATE_REMINDER,
    {
      refetchQueries: () => [
        {
          query: LIST_EVENTS,
          variables: {
            accountId: parseInt(accountId),
            calendarId: parseInt(localStorage.getItem('CalendarId')),
          },
        },
        {
          query: GET_EVENT,
          variables: {
            id: parseInt(eventId),
            accountId: parseInt(accountId),
            calendarId: parseInt(localStorage.getItem('CalendarId')),
          },
        },
      ],
    }
  )
  const [createReminder, { loading: creatingReminder }] = useMutation(
    CREATE_REMINDER,
    {
      refetchQueries: () => [
        {
          query: LIST_EVENTS,
          variables: {
            accountId: parseInt(accountId),
            calendarId: parseInt(localStorage.getItem('CalendarId')),
          },
        },
        {
          query: GET_EVENT,
          variables: {
            id: parseInt(eventId),
            accountId: parseInt(accountId),
            calendarId: parseInt(localStorage.getItem('CalendarId')),
          },
        },
      ],
    }
  )
  const [updateCalendarEvent, { loading: UpdatingEvent }] = useMutation(
    UPDATE_CALENDAR_EVENT,
    {
      onCompleted({ updateCalendarEvent: { id } }) {},
      refetchQueries: () => [
        {
          query: LIST_EVENTS,
          variables: {
            accountId: parseInt(accountId),
            calendarId: parseInt(localStorage.getItem('CalendarId')),
          },
        },
      ],
    }
  )

  //Declaring Query to get Users and Accounts
  const {
    loading,
    errors: attendeesError,
    data: attendeesData,
  } = useQuery(GETUSERS)

  const userIds = []
  const accountIDS = []
  const [initial, setInitial] = useState(0)
  const [initialEvent, setInitialEvent] = useState(0)
  const [personsId, setPersonsId] = useState({ personIDs: [] })
  const [usersId, setUsersId] = useState({ userIDs: [] })
  const [active, setActive] = useState('EVENTS')
  const [addReminder, setAddReminder] = useState(false)
  const [state, setState] = useState({
    startDate: moment(new Date()),
    endDate: moment(new Date()),
    startTime: moment().hour(moment).minute(moment),
    endTime: moment().hour(moment).add(1, 'hours').minute(moment),
    focusedInput: null,
    reminderDate: null,
    reminderTime: null,
    triggerDate: null,
    duration: 0,
  })

  if (loadEvent) return <Loading small />
  if (error)
    return <Content.Alert type="error" message={'Fail to retrieve events'} />

  //Extracting Event and Reminder details
  const {
    title,
    startDate,
    endDate,
    locationPremise,
    locationThoroughfare,
    locationStreetNumber,
    locationLocality,
    locationCountry,
    description,
  } = eventDetails.readCalendarEvent

  const {
    id: reminderId,
    summary,
    description: reminderDescription,
    trigger,
    repeat,
    duration,
  } = eventDetails && eventDetails.listEventReminders.length !== 0
    ? eventDetails.listEventReminders[0]
    : {}

  //Gathering all users and persons on Event to filter the other users and persons not on the event list
  eventDetails.listCalendarEventUsers.map((user) => userIds.push(user.id))

  eventDetails.listCalendarEventPersons.map((account) =>
    accountIDS.push(account.id)
  )
  //Extracting Users & Persons for selection
  if (loading) return <Loading small />
  if (attendeesError) return null

  const { listUsers: { data = [] } = {} } = attendeesData || {}

  const { listPerson: { data: PersonData = [] } = {} } = attendeesData || {}

  return (
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
          height: 100%;
          display: grid;
          grid-template-rows: max-content 1fr;
          overflow-y: auto;
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
        <PageHeader
          title="Update Event"
          close={() => {
            history.goBack()
            localStorage.removeItem('selectedSlip')
          }}
        >
          {permissions.CALENDAREVENT_UPDATE_TYPEACCOUNT ? (
            <Core.Button
              type="submit"
              form="update"
              bgColour={Colours.green}
              data-testid="edit-event"
              disabled={
                (state.reminderDescription === '' ||
                  state.reminderSummary === '') &&
                addReminder
                  ? true
                  : false
              }
            >
              Save
            </Core.Button>
          ) : null}
        </PageHeader>
        {(UpdatingReminder || creatingReminder || UpdatingEvent) && (
          <Loading small />
        )}
        {permissions.CALENDAREVENT_UPDATE_TYPEACCOUNT ? (
          <div
            css={`
              height: 100%;
              overflow-y: auto;
              display: grid;
              grid-template-columns: 600px 1fr;
              grid-gap: 10px;
              @media (max-width: 769px) {
                grid-template-columns: 1fr;
                overflow-y: auto;
                padding-right: 5px;
              }
            `}
          >
            <div
              css={`
                height: calc(100% - 22px);
                border-radius: 5px;
                border: 1px solid ${Colours.border};
                padding: 10px;
                min-height: 0px;
                @media (max-width: 769px) {
                  min-height: 500px;
                }
              `}
            >
              {/** * Todo: Add responsiveness for tablet */}
              <Formik
                initialValues={{
                  title: title ? title : '',
                  description: description ? description : '',
                  parish: locationLocality ? locationLocality : '',
                  country:
                    locationCountry && locationCountry === 'Ja'
                      ? 'Jamaica'
                      : locationCountry === 'Un'
                      ? 'United States'
                      : '',
                  street: locationPremise ? locationPremise : '',
                  streetNumber: locationStreetNumber
                    ? locationStreetNumber
                    : '',
                  city: locationThoroughfare ? locationThoroughfare : '',
                  eventStartDate: '',
                  eventEndDate: '',
                  repeat:
                    duration === '30'
                      ? 'Every Half Hour'
                      : duration === '60'
                      ? 'Every Hour'
                      : duration === '1440'
                      ? 'Daily'
                      : duration === '10080'
                      ? 'Weekly'
                      : 'Does Not Repeat',
                  repeatCount: repeat ? repeat : 1,
                }}
                validationSchema={object().shape({
                  title: string().required('Title is required!'),
                })}
                onSubmit={({
                  title,
                  description,
                  parish,
                  country,
                  street,
                  streetNumber,
                  city,
                  repeat,
                  repeatCount,
                }) => {
                  try {
                    console.log('Submitting')
                    let {
                      startDate,
                      startTime,
                      endTime,
                      endDate,
                      reminderDate,
                      reminderTime,
                      triggerDate,
                      duration,
                      reminderSummary,
                      reminderDescription,
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
                    const FormattedEndTime = new Date(
                      endTime + 1000 * 60 * 60 * -5
                    )
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
                    if (repeat !== 'Does Not Repeat' && addReminder) {
                      if (eventDetails.listEventReminders.length !== 0) {
                        FormattedReminderStartDate = new Date(triggerDate)
                          .toISOString()
                          .split('T')[0]

                        FormattedReminderStartTime = new Date(
                          triggerDate + 1000 * 60 * 60 * -5
                        )
                          .toISOString()
                          .split('T')[1]
                          .split('.')[0]
                      } else {
                        //Date
                        if (triggerDate === null || triggerDate === undefined)
                          triggerDate = moment(new Date(trigger))
                        FormattedReminderStartDate = new Date(triggerDate)
                          .toISOString()
                          .split('T')[0]
                        //Time
                        if (triggerDate === null || triggerDate === undefined)
                          triggerDate = moment(new Date(trigger))

                        FormattedReminderStartTime = new Date(
                          triggerDate + 1000 * 60 * 60 * -5
                        )
                          .toISOString()
                          .split('T')[1]
                          .split('.')[0]
                      }
                    }
                    if (repeat === 'Does Not Repeat' && addReminder) {
                      if (reminderDate === null || reminderDate === undefined)
                        reminderDate = moment(new Date(trigger))
                      FormattedReminderStartDate = new Date(reminderDate)
                        .toISOString()
                        .split('T')[0]

                      if (reminderTime === null || reminderTime === undefined)
                        reminderTime = moment(new Date(trigger))

                      FormattedReminderStartTime = new Date(
                        reminderTime + 1000 * 60 * 60 * -5
                      )
                        .toISOString()
                        .split('T')[1]
                        .split('.')[0]
                    }

                    ReminderStart = `${FormattedReminderStartDate} ${FormattedReminderStartTime}`

                    //Creating reminder
                    if (
                      eventDetails.listEventReminders.length === 0 &&
                      addReminder
                    ) {
                      //CREATING REMINDER
                      const Reminder = {
                        eventId: parseInt(eventId),
                        calendarId: parseInt(
                          localStorage.getItem('CalendarId')
                        ),
                        accountId: parseInt(accountId),
                        trigger: ReminderStart,
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
                    } else if (
                      eventDetails.listEventReminders.length !== 0 &&
                      addReminder
                    ) {
                      console.log('Updating', repeat)
                      //Updating Reminder
                      const Reminder = {
                        id: reminderId,
                        eventId: parseInt(eventId),
                        calendarId: parseInt(
                          localStorage.getItem('CalendarId')
                        ),
                        accountId: parseInt(accountId),
                        trigger: ReminderStart,
                        summary: reminderSummary,
                        description: reminderDescription,
                      }
                      if (repeat !== 'Does Not Repeat') {
                        Reminder.repeat = repeatCount
                        Reminder.duration = duration.toString()
                      }
                      // updating REMINDER
                      updateReminder({
                        variables: { Reminder },
                      }).catch((e) => console.log(e))
                    }

                    // Completed Update Event
                    updateCalendarEvent({
                      variables: {
                        id: parseInt(eventId),
                        accountId: parseInt(accountId),
                        CalendarId: parseInt(
                          localStorage.getItem('CalendarId')
                        ),
                        status: 'confirmed',
                        title,
                        description,
                        Start,
                        End,
                        parish,
                        country,
                        street,
                        streetNumber,
                        city,
                      },
                    })
                      .then(() => {
                        Logger('updated a calendar event')
                      })
                      .catch((e) => console.log(e))

                    if (usersId.userIDs.length !== 0) {
                      //ADDING USERS TO ACCOUNT
                      const Attendees = usersId.userIDs.map((user) => {
                        return {
                          userId: user,
                          eventId: parseInt(eventId),
                          calendarId: parseInt(
                            localStorage.getItem('CalendarId')
                          ),
                          accountId: parseInt(accountId),
                        }
                      })

                      createUserCalendarEvent({
                        variables: { Attendees },
                      }).catch((e) => console.log(e))
                    }

                    setTimeout(
                      () =>
                        history.push(
                          `/broker/account/events/${accountId}?action=view&id=${eventId}`
                        ),
                      3000
                    )
                  } catch (e) {
                    console.log(e)
                  }
                }}
              >
                {(props) => {
                  const { values, handleChange, handleSubmit, errors } = props
                  const { title } = values
                  return (
                    <form
                      onSubmit={handleSubmit}
                      id="update"
                      css={`
                        height: 100%;
                      `}
                    >
                      {(UpdatingReminder ||
                        creatingReminder ||
                        UpdatingEvent) && <Loading small />}
                      <FormControl.Input
                        label="Title"
                        id="title"
                        type="text"
                        value={title}
                        onChange={handleChange}
                        placeholder="Add Title"
                        style={{ width: '565px', margin: '0px' }}
                      />
                      <FormControl.Error name="title" message={errors.title} />
                      <Headers
                        update
                        state={state}
                        addReminder={addReminder}
                        active={active}
                        errors={errors}
                        setActive={setActive}
                      />
                      {active === 'EVENTS' ? (
                        <Events
                          startDate={startDate}
                          endDate={endDate}
                          state={state}
                          setState={setState}
                          format={format}
                          props={props}
                          initialEvent={initialEvent}
                          setInitialEvent={setInitialEvent}
                        />
                      ) : active === 'REMINDER' ? (
                        <Reminder
                          isEmpty={
                            eventDetails.listEventReminders.length === 0
                              ? true
                              : false
                          }
                          initial={initial}
                          setInitial={setInitial}
                          duration={duration}
                          reminderId={reminderId}
                          description={reminderDescription}
                          summary={summary}
                          trigger={trigger}
                          state={state}
                          startDate={startDate}
                          setState={setState}
                          setAddReminder={setAddReminder}
                          addReminder={addReminder}
                          format={format}
                          props={props}
                          reminderRepeat={repeat}
                        />
                      ) : active === 'USERS' ? (
                        <Users data={eventDetails.listCalendarEventUsers} />
                      ) : (
                        <Accounts
                          data={eventDetails.listCalendarEventPersons}
                        />
                      )}
                    </form>
                  )
                }}
              </Formik>
            </div>
            <div
              css={`
                height: 100%;
                display: grid;
                grid-template-rows: 1fr 1fr;
                @media (min-width: 769px) {
                  overflow-y: auto;
                }
                @media (max-width: 769px) {
                  grid-template-rows: 1fr;
                  overflow-y: none;
                }
                grid-row-gap: 10px;
                border-radius: 5px;
              `}
            >
              <div
                css={`
                  height: 100%;
                  overflow-y: auto;
                  @media (max-width: 769px) {
                    min-height: 300px;
                  }
                `}
              >
                <AddUsers
                  blackList={userIds}
                  usersId={usersId}
                  setUsersId={setUsersId}
                  data={data}
                  state={state}
                />
              </div>
              <div
                css={`
                  height: 100%;
                  overflow-y: auto;
                  @media (max-width: 769px) {
                    display: none;
                  }
                `}
              >
                <AddAccounts
                  blackList={accountIDS}
                  personsId={personsId}
                  setPersonsId={setPersonsId}
                  AccountData={PersonData}
                  state={state}
                />
              </div>
            </div>
            <div
              css={`
                height: 100%;
                overflow-y: auto;
                @media (min-width: 769px) {
                  display: none;
                }
                @media (max-width: 769px) {
                  display: visible;
                  min-height: 300px;
                }
              `}
            >
              <AddAccounts
                blackList={accountIDS}
                personsId={personsId}
                setPersonsId={setPersonsId}
                AccountData={PersonData}
                state={state}
              />
            </div>
          </div>
        ) : (
          <Access />
        )}
      </div>
    </>
  )
}
