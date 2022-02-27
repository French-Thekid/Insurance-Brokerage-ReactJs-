import React from 'react'
import { Colours } from 'components'
import { Field } from 'formik'
import 'styled-components/macro'

export default function Textarea(props) {
  return (
    <Field
      css={`
        display: block;
        color: ${Colours.text};
        font-size: 14px;
        font-family: 'Nunito', 'sans-serif';
        margin-top: 5px;
        padding-bottom: 6px;
        padding-right: 6px;
        background: inherit;
        border: none;
        border-bottom: 1px solid ${Colours.border};
        &:hover,
        :focus {
          outline: none;
          background: none;
          border-bottom: 1px solid ${Colours.blue};
        }
        &::placeholder {
          color: ${Colours.placeHolder};
        }
      `}
      {...props}
      component="textarea"
    ></Field>
  )
}
