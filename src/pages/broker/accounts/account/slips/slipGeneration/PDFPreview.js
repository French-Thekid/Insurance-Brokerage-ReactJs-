import React, { useContext } from 'react'
import { SlipContext } from '../context'
import 'styled-components/macro'
import { PDFViewer } from '@react-pdf/renderer'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'

import { MyDocument, ConvertToBlob } from './slipPDF'
import { Core, Colours, PageHeader, Loading, Content } from 'components'
import { useQuery } from '@apollo/react-hooks'
import { READ_ACCOUNT } from '../../../queries'

const queryString = require('query-string')

function Slip() {
  const history = useHistory()
  const match = useRouteMatch()
  const {
    params: { accountId },
  } = match
  const { search } = useLocation()

  const { policies } = queryString.parse(search)
  const motorRisks = JSON.parse(localStorage.getItem('motorRisks'))
  const nonMotorRisks = JSON.parse(localStorage.getItem('nonMotorRisks'))
  const extensions = JSON.parse(localStorage.getItem('extensions'))
  const limits = JSON.parse(localStorage.getItem('limits'))

  //Todo convert risk images to base64
  let policyIds
  if (Array.isArray(policies)) policyIds = policies
  else policyIds = Array.from(String(policies), Number)

  const {
    setMotorRiskIdsPolicyPairs,
    setNonMotorRiskIdsPolicyPairs,
    setExtensionsPair,
    setLimitsPair,
  } = useContext(SlipContext)

  const { loading, error, data } = useQuery(READ_ACCOUNT, {
    variables: { accountId: parseInt(accountId) },
  })

  if (loading) return <Loading small />
  if (error)
    return (
      <Content.Alert type="error" message={'Fail to load Account Details'} />
    )

  const { person, company, type } = data.readAccount

  const {
    firstName,
    lastName,
    streetNumber,
    streetName,
    city,
    parish,
    country,
  } = person || {}
  const {
    companyName,
    streetNumber: Csn,
    streetName: Csna,
    city: Cc,
    parish: Cp,
    country: Cco,
  } = company || {}

  const location =
    type === 'individual'
      ? { streetNumber, streetName, city, parish, country }
      : {
          streetNumber: Csn,
          streetName: Csna,
          city: Cc,
          parish: Cp,
          country: Cco,
        }

  return (
    <>
      <div
        css={`
          display: grid;
          grid-template-rows: max-content 1fr;
          height: 100%;
        `}
      >
        <PageHeader
          title="Slip Preview"
          close={() => {
            let policyDetails = queryString.stringify({
              policies: policyIds.map((Id) => Id),
            })

            history.push(
              `/broker/account/slips/${accountId}/slip-generation/${accountId}/?${policyDetails}`
            )
            setTimeout(function () {
              localStorage.removeItem('motorRisks')
              localStorage.removeItem('nonMotorRisks')
              localStorage.removeItem('extensions')
              localStorage.removeItem('limits')
              localStorage.removeItem('receivers')
            }, 100)
            setMotorRiskIdsPolicyPairs({ MotorRisks: [] })
            setNonMotorRiskIdsPolicyPairs({ nonMotorRisks: [] })
            setExtensionsPair({ extensions: [] })
            setLimitsPair({ limits: [] })
          }}
        >
          <Core.Button
            bgColour={Colours.green}
            type="button"
            onClick={() => {
              const title = `Generated Slip PDF for ${
                type === 'individual' ? firstName + ' ' + lastName : companyName
              }`

              history.push(`${match.url}/submission?title=${title}`)
            }}
          >
            Finalize
          </Core.Button>
        </PageHeader>
        <PDFViewer
          css={`
            height: 100%;
            width: 100%;
            border-radius: 5px;
            border: 1px solid ${Colours.border};
          `}
        >
          <MyDocument
            title={`Generated Slip PDF for ${
              type === 'individual' ? firstName + ' ' + lastName : companyName
            }`}
            accountId={parseInt(accountId)}
            policyIds={policyIds}
            data={data.readAccount}
            error={error}
            policyMotorRiskData={motorRisks}
            policyNonMotorRiskData={nonMotorRisks}
            ExtensionData={extensions}
            LimitData={limits}
            location={location && location[0]}
          />
        </PDFViewer>
        <ConvertToBlob
          title={`Generated Slip PDF for ${
            type === 'individual' ? firstName + ' ' + lastName : companyName
          }`}
          accountId={parseInt(accountId)}
          policyIds={policyIds}
          data={data.readAccount}
          error={error}
          policyMotorRiskData={motorRisks}
          policyNonMotorRiskData={nonMotorRisks}
          ExtensionData={extensions}
          LimitData={limits}
          location={location && location[0]}
        />
      </div>
    </>
  )
}

export default Slip
