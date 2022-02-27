import React from 'react'
import 'styled-components/macro'
import { Colours } from 'components'

function hasLowerCase(str) {
  return /[a-z]/.test(str)
}
function hasUpperCase(str) {
  return /[A-Z]/.test(str)
}
function hasDigits(str) {
  return /[0-9]/.test(str)
}
function hasSymbols(str) {
  return /[@_!#$%^&*()<>?/}{~:]/.test(str)
}

function PasswordStrength({ password }) {
  let strength = ''
  const length = password.length
  let color = Colours.softGrey
  let width = '0px'

  if (length === 0) strength = ''
  if (length > 0) {
    if (
      length < 8 ||
      !hasLowerCase(password) ||
      !hasUpperCase(password) ||
      !hasDigits(password)
    ) {
      color = Colours.red
      strength = 'Too Weak!'
      width = '50px'
    }
    if (
      length >= 8 &&
      hasLowerCase(password) &&
      hasUpperCase(password) &&
      hasDigits(password) &&
      !hasSymbols(password)
    ) {
      color = Colours.yellow
      strength = 'Could be stronger'
      width = '100px'
    }
    if (
      length > 8 &&
      hasLowerCase(password) &&
      hasUpperCase(password) &&
      hasDigits(password) &&
      hasSymbols(password)
    ) {
      color = Colours.green
      strength = 'Strong Password'
      width = '150px'
    }
  }

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 150px max-content;
        grid-column-gap: 8px;
        align-items: center;
        margin-top: 10px;
      `}
    >
      <div
        css={`
          width: 150px;
          height: 5px;
          border-radius: 10px;
          background: ${Colours.softGrey};
        `}
      >
        <div
          css={`
            height: 5px;
            width: ${width};
            border-radius: 10px;
            background: ${color};
          `}
        />
      </div>
      <p
        css={`
          margin: 0px;
          padding: 0px;
          color: ${color};
        `}
      >
        <b>{strength}</b>
      </p>
    </div>
  )
}
export default PasswordStrength
