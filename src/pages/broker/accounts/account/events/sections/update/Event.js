import React, { useState, useEffect } from 'react'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import { FormControl, Colours, Icons } from 'components'
import DatePicker from '../create/DatePicker'
import 'styled-components/macro'
import moment from 'moment'

export default function ({
  state,
  setInitialEvent,
  initialEvent,
  setState,
  startDate,
  endDate,
  format,
  props,
}) {
  const { Countries, States, Parishes } = FormControl.Data
  const { values, handleChange } = props
  const [parishOrState, setParishOrState] = useState('JA')
  const { description, country, street, streetNumber, city, parish } = values
  const [eventSTime, setEventSTime] = useState(
    moment(new Date(parseInt(startDate))).add(5, 'hours')
  )
  const [eventETime, setEventETime] = useState(
    moment(new Date(parseInt(endDate))).add(5, 'hours')
  )

  const rowHeight =
    window.screen.height < 1025 && window.screen.width < 769
      ? 3
      : window.screen.height < 769 && window.screen.width < 1025
      ? 8
      : window.screen.height > 1000
      ? 18
      : window.screen.height < 769 && window.screen.width > 1300
      ? 3
      : 5

  /* eslint-disable */
  //This was used because the lifecycle below was design for a specific behavior, adding other dependecies would defy the logic
  //Initial State
  useEffect(() => {
    if (initialEvent === 0) {
      setState((prevState) => {
        return {
          ...prevState,
          ...{
            startDate: moment(
              new Date(
                new Date(parseInt(startDate)).setDate(
                  new Date(parseInt(startDate)).getDate()
                )
              )
            ),
            startTime: moment(new Date(parseInt(startDate))).add(5, 'hours'),
            endDate: moment(
              new Date(
                new Date(parseInt(endDate)).setDate(
                  new Date(parseInt(endDate)).getDate()
                )
              )
            ),
            endTime: moment(new Date(parseInt(endDate))).add(5, 'hours'),
          },
        }
      })
    }
  }, [])

  useEffect(() => {
    setInitialEvent(1)
  })

  function onChange(value, type, setState) {
    switch (type) {
      case 'Start':
        setEventSTime(value && value)
        setState((prevState) => ({
          ...prevState,
          startTime: value && value,
        }))
        break
      case 'End':
        setEventETime(value && value)
        setState((prevState) => ({
          ...prevState,
          endTime: value && value,
        }))
        break
      default:
        break
    }
  }

  return (
    <div id="Event Section">
      <div
        css={`
          display: grid;
          grid-template-columns: 20px 520px;
          grid-column-gap: 25px;
          align-items: center;
          margin-top: 20px;
          margin-bottom: 10px;
          @media (max-height: 769px) {
            margin-top: 0px;
            margin-bottom: 0px;
          }
        `}
      >
        <Icons.QueryBuilderRounded style={{ color: Colours.blue }} />
        <DatePicker
          startDate={state.startDate}
          endDate={state.endDate}
          focusedInput={state.focusedInput}
          setState={setState}
        />
      </div>
      <div
        css={`
          margin-left: 45px;
          margin-top: 20px;
          margin-bottom: 10px;
          @media (max-height: 769px) {
            margin-top: 0px;
            margin-bottom: 0px;
          }
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 200px 200px;
            grid-column-gap: 110px;
          `}
        >
          <TimePicker
            showSecond={false}
            defaultValue={
              state.startTime === moment() ? state.startTime : eventSTime
            }
            onChange={(e) => onChange(e, 'Start', setState)}
            format={format}
            use12Hours
            inputReadOnly
          />
          <TimePicker
            showSecond={false}
            defaultValue={
              state.endTime === moment() ? state.endTime : eventETime
            }
            onChange={(e) => onChange(e, 'End', setState)}
            format={format}
            use12Hours
            inputReadOnly
          />
        </div>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: 20px 520px;
          grid-column-gap: 25px;
          align-items: start;
          margin-top: 20px;
          margin-bottom: 10px;
          @media (max-height: 769px) {
            margin-top: 20px;
            margin-bottom: 0px;
          }
        `}
      >
        <Icons.LocationOnRounded
          style={{ color: Colours.blue, marginTop: '30px' }}
        />
        <div>
          <div
            css={`
              display: grid;
              grid-template-columns: 120px 1fr;
              grid-column-gap: 10px;
              margin-top: 10px;
              margin-bottom: 15px;
              @media (max-height: 769px) {
                margin-bottom: 0px;
              }
            `}
          >
            <FormControl.Input
              id="streetNumber"
              style={{
                marginRight: '10px',
                minWidth: 'inherit',
              }}
              value={streetNumber}
              onChange={handleChange}
              placeholder="Street Number"
              label="Street Number"
            />
            <FormControl.Input
              id="street"
              value={street}
              onChange={handleChange}
              placeholder="Street Name"
              label="Street Name"
            />
          </div>
          <section
            css={`
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              grid-column-gap: 10px;
              margin-top: 10px;
            `}
          >
            <FormControl.Input
              id="city"
              value={city}
              onChange={handleChange}
              placeholder="City"
              label="City"
            />
            <FormControl.Select
              value={parish}
              groups={
                parishOrState === 'JA' || parishOrState === 'Jamaica'
                  ? Parishes
                  : States
              }
              label="Parish"
              name="parish"
              handlechange={handleChange}
            />
            <FormControl.Select
              value={country}
              groups={Countries}
              label="Country"
              name="country"
              action={setParishOrState}
              handlechange={handleChange}
            />
          </section>
        </div>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: 20px 520px;
          grid-column-gap: 25px;
          align-items: start;
          margin-top: 20px;
        `}
      >
        <Icons.SubjectRounded style={{ color: Colours.blue }} />
        <FormControl.Input
          id="description"
          style={{
            padding: '5px',
            width: '510px',
            marginTop: '0px',
            borderLeft: '1px solid #F8F8FF',
            borderRight: '1px solid #F8F8FF',
            borderTop: '1px solid #F8F8FF',
          }}
          multiline
          rows={rowHeight}
          value={description}
          onChange={handleChange}
          placeholder="Add description"
          label="Description"
        />
      </div>
    </div>
  )
}
