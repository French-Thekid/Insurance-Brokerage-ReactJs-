import gql from 'graphql-tag'

export const GET_CALENDAR = gql`
  query readAccountCalendar($accountId: Int!) {
    readAccountCalendar(id: $accountId) {
      id
    }
  }
`

export const LIST_EVENTS = gql`
  query listCalendarEvents($accountId: Int!) {
    listCalendarEvents(
      params: { accountId: $accountId, limit: 1000, offset: 0 }
    ) {
      total
      data {
        title
        id
        startDate
        endDate
        locationPremise
        locationThoroughfare
        description
      }
    }
  }
`

export const SEARCH_PERSONS = gql`
  query searchPersons($query: String!) {
    searchPersons(query: $query, limit: 100) {
      data {
        firstName
        id
        companyName
        email
        avatar
        lastName
      }
    }
  }
`

export const CHECK_AVAILABILITY = gql`
  query checkUserAvailability(
    $startDate: String!
    $endDate: String!
    $id: String!
  ) {
    checkUserAvailability(id: $id, startDate: $startDate, endDate: $endDate) {
      available
    }
  }
`

export const SEARCH_USERS = gql`
  query searchUsers($query: String!) {
    searchUsers(fragment: $query, limit: 100, offset: 0) {
      data {
        firstName
        id
        email
        avatar
        lastName
      }
    }
  }
`

export const GET_EVENT = gql`
  query readCalendarEvent($accountId: Int!, $id: Int!) {
    readCalendarEvent(params: { accountId: $accountId, id: $id }) {
      title
      id
      startDate
      endDate
      streetName
      city
      streetNumber
      country
      parish
      description
      createdByUser {
        firstName
        lastName
      }
    }
    listCalendarEventUsers(params: { accountId: $accountId }) {
      data {
        avatar
        id
        firstName
        lastName
        email
        enabled
      }
    }
    # listEventReminders(params: { limit: 1, offset: 0, eventId: $id }) {
    #   id
    #   summary
    #   description
    #   trigger
    #   repeat
    #   duration
    # }
  }
`
export const GETUSERS = gql`
  query listUsersandAcounts {
    listUsers(params: { limit: 1000, offset: 0 }) {
      data {
        avatar
        firstName
        lastName
        position
        email
        enabled
        id
      }
    }
  }
`
