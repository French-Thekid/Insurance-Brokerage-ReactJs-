import React from 'react'
import 'styled-components/macro'
import { useLocation, useHistory, useRouteMatch } from 'react-router-dom'
import { GET_EVENT, LIST_EVENTS } from './queries'
import { DELETE_EVENT } from './mutations'
import eventBg from 'assets/eventBg.png'
import {
  Colours,
  Content,
  Loading,
  Core,
  Icons,
  ScreenDisplayWarning,
} from 'components'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { twentyFourToTwelve } from 'utils'
import { usePermission } from 'hooks'
import { Logger } from '../../../../../utils'

const queryString = require('query-string')

export default function ({ isShowing, close }) {
  const history = useHistory()
  const { search } = useLocation()
  const [permissions, Access] = usePermission()
  const {
    params: { accountId },
  } = useRouteMatch()

  const { id } = queryString.parse(search)

  const [deleteCalendarEvent] = useMutation(DELETE_EVENT, {
    refetchQueries: () => [
      {
        query: LIST_EVENTS,
        variables: {
          id: parseInt(id),
          accountId: parseInt(accountId),
        },
      },
    ],
  })
  const {
    loading: loadEvent,
    error,
    data: eventDetails,
  } = useQuery(GET_EVENT, {
    variables: {
      id: parseInt(id),
      accountId: parseInt(accountId),
    },
  })

  if (loadEvent) return <Loading small />
  if (error)
    return <Content.Alert type="error" message="Failed to load Event Details" />

  const {
    title,
    startDate,
    endDate,
    streetName,
    parish,
    streetNumber,
    city,
    country,
    description,
    createdByUser,
  } = eventDetails.readCalendarEvent || {}
  const { firstName, lastName } = createdByUser || {}

  //Start Time
  const STimeHr = new Date(
    new Date(parseInt(startDate)).setDate(
      new Date(parseInt(startDate)).getDate() + 1
    )
  )
    .toISOString()
    .split('T')[1]
    .split(':')[0]

  const STimeMn = new Date(
    new Date(parseInt(startDate)).setDate(
      new Date(parseInt(startDate)).getDate() + 1
    )
  )
    .toISOString()
    .split('T')[1]
    .split(':')[1]

  //EndTime
  const ETimeHr = new Date(
    new Date(parseInt(endDate)).setDate(
      new Date(parseInt(endDate)).getDate() + 1
    )
  )
    .toISOString()
    .split('T')[1]
    .split(':')[0]

  const ETimeMn = new Date(
    new Date(parseInt(endDate)).setDate(
      new Date(parseInt(endDate)).getDate() + 1
    )
  )
    .toISOString()
    .split('T')[1]
    .split(':')[1]

  return isShowing ? (
    <>
      <div
        css={`
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: rgb(0 0 0 / 35%);
          backdrop-filter: blur(6px);
          top: 0px;
          left: 0px;
          position: fixed;
          z-index: 8;
        `}
      >
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
          <div
            css={`
              width: 560px;
              height: max-content;
              border-radius: 5px;
              background: ${Colours.foreground};
              display: grid;
              grid-template-rows: 100px 1fr;
            `}
          >
            <div
              css={`
                height: 80px;
                border-top-right-radius: 5px;
                border-top-left-radius: 5px;
                background-image: url(${eventBg});
                padding: 10px;
              `}
            >
              <ActionSection
                color={Colours.red}
                onClick={() => {
                  history.push(`/broker/account/events/${accountId}`)
                }}
              >
                <Icons.ClearRounded
                  style={{ color: 'inherit', fontSize: '20px' }}
                />
              </ActionSection>

              <ActionSection
                color={Colours.red}
                onClick={() =>
                  deleteCalendarEvent({
                    variables: {
                      id: parseInt(id),
                      accountId: parseInt(accountId),
                      calendarId: parseInt(localStorage.getItem('CalendarId')),
                    },
                  })
                    .then(() => {
                      Logger(`delete an event ${title}`, 'general', id)
                      history.push(`/broker/account/events/${accountId}`)
                    })
                    .catch((e) => console.log(e))
                }
              >
                <Icons.DeleteSweepRounded
                  style={{ color: 'inherit', fontSize: '20px' }}
                />
              </ActionSection>

              <ActionSection
                color={Colours.blue}
                onClick={() => {
                  history.push(
                    `/broker/account/events/${accountId}/update/${id}`
                  )
                }}
              >
                <Icons.EditRounded
                  style={{ color: 'inherit', fontSize: '20px' }}
                />
              </ActionSection>
            </div>
            <div
              css={`
                height: calc(100% - 20px);
                display: grid;
                border-bottom-right-radius: 5px;
                border-bottom-left-radius: 5px;
                padding: 10px;
                display: grid;
                grid-template-rows: repeat(4, max-content) auto;
                grid-row-gap: 25px;
              `}
            >
              <>
                <Container>
                  <Icons.ClosedCaptionRounded
                    style={{ fontSize: '30px', color: Colours.blue }}
                  />
                  <div
                    css={`
                      display: grid;
                      grid-template-rows: max-content max-content;
                      grid-row-gap: 3px;
                    `}
                  >
                    <Core.Text weight="650" customSize="20px">
                      {title}
                    </Core.Text>
                    <Core.Text customSize="15px">
                      {new Date(
                        new Date(parseInt(startDate)).setDate(
                          new Date(parseInt(startDate)).getDate()
                        )
                      ).toDateString()}
                      {` ${twentyFourToTwelve(parseInt(STimeHr))}:${STimeMn} ${
                        parseInt(STimeHr) > 12 ? 'pm' : 'am'
                      }`}
                      &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
                      {new Date(
                        new Date(parseInt(endDate)).setDate(
                          new Date(parseInt(endDate)).getDate()
                        )
                      ).toDateString()}
                      {` ${twentyFourToTwelve(parseInt(ETimeHr))}:${ETimeMn} ${
                        parseInt(ETimeHr) > 12 ? 'pm' : 'am'
                      }`}
                    </Core.Text>
                  </div>
                </Container>
                <Container center>
                  <Icons.LocationOnRounded
                    style={{ fontSize: '30px', color: Colours.blue }}
                  />
                  <Core.Text customSize="15px" weight="550">
                    {streetName === null && parish === null && country === null
                      ? 'No Location Provided'
                      : `${streetNumber ? streetNumber : ''} ${
                          streetName ? streetName : '--'
                        } ${parish ? ',' : ' -- '} ${parish} ${
                          city ? ',' : ' -- '
                        } ${city} ${country ? ',' : ' -- '} ${country}`}
                  </Core.Text>
                </Container>
                <Container>
                  <Icons.SubjectRounded
                    style={{ fontSize: '30px', color: Colours.blue }}
                  />
                  <div
                    css={`
                      height: 100%;
                      max-height: 100px;
                      overflow-y: auto;
                      padding-right: 5px;
                    `}
                  >
                    <Core.Text customSize="15px">
                      {description ? description : 'No Description Provided'}
                    </Core.Text>
                  </div>
                </Container>
                <Container>
                  <Icons.GroupRounded
                    style={{ fontSize: '30px', color: Colours.blue }}
                  />
                  <div
                    css={`
                      height: 100%;
                      max-height: 150px;
                      overflow-y: auto;
                      display: grid;
                      grid-template-columns: 1fr 1fr;
                      grid-column-gap: 5px;
                    `}
                  >
                    <div
                      css={`
                        height: 100%;
                        overflow-y: auto;
                      `}
                    >
                      {eventDetails.listCalendarEventUsers.data.length === 0 ? (
                        <Core.Text>No User Guests</Core.Text>
                      ) : (
                        eventDetails.listCalendarEventUsers.data.map(
                          ({ firstName, lastName, email, avatar }, index) => {
                            return (
                              <Card
                                firstName={firstName}
                                lastName={lastName}
                                email={email}
                                avatar={avatar}
                                key={index}
                              />
                            )
                          }
                        )
                      )}
                    </div>
                    <div
                      css={`
                        height: 100%;
                        overflow-y: auto;
                      `}
                    >
                      {/* {eventDetails.listCalendarEventPersons.length === 0 ? (
                        <Core.Text>No Persons Guests</Core.Text>
                      ) : (
                        eventDetails.listCalendarEventPersons.map(
                          (
                            { companyName, firstName, lastName, email, avatar },
                            index
                          ) => {
                            return (
                              <Card
                                companyName={companyName}
                                firstName={firstName}
                                lastName={lastName}
                                email={email}
                                avatar={avatar}
                                key={index}
                              />
                            )
                          }
                        )
                      )} */}
                    </div>
                  </div>
                </Container>
                <Container center>
                  <Icons.AccountCircleRounded
                    style={{ fontSize: '30px', color: Colours.blue }}
                  />
                  <Core.Text customSize="15px" weight="550">
                    Created By: {`${firstName} ${lastName}`}
                  </Core.Text>
                </Container>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null
}

const Card = ({ avatar, firstName, lastName, companyName, email }) => (
  <div
    css={`
      height: 45px;
      width: 210px;
      border: 1px solid ${Colours.border};
      display: grid;
      grid-template-columns: 35px 1fr;
      grid-column-gap: 10px;
      align-items: center;
      border-radius: 5px;
      margin-bottom: 5px;
      padding: 5px;
    `}
  >
    <Content.Avatar
      size="small"
      src={avatar}
      firstName={companyName ? companyName : firstName}
      lastName={companyName ? companyName.split('')[1] : lastName}
    />
    <div
      css={`
        display: grid;
        grid-template-rows: repeat(2, max-conetnt);
      `}
    >
      <Core.Text Contained weight="650">
        {companyName ? companyName : `${firstName} ${lastName}`}
      </Core.Text>
      <Core.Text Contained>{email}</Core.Text>
    </div>
  </div>
)

const Container = ({ children, center }) => (
  <div
    css={`
      display: grid;
      grid-template-columns: 30px 1fr;
      grid-column-gap: 20px;
      align-items: ${center ? 'center' : 'Start'};
    `}
  >
    {children}
  </div>
)

const ActionSection = ({ onClick, color, children }) => (
  <div
    onClick={onClick}
    css={`
      height: 35px;
      width: 35px;
      float: right;
      border-radius: 50%;
      margin-left: 10px;
      display: grid;
      align-items: center;
      justify-items: center;
      background: rgba(0, 0, 0, 0.5);
      transition: ease-out 0.2s;
      color: #fff;
      &:hover {
        color: ${color};
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        transition: ease-out 0.2s;
        transform: translateY(-2px);
      }
    `}
  >
    {children}
  </div>
)
