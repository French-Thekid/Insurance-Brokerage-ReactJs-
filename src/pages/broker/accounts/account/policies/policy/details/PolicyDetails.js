import React, { useContext } from 'react'
import 'styled-components/macro'
import { usePermission } from 'hooks'
import { TwoRowContainer, Core } from 'components'
import { currencyFormatter } from 'utils'
import { ColourContext } from 'context'

export default function PolicyDetails() {
  const {
    id,
    status,
    usage,
    currency,
    agreedValue,
    premium,
    balance,
    inceptionDate,
    startDate,
    endDate,
    dateSigned,
    branch,
    country,
    occupancy,
    thidParty,
    groupName: policyType,
  } = JSON.parse(localStorage.getItem('activePolicy')) || {}
  const [permissions, Access] = usePermission()
  const { Colours } = useContext(ColourContext)

  return (
    <>
      {permissions.POLICY_READ_TYPEACCOUNT ? (
        <div
          css={`
            display: grid;
            grid-template-rows: max-content 1fr;
            border-radius: 5px;
            border: 1px solid ${Colours.border};
          `}
        >
          <div
            css={`
              background: ${Colours.title};
              height: 40px;
              display: grid;
              align-items: center;
              padding-left: 10px;
              border-bottom: 0.5px solid ${Colours.border};
            `}
          >
            <Core.Text weight="500">Policy Details</Core.Text>
          </div>
          <div
            css={`
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              grid-gap: 20px;
              padding: 10px;
            `}
          >
            <TwoRowContainer>
              <>
                <Label>{'Policy Number'}</Label>
                <Line />
              </>
              <Data heavy blue>
                {id}
              </Data>
            </TwoRowContainer>
            <TwoRowContainer>
              <>
                <Label>{'Status'}</Label> <Line />
              </>
              <div
                css={`
                  width: max-content;
                  padding: 5px 10px;
                  border-radius: 5px;
                  display: grid;
                  place-items: center;
                  border: 2px solid
                    ${status === 'active' ? Colours.green : Colours.red};
                `}
              >
                <Core.Text
                  weight="500"
                  customSize="12px"
                  color={status === 'active' ? Colours.green : Colours.red}
                >
                  {status.toUpperCase()}
                </Core.Text>
              </div>
            </TwoRowContainer>

            <TwoRowContainer>
              <>
                <Label>{'Date Signed'}</Label> <Line />
              </>
              <Data>
                {dateSigned !== '0000-00-00'
                  ? new Date(
                      new Date(parseInt(dateSigned)).setDate(
                        new Date(parseInt(dateSigned)).getDate() + 1
                      )
                    ).toDateString()
                  : '-'}
              </Data>
            </TwoRowContainer>
            <TwoRowContainer>
              <>
                <Label>{'Inception Date'}</Label> <Line />
              </>
              <Data>
                {inceptionDate !== '0000-00-00'
                  ? new Date(
                      new Date(parseInt(inceptionDate)).setDate(
                        new Date(parseInt(inceptionDate)).getDate() + 1
                      )
                    ).toDateString()
                  : '-'}
              </Data>
            </TwoRowContainer>

            <TwoRowContainer>
              <>
                <Label>{'Start Date'}</Label>
                <Line />
              </>
              <Data>{startDate || '-'}</Data>
            </TwoRowContainer>
            <TwoRowContainer>
              <>
                <Label>{'End Date'}</Label> <Line />
              </>
              <Data>{endDate || '-'}</Data>
            </TwoRowContainer>

            <TwoRowContainer>
              <>
                <Label>{'Value Agreement'}</Label> <Line />
              </>
              <Data>{agreedValue === 1 ? 'Yes' : 'No'}</Data>
            </TwoRowContainer>
            <TwoRowContainer>
              <>
                <Label>{'Currency'}</Label> <Line />
              </>
              <Data>{currency || '-'}</Data>
            </TwoRowContainer>

            <TwoRowContainer>
              <>
                <Label>{'Premium'}</Label> <Line />
              </>
              <Data>${currencyFormatter(premium) || '- -'}.00</Data>
            </TwoRowContainer>
            <TwoRowContainer>
              <>
                <Label>{'Balance'}</Label>
                <Line />
              </>
              <Data>${currencyFormatter(balance) || '-'}.00</Data>
            </TwoRowContainer>

            <TwoRowContainer>
              <>
                <Label>{'Branch'}</Label> <Line />
              </>
              <Data>{branch || '-'}</Data>
            </TwoRowContainer>
            <TwoRowContainer>
              <>
                <Label>{'Country'}</Label> <Line />
              </>
              <Data>{country || '-'}</Data>
            </TwoRowContainer>

            <TwoRowContainer>
              <>
                <Label>{'Usage'}</Label> <Line />
              </>
              <Data>{usage || '-'}</Data>
            </TwoRowContainer>
            {policyType === 'Property' ? (
              <TwoRowContainer>
                <>
                  <Label>{'Occupancy'}</Label> <Line />
                </>
                <Data>{occupancy || '-'}</Data>
              </TwoRowContainer>
            ) : (
              <TwoRowContainer>
                <>
                  <Label>{'Third Party'}</Label> <Line />
                </>
                <Data>{thidParty === 0 ? 'Yes' : 'No'}</Data>
              </TwoRowContainer>
            )}
          </div>
        </div>
      ) : (
        <Access />
      )}
    </>
  )
}

const Label = ({ children }) => (
  <Core.Text weight="400" customSize="15px">
    {children}
  </Core.Text>
)
const Line = () => {
  const { Colours } = useContext(ColourContext)
  return (
    <hr
      css={`
        width: 90%;
        margin: 0;
        height: 0.3px;
        padding: 0px;
        border: none;
        background-color: ${Colours.border};
      `}
    />
  )
}
const Data = ({ children, blue }) => {
  const { Colours } = useContext(ColourContext)
  return (
    <Core.Text
      weight={'400'}
      color={blue ? Colours.blue : Colours.darkBlue}
      customSize="15px"
    >
      {children}
    </Core.Text>
  )
}
