import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

import { Core } from 'components'

const Container = ({ first, EmailToDisplay, setEmailToDisplay, children }) => {
  const { Colours, mode } = useContext(ColourContext)

  return (
    <div
      css={`
        border-right: ${first ? `1px solid ${Colours.border}` : 'none'};
        display: grid;
        align-items: center;
        justify-items: center;
        background: ${EmailToDisplay === children.toString()
          ? Colours.activeMenu
          : Colours.foreground};
        &:hover {
          cursor: pointer;
          background: ${mode === 'Dark' ? Colours.title : Colours.softGrey};
        }
        padding: 0px 10px;
      `}
      onClick={() => setEmailToDisplay(children.toString())}
    >
      <Core.Text
        weight="600"
        color={
          EmailToDisplay === children.toString() ? Colours.blue : Colours.text
        }
      >
        {children}
      </Core.Text>
    </div>
  )
}
export default function Header({ EmailToDisplay, setEmailToDisplay }) {
  const { Colours } = useContext(ColourContext)
  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr 1fr;
        height: 30px;
        border-bottom: 1px solid ${Colours.border};
        border-top: 1px solid ${Colours.border};
      `}
    >
      <Container
        first
        EmailToDisplay={EmailToDisplay}
        setEmailToDisplay={setEmailToDisplay}
      >
        Inbox
      </Container>
      <Container
        EmailToDisplay={EmailToDisplay}
        setEmailToDisplay={setEmailToDisplay}
      >
        Sent
      </Container>
    </div>
  )
}
