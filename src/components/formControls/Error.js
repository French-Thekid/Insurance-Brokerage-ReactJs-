import React from 'react'
import 'styled-components/macro'
import Colours from '../Colours'
import { ErrorMessage } from 'formik'

export default function Error({ show, message, ...rest }) {
  return (
    <ErrorMessage>
      {() => (
        <p
          css={`
            font-size: 12px;
            margin: 0px;
            color: ${Colours.red};
          `}
          {...rest}
        >
          {show && message}
        </p>
      )}
    </ErrorMessage>
  )
}
