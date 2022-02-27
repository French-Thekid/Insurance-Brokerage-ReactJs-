import React, { useContext } from 'react'
import 'styled-components/macro'
import LightMode1 from 'assets/LightMode1.png'
import DarkMode1 from 'assets/DarkMode1.png'
import { ColourContext } from 'context'

function Preferences({ mode, setMode }) {
  const {
    Colours,
    setColours,
    mode: M,
    setMode: SM,
  } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        justify-items: center;
        height: 100%;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-rows: 1fr 65px;
          grid-row-gap: 20px;
          justify-items: center;
          height: 100%;
          width: 100%;
        `}
      >
        <div
          css={`
            padding: 20px;
            border-top: 1px solid ${Colours.blue};
            border-bottom: 1px solid ${Colours.blue};
            height: max-content;
            display: grid;
            align-items: center;
            justify-items: center;
            grid-template-rows: 20px 1fr 30px;
            grid-row-gap: 15px;
            background: ${M === 'Dark'
              ? 'rgba(0, 0, 0, 0.3)'
              : 'rgba(0, 0, 0, 0.1)'};
            transition: ease-out 1s;
            height: calc(100% - 40px);
            width: calc(100% - 40px);
          `}
        >
          <h2
            css={`
              font-size: 30px;
              color: ${Colours.text};
              @media (max-width: 769px) {
                font-size: 15px;
              }
            `}
          >
            Themes
          </h2>
          <img
            alt="theme"
            src={
              mode === 'Light' || mode === undefined ? LightMode1 : DarkMode1
            }
            css={`
              transition: ease-out 1s;
              background: ${Colours.foreground};
              border-radius: 5px;
              object-fit: scale-down;
              height: 348px;
              box-shadow: ${mode === 'Dark'
                ? '0px 8px 20px -2px rgba(16,15,28,1)'
                : mode === 'Light' || mode === ''
                ? '0px 8px 20px -2px rgba(196, 196, 196, 1)'
                : 'none'};
              @media screen and (min-width: 1400px) {
                height: 400px;
              }
              @media screen and (max-width: 1200px) {
                height: 248px;
              }
              @media screen and (max-width: 780px) {
                height: 220px;
              }
              @media screen and (max-width: 550px) {
                height: 120px;
              }
              @media screen and (max-width: 320px) {
                height: 100px;
              }
              @media screen and (max-height: 769px) {
                height: 250px;
              }
            `}
          />
          <ActivateButton setColours={setColours} SM={SM} mode={mode}>
            Activate
          </ActivateButton>
        </div>
        <div
          css={`
            display: grid;
            grid-template-columns: max-content max-content;
            grid-column-gap: 20px;
          `}
        >
          <ModeSelectorCard setMode={setMode} mode={mode} light>
            Light Mode
          </ModeSelectorCard>
          <ModeSelectorCard setMode={setMode} mode={mode} dark>
            Dark Mode
          </ModeSelectorCard>
        </div>
      </div>
    </div>
  )
}
export default Preferences

const ActivateButton = ({ SM, setColours, children, mode }) => {
  return (
    <button
      css={`
        padding: 10px 20px 10px 20px;
        outline: none;
        border-radius: 10px;
        color: dodgerblue;
        font-size: 16px;
        border: 2px solid dodgerblue;
        background: white;
        transition: ease-out 0.2s;
        &:hover {
          background: dodgerblue;
          border: 2px solid white;
          color: white;
          cursor: pointer;
          box-shadow: ${mode === 'Dark'
            ? '0px 8px 20px -2px rgba(16,15,28,1)'
            : mode === 'Light' || mode === ''
            ? '0px 8px 20px -2px rgba(196, 196, 196, 1)'
            : 'none'};
          transition: ease-out 0.2s;
          transform: translateY(-2px);
        }
      `}
      type="button"
      onClick={() => {
        if (mode === 'Dark') {
          localStorage.setItem('Theme', 'Dark')
          SM('Dark')
          setColours({
            selectText: '#848484',
            cardBorder: 'black',
            placeHolder: '#E3E3E3',
            text: '#fff',
            border: '#463D5E',
            softBorder: '#F5F5F5',
            background: '#0A071B',
            foreground: '#2A2640',
            blue: '#2699fb',
            cardBackground: '#322f49',
            darkBlue: '#0260B2',
            green: '#08c756',
            red: '#9B0010',
            orange: '#F17F0A',
            yellow: '#FCC339',
            purple: '#B14BB0',
            facebook: '#3b5998',
            google: '#dc4e41',
            seperator: '#EEEEEE',
            inactive: '#BCBCCB',
            active: '#08c756',
            Active: 'rgba(0,115,215,0.3)',
            hover: '#302B4D',
            CollapsibleHeader: '#1E1A34',
            CollapsibleBack: 'inherit',
            menuHover: '#2A2640',
            activeMenu: 'RGBA(38, 153, 251, 0.5)',
            softGrey: '#A4A3CE',
            card: '#636363',
            activeEmail: '#2A2640',
            cardText: '#E2E2E2',
            iconInactive: '#D0D0D0',
            customCardHeader: 'rgb(249, 249, 249)',
            profileBackground: 'inherit',
            textGrey: '#C2C2C2',
            title: '#1E1A34',
            header: '#141124',
            bg1: '#141124',
          })
        } else {
          localStorage.setItem('Theme', 'Light')
          SM('Light')
          setColours({
            title: '#EFF1F8',
            header: '#EFF1F8',
            cardBackground: '#fcfcfc',
            cardText: '#a8a8a8',
            selectText: '#707070',
            cardBorder: '#E7E7E7',
            placeHolder: '#c7c7c7',
            softGrey: 'rgb(249, 249, 249)',
            text: '#767988',
            activeMenu: 'RGBA(38, 153, 251, 0.1)',
            activeEmail: '#EAEAEA',
            menuHover: 'rgb(249, 249, 249)',
            border: '#E7ECF5',
            foreground: '#fff',
            softBorder: '#F5F5F5',
            background: '#F2F6F8',
            blue: '#2E7BFF',
            darkBlue: '#0260B2',
            green: '#1ae835',
            red: '#FF205D',
            orange: '#FFC43A',
            yellow: '#FCC339',
            purple: '#B14BB0',
            facebook: '#3b5998',
            google: '#dc4e41',
            seperator: '#EEEEEE',
            inactive: '#BCBCCB',
            customCardHeader: 'rgb(249, 249, 249)',
            active: '#08c756',
            Active: 'rgba(0,115,215,0.3)',
            hover: '#F2F9FF',
            CollapsibleHeader: '#EBEBEB',
            CollapsibleBack: '#fff',
            card: 'inherit',
            iconInactive: '#D0D0D0',
            bg1: 'inherit',
            textGrey: '#96A6B5',
            profileBackground:
              'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 47%, rgba(233, 233, 233, 1) 100%)',
          })
        }
        // setTimeout(() => window.location.reload(), 500)
      }}
    >
      {children}
    </button>
  )
}

const ModeSelectorCard = ({ setMode, children, dark, light, mode }) => {
  return (
    <div
      css={`
        height: 40px;
        width: max-content;
        border-radius: 5px;
        background: ${dark ? '#0A071B' : '#fff'};
        padding: 10px;
        display: grid;
        align-items: center;
        border: ${((mode === 'Light' ||
          localStorage.getItem('Theme') === null) &&
          light) ||
        (mode === 'Dark' && dark)
          ? '2px solid dodgerBlue'
          : '2px solid transparent'};
        transition: ease-out 0.2s;
        &:hover {
          cursor: pointer;
          box-shadow: ${mode === 'Dark'
            ? '0px 8px 20px -2px rgba(16,15,28,1)'
            : mode === 'Light' || mode === ''
            ? '0px 8px 20px -2px rgba(196, 196, 196, 1)'
            : 'none'};
          transition: ease-out 0.2s;
          transform: translateY(-1px);
          border: 2px solid dodgerblue;
        }
      `}
      onClick={() => {
        if (dark) {
          setMode('Dark')
        } else {
          setMode('Light')
        }
      }}
    >
      <label
        css={`
          font-size: 16px;
          color: ${dark ? '#2699fb' : '#707070'};
          display: grid;
          grid-template-rows: ${
            ((mode === 'Light' || localStorage.getItem('Theme') === null) &&
              light) ||
            (mode === 'Dark' && dark)
              ? 'max-content max-content'
              : 'max-content'
          }};
          grid-row-gap: 5px;
          justify-items: center;
          align-items: center;
          &:hover {
            cursor: pointer;
          }
        `}
      >
        {children}
        {(localStorage.getItem('Theme') === 'Light' ||
          localStorage.getItem('Theme') === null) &&
        light ? (
          <p
            css={`
              margin: 0px;
              color: dodgerblue;
              font-size: 12px;
            `}
          >
            Active
          </p>
        ) : localStorage.getItem('Theme') === 'Dark' && dark ? (
          <p
            css={`
              margin: 0px;
              color: dodgerblue;
              font-size: 12px;
            `}
          >
            Active
          </p>
        ) : null}
      </label>
    </div>
  )
}
