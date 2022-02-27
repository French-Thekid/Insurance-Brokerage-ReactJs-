import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'
import { Core, Icons, ImageWithStatus, Content } from 'components'
import { useHistory } from 'react-router-dom'

export default function Card({
  id,
  avatar,
  firstName,
  lastName,
  companyName,
  email,
  Broker = false,
  active,
  personId,
  type,
}) {
  const history = useHistory()
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        border: 1px solid ${Colours.border};
        height: calc(60px - 20px);
        width: 295px;
        border-radius: 5px;
        margin: 10px;
        display: grid;
        grid-template-columns: 35px 195px 25px;
        grid-column-gap: 20px;
        @media (max-width: 376px) {
          grid-template-columns: 35px 175px 25px;
          width: 275px;
        }
        @media (min-width: 1023px) {
          grid-template-columns: 35px 160px 25px;
          width: 245px;
          grid-column-gap: 15px;
          margin: 5px;
        }
        align-items: center;
        padding: 10px;

        margin-bottom: 10px;
        &:hover {
          cursor: pointer;
          box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
            0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08);
          transform: translateY(-1px);
          border: 0.1px solid ${Colours.blue};
        }
        transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
        transition-duration: 0.3s;
      `}
      onClick={() => {
        if (!Broker) localStorage.setItem('Active#', personId)
        if (Broker === false) history.push(`/broker/account/details/${id}`)
        else history.push(`/broker/users/view-user/${id}`)
      }}
    >
      {Broker ? (
        <ImageWithStatus
          src={avatar}
          size="medium"
          alt="Broker"
          active={active}
          firstName={firstName}
          lastName={lastName}
        />
      ) : (
        <Content.Avatar
          src={avatar}
          firstName={type === 'individual' ? firstName : companyName}
          lastName={type === 'individual' ? lastName : companyName}
        />
      )}
      <section>
        <Core.Text weight="650" size="sm" Contained>
          <>
            {Broker && `${firstName} ${lastName}`}
            {!Broker && type === 'individual'
              ? `${firstName} ${lastName}`
              : companyName}
          </>
        </Core.Text>
        <Core.Text size="sm" Contained>
          {email}
        </Core.Text>
      </section>
      <Icons.OpenInNewRounded style={{ color: Colours.blue }} />
    </div>
  )
}
