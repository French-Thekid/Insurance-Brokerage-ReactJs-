import React from 'react'
import 'styled-components/macro'

import { FormControl, Icons, Colours } from 'components'

export default function (props) {
  const StartDateHandler = (startDate) =>
    props.setState((state) => ({
      startDate,
      endDate: state.endDate,
      startTime: state.startTime,
      endTime: state.endTime,
    }))

  const EndDateHandler = (endDate) =>
    props.setState((state) => ({
      startDate: state.startDate,
      endDate,
      startTime: state.startTime,
      endTime: state.endTime,
    }))

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr max-content 1fr;
        grid-column-gap: 40px;
        width: 100%;
        align-items: center;
      `}
    >
      <FormControl.DatePicker
        onChangeHandler={StartDateHandler}
        value={props.startDate}
        id="startDate"
        label="Start Date"
      />
      <Icons.ArrowForwardRounded style={{ color: Colours.blue }} />
      <FormControl.DatePicker
        onChangeHandler={EndDateHandler}
        value={props.endDate}
        id="endDate"
        label="End Date"
      />
    </div>
  )
}
