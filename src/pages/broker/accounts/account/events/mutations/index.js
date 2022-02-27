import gql from 'graphql-tag'

export const CREATE_REMINDER = gql`
  mutation createReminder($Reminder: ReminderCreateInput!) {
    createReminder(reminder: $Reminder) {
      id
    }
  }
`
export const UPDATE_REMINDER = gql`
  mutation updateReminder($Reminder: ReminderUpdateInput!) {
    updateReminder(reminder: $Reminder) {
      id
    }
  }
`

export const ADD_USER_TO_EVENT = gql`
  mutation createUserCalendarEvent($Attendees: [UserCalendarEventInput]!) {
    createUserCalendarEvent(events: $Attendees) {
      id
    }
  }
`

export const CREATE_CALENDAR_EVENT = gql`
  mutation createCalendarEvent(
    $accountId: Int!
    $status: String!
    $title: String!
    $description: String
    $Start: String!
    $End: String!
    $parish: String
    $country: String
    $streetName: String
    $streetNumber: String
    $city: String
  ) {
    createCalendarEvent(
      event: {
        accountId: $accountId
        status: $status
        title: $title
        description: $description
        startDate: $Start
        endDate: $End
        streetName: $streetName
        city: $city
        streetNumber: $streetNumber
        country: $country
        parish: $parish
      }
    ) {
      id
    }
  }
`
export const UPDATE_CALENDAR_EVENT = gql`
  mutation updateCalendarEvent(
    $id: Int!
    $accountId: Int!
    $CalendarId: Int!
    $status: String!
    $title: String!
    $description: String
    $Start: String!
    $End: String!
    $parish: String
    $country: String
    $streetName: String
    $streetNumber: String
    $city: String
  ) {
    updateCalendarEvent(
      event: {
        id: $id
        accountId: $accountId
        status: $status
        title: $title
        description: $description
        calendarId: $CalendarId
        startDate: $Start
        endDate: $End
        streetName: $streetName
        city: $city
        streetNumber: $streetNumber
        country: $country
        parish: $parish
      }
    ) {
      id
      calendarId
    }
  }
`

export const DELETE_EVENT = gql`
  mutation deleteCalendarEvent($accountId: Int!, $calendarId: Int!, $id: Int!) {
    deleteCalendarEvent(
      params: { accountId: $accountId, calendarId: $calendarId, id: $id }
    ) {
      message
    }
  }
`
export const DELETE_REMINDER = gql`
  mutation deleteReminder(
    $accountId: Int!
    $eventId: Int!
    $id: String!
  ) {
    deleteReminder(
      params: {
        accountId: $accountId
        eventId: $eventId
        id: $id
      }
    ) {
      message
    }
  }
`
export const DELETE_PERSON_EVENT = gql`
  mutation deletePersonCalendarEvent(
    $accountId: Int!
    $id: Int!
    $eventId: Int!
  ) {
    deletePersonCalendarEvent(
      params: {
        eventId: $eventId
        accountId: $accountId
        personId: $id
      }
    ) {
      message
    }
  }
`
export const DELETE_USER_EVENT = gql`
  mutation deleteUserCalendarEvent(
    $accountId: Int!
    $id: String!
    $eventId: Int!
  ) {
    deleteUserCalendarEvent(
      params: {
        eventId: $eventId
        accountId: $accountId
        userId: $id
      }
    ) {
      message
    }
  }
`
