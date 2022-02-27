import React, { useContext } from 'react'
import 'styled-components/macro'
import { useHistory } from 'react-router-dom'
import { usePermission } from 'hooks'
import { ColourContext } from 'context'
import { PageHeader } from 'components'

function SlipPreview() {
  const history = useHistory()
  const url = localStorage.getItem('selectedSlip')
  const [permissions, Access] = usePermission()
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
      `}
    >
      <PageHeader
        title="View Slip"
        close={() => {
          history.goBack()
          localStorage.removeItem('selectedSlip')
        }}
      ></PageHeader>
      <div
        css={`
          height: 100%;
        `}
      >
        {permissions.SLIP_READ_TYPEACCOUNT ? (
          <iframe
            src={url}
            title="PDFViewer"
            css={`
              width: 100%;
              height: 100%;
              border: 1px solid ${Colours.border};
              border-radius: 5px;
            `}
          />
        ) : (
          <Access />
        )}
      </div>
    </div>
  )
}

export default SlipPreview
