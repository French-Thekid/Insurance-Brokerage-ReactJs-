import React from 'react'
import 'styled-components/macro'
import { useDialog, usePermission } from 'hooks'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Core, Colours, Layout, Loading } from 'components'
import { formatNumber } from 'utils'
import { GET_NON_MOTORRISK_DETAILS } from '../../../../queries'

const queryString = require('query-string')

export default function ({ isShowing }) {
  const { Dialog } = useDialog()
  const history = useHistory()
  const [permisssions, Access] = usePermission()
  const { search } = useLocation()
  const { id: riskId } = queryString.parse(search)
  const {
    params: { accountId },
  } = useRouteMatch()

  const {
    images: image,
    id,
    policyId,
    year,
    usage,
    sumInsured,
    type,
    storeys,
    roofConstruction,
    wallConstruction,
    occupancy,
    country,
    streetNumber,
    thoroughfare,
    subPremise,
    premise,
  } = JSON.parse(localStorage.getItem('activeNonMotorRisk')) || {}

  const { loading, error, data } = useQuery(GET_NON_MOTORRISK_DETAILS, {
    variables: { accountID: parseInt(accountId), riskID: parseInt(riskId) },
  })

  if (loading) return <Loading small />
  if (error) return null

  return (
    <Dialog
      open={isShowing}
      close={() => {
        localStorage.removeItem('activeNonMotorRisk')
        history.goBack()
      }}
      title="Risk View - Property"
    >
      {permisssions.RISK_READ_TYPEACCOUNT ? (
        <div
          css={`
            display: grid;
            grid-template-columns: 280px 1fr max-content;
            grid-gap: 20px;
            @media (max-width: 769px) {
              grid-template-columns: 200px 1fr max-content;
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
                {type}
              </Core.Text>
            </div>
            <div>
              <img
                css={`
                  height: 180px;
                  width: 280px;
                  border: 1px solid ${Colours.border};
                  @media (max-width: 769px) {
                    height: 180px;
                    width: 200px;
                    @media (max-width: 376px) {
                      height: 180px;
                      width: 298px;
                    }
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
                  <Label>Type</Label>
                  <Data>{'Non Motor'}</Data>
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
              grid-template-rows: 1fr max-content;
              grid-gap: 10px;
              width: 100%;
            `}
          >
            <div
              css={`
                display: grid;
                grid-template-rows: max-content 1fr;
                grid-gap: 5px;
              `}
            >
              <Core.Text weight="500">Details</Core.Text>
              <Layout.ResponsiveContainer cols={2}>
                <section>
                  <Label>Type</Label>
                  <Data>{type ? type : '-'}</Data>
                </section>
                <section>
                  <Label>Storeys</Label>
                  <Data>{storeys ? storeys : '-'}</Data>
                </section>
                <section>
                  <Label>Roof Construction</Label>
                  <Data>{roofConstruction ? roofConstruction : '-'}</Data>
                </section>
                <section>
                  <Label>Wall Construction</Label>
                  <Data>{wallConstruction ? wallConstruction : '-'}</Data>
                </section>
                <section>
                  <Label>Occupancy</Label>
                  <Data>{occupancy ? occupancy : '-'}</Data>
                </section>
              </Layout.ResponsiveContainer>
            </div>
            <div
              css={`
                display: grid;
                grid-template-rows: max-content 1fr;
                grid-gap: 5px;
                min-height: 195px;
              `}
            >
              <Core.Text weight="500">Location</Core.Text>
              <Layout.ResponsiveContainer cols={2}>
                <section>
                  <Label>Address 1</Label>
                  <Data>{`${streetNumber ? streetNumber : '-'} ${
                    subPremise ? subPremise : '-'
                  }`}</Data>
                </section>
                <section>
                  <Label>Address 2</Label>
                  <Data>{premise ? premise : '-'}</Data>
                </section>
                <section>
                  <Label>City</Label>
                  <Data>{thoroughfare ? thoroughfare : '-'}</Data>
                </section>
                <section>
                  <Label>Country</Label>
                  <Data>{country ? country : '-'}</Data>
                </section>
              </Layout.ResponsiveContainer>
            </div>
          </div>
          <div
            css={`
              margin-top: 25px;
              display: grid;
              grid-template-rows: 1fr max-content;
              grid-gap: 10px;
              width: 100%;
              min-width: 300px;
              @media (max-width: 769px) {
                min-width: 250px;
              }
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
              <Core.Text weight="500">Items</Core.Text>
              <div
                css={`
                  margin-top: 5px;
                  border: 1px solid ${Colours.border};
                  border-radius: 5px;
                  height: calc(100% - 32px);
                  width: calc(100% - 22px);
                  padding: 10px;
                  overflow: auto;
                `}
              >
                {data.listNonMotorRiskItems.map((item) => {
                  return (
                    <>
                      <div
                        key={item.id}
                        css={`
                          display: grid;
                          grid-template-columns: 1fr 2fr;
                          height: 50px;
                          padding-bottom: 10px;
                          margin-bottom: 10px;
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
                        `}
                      >
                        <section>
                          <Label>Type</Label>
                          <Data>{item.type}</Data>
                        </section>
                        <div>
                          <Label>Description</Label>
                          <section
                            css={`
                              height: 100px;
                              overflow: auto;
                            `}
                          >
                            <Data>{item.description}</Data>
                          </section>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
            </div>
            <div
              css={`
                display: grid;
                grid-template-rows: max-content 1fr;
                grid-gap: 5px;
                min-height: 195px;
                max-height: 195px;
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

const Label = ({ children }) => (
  <Core.Text weight="650" customSize="12px">
    {children}
  </Core.Text>
)
const Data = ({ children, blue, heavy }) => (
  <Core.Text
    weight={heavy ? '650' : '400'}
    color={blue ? Colours.blue : Colours.text}
    customSize="12px"
  >
    {children}
  </Core.Text>
)
