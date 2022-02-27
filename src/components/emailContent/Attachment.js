import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

import { Icons, Core } from 'components'

function Attachment({ attachment, setShowAttachment }) {
  const { Colours } = useContext(ColourContext)
  return (
    <div
      css={`
        display: grid;
        grid-template-rows: repeat(2, max-content);
        grid-row-gap: 5px;
        width: 150px;
        &:hover {
          cursor: zoom-in;
        }
      `}
    >
      <Icons.DescriptionRoundedIcon
        style={{ fontSize: '150px', color: Colours.blue }}
      />
      <Core.Text Contained>{attachment.name}</Core.Text>
    </div>
  )
}

export default Attachment
