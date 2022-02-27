import React, { useState, useRef, useEffect } from 'react'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import moment from 'moment'
import { FormControl, Core, Icons, Colours } from 'components'
import 'styled-components/macro'

export default function Reminder({
  state,
  setState,
  addReminder,
  setAddReminder,
  format,
  props,
}) {
  const { values, handleChange, errors } = props
  let { reminderDescription, reminderSummary, repeat, repeatCount } = values

  const [reminderDate, setReminderDate] = useState(state.startDate)
  const [reminderTime, setReminderTime] = useState(state.startTime)

  const repeatOpt = [
    { value: 'Does Not Repeat', label: 'Does Not Repeat' },
    { value: 'Every Half Hour', label: 'Every Half Hour' },
    { value: 'Every Hour', label: 'Every Hour' },
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
  ]

  const amountRef = useRef({ amt: 0, duration: 0, type: '' })

  /* eslint-disable */
  //This was used because the lifecycle below was design for a specific behavior, adding other dependecies would defy the logic
  useEffect(() => {
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
  }, [repeat, repeatCount])

  const onChangeReminder = (event, type) => {
    switch (type) {
      case 'Date':
        setReminderDate(event.target.value)
        setState((state) => ({
          startDate: state.startDate,
          endDate: state.endDate,
          startTime: state.startTime,
          endTime: state.endTime,
          reminderDate: event.target.value && event.target.value,
          triggerDate: state.triggerDate,
          reminderTime: state.reminderTime,
          duration: state.duration,
        }))
        break
      case 'Time':
        setReminderTime(event)
        setState((state) => ({
          startDate: state.startDate,
          endDate: state.endDate,
          startTime: state.startTime,
          endTime: state.endTime,
          reminderDate: state.reminderDate,
          triggerDate: state.triggerDate,
          reminderTime: event && event,
          duration: state.duration,
        }))
        break
      case 'Repeat':
        setReminderTime(event)
        setState((state) => ({
          startDate: state.startDate,
          endDate: state.endDate,
          startTime: state.startTime,
          endTime: state.endTime,
          reminderDate: state.reminderDate,
          triggerDate: moment()
            .hour(moment)
            .minute(moment)
            .subtract(event.amt, event.type),
          reminderTime: state.reminderTime,
          duration: event.duration,
        }))
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
        height: 426px;
        display: grid;
        grid-template-rows: 40px 70px 1fr 1fr;
        grid-row-gap: 10px;
        margin-top: 10px;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 20px 240px 170px max-content;
          grid-column-gap: 25px;
          align-items: end;
        `}
      >
        <Icons.QueryBuilderRounded style={{ color: Colours.blue }} />
        <FormControl.Input
          label="Reminder Date"
          id="reminderDate"
          type="date"
          max={new Date(state.startDate).toISOString().split('T')[0]}
          style={{ minWidth: '200px' }}
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
        <section
          css={`
            display: grid;
            grid-template-columns: max-content max-content;
            grid-column-gap: 10px;
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
          <Core.Text>Add Reminder</Core.Text>
        </section>
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
            visibility: ${repeat === 'Does Not Repeat' || repeat === ''
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
          />{' '}
          <section
            css={`
              visibility: ${repeat === 'Does Not Repeat' || repeat === ''
                ? 'hidden'
                : 'visible'};
            `}
          >
            <Core.Text>time(s)</Core.Text>
          </section>
        </section>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: 20px 550px;
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
            width: '598px',
            marginTop: '0px',
            borderLeft: '1px solid #F8F8FF',
            borderRight: '1px solid #F8F8FF',
            borderTop: '1px solid #F8F8FF',
            borderRadius: '5px',
          }}
          multiline
          rows="3"
          value={reminderSummary}
          onChange={handleChange}
          placeholder="Add Summary"
        />
        <p />
        <FormControl.Error
          name="reminderSummary"
          message={errors.reminderSummary}
        />
        <section />
        <FormControl.Input
          label="Description"
          id="reminderDescription"
          style={{
            padding: '5px',
            width: '598px',
            marginTop: '20px',
            borderLeft: '1px solid #F8F8FF',
            borderRight: '1px solid #F8F8FF',
            borderTop: '1px solid #F8F8FF',
            borderRadius: '5px',
          }}
          multiline
          rows="6"
          value={reminderDescription}
          onChange={handleChange}
          placeholder="Add description"
        />
        <section />
        <FormControl.Error
          name="reminderDescription"
          message={errors.reminderDescription}
        />
      </div>
    </div>
  )
}
