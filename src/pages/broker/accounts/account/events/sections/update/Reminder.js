import React, { useState, useRef, useEffect } from 'react'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import { FormControl, Core, Icons, Colours, Loading } from 'components'
import 'styled-components/macro'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_REMINDER } from '../../mutations'
import { GET_EVENT } from '../../queries'
import { useRouteMatch } from 'react-router-dom'

export default function Reminder({
  startDate,
  setState,
  addReminder,
  setAddReminder,
  reminderId,
  summary,
  description,
  duration,
  format,
  trigger,
  props,
  isEmpty,
  state,
  initial,
  setInitial,
  reminderRepeat,
}) {
  const match = useRouteMatch()
  const {
    params: { accountId, id: eventId },
  } = match
  const { values, handleChange } = props
  let { repeat, repeatCount } = values

  //Mutation to delete reminder
  const [deleteReminder, { loading: deletingReminder }] = useMutation(
    DELETE_REMINDER,
    {
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
        setAddReminder(false)
      },
    }
  )

  const [reminderDate, setReminderDate] = useState(
    moment(
      new Date(trigger || trigger !== undefined ? trigger : parseInt(startDate))
    )
  )
  let remindT = moment()
  if (!trigger)
    remindT = moment(
      new Date(
        new Date(parseInt(startDate)).setDate(
          new Date(parseInt(startDate)).getDate() + 1
        )
      ).toISOString()
    ).add(5, 'hours')
  const [reminderTime, setReminderTime] = useState(
    moment(new Date(trigger ? trigger : remindT))
  )

  const repeatOpt = [
    { value: 'Does Not Repeat', label: 'Does Not Repeat' },
    { value: 'Every Half Hour', label: 'Every Half Hour' },
    { value: 'Every Hour', label: 'Every Hour' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
  ]

  const rowHeight =
    window.screen.height < 1025 && window.screen.width < 769
      ? 3
      : window.screen.height < 769 && window.screen.width < 1025
      ? 8
      : window.screen.height > 1000
      ? 18
      : window.screen.height < 769 && window.screen.width > 1300
      ? 2
      : 5

  const amountRef = useRef({ amt: 0, duration: 0, type: '' })
  /* eslint-disable */
  //This was used because the lifecycle below was design for a specific behavior, adding other dependecies would defy the logic
  useEffect(() => {
    if (initial === 0 && trigger) {
      setState((prevState) => {
        return {
          ...prevState,
          ...{
            reminderDate: moment(new Date(trigger)),
            triggerDate: moment(new Date(trigger)),
            reminderTime: moment(new Date(trigger)),
            reminderSummary: summary,
            reminderDescription: description,
            duration: duration,
          },
        }
      })
      // setAddReminder(true)
    }
    if (!addReminder && isEmpty) {
      setState((prevState) => {
        return {
          ...prevState,
          ...{
            reminderDate: moment(new Date(parseInt(startDate))).add(5, 'hours'),
            triggerDate: moment(new Date(parseInt(startDate))).add(5, 'hours'),
            reminderTime: moment(new Date(parseInt(startDate))).add(5, 'hours'),
            reminderSummary: '',
            reminderDescription: '',
            duration: 0,
          },
        }
      })
    }
  }, [addReminder])

  //Component did load
  useEffect(() => {
    setInitial(1)
    if (trigger) setAddReminder(true)
    switch (repeat) {
      case 'Every Half Hour':
        amountRef.current = {
          amt: 30 * repeatCount,
          duration: 30,
          type: 'minutes',
        }
        //Updating reminder date, time and duration
        onChangeReminder(amountRef.current, 'Repeat')
        break
      case 'Every Hour':
        amountRef.current = { amt: repeatCount, duration: 60, type: 'hours' }
        onChangeReminder(amountRef.current, 'Repeat')
        break
      case 'Daily':
        amountRef.current = { amt: repeatCount, duration: 1440, type: 'days' }
        onChangeReminder(amountRef.current, 'Repeat')
        break
      case 'Weekly':
        amountRef.current = {
          amt: 7 * repeatCount,
          duration: 10080,
          type: 'days',
        }
        onChangeReminder(amountRef.current, 'Repeat')
        break
      default:
        amountRef.current = { amt: 0, duration: 0, type: '' }
        break
    }
    return
  }, [repeat, repeatCount, summary, description])

  const onChangeReminder = (event, type) => {
    switch (type) {
      case 'Date':
        setReminderDate(event.target.value)
        setState((prevState) => {
          return {
            ...prevState,
            reminderDate: event.target.value && event.target.value,
          }
        })
        break
      case 'Time':
        setReminderTime(event)
        setState((prevState) => {
          return {
            ...prevState,
            reminderTime: event && event,
          }
        })
        break
      case 'Repeat':
        setReminderTime(event)
        if (isEmpty) {
          setState((prevState) => {
            return {
              ...prevState,
              ...{
                triggerDate: moment(new Date(parseInt(startDate)))
                  .add(5, 'hours')
                  .subtract(event.amt, event.type),
                duration: event.duration,
              },
            }
          })
        } else if (!isEmpty) {
          if (
            reminderRepeat === repeatCount &&
            event.amt === parseInt(duration)
          ) {
            setState((prevState) => {
              return {
                ...prevState,
                ...{
                  triggerDate: moment(new Date(trigger)),
                  duration: event.duration,
                },
              }
            })
          } else {
            if (!isEmpty)
              setState((prevState) => {
                return {
                  ...prevState,
                  ...{
                    triggerDate: moment(new Date(parseInt(startDate)))
                      .add(5, 'hours')
                      .subtract(event.amt, event.type),
                    duration: event.duration,
                  },
                }
              })
            else
              setState((prevState) => {
                return {
                  ...prevState,
                  ...{
                    triggerDate: moment(new Date(trigger)).subtract(
                      event.amt,
                      event.type
                    ),
                    duration: event.duration,
                  },
                }
              })
          }
        } else {
          setState((prevState) => {
            return {
              ...prevState,
              ...{
                triggerDate: moment(new Date(trigger))
                  .add(5, 'hours')
                  .subtract(event.amt, event.type),
                duration: event.duration,
              },
            }
          })
        }
        break
      default:
        break
    }
  }
  const disableSelection =
    repeat === 'Does Not Repeat' || repeat === '' ? false : true

  return (
    <div
      id="Reminder Section"
      css={`
        padding-top: '20px';
        height: max-content;
        display: grid;
        grid-template-rows: ${!addReminder || isEmpty
          ? '40px'
          : '40px 70px 1fr 1fr'};
        grid-row-gap: 10px;
        margin-top: 10px;
      `}
    >
      {deletingReminder && <Loading small />}
      <div
        css={`
          display: grid;
          grid-template-columns: 20px 180px 140px max-content;
          grid-column-gap: 25px;
          align-items: end;
        `}
      >
        <Icons.QueryBuilderRounded style={{ color: Colours.blue }} />
        <FormControl.Input
          format="YYYY-MM-DD"
          label="Reminder Date"
          id="reminderDate"
          type="date"
          max={
            moment(new Date(parseInt(startDate)))
              .toISOString()
              .split('T')[0]
          }
          style={{ minWidth: '180px' }}
          value={
            new Date(state.reminderDate ? state.reminderDate : reminderDate)
              .toISOString()
              .split('T')[0]
          }
          onChange={(e) => {
            e.persist()
            onChangeReminder(e, 'Date')
          }}
          disabled={disableSelection || addReminder === false ? true : false}
        />
        <TimePicker
          showSecond={false}
          defaultValue={state.reminderTime ? state.reminderTime : reminderTime}
          onChange={(e) => {
            onChangeReminder(e, 'Time')
          }}
          format={format}
          use12Hours
          inputReadOnly
          disabled={disableSelection || addReminder === false ? true : false}
        />
        {!isEmpty ? (
          <section
            css={`
              display: grid;
              grid-template-columns: max-content max-content;
              grid-column-gap: 10px;
            `}
          >
            <Core.Button
              bgColour={Colours.red}
              onClick={() => {
                deleteReminder({
                  variables: {
                    id: reminderId,
                    eventId: parseInt(eventId),
                    accountId: parseInt(accountId),
                    calendarId: parseInt(localStorage.getItem('CalendarId')),
                  },
                }).catch((e) => console.log(e))
              }}
            >
              Delete Reminder
            </Core.Button>
          </section>
        ) : (
          <section
            css={`
              display: grid;
              grid-template-columns: max-content max-content;
              grid-column-gap: 10px;
              visibility: ${trigger ? 'hidden' : 'visible'};
            `}
          >
            <FormControl.Toggle
              startwithoff={addReminder ? null : 'Gucci'}
              onChange={(e) => {
                e.persist()
                if (e.target.checked) {
                  setAddReminder(true)
                } else {
                  setAddReminder(false)
                }
              }}
            />
            <h5
              css={`
                color: ${Colours.text};
              `}
            >
              Add Reminder
            </h5>
          </section>
        )}
      </div>

      <div
        css={`
          display: grid;
          grid-template-columns: 20px 240px max-content;
          grid-column-gap: 25px;
          align-items: end;
          visibility: ${addReminder === false ? 'hidden' : 'visible'};
        `}
      >
        <Icons.Update style={{ color: Colours.blue }} />
        <FormControl.Select
          value={repeat}
          label="Repeat"
          name="repeat"
          groups={repeatOpt}
          handlechange={handleChange}
        />
        <section
          css={`
            display: grid;
            grid-template-columns: max-content max-content;
            grid-column-gap: 5px;
            align-items: center;
            visibility: ${addReminder === false ||
            repeat === 'Does Not Repeat' ||
            repeat === ''
              ? 'hidden'
              : 'visible'};
          `}
        >
          <FormControl.Input
            id="repeatCount"
            value={repeatCount}
            min="1"
            style={{ width: '50px', minWidth: '50px' }}
            type="number"
            onChange={handleChange}
          />
          <Core.Text>time(s)</Core.Text>
        </section>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: 20px 520px;
          grid-column-gap: 25px;
          grid-row-gap: 1px;
          align-items: start;
          margin-top: 20px;
          margin-bottom: 10px;
          visibility: ${addReminder === false ? 'hidden' : 'visible'};
        `}
      >
        <Icons.SubjectRounded style={{ color: Colours.blue }} />
        <FormControl.Input
          id="reminderSummary"
          label="Summary"
          style={{
            padding: '5px',
            width: '520px',
            marginTop: '0px',
            borderLeft: '1px solid #F8F8FF',
            borderRight: '1px solid #F8F8FF',
            borderTop: '1px solid #F8F8FF',
            borderRadius: '5px',
          }}
          multiline
          rows="2"
          value={state.reminderSummary}
          onChange={(e) => {
            e.persist()
            setState((prevState) => {
              return {
                ...prevState,
                reminderSummary: e.target.value,
              }
            })
          }}
          placeholder="Add Summary"
        />
        <p />
        {(state.reminderSummary === '' ||
          state.reminderSummary === undefined) &&
        addReminder ? (
          <FormControl.Error
            name="reminderSummary"
            message="Reminder summary is required"
          />
        ) : null}
        <section />
        {state.reminderSummary !== '' ? <p /> : ''}
        <FormControl.Input
          label="Description"
          id="reminderDescription"
          style={{
            padding: '5px',
            width: '520px',
            marginTop: '20px',
            borderLeft: '1px solid #F8F8FF',
            borderRight: '1px solid #F8F8FF',
            borderTop: '1px solid #F8F8FF',
            borderRadius: '5px',
          }}
          multiline
          rows={rowHeight}
          value={state.reminderDescription}
          onChange={(e) => {
            e.persist()
            setState((prevState) => {
              return {
                ...prevState,
                reminderDescription: e.target.value,
              }
            })
          }}
          placeholder="Add description"
        />
        <section />
        {state.reminderDescription === '' && addReminder ? (
          <FormControl.Error
            name="reminderDescription"
            message="Reminder description is required"
          />
        ) : null}
      </div>
    </div>
  )
}
