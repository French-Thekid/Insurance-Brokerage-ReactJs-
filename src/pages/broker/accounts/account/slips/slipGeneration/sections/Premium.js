import React, { useContext } from 'react'
import 'styled-components/macro'
import { useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { ColourContext } from 'context'

import { Core, Loading, Content } from 'components'
import { READ_ACCOUNT } from '../../../../queries'
import { currencyFormatter } from 'utils'

function PremiumDetails(props) {
  const match = useRouteMatch()
  const { Colours, mode } = useContext(ColourContext)
  const {
    params: { accountId },
  } = match

  const { loading, error, data } = useQuery(READ_ACCOUNT, {
    variables: { accountId: parseInt(accountId) },
  })

  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Fail to load Account Details'} />
    )

  const { gender } = data.readAccount.person

  return (
    <>
      {error && (
        <Content.Alert
          type="error"
          message={'Failed to Fetch Account details'}
        />
      )}
      <div
        css={`
          height: max-content;
          margin-bottom: 10px;
          background-color: ${Colours.header};
          border: 0.5px solid ${Colours.border};
          padding: 5px;
          margin-top: 10px;
          border-radius: 2px;
        `}
      >
        <Core.Text customSize="12px" weight="600">
          Premium Details
        </Core.Text>
      </div>
      <div
        css={`
          display: grid;
          grid-template-columns: repeat(${gender ? 5 : 4}, 1fr);
          @media only screen and (orientation: portrait) {
            grid-template-columns: repeat(${gender ? 4 : 3}, 1fr);
          }
          grid-gap: 10px;
          padding: 5px;
          margin-bottom: 25px;
        `}
      >
        {
          <>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Value A
              </Core.Text>
              <Core.Text customSize="12px">
                ${currencyFormatter('10000') || '--'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Value B
              </Core.Text>
              <Core.Text customSize="12px">
                ${currencyFormatter('10000') || '--'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Value C
              </Core.Text>
              <Core.Text customSize="12px">
                ${currencyFormatter('10000') || '--'}
              </Core.Text>
            </section>
            <section>
              <Core.Text
                customSize="12px"
                weight="650"
                color={mode === 'Dark' ? Colours.softGrey : Colours.text}
              >
                Premium
              </Core.Text>
              <Core.Text customSize="12px">
                ${currencyFormatter('1000000') || '--'}
              </Core.Text>
            </section>
          </>
        }
      </div>
    </>
  )
}

export default PremiumDetails
