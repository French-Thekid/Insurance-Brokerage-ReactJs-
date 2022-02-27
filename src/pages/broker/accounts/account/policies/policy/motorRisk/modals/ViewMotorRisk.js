import React, { useContext } from 'react'
import 'styled-components/macro'
import { formatNumber } from 'utils'
import { useDialog, usePermission } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { ColourContext } from 'context'

import { Core, Layout, Loading } from 'components'
import { GET_NON_MOTORRISK_DETAILS } from '../../queries'

const queryString = require('query-string')

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permissions, Access] = usePermission()
  const { search } = useLocation()
  const { id: riskId } = queryString.parse(search)
  const {
    params: { accountId },
  } = useRouteMatch()
  const { Colours } = useContext(ColourContext)

  const {
    vin,
    image,
    id,
    policyId,
    year,
    usage,
    sumInsured,
    regNum,
    make,
    model,
    colour,
    modelType,
    bodyType,
    bodyShape,
    engineType,
    engineModified,
    ccRating,
    mileage,
    transmissionType,
    tonnage,
    leftHandDrive,
    powersteering,
    roofType,
    seatType,
    authorizedDriverClause,
  } = JSON.parse(localStorage.getItem('activeMotorRisk')) || {}

  const { loading, error, data } = useQuery(GET_NON_MOTORRISK_DETAILS, {
    variables: { accountID: parseInt(accountId), riskID: parseInt(riskId) },
  })

  if (loading) return <Loading small />
  if (error) {
    console.log('Failed bruv')
    return null
  }

  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeMotorRisk')
        history.goBack()
      }}
      title="Risk View - Motor"
    >
      {permissions.RISK_READ_TYPERISK ? (
        <div
          css={`
            display: grid;
            grid-template-columns: 280px 1fr 1fr;
            grid-gap: 20px;
            @media (max-width: 769px) {
              @media (min-width: 376px) {
                width: 700px;
              }
            }
            @media (max-width: 1025px) {
              max-width: 1000px;
            }
            @media (max-width: 376px) {
              grid-template-columns: 320px;
              padding-right: 5px;
              height: 700px;
              overflow-y: auto;
            }
          `}
        >
          <div
            css={`
              display: grid;
              grid-template-rows: max-content 1fr max-content;
              grid-gap: 10px;
            `}
          >
            <div
              css={`
                width: 100%;
                padding-bottom: 5px;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <Core.Text weight="550" customSize="20px" color={Colours.blue}>
                {make} {modelType}
              </Core.Text>
            </div>
            <div>
              <img
                css={`
                  height: 180px;
                  width: 280px;
                  border: 1px solid ${Colours.border};
                  @media (max-width: 376px) {
                    height: 180px;
                    width: 298px;
                  }
                `}
                src={image}
                alt="motor avatar"
              />
            </div>
            <div
              css={`
                display: grid;
                grid-template-rows: max-content 1fr;
                grid-gap: 5px;
              `}
            >
              <Core.Text weight="500">Basics</Core.Text>
              <Layout.ResponsiveContainer>
                <section>
                  <Label>Risk</Label>
                  <Data>ID: {id}</Data>
                </section>
                <section>
                  <Label>Policy</Label>
                  <Data>ID: {policyId}</Data>
                </section>
                <section>
                  <Label>Registration #</Label>
                  <Data>{regNum ? regNum : '-'}</Data>
                </section>
                <section>
                  <Label>Sum Insured</Label>
                  <Data>{`$${
                    sumInsured ? formatNumber(sumInsured) : '-'
                  }`}</Data>
                </section>
                <section>
                  <Label>Year</Label>
                  <Data>{year}</Data>
                </section>
                <section>
                  <Label>Usage</Label>
                  <Data>{usage ? usage : '-'}</Data>
                </section>
              </Layout.ResponsiveContainer>
            </div>
          </div>
          <div
            css={`
              margin-top: 25px;
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 5px;
            `}
          >
            <Core.Text weight="500">Details</Core.Text>
            <Layout.ResponsiveContainer cols={3}>
              <section>
                <Label>Make</Label>
                <Data>{make ? make : '-'}</Data>
              </section>
              <section>
                <Label>Model</Label>
                <Data>{model ? model : '-'}</Data>
              </section>
              <section>
                <Label>Model Type</Label>
                <Data>{modelType ? modelType : '-'}</Data>
              </section>
              <section>
                <Label>Colour</Label>
                <Data>{colour ? colour : '-'}</Data>
              </section>
              <section>
                <Label>Seat Type</Label>
                <Data>{seatType ? seatType : '-'}</Data>
              </section>
              <section>
                <Label>Roof Type</Label>
                <Data>{roofType ? roofType : '-'}</Data>
              </section>
              <section>
                <Label>LHD</Label>
                <Data>{leftHandDrive === true ? 'Yes' : 'No'}</Data>
              </section>
              <section>
                <Label>Transmission</Label>
                <Data>{transmissionType ? transmissionType : '-'}</Data>
              </section>
              <section>
                <Label>Chassis Number</Label>
                <Data>{vin ? vin : '-'}</Data>
              </section>
              <section>
                <Label>Power Steering</Label>
                <Data>{powersteering === true ? 'Yes' : 'No'}</Data>
              </section>
              <section>
                <Label>Tonnage Number</Label>
                <Data>{tonnage ? tonnage : '-'}</Data>
              </section>
              <section>
                <Label>Seat Type</Label>
                <Data>{seatType ? seatType : '-'}</Data>
              </section>
              <section>
                <Label>Body Type</Label>
                <Data>{bodyType ? bodyType : '-'}</Data>
              </section>
              <section>
                <Label>Body Shape</Label>
                <Data>{bodyShape ? bodyShape : '-'}</Data>
              </section>
              <section>
                <Label>Mileage</Label>
                <Data>{mileage ? mileage : '-'}</Data>
              </section>
              <section>
                <Label>Modified Engine</Label>
                <Data>{engineModified === true ? 'Yes' : 'No'}</Data>
              </section>
              <section>
                <Label>Engine Type</Label>
                <Data>{engineType ? engineType : '-'}</Data>
              </section>
              <section>
                <Label>CC Ratings</Label>
                <Data>{ccRating ? ccRating : '-'}</Data>
              </section>
            </Layout.ResponsiveContainer>
          </div>
          <div
            css={`
              margin-top: 25px;
              display: grid;
              grid-template-rows: max-content 1fr;
              grid-gap: 10px;
              width: 100%;
            `}
          >
            <div
              css={`
                display: grid;
                grid-template-rows: max-content 1fr;
                grid-gap: 5px;
                width: 100%;
              `}
            >
              <Core.Text weight="500">Authorized Driver Clause</Core.Text>
              <div
                css={`
                  margin-top: 5px;
                  border: 1px solid ${Colours.border};
                  border-radius: 5px;
                  height: 100px;
                  width: calc(100% - 22px);
                  padding: 10px;
                  overflow: auto;
                `}
              >
                <Data>
                  {authorizedDriverClause
                    ? authorizedDriverClause
                    : "No authorized driver's clause provided."}
                </Data>
              </div>
            </div>
            <div
              css={`
                display: grid;
                grid-template-rows: max-content 1fr;
                grid-gap: 5px;
              `}
            >
              <Core.Text weight="500">Mortgagees</Core.Text>
              <div
                css={`
                  margin-top: 5px;
                  border: 1px solid ${Colours.border};
                  border-radius: 5px;
                  height: calc(100% - 33px);
                  width: calc(100% - 22px);
                  padding: 10px;
                  overflow: auto;
                `}
              >
                {data.listRiskMortgagees.map((mortgagee) => {
                  return (
                    <div
                      key={mortgagee.id}
                      css={`
                        border-radius: 5px;
                        border: 1px solid ${Colours.border};
                        padding: 5px;
                        &:hover {
                          box-shadow: 0 1.7px 3.5px rgba(0, 0, 0, 0.016),
                            0 3.5px 12.6px rgba(0, 0, 0, 0.037),
                            0 10px 35px rgba(0, 0, 0, 0.08);
                          transform: translateY(-1px);
                          border: 0.1px solid ${Colours.blue};
                        }
                        transition-timing-function: cubic-bezier(
                          0.17,
                          0.67,
                          0.83,
                          0.67
                        );
                        transition-duration: 0.3s;
                        margin-bottom: 10px;
                      `}
                    >
                      <div
                        css={`
                          display: grid;
                          grid-template-columns: 1fr 1fr 1fr;
                          margin-bottom: 5px;
                        `}
                      >
                        <section>
                          <Label>National ID</Label>
                          <Data>{mortgagee.nationalIdNum}</Data>
                        </section>
                        <section>
                          <Label>Branch</Label>
                          <Data>{mortgagee.branch}</Data>
                        </section>
                        <section>
                          <Label>Loan Amount</Label>
                          <Data>{`${mortgagee.currency} $${
                            mortgagee.loanAmount
                              ? formatNumber(mortgagee.loanAmount)
                              : '-'
                          }`}</Data>
                        </section>
                      </div>
                      <Label>Notes</Label>
                      <div
                        css={`
                          height: 50px;
                          overflow: auto;
                          padding-bottom: 10px;
                          margin-bottom: 10px;
                        `}
                      >
                        <Data>{mortgagee.notes}</Data>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Access />
      )}
    </Dialog>
  )
}

const Label = ({ children }) => {
  const { Colours, mode } = useContext(ColourContext)
  return (
    <Core.Text
      color={mode === 'Dark' ? Colours.softGrey : 'inherit'}
      weight="650"
      customSize="12px"
    >
      {children}
    </Core.Text>
  )
}

const Data = ({ children, blue, heavy }) => {
  const { Colours } = useContext(ColourContext)
  return (
    <Core.Text
      weight={heavy ? '650' : '400'}
      color={blue ? Colours.blue : Colours.text}
      customSize="12px"
    >
      {children}
    </Core.Text>
  )
}
