import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

import { Core } from 'components'

export default function Navigations({ special, page, setPage, update }) {
  return update ? (
    <div>
      <Tabs
        page={{ active: `Details & Time` }}
        setPage={() => {}}
        title={`Details & Time`}
      />
    </div>
  ) : (
    <div
      css={`
        display: grid;
        grid-template-columns: ${special
          ? 'repeat(2, max-content)'
          : 'repeat(3, max-content)'};
        grid-gap: 10px;
      `}
    >
      {!special && (
        <Tabs page={page} setPage={setPage} title="Patient Attendee" />
      )}
      <Tabs page={page} setPage={setPage} title="Doctor Attendee" />
      <Tabs page={page} setPage={setPage} title={`Details & Time`} />
    </div>
  )
}

const Tabs = ({ title, page, setPage }) => {
  const { Colours } = useContext(ColourContext)
  return (
    <div
      css={`
        padding: 10px;
        width: max-content;
        background: ${title === page.active ? '#F6F3FF' : '#fff'};
        border-radius: 10px;
        display: grid;
        place-items: center;
        transition: ease-in-out 1s;
        &:hover {
          cursor: pointer;
          transition: ease-out 0.2s;
        }
      `}
      onClick={() =>
        setPage((prevState) => {
          return {
            active: title,
            main:
              prevState.patientCreated && title === 'Patient Attendee'
                ? false
                : true,
            patientCreated: prevState.patientCreated,
          }
        })
      }
    >
      <Core.Text
        color={title === page.active ? Colours.purple : Colours.textGrey}
      >
        {title}
      </Core.Text>
    </div>
  )
}
