import React, { createContext, useState } from 'react'

const ColourContext = createContext({})
const { Provider } = ColourContext
function ColourProvider({ children }) {
  const [mode, setMode] = useState(localStorage.getItem('Theme') || 'Light')
  const [Colours, setColours] = useState(
    localStorage.getItem('Theme') === 'Dark'
      ? {
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
          bg1: '#141124',
          header: '#141124',
        }
      : {
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
          background: '#E8EBF2',
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
          CollapsibleHeader: '#fff',
          CollapsibleBack: 'rgb(70, 135, 258, 0.05)',
          card: 'inherit',
          iconInactive: '#D0D0D0',
          bg1: 'inherit',
          textGrey: '#96A6B5',
          profileBackground:
            'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 47%, rgba(233, 233, 233, 1) 100%)',
        }
  )

  const Values = { Colours, setColours, mode, setMode }
  return <Provider value={Values}>{children}</Provider>
}

export { ColourContext, ColourProvider }
