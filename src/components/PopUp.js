import React, { useContext } from 'react'
import Transition from 'react-transition-group/Transition'
import { Icons, Core } from 'components'
import 'styled-components/macro'
import { ColourContext } from 'context'

const duration = 300

const defaultStyle = {
  position: 'fixed',
  top: '50px',
  right: '-275px',
  zIndex: '1000',
}

const transitionStyles = {
  entered: {
    transform: 'translateX(-100%)',
    transition: `transform ${duration}ms ease-in-out`,
  },
  exiting: {
    transform: 'translateX(100%)',
    transition: `transform ${duration}ms ease-in-out`,
  },
  exited: {
    right: '-270px',
  },
}

const POPUP = ({
  notification,
  title = 'Action Successful!',
  message = '',
  setcompleted,
  fail,
}) => {
  const { Colours, mode } = useContext(ColourContext)

  return (
    <Transition in={notification} timeout={duration} unmountOnExit>
      {(state) => (
        <div
          css={`
            padding: 10px;
            height: max-content;
            backdrop-filter: blur(12px) saturate(180%);
            -webkit-backdrop-filter: blur(12px) saturate(180%);
            background-color: ${mode === 'Dark'
              ? `rgba(17, 25, 40, 0.75)`
              : `rgba(255, 255, 255, 0.9)`};
            border-radius: 8px;
            border: 1px solid rgba(209, 213, 219, 0.3);
            box-shadow: ${mode === 'Dark'
              ? `0px 10px 17px -10px rgba(0,0,0,1)`
              : `0px 10px 17px -10px rgba(92, 92, 92, 1)`};
          `}
          onClick={() => setcompleted(false)}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div
            css={`
              height: max-content;
              width: 260px;
              padding: 0px;
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-row-gap: 10px;
            `}
          >
            <div
              css={`
                display: grid;
                grid-template-columns: max-content 1fr max-content;
                grid-gap: 10px;
              `}
            >
              {fail ? (
                <Icons.LockRoundedIcon style={{ color: Colours.orange }} />
              ) : (
                <Icons.DoneAllRoundedIcon style={{ color: Colours.green }} />
              )}{' '}
              <section
                css={`
                  font-size: 15px;
                `}
              >
                <Core.Text customSize="inherit">{title}</Core.Text>{' '}
              </section>
              <Core.Text customSize="12px" color={Colours.blue}>
                now
              </Core.Text>
            </div>
            <div
              css={`
                font-size: 13px;
              `}
            >
              <Core.Text customSize="inherit">{message}</Core.Text>
            </div>
          </div>
        </div>
      )}
    </Transition>
  )
}

export default POPUP
