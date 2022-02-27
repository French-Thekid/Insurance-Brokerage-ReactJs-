import React from 'react'
import 'styled-components/macro'
import { set } from 'idb-keyval'
import {
  Document,
  Page,
  View,
  StyleSheet,
  BlobProvider,
} from '@react-pdf/renderer/dist/react-pdf.es.js'
import {
  SlipHeader,
  AccountDetails,
  MotorRisk,
  NonMotorRisk,
  Extensions,
  Limits,
  PremiumDetails,
} from './Sections'

// Create styles
const styles = StyleSheet.create({
  page: {
    width: '500px',
    padding: 20,
  },
  container: {
    flexDirection: 'column',
    width: '100%',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
})

// Create Document Component
function MyDocument({
  policyIds,
  title,
  data,
  error,
  policyMotorRiskData,
  policyNonMotorRiskData,
  ExtensionData,
  LimitData,
  location,
}) {
  const template = JSON.parse(localStorage.getItem('template'))
  const { avatar, sections, name: slipTitle } = template[0]

  const PDFDocument = () => (
    <Document title={title}>
      {policyIds.map((policyId, index) => {
        return (
          <Page key={`PDF${index}`} size="A4" style={styles.page}>
            <SlipHeader policyId={policyId} avatar={avatar} title={slipTitle} />
            <View style={styles.container}>
              {sections.indexOf('Account Details') !== -1 ? (
                <AccountDetails
                  error={error}
                  account={data}
                  location={location}
                />
              ) : null}
              {sections.indexOf('Premium') !== -1 ? (
                <PremiumDetails
                  error={error}
                  account={data}
                  location={location}
                />
              ) : null}
              {sections.indexOf('Risk') !== -1 ? (
                <>
                  <MotorRisk
                    policyId={policyId}
                    policyMotorRiskData={policyMotorRiskData}
                  />
                  <NonMotorRisk
                    policyId={policyId}
                    policyNonMotorRiskData={policyNonMotorRiskData}
                  />
                </>
              ) : null}
              {sections.indexOf('Extensions') !== -1 ? (
                <Extensions ExtensionData={ExtensionData} policyId={policyId} />
              ) : null}
              {sections.indexOf('Limit') !== -1 ? (
                <Limits LimitData={LimitData} policyId={policyId} />
              ) : null}
            </View>
          </Page>
        )
      })}
    </Document>
  )

  return <PDFDocument />
}

function ConvertToBlob({
  policyIds,
  title,
  data,
  error,
  policyMotorRiskData,
  policyNonMotorRiskData,
  ExtensionData,
  LimitData,
  location,
}) {
  const template = JSON.parse(localStorage.getItem('template'))
  const { avatar, sections, name: slipTitle } = template[0]
  var reader = new FileReader()

  const PDFDocument = () => (
    <Document title={title}>
      {policyIds.map((policyId, index) => {
        return (
          <Page key={`PDF${index}`} size="A4" style={styles.page}>
            <SlipHeader policyId={policyId} avatar={avatar} title={slipTitle} />
            <View style={styles.container}>
              {sections.indexOf('Account Details') !== -1 ? (
                <AccountDetails
                  error={error}
                  account={data}
                  location={location}
                />
              ) : null}
              {sections.indexOf('Risk') !== -1 ? (
                <>
                  <MotorRisk
                    policyId={policyId}
                    policyMotorRiskData={policyMotorRiskData}
                  />
                  <NonMotorRisk
                    policyId={policyId}
                    policyNonMotorRiskData={policyNonMotorRiskData}
                  />
                </>
              ) : null}
              {sections.indexOf('Extensions') !== -1 ? (
                <Extensions ExtensionData={ExtensionData} policyId={policyId} />
              ) : null}
              {sections.indexOf('Limit') !== -1 ? (
                <Limits LimitData={LimitData} policyId={policyId} />
              ) : null}
            </View>
          </Page>
        )
      })}
    </Document>
  )

  return (
    <BlobProvider document={<PDFDocument />}>
      {({ blob, url, loading, error }) => {
        if (loading) return null
        if (error) return null
        reader.readAsDataURL(blob)
        reader.onloadend = function () {
          var base64data = reader.result
          // localStorage.setItem('Slip', JSON.stringify(base64data))
          set('Slip', base64data)
            .then(() => console.log('Slip Captured!'))
            .catch((err) => console.log('Slip Capture failed!', err))
        }
        return null
      }}
    </BlobProvider>
  )
}

export { MyDocument, ConvertToBlob }
