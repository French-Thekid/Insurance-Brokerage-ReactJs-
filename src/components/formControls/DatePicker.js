import 'date-fns'
import React from 'react'
import { withStyles } from '@material-ui/core'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { Colours } from 'components'

export default function ({ id, label, onChangeHandler, value }) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <CustomDatePicker
        disableToolbar
        variant="inline"
        format="dd/MM/yyyy"
        margin="normal"
        id={id}
        label={label}
        value={value}
        onChange={onChangeHandler}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  )
}

//OUR UI Styles
const CustomDatePicker = withStyles({
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
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#E7E7E7',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#2699fb',
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
})(KeyboardDatePicker)
