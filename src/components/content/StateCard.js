import React, { useContext } from 'react'
import { Core, Layout } from '..'
import 'styled-components/macro'
import Card from './Card'
import { ColourContext } from 'context'

function StateCard(props) {
  const { Colours } = useContext(ColourContext)

  return (
    <Card {...props} mg="4px" textAlign="center">
      <Core.Box>
        <Layout.Flex align="center" justify="center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-shield-lock animate__pulse animate__animated animate__infinite animate__slow"
            width="100px"
            height="100px"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={Colours.orange}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
            <circle cx="12" cy="11" r="1" />
            <line x1="12" y1="12" x2="12" y2="14.5" />
          </svg>
        </Layout.Flex>
        <Core.Text align="center" color={Colours.orange} size="md" weight="600">
          Access Denied
        </Core.Text>
        <br />
        <Core.Text align="center" mt="6px">
          You don't have the required permissions to perform this action. If you
          believe that this is a mistake try reloading the page or contacting
          your administrator.
        </Core.Text>{' '}
      </Core.Box>
    </Card>
  )
}

export default StateCard
