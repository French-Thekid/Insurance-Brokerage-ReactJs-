import React, { useContext } from 'react'
import { Core } from 'components'
import { ColourContext } from 'context'

function Card(props) {
  const mode = localStorage.getItem('Theme') || ''
  const { Colours } = useContext(ColourContext)

  return (
    <>
      <Core.Box
        style={{
          overflow: 'hidden',
          boxShadow:
            mode === 'Dark'
              ? '0px 3px 13px -6px rgba(16,15,28,1)'
              : mode === 'Light' || mode === ''
              ? '0px 3px 13px -6px rgba(41, 41, 41, 1)'
              : 'none',
        }}
        radius="4px"
        height="auto"
        color={Colours.text}
        border={`1px solid ${Colours.border}`}
        mg="20px"
        bg={Colours.foreground}
        pd={props.bodyPadding || '8px'}
        cursor={props.onClick ? 'pointer' : 'initial'}
        {...props}
      >
        <Core.Box cursor={props.onClick ? 'pointer' : 'initial'}>
          {props.children}
        </Core.Box>
      </Core.Box>
    </>
  )
}

export default Card
