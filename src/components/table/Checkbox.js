import React, { useState, useContext, useEffect } from 'react'
import 'styled-components/macro'
import { ColourContext } from '../../context'
import { Icons } from 'components'

function Checkbox(props) {
  const [checked, setChecked] = useState(props.state || false)
  const { actions = () => {} } = props
  const { Colours } = useContext(ColourContext)
  useEffect(() => {
    setChecked(props.state)
  }, [props.state])

  return (
    <div
      {...props}
      onClick={() => {
        setChecked(!checked)
        actions(!checked)
      }}
      css={`
        height: ${checked ? '20px' : '15px'};
        width: ${checked ? '20px' : '15px'};
        border-radius: 3px;
        border: ${checked ? 'none' : `2px solid #C2C2C2`};
        border: 1px solid ${Colours.blue};
        transition: ease-out 0.1s;
        &:hover {
          transition: ease-out 0.1s;
          cursor: pointer;
          border: ${checked ? 'none' : `2px solid ${Colours.blue}`};
        }
        display: grid;
        align-items: center;
        justify-items: center;
        background: ${checked ? Colours.blue : Colours.foreground};
      `}
    >
      {checked ? (
        <Icons.CheckRounded
          style={{ color: 'white', width: '20px', height: '20px' }}
        />
      ) : null}
    </div>
  )
}

export default Checkbox
