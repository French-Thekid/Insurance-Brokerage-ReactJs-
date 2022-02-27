import React, { useEffect, useState } from 'react'
import {
  Colours,
  Content,
  Core,
  Icons,
  Layout,
  Loading,
} from '../../../../../components'
import 'styled-components/macro'
import styled, { keyframes } from 'styled-components'

const Pulsar = keyframes`
0%   {
    box-shadow:0px 0px 0px 2px #50afffe8,0px 0px 0px 2px #9fd3ffe8;}
    
    25%  {
    box-shadow:0px 0px 0px 2px #50afffe8,0px 0px 0px 4px #9fd3ffe8;}
    
    50%  {
    box-shadow:0px 0px 0px 4px #50afffe8,0px 0px 0px 6px #9fd3ffe8;}
    
    75%  {
    box-shadow:0px 0px 0px 4px #50afffe8,0px 0px 0px 8px #9fd3ffe8;}
    
    100% {
    box-shadow:0px 0px 0px 2px #50afffe8),0px 0px 0px 4px #9fd3ffe8;}
`

const Box = styled(Core.Box)`
  backdrop-filter: blur(10px);
  background: gba(255, 255, 255, 0.85);
  transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
  transition-duration: 0.5s;
  border: 2px solid transparent;
  box-shadow: 0 6px 24px 0 rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.08);
  &:hover {
    border: 2px solid #b4bbb9;
  }
  animation: infinite 2s ${Pulsar} cubic-bezier(0.17, 0.67, 0.83, 0.67);
`

function WorkflowHUD({ history, data }) {
  data.setHistory(history)
  const { walkthrough, RouteData } = data
  const [minimized, setMinimized] = useState(false)
  const toggle = () => {
    setMinimized(!minimized)
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (walkthrough) {
      setLoading(false)
      if (walkthrough.currentIndex === 0) {
        history.push(RouteData(walkthrough.currentStep.name))
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walkthrough])

  if (loading) {
    return (
      <Core.Portal>
        <Core.Box
          z="8"
          pos="fixed"
          width="100vw"
          style={{ pointerEvents: 'none' }}
        >
          <Loading small />
        </Core.Box>
      </Core.Portal>
    )
  }
  return (
    <Core.Portal>
      <Core.Box
        z="8"
        pos="fixed"
        width="100vw"
        style={{ pointerEvents: 'none' }}
      >
        <Layout.Flex justify="center" align="center">
          {minimized ? (
            <Box
              style={{ pointerEvents: 'all' }}
              radius="4px"
              pd="4px"
              textAlign="left"
              width="80px"
            >
              <Layout.Flex justify="space-between" align="center">
                <Content.Badge
                  bg={Colours.blue}
                  color={Colours.foreground}
                  text={`Step ${walkthrough.currentDetails.index + 1}/${
                    walkthrough.currentDetails.length
                  }`}
                />

                <div
                  onClick={toggle}
                  aria-label="maximize"
                  data-balloon-pos="right"
                  style={{ transform: 'translateY(3px)' }}
                >
                  <Icons.OpenInNewRounded style={{ color: Colours.text }} />
                </div>
              </Layout.Flex>
            </Box>
          ) : (
            <Core.Box
              css={`
                transition-timing-function: cubic-bezier(
                  0.17,
                  0.67,
                  0.83,
                  0.67
                );
                transition-duration: 0.5s;
                box-shadow: 0 5px 30px 0 rgba(39, 63, 74, 0.15);
              `}
              style={{ pointerEvents: 'all' }}
              radius="4px"
              border="1px solid rgba(0,0,0,.1)"
              bg="#f1f1f1"
              pd="6px"
              textAlign="left"
              width="500px"
            >
              <Layout.Flex
                justify="space-between"
                align="center"
                style={{ marginBottom: '16px' }}
              >
                <Content.Avatar
                  size="small"
                  firstName={walkthrough?.person?.firstName || '.'}
                  lastName={walkthrough?.person?.lastName || '.'}
                  src={walkthrough.person.avatar}
                />

                <ButtonGroup
                  next={data.Next}
                  previous={data.Previous}
                  walkthrough={walkthrough}
                />
                <div>
                  <Core.Button
                    css={`
                      box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 40px 0px;
                      padding: 6px;
                      margin-right: 6px;
                      color: ${Colours.text};
                    `}
                    bgColour={Colours.foreground}
                    onClick={toggle}
                  >
                    Hide
                  </Core.Button>
                </div>
              </Layout.Flex>
              <Core.Box bg="white" radius="6px">
                <Layout.Flex justify="space-between" align="center">
                  <Core.Text weight="700" size="md">
                    {walkthrough.currentStep.name}
                  </Core.Text>
                </Layout.Flex>
                <Layout.Flex
                  justify="left"
                  align="center"
                  style={{ marginBottom: '16px', marginTop: '16px' }}
                >
                  <Content.Badge
                    bg="hsl(0, 0%, 24%)"
                    color={Colours.foreground}
                    text={`Step ${walkthrough.currentDetails.index + 1}/${
                      walkthrough.currentDetails.length
                    }`}
                    mr="4px"
                  />
                  {walkthrough?.person?.companyName ? (
                    <Content.Badge
                      bg="hsl(0, 0%, 24%)"
                      color={Colours.foreground}
                      text={`${walkthrough.person?.companyName}`}
                      mr="4px"
                    />
                  ) : (
                    <Content.Badge
                      bg="hsl(0, 0%, 24%)"
                      color={Colours.foreground}
                      text={`${walkthrough.person.firstName} ${walkthrough.person.lastName}`}
                      mr="4px"
                    />
                  )}

                  {walkthrough.currentStep.stepType === 'APPROVER' ? (
                    <Content.Badge
                      color={Colours.foreground}
                      bg="#df2935"
                      text="Requires approval"
                      mr="4px"
                    />
                  ) : null}
                </Layout.Flex>

                <Core.Text weight="400" mt="8px">
                  {walkthrough.currentWorkflow.description}
                </Core.Text>
              </Core.Box>
            </Core.Box>
          )}
        </Layout.Flex>
      </Core.Box>
    </Core.Portal>
  )
}

const ButtonGroup = (props) => {
  const walkthrough = props.walkthrough
  return (
    <Layout.Flex justify="space-between">
      <Core.Button
        css={`
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 40px 0px;
          padding: 6px;
          margin-right: 6px;
        `}
        bgColour="#0366d6"
        disabled={walkthrough.currentDetails.previousIndex == null}
        onClick={() => props.previous()}
      >
        Previous Step
      </Core.Button>
      <Core.Button
        bgColour={
          walkthrough.currentDetails.nextIndex == null
            ? Colours.green
            : '#0366d6'
        }
        css={`
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 40px 0px;
          padding: 6px;
          margin-right: 6px;
        `}
        disabled={walkthrough.currentStep.stepType === 'APPROVER'}
        aria-label={
          walkthrough.currentStep.stepType === 'APPROVER'
            ? 'This step will require approval to continue'
            : null
        }
        data-balloon-length="medium"
        data-balloon-pos="down"
        onClick={
          walkthrough.currentDetails.nextIndex == null
            ? () => {
                localStorage.removeItem('walkthroughId')
                window.location.reload()
              }
            : () => props.next()
        }
      >
        {walkthrough.currentDetails.nextIndex == null
          ? 'Complete'
          : 'Next Step'}
      </Core.Button>
      <Core.Button
        onClick={() => {
          // Logger('stop workflow', 'general', null, () => {
          localStorage.removeItem('walkthroughId')
          window.location.reload()
          // })
        }}
        bgColour={Colours.red}
        action="READ"
        color="white"
        width="50px"
        css={`
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 40px 0px;
          padding: 6px;
          margin-right: 6px;
        `}
      >
        Stop
      </Core.Button>
    </Layout.Flex>
  )
}
export default WorkflowHUD
