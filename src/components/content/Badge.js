import React from 'react'
import { Core } from '..'

function Badge(props) {
  return (
    <Core.Box
      display="inline-block"
      pd="2px 4px"
      bg={props.bg || 'black'}
      width="max-content"
      radius="2px"
      {...props}
    >
      <Core.Text size="sm" color={props.color || 'white'}>
        {props.text}
      </Core.Text>
    </Core.Box>
  )
}
export default Badge
