import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'
import { Icons, Core, Content } from 'components'
import { useHistory } from 'react-router-dom'

export default function ({ noteData }) {
  const history = useHistory()
  const {
    createdAt = '-',
    content = '-',
    section = '-',
    id,
    createdByUser: {
      id: creatorId,
      avatar,
      firstName = '',
      lastName = '',
    },
  } = noteData || {}
  const { Colours } = useContext(ColourContext)

  const myId = JSON.parse(localStorage.getItem('user')).id
  let mode = localStorage.getItem('Theme') || ''

  return (
    <div
      css={`
        width: 300px;
        min-width: 300px;
        max-width: 365px;
        @media (max-width: 769px) {
          max-width: 305px;
        }
        height: 160px;
        background: ${mode === 'Dark' ? '#141124' : 'inherit'};
        border: 1px solid ${Colours.border};
        border-radius: 5px;
        box-shadow: ${mode === 'Dark'
          ? '0px 9px 13px -4px rgba(16,15,28,1)'
          : mode === 'Light' || mode === ''
          ? '0px 9px 13px -4px rgba(245, 245, 250, 1)'
          : 'none'};
        transition: ease-out 0.2s;
        &:hover {
          box-shadow: ${mode === 'Dark'
            ? '0px 9px 13px -6px rgba(16,15,28,1)'
            : mode === 'Light' || mode === ''
            ? '0px 9px 13px -6px rgba(41, 41, 41, 1)'
            : 'none'};
          transform: translateY(-1px);
          transition: ease-out 0.2s;
        }
        transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
        transition-duration: 0.3s;
        display: grid;
        grid-template-rows: 45px 1fr;
        margin: 10px;
        flex: 1;
      `}
    >
      <div
        css={`
          height: calc(100% - 6px);
          background: ${Colours.title};
          border-bottom: 1px solid #dedede;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          display: grid;
          grid-template-columns: 40px 1fr 25px 25px;
          grid-column-gap: 5px;
          align-items: center;
          padding: 5px;
        `}
      >
        <Content.Avatar
          src={avatar}
          firstName={firstName}
          lastName={lastName}
        />
        <Core.Text weight="550">{`${firstName + ' ' + lastName}`}</Core.Text>
        <section
          css={`
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={() => {
            localStorage.setItem('activeNote', JSON.stringify(noteData))
            history.push('?action=editNote')
          }}
        >
          <Icons.EditRounded
            style={{ color: Colours.blue, fontSize: '20px' }}
          />
        </section>
        <section
          css={`
            &:hover {
              cursor: ${myId === creatorId ? 'pointer' : 'not-allowed'};
            }
          `}
          onClick={() => {
            if (myId === creatorId) history.push(`?action=deleteNote&&id=${id}`)
          }}
        >
          <Icons.DeleteRounded
            style={{ color: Colours.red, fontSize: '20px' }}
          />
        </section>
      </div>
      <div
        css={`
          height: calc(100% - 10px);
          display: grid;
          grid-template-rows: 40px 1fr;
          padding: 5px;
        `}
      >
        <div
          css={`
            display: grid;
            grid-template-columns: 1fr max-content;
            grid-gap: 20px;
            align-items: center;
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-columns: max-content 1fr;
              grid-gap: 10px;
            `}
          >
            <Core.Text
              color={mode === 'Dark' ? Colours.softGrey : 'inherit'}
              weight="650"
              customSize="13px"
            >
              Section
            </Core.Text>
            <Core.Text customSize="13px">{section}</Core.Text>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: max-content 1fr;
              grid-gap: 10px;
            `}
          >
            <Core.Text
              color={mode === 'Dark' ? Colours.softGrey : 'inherit'}
              weight="650"
              customSize="13px"
            >
              Created On
            </Core.Text>
            <Core.Text customSize="13px">
              {new Date(parseInt(createdAt)).toDateString()}
            </Core.Text>
          </div>
        </div>
        <div
          css={`
            overflow: auto;
            height: 55px;
            border-top: 0.5px solid ${Colours.border};
            padding-top: 5px;
          `}
        >
          <Core.Text customSize="13px">{content}</Core.Text>
        </div>
      </div>
    </div>
  )
}
