import React from 'react'
import { Colours } from 'components'
import 'styled-components/macro'

const HeaderButton = (props) => {
  const { children, active, addReminder, error } = props
  return (
    <button
      {...props}
      type="button"
      css={`
        height: 40px;
        padding: 10px;
        outline: none;
        border: none;
        border-radius: 5px;
        margin-right: 5px;
        background-color: ${error && addReminder
          ? `${Colours.red}`
          : active
          ? Colours.activeMenu
          : Colours.foreground};
        color: ${error && addReminder
          ? '#fff'
          : active
          ? Colours.blue
          : Colours.text};
        font-size: 17px;
        font-weight: 500;
        &:hover {
          cursor: pointer;
          background-color: ${active
            ? 'rgba(0, 115, 215, 0.3)'
            : Colours.hover};
        }
      `}
    >
      {children}
    </button>
  )
}

function Headers({ setActive, update, addReminder, state = {}, active }) {
  return (
    <div
      css={`
        margin-top: 10px;
        width: max-content;
        display: grid;
        grid-template-columns: repeat(4, max-content);
        grid-column-gap: 15px;
      `}
    >
      <HeaderButton
        active={active === 'EVENTS'}
        onClick={() => setActive('EVENTS')}
      >
        Events
      </HeaderButton>
      {/* <HeaderButton
        active={active === 'REMINDER'}
        onClick={() => setActive('REMINDER')}
        addReminder={addReminder}
        error={
          update &&
          (state.reminderSummary === '' || state.reminderDescription === '')
            ? true
            : false
        }
      >
        Reminder
      </HeaderButton> */}
      <HeaderButton
        active={active === 'USERS'}
        onClick={() => setActive('USERS')}
      >
        {update ? 'Users Invited' : 'Invite Users'}
      </HeaderButton>
    </div>
  )
}
export default Headers
