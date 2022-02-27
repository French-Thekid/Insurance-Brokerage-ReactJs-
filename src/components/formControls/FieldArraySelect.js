import React, { useState } from 'react'
import { Field } from 'formik'
import { Colours } from 'components'
import 'styled-components/macro'

function Select({
  defaultText = 'Choose One',
  value,
  name,
  style,
  action,
  groups = [],
}) {
  const [trackChange, setTrackChange] = useState(defaultText)
  return (
    <Field
      css={`
        display: block;
        width: 100%;
        /* height: 31px; */
        color: ${(value === '' || value === undefined) &&
        trackChange === defaultText
          ? Colours.placeHolder
          : Colours.text};
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 0px;
        padding: 6px 0px 3px 5px;
        background: inherit;
        border: none;
        border-bottom: 1px solid ${Colours.border};
        &:hover,
        :focus {
          outline: none;
          background: none;
          cursor: pointer;
          border-bottom: 1px solid ${Colours.blue};
        }
      `}
      style={style}
      name={name}
      component="select"
      onClick={(e) => {
        setTrackChange(e.target.value)
        if (action) action(e.target.value)
      }}
    >
      <option
        css={`
          background-color: ${Colours.softGrey};
          color: ${Colours.text};
        `}
        defaultValue
      >
        {defaultText}
      </option>
      {groups.map(({ label, value }) => (
        <option
          css={`
            background-color: ${Colours.softGrey};
            color: ${Colours.text};
          `}
          key={label}
          value={value}
        >
          {value}
        </option>
      ))}
    </Field>
  )
}

export default Select
