import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import 'styled-components/macro'
import { useSpring, animated, config } from 'react-spring'
import { ColourContext } from '../../context'
import { Colours, Icons, Core } from 'components'

const queryString = require('query-string')

function Footer({
  squeeze = false,
  data = [],
  pagination = {},
  setPagination,
  selectedRows = { rows: [] },
  setSelectedRow,
  disableMultiAction,
  deleteMultipleAction,
  suspendMultipleAction,
  enableMultipleAction,
}) {
  const { Colours } = useContext(ColourContext)
  const history = useHistory()
  const linkAnimation = useSpring({
    from: { transform: 'translate3d(0, 30px, 0)', opacity: 0 },
    to: { transform: 'translate3d(0, 0, 0)', opacity: 1 },
    delay: 800,
    config: config.wobbly,
  })

  const DeleteAll = queryString.stringify({
    action: 'massDelete',
  })
  const SuspendAll = queryString.stringify({
    action: 'massSuspend',
  })
  const EnableAll = queryString.stringify({
    action: 'massEnable',
  })

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr max-content 80px max-content;
        background: ${Colours.title};
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top: 1px solid ${Colours.border};
        padding: 10px;
        align-items: center;
        justify-items: center;
      `}
    >
      {selectedRows.rows.length > 1 &&
      !disableMultiAction &&
      (deleteMultipleAction ||
        suspendMultipleAction ||
        enableMultipleAction) ? (
        <animated.div
          style={linkAnimation}
          css={`
            width: 100%;
            display: grid;
            grid-template-columns: ${squeeze
              ? 'repeat(3,max-content)'
              : '60px max-content max-content'};
            align-items: center;
            justify-items: Center;
          `}
        >
          <div
            css={`
              height: max-content;
              width: 30px;
              border-radius: 50%;
              display: grid;
              align-items: center;
              justify-items: Center;
              &:hover {
                cursor: pointer;
                box-shadow: 0px 12px 18px -6px rgba(151, 151, 151, 0.75);
              }
              background: #edf3ff;
              transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
              transition-duration: 0.1s;
            `}
            onClick={() =>
              setSelectedRow((state) => {
                const rows = []
                return {
                  rows,
                }
              })
            }
          >
            <Icons.ClearRounded style={{ color: Colours.iconActive }} />
          </div>
          {squeeze ? (
            ''
          ) : (
            <p
              css={`
                font-size: 14px;
                color: ${Colours.text};
              `}
            >
              <b
                css={`
                  color: ${Colours.blue};
                `}
              >
                {selectedRows.rows.length}
              </b>{' '}
              Items Selected
            </p>
          )}
          <div
            css={`
              display: flex;
            `}
          >
            {deleteMultipleAction && (
              <Action
                squeeze={squeeze}
                ids={selectedRows.rows}
                action={() => history.push(`?${DeleteAll}`)}
              >
                {squeeze ? '' : 'Delete'}
              </Action>
            )}
            {suspendMultipleAction && (
              <Action
                suspend
                ids={selectedRows.rows}
                action={() => history.push(`?${SuspendAll}`)}
              >
                Suspend
              </Action>
            )}
            {enableMultipleAction && (
              <Action
                enable
                ids={selectedRows.rows}
                action={() => history.push(`?${EnableAll}`)}
              >
                Enable
              </Action>
            )}
          </div>
        </animated.div>
      ) : (
        <div />
      )}
      <section
        css={`
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          if (pagination.start >= 10)
            setPagination({
              start: pagination.start - 10,
              end:
                data.length > pagination.end - 10 && pagination.end % 10 === 0
                  ? pagination.end - 10
                  : pagination.end - (pagination.end % 10),
            })
        }}
      >
        <Icons.ArrowBackIosRounded
          style={{
            color: pagination.start < 10 ? Colours.inactive : Colours.blue,
          }}
        />
      </section>
      <p
        css={`
          color: ${Colours.text};
          font-size: 16px;
          margin: 0px;
        `}
      >
        {data.length < 10
          ? `${data.length} of ${data.length}`
          : `${pagination.end} of ${data.length}`}
      </p>
      <section
        css={`
          &:hover {
            cursor: pointer;
          }
        `}
        onClick={() => {
          if (data.length > pagination.end)
            setPagination({
              start: pagination.start + 10,
              end:
                data.length < pagination.end + 10
                  ? data.length
                  : pagination.end + 10,
            })
        }}
      >
        <Icons.ArrowForwardIosRounded
          style={{
            color:
              data.length <= pagination.end ? Colours.inactive : Colours.blue,
          }}
        />
      </section>
    </div>
  )
}

const Action = ({ squeeze, children, action, ids, suspend, enable }) => {
  return (
    <div
      css={`
        height: max-content;
        padding: 5px 20px;
        color: ${suspend
          ? Colours.orange
          : enable
          ? Colours.blue
          : Colours.red};
        font-size: 14px;
        background: ${suspend
          ? Colours.orange
          : enable
          ? Colours.blue
          : Colours.red};
        border-radius: 5px;
        margin-left: ${squeeze ? '10px' : '40px'};
        display: grid;
        grid-template-columns: repeat(2, max-content);
        grid-column-gap: 5px;
        align-items: Center;
        transition: ease-out 0.2s;
        &:hover {
          cursor: pointer;
          box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
            0 3.5px 12.6px rgba(0, 0, 0, 0.037), 0 10px 35px rgba(0, 0, 0, 0.08);
          transition: ease-out 0.2s;
          transform: translateY(-2px);
        }
        transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
        transition-duration: 0.1s;
        @media screen and (max-width: 769px) {
          grid-template-columns: max-content;
        }
      `}
      onClick={() => action(ids)}
    >
      {children === 'Suspend' ? (
        <Icons.PauseCircleOutlineRoundedIcon
          style={{
            color: '#fff',
            fontSize: '16px',
          }}
        />
      ) : children === 'Enable' ? (
        <Icons.PlayCircleOutlineRoundedIcon
          style={{
            color: '#fff',
            fontSize: '16px',
          }}
        />
      ) : (
        <Icons.DeleteRounded
          style={{
            color: '#fff',
            fontSize: '16px',
          }}
        />
      )}{' '}
      <section
        css={`
          @media screen and (max-width: 769px) {
            display: none;
          }
        `}
      >
        <section
          css={`
            @media screen and (max-width: 769px) {
              display: none;
            }
          `}
        >
          <Core.Text color="#fff">{children}</Core.Text>
        </section>
      </section>
    </div>
  )
}

export default Footer
