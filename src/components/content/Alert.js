import React, { useContext } from 'react'
import { Core, Layout } from 'components'
import { ColourContext } from 'context'

function Alert(props) {
  const { Colours } = useContext(ColourContext)

  return (
    <>
      <Core.Box
        style={{
          boxShadow: '0px 21px 36px -9px rgba(235,235,235,1)',
        }}
        bg={
          props.type === 'info'
            ? Colours.blue
            : props.type === 'warning'
            ? Colours.orange
            : props.type === 'error'
            ? Colours.red
            : '#0052CC'
        }
        radius="5px"
        maxWidth="500px"
        height="max-content"
        color={props.type === 'warning' ? 'black' : 'white'}
        mg="0px"
        pd="0px"
        {...props}
      >
        <Core.Box>
          <Layout.Flex justify="space-between">
            <Core.Box>
              <Core.Text
                align="left"
                size="rg"
                pd="10px"
                color={props.type === 'warning' ? 'black' : 'white'}
              >
                {props.message}
              </Core.Text>
            </Core.Box>
          </Layout.Flex>
        </Core.Box>
      </Core.Box>
    </>
  )
}

export default Alert
