import React from 'react'
import styled from 'styled-components'
import Colours from './Colours'
import { toast } from 'react-toastify'

function openNotificationURL(url, pref) {
  switch (pref) {
    case 'self':
      window.open(window.location.origin + url, '_self').focus()
      break
    case 'new':
      window.open(window.location.origin + url, '_blank').focus()
      break
    default:
      break
  }
}

/**
 * Notification popup component
 * @prop {string} eventType - notification event type .
 * @prop {string} title - the text appearing on the header of the notification popup.
 * @prop {string} body - the text appearing in the body of the notification popup.
 * @prop {string} titleBackground - title background colour, default black.
 * @prop {string} notificationUrl - url to open notification to.
 * @prop {string} titleColour - title foreground colourde, fault black.
 */
export const Notification = (options, config) => {
  return toast(<NotificationBase {...options} />, config)
}

/**
 * Notification popup component
 * @prop {string} eventType - notification event type .
 * @prop {string} title - the text appearing on the header of the notification popup.
 * @prop {string} body - the text appearing in the body of the notification popup.
 * @prop {string} titleBackground - title background colour, default black.
 * @prop {string} notificationUrl - url to open notification to.
 * @prop {string} titleColour - title foreground colourde, fault black.
 */
function NotificationBase(props) {
  const Container = styled.div`
    background: #f9f9f9;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    max-width: 310px;
    min-height: 100px;
    margin-bottom: 12px;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.2);
    .open-button {
      padding: 6px 12px;
      background: ${props.titleBackground || Colours.blue};
      border: none;
      color: ${props.titleColour || 'white'};
      border-radius: 2px;
      margin-right: 4px;
    }
  `
  return (
    <Container role="alert">
      <Title
        background={props.titleBackground}
        colour={props.titleColour}
        title={props.title}
        notificationUrl={props.notificationUrl}
        eventType={props.eventType}
        handle={props.closeToast}
      />
      <Body title={props.title} body={props.body} />
      {props.notificationUrl && (
        <div
          style={{ display: 'flex', justifyContent: 'start', padding: '12px' }}
        >
          <button
            title="open"
            className="open-button"
            style={{ cursor: 'pointer' }}
            onClick={() => openNotificationURL(props.notificationUrl, 'self')}
          >
            Open
          </button>
          <button
            title="open"
            className="open-button"
            style={{ cursor: 'pointer' }}
            onClick={() => openNotificationURL(props.notificationUrl, 'new')}
          >
            Open in new tab
          </button>
        </div>
      )}
    </Container>
  )
}

function Title(props) {
  const StyledTitle = styled.div`
    background: ${props.background || Colours.blue};
    display: flex;
    min-height: 28px;
    padding: 6px 4px;
    & > h4 {
      color: ${props.colour || '#fff'};
      width: 280px;
      font-weight: 500;
      font-size: 16px;
      padding: 6px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    & > button {
      background: ${props.background || Colours.blue};
      color: ${props.colour || '#fff'};
      border: none;
      width: 40px;
      padding-top: 2px;
    }
    & > button:hover {
      filter: brightness(1.2);
    }
    svg {
      position: absolute;
      fill: ${props.background || 'none'};
      transform: translate(-12px, -12px);
    }
  `
  return (
    <StyledTitle>
      <h4>{props.eventType || 'Notification'}</h4>
      <button
        title="dismiss"
        style={{ cursor: 'pointer' }}
        onClick={() => props.handle()}
      >
        <CloseIcon />
      </button>
    </StyledTitle>
  )
}

function Body(props) {
  const Inner = styled.div`
    padding: 12px 8px;
    font-size: 12px;
    color: #4c5760;
    max-height:100px
    overflow-y: hidden;
  `
  return (
    <Inner>
      <h3>{props.title}</h3>
      <br />
      {props.body}
    </Inner>
  )
}

function SVG(props) {
  return (
    <svg
      width="28px"
      height="28px"
      viewBox="0 0 28 28"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      stroke="currentColor"
      strokeWidth="2px"
    >
      {props.children}
    </svg>
  )
}
function CloseIcon() {
  return (
    <SVG>
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </SVG>
  )
}
