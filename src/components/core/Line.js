import React from 'react'
import Box from './Box'

/**
 * Draw a horizaontal or vertical line.
 * @prop {string} variant - h for horizontal and v for vertical.
 * @prop {string} thickness - Specified in css units.
 * @prop {string} length - Specified in css units.
 * @prop {string} color - color of the line.
 */
function Line(props) {
  return (
    <Box
      {...props}
      style={{ display: props.display || 'flex' }}
      bt={`${props.variant === 'h' ? props.thickness || '1px' : 'none'} solid ${
        props.color
      }`}
      bl={`${props.variant === 'v' ? props.thickness || '1px' : 'none'} solid ${
        props.color
      }`}
      radius="0px"
      width={props.variant === 'h' ? props.length : '1px'}
      height={props.variant === 'v' ? props.length : '1px'}
    />
  )
}

export default Line
