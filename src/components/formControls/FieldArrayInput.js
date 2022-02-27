import React from 'react'
import { Field } from 'formik'
import { css } from 'styled-components'
import 'styled-components/macro'
import { Colours } from 'components'

export default function Input(props) {
  const {
    minwidth = '270px',
    width = 'calc(100% - 6px)',
    margin = '0px',
  } = props
  return (
    <Field
      css={`
        display: block;
        width: ${width};
        min-width: ${minwidth};
        border: none;
        font-family: 'Nunito', 'sans-serif';
        border-bottom: 1px solid ${Colours.border};
        font-size: 14px;
        color: ${props.type === 'date' && props.value === ''
          ? Colours.placeHolder
          : Colours.text};
        background: ${props.disabled ? '#CECECE' : 'none'};
        padding-bottom: 3px;
        padding-left: 5px;
        padding-top: ${margin === '2px' ? '0px' : '6px'};
        margin-top: 5px;
        margin-bottom: 0px;
        height: ${margin === '2px' ? '14px' : 'max-content'}Z;
        &:hover,
        :focus {
          outline: none;
          background: ${props.disabled ? '#CECECE' : 'none'};
          cursor: ${props.disabled ? 'not-allowed' : 'arrow'};
          border-bottom: 1px solid ${Colours.blue};
        }
        &::placeholder {
          color: ${Colours.placeHolder};
        }
        ${(props) =>
          props.error
            ? css`
                border-bottom: 1px solid ${Colours.red};
              `
            : css`
                border-bottom: 1px solid
                  ${props.white ? 'white' : Colours.border};
              `}
      `}
      {...props}
    >
      {props.children}
    </Field>
  )
}
