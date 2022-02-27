import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import styled from 'styled-components'
import moment from 'moment'
import { ColourContext } from 'context'

import { Core } from 'components'
import sun from 'assets/sun_v2.png'
import sunset from 'assets/sunset_v2.png'
import moon from 'assets/moon_v2.png'
import { useHistory } from 'react-router-dom'

function GreetingCard() {
  let [time, setTime] = useState(moment().format('D.ddd.MMM.YYYY HH:mm:ss'))
  setInterval(function () {
    setTime(moment().format('D.ddd.MMM.YYYY HH:mm:ss'))
  }, 1000)
  const { Colours } = useContext(ColourContext)

  function regTime(time) {
    switch (parseInt(time)) {
      case 13:
        return 1
      case 14:
        return 2
      case 15:
        return 3
      case 16:
        return 4
      case 17:
        return 5
      case 18:
        return 6
      case 19:
        return 7
      case 20:
        return 8
      case 21:
        return 9
      case 22:
        return 10
      case 23:
        return 11
      case 24:
        return 12
      default:
        return time
    }
  }

  let hour = parseInt(time.split(' ')[1].split(':')[0])

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 120px 180px;
        @media (min-width: 769px) {
          grid-template-columns: 120px 200px;
        }
        @media (max-width: 769px) {
          grid-template-columns: 120px 180px;
        }
        height: 90px;
        justify-items: left;
        align-items: center;
        background: ${Colours.foreground};
        border-radius: 5px;
        margin-right: 30px;
      `}
    >
      <div
        css={`
          background-color: ${hour < 18
            ? 'rgba(252,195,57,0.1)'
            : hour > 18 && hour < 19
            ? 'rgba(252, 78, 57, 0.1)'
            : 'rgba(0, 43, 134, 0.4)'};
          height: 90px;
          width: 120px;
          display: grid;
          justify-items: center;
          align-items: center;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        `}
      >
        <img
          src={hour < 17 ? sun : hour > 17 && hour < 18 ? sunset : moon}
          alt="TimeIcon"
          height="90px"
          width="90px"
        />
      </div>
      <div
        css={`
          display: grid;
          grid-template-rows: 1fr 30px;
          align-items: center;
          justify-items: left;
          padding: 0px;
          padding-left: 20px;
        `}
      >
        <Core.Text customSize="30px" weight="700">
          {`${regTime(time.split(' ')[1].split(':')[0])}:${
            time.split(' ')[1].split(':')[1]
          }:${time.split(' ')[1].split(':')[2]}`}
        </Core.Text>
        <Core.Text customSize="18px">{new Date().toDateString()}</Core.Text>
      </div>
    </div>
  )
}

function WidgetContainer({
  total,
  colour,
  title,
  path,
  icon,
  width = '40px',
  bgColour,
  last,
}) {
  const history = useHistory()
  const { Colours } = useContext(ColourContext)

  const Wrapper = styled.div`
    height: calc(90px - 20px);
    min-width: 200px;
    margin-right: ${last ? '0px' : '20px'};
    padding: 10px;
    display: grid;
    border-radius: 5px;
    grid-template-columns: auto 1fr;
    grid-column-gap: 20px;
    align-items: center;
    background-color: ${Colours.foreground};
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.09);
    &:hover {
      background-color: ${bgColour};
      cursor: ${path ? 'pointer' : 'initial'};
      box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
        0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08);
      transform: translateY(-1px);
    }
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transition-duration: 0.3s;
  `

  return (
    <Wrapper
      path={path}
      last={last}
      bgColour={bgColour}
      onClick={() => history.push(path)}
    >
      <div
        css={`
          height: 55px;
          width: 55px;
          border-radius: 50%;
          background: ${bgColour};
          display: grid;
          align-items: center;
          justify-items: center;
          ${Wrapper}:hover & {
            background: white;
          }
        `}
      >
        <img
          src={icon}
          alt="widget Icon"
          css={`
            height: 30px;
            width: ${width};
          `}
        />
      </div>
      <div
        css={`
          display: grid;
          grid-template-rows: 15px 1fr;
          grid-row-gap: 15px;
        `}
      >
        <Core.Text color={colour} customSize="22px" weight="600">
          {total}
        </Core.Text>
        <Core.Text customSize="14px" weight="650">
          {title}
        </Core.Text>
      </div>
    </Wrapper>
  )
}

export { GreetingCard, WidgetContainer }
