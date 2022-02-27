import React, { useContext } from 'react'
import { TextField, withStyles } from '@material-ui/core'
import 'styled-components/macro'
import InputMask from 'react-input-mask'
import { Colours, Icons } from 'components'
import { ColourContext } from 'context'

//OUR UI Styles
const CustomTextField = withStyles({
  // disabled: {},
  root: {
    '& input': {
      color: Colours.text,
    },
    '& label.Mui-focused': {
      color: '#2699fb',
    },
    '& label': {
      color: Colours.text,
    },
    '& .MuiInput-underline': {
      '&:hover:not($disabled):before': {
        borderBottomColor: '#2699fb', //its when you hover and input is not foucused
      },
      '&:hover:not($disabled):after': {
        borderBottomColor: '#2699fb', //its when you hover and input is foucused
      },
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#E7E7E7',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#2699fb',
      },
    },
  },
})(TextField)

function Input(props) {
  const {
    min,
    max,
    mask = '',
    disabled,
    multiline = false,
    rows,
    ...rest
  } = props
  return multiline ? (
    <CustomTextField
      multiline={multiline}
      rows={rows}
      InputProps={{
        inputProps: { min, max },
      }}
      {...rest}
      fullWidth
    />
  ) : (
    <InputMask mask={mask} {...rest} disabled={disabled} maskChar=" ">
      {() => (
        <CustomTextField
          disabled={disabled}
          InputProps={{
            inputProps: { min, max },
          }}
          InputLabelProps={{
            shrink: props.type === 'date' ? true : props.isFocussed,
          }}
          {...rest}
          fullWidth
        />
      )}
    </InputMask>
  )
}

export default Input

export const InputWithImage = (props) => {
  const {
    containerWidth = '100%',
    action,
    value,
    onChange,
    placeholder,
    name,
    small,
  } = props

  const { Colours } = useContext(ColourContext)
  return (
    <div
      css={`
        display: grid;
        width: ${containerWidth};
        grid-template-columns: calc(${containerWidth} - 37px) max-content;
        align-items: end;
        border: none;
        font-family: 'Nunito', 'sans-serif';
        border: 1px solid ${Colours.border};
        background: ${Colours.foreground};
        border-radius: 5px;
        height: ${small ? '25px' : '30px'};
        &:hover,
        :focus {
          outline: none;
          border: 1px solid ${Colours.blue};
        }
      `}
    >
      <div
        css={`
          padding-left: 5px;
          padding-bottom: 2px;
        `}
      >
        <input
          css={`
            display: flex;
            width: 100%;
            border: none;
            font-size: 16px;
            color: ${Colours.text};
            background: none;
            &:hover,
            :focus {
              outline: none;
              background: inherit;
            }
            &::placeholder {
              color: ${Colours.textGrey};
              font-size: 14px;
            }
          `}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
        >
          {props.children}
        </input>
      </div>
      <div
        onClick={action}
        css={`
          border-left: 1px solid ${Colours.border};
          height: 100%;
          width: 37px;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;
          border: none;
          outline: none;
          background: ${Colours.border};
          color: ${Colours.icon};
          &:hover,
          :focus {
            background: ${Colours.blue};
            cursor: pointer;
            color: #fff;
          }
          display: grid;
          place-items: center;
        `}
      >
        <Icons.SearchRoundedIcon style={{ color: 'inherit' }} />
      </div>
    </div>
  )
}
