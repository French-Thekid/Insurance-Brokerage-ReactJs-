import React from 'react'
import 'assets/styles/index.css'

function Toggle(props) {
  let { startwithoff } = props
  return (
    <label className="switch">
      <input
        defaultChecked={startwithoff ? false : true}
        {...props}
        type="checkbox"
      />
      <span className="slider round"></span>
    </label>
  )
}
export default Toggle
