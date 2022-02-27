import React, { useState, useContext } from 'react'
import { Core, Content, Icons, Layout } from 'components'
import 'styled-components/macro'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'
import { useHistory } from 'react-router'
import { ColourContext } from 'context'

const Hover = styled(Core.Box)`
  box-shadow: 0 2px 2px -1px rgba(152, 162, 179, 0.3),
    0 1px 5px -2px rgba(152, 162, 179, 0.3);
  ${(props) =>
    props.disableHover
      ? null
      : 'transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);transition-duration: 0.3s;'}

  &:hover {
    ${(props) =>
      props.disableHover
        ? null
        : 'box-shadow:0 1.7px 3.5px rgba(0, 0, 0, 0.016),0 3.5px 12.6px rgba(0, 0, 0, 0.037),0 10px 35px rgba(0, 0, 0, 0.08);transform: translateY(-2px);'};
  }
`
function TitleCard(props) {
  let mode = localStorage.getItem('Theme') || ''
  const { Colours } = useContext(ColourContext)

  return (
    <>
      <Hover
        style={{
          overflow: 'hidden',
        }}
        radius="4px"
        height="auto"
        color={'black'}
        border={`1px solid ${Colours.border}`}
        mg="20px"
        bg={Colours.foreground}
        pd="0px"
        {...props}
      >
        <Core.Box
          bg={Colours.menuHover}
          pd="12px"
          bb={`1px solid ${Colours.border}`}
          pos="sticky"
          top="0px"
          z={1}
        >
          <Layout.Flex justify="space-between" align="center">
            <Core.Text align="left" size="rg" weight="700" pd="12px">
              {props.title || props.name}
            </Core.Text>
            <Core.Box pd="0px">{props.titleAside || null}</Core.Box>
          </Layout.Flex>
        </Core.Box>

        <Core.Box
          bg={mode === 'Dark' ? '#141124' : 'inherit'}
          pd={props.bodyPadding || '8px'}
        >
          {props.children}
        </Core.Box>
      </Hover>
    </>
  )
}

export default TitleCard

export const TitleCard1 = ({
  title,
  props,
  deleteQuery,
  date,
  description,
  ...rest
}) => {
  const { Colours } = useContext(ColourContext)
  const [showMenu, setshowMenu] = useState(false)
  const history = useHistory()
  let mode = localStorage.getItem('Theme') || ''

  return (
    <Fade bottom>
      <div
        {...rest}
        css={`
          margin-top: 2px;
          height: 200px;
          min-height: 160px;
          width: 300px;
          display: grid;
          grid-template-rows: max-content 1fr max-content;
          grid-rows: 10px;
          border: 1px solid ${Colours.border};
          border-radius: 5px;
          overflow-y: auto;
          box-shadow: ${mode === 'Dark'
            ? '0px 0px 2px 0px rgba(16,15,28,1)'
            : mode === 'Light' || mode === ''
            ? '0px 6px 6px -6px rgba(16,15,28,0.6)'
            : 'none'};
          &:hover {
            cursor: pointer;
            box-shadow: ${mode === 'Dark'
              ? '0px 3px 13px -6px rgba(16,15,28,1)'
              : mode === 'Light' || mode === ''
              ? '0px 3px 13px -6px rgba(16,15,28,1)'
              : 'none'};
            transition: ease-out 0.2s;
            transform: translateY(-1px);
          }
          background: ${mode === 'Dark' ? '#141124' : 'inherit'};
        `}
      >
        <div
          css={`
            border-bottom: 1px solid ${Colours.border};
            display: grid;
            grid-template-columns: 1fr max-content;
            padding: 0px 0px 3px 0px;
            align-items: center;
            background: ${mode === 'Dark' ? '#1E1A34' : Colours.title};
            padding: 10px;
          `}
        >
          <div
            css={`
              border-radius: 25px;
              width: max-content;
              place-items: center;
              display: grid;
            `}
          >
            <Core.Text customSize="18px">{title}</Core.Text>
          </div>

          <div
            css={`
              color: ${Colours.textGrey};
              height: max-content;
              display: grid;
              place-items: center;
              &:hover {
                cursor: pointer;
                color: ${Colours.blue};
              }
              position: relative;
            `}
          >
            <section
              onClick={() => {
                setshowMenu(true)
              }}
            >
              <Icons.MoreVertIcon />
            </section>

            <Content.Menu
              right="10px"
              top="150px"
              show={showMenu}
              action={setshowMenu}
            >
              <Content.MenuItems
                title={'Edit'}
                Icon={Icons.EditRounded}
                setshowMenu={setshowMenu}
                action={() =>
                  history.push(`/broker/settings/workflows/editor`, {
                    update: props.data,
                  })
                }
              />
              <Content.MenuItems
                title={'Remove'}
                Icon={Icons.DeleteRoundedIcon}
                setshowMenu={setshowMenu}
                path={`?${deleteQuery}`}
              />
            </Content.Menu>
          </div>
        </div>
        <div
          css={`
            margin-top: 5px;
            margin-bottom: 5px;
            overflow-y: auto;
            display: grid;
            grid-template-rows: 1fr;
            padding: 10px;
          `}
        >
          <Core.Text weight="500" customSize="16px">
            {description}
          </Core.Text>
        </div>
        <div
          css={`
            display: grid;
            align-items: center;
            border-top: 1px solid ${Colours.border};
            grid-template-columns: max-content 1fr max-content;
            grid-gap: 10px;
            padding: 10px;
          `}
        >
          <Content.Avatar
            src={''}
            firstName={'D'}
            lastName={'B'}
            size="small"
          />
          <div
            css={`
              display: grid;
              grid-template-rows: repeat(2, max-content);
              grid-gap: 2px;
            `}
          >
            <Core.Text customSize="12px">{'Darryl Brown'}</Core.Text>
            <div
              css={`
                padding: 0px 5px;
                background-color: ${Colours.blue};
                border-radius: 25px;
                width: max-content;
                display: grid;
                justify-items: center;
              `}
            >
              <Core.Text customSize="12px" color={'#fff'}>
                {'Administrator'}
              </Core.Text>
            </div>
          </div>
          <Core.Text color={Colours.textGrey}>{date}</Core.Text>
        </div>
      </div>
    </Fade>
  )
}
