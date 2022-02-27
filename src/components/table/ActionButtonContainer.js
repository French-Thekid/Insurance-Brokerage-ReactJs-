import React from 'react'
import 'styled-components/macro'

export default function ActionButtonContainer({
  children,
  noRight,
  action,
  numOfRows,
  id,
  data,
  dataSetId,
  ...rest
}) {
  return (
    <div
      {...rest}
      css={`
        margin-right: ${noRight ? '0px' : '10px'};
        &:hover {
          cursor: ${numOfRows <= 1 ? 'pointer' : 'not-allowed'};
        }
      `}
      onClick={() => {
        if (numOfRows <= 1) {
          if (id === 'edit') action(data)
          else action(dataSetId)
        }
      }}
    >
      {children}
    </div>
  )
}
