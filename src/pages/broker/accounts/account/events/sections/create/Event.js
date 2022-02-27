import React, { useState } from 'react'
import 'rc-time-picker/assets/index.css'
import TimePicker from 'rc-time-picker'
import { FormControl, Colours, Icons } from 'components'
import DatePicker from './DatePicker'
import 'styled-components/macro'

export default function ({ state, setState, onChange, format, props }) {
  const { Countries, States, Parishes } = FormControl.Data
  const [parishOrState, setParishOrState] = useState('JA')
  const { values, handleChange } = props
  const { description, country, streetName, streetNumber, parish, city } = values

  return (
    <div id="Event Section">
      <div
        css={`
          display: grid;
          grid-template-columns: 20px 550px;
          grid-column-gap: 25px;
          align-items: center;
          margin-top: 20px;
          margin-bottom: 10px;
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
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 200px 200px;
            grid-column-gap: 125px;
          `}
        >
          <TimePicker
            showSecond={false}
            defaultValue={state.startTime}
            onChange={(e) => onChange(e, 'Start', setState)}
            format={format}
            use12Hours
            inputReadOnly
          />
          <TimePicker
            showSecond={false}
            defaultValue={state.endTime}
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
          grid-template-columns: 20px 605px;
          grid-column-gap: 25px;
          align-items: start;
          margin-top: 20px;
          margin-bottom: 10px;
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
              id="streetName"
              value={streetName}
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
          grid-template-columns: 20px 550px;
          grid-column-gap: 25px;
          align-items: start;
          margin-top: 20px;
          margin-bottom: 10px;
        `}
      >
        <Icons.SubjectRounded style={{ color: Colours.blue }} />
        <FormControl.Input
          id="description"
          style={{
            padding: '5px',
            width: '590px',
            marginTop: '0px',
            borderLeft: '1px solid #F8F8FF',
            borderRight: '1px solid #F8F8FF',
            borderTop: '1px solid #F8F8FF',
          }}
          multiline
          rows="5"
          value={description}
          onChange={handleChange}
          placeholder="Type Agenda here"
          label="Agenda"
        />
      </div>
    </div>
  )
}
