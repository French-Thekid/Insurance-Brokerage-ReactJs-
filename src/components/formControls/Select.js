import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import { Colours } from 'components'

const styles = (theme) => ({
  root: {
    '& input': {
      color: Colours.text,
    },
    display: 'flex',
    flexWrap: 'wrap',
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
  formControl: {
    minWidth: 120,
    width: '100%',
  },
})

function SimpleSelect(props) {
  const { label, value, name, groups, action, handlechange, onBlur } = props

  const { classes } = props

  return (
    <div className={classes.root}>
      <FormControl
        className={classes.formControl}
        onClick={(e) => {
          if (action) action(e.target.value)
        }}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          id={name}
          name={name}
          onChange={handlechange}
          onBlur={onBlur}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {groups.map(({ label, value }, index) => (
            <MenuItem key={index} value={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

SimpleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleSelect)
