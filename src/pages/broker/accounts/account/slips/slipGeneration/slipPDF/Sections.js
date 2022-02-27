import React from 'react'
import 'styled-components/macro'
import {
  Image,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer/dist/react-pdf.es.js'
import { Colours, Content } from 'components'
import Motor from 'assets/Motor.png'
import House from 'assets/house.png'
import { currencyFormatter } from 'utils'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    width: '500px',
  },
  section: {
    margin: 10,
    marginTop: 60,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    margin: 20,
    fontSize: 15,
    backgroundColor: '#e4e4e4',
    textTransform: 'uppercase',
  },
  headerTitle: {
    margin: 3,
    fontSize: 12,
    color: '#707070',
  },
  image: {
    marginBottom: 10,
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  riskImage: {
    height: 30,
    width: 30,
    borderRadius: 50,
    marginRight: 45,
    marginLeft: 5,
  },
  sectionHeader: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 10,
    height: 23,
    backgroundColor: '#F5F5F5',
    borderColor: '#dedede',
    borderWidth: 1,
  },
  AccountContainer: {
    flexDirection: 'column',
    height: 58,
    width: '100%',
    marginBottom: 70,
  },
  riskContainer: {
    flexDirection: 'column',
    height: 'auto',
    width: '100%',
    marginBottom: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  markupColumn: {
    marginTop: 10,
  },
  titleColumn: {
    height: 'auto',
    marginTop: 30,
  },
  name: {
    fontSize: 16,
    textTransform: 'uppercase',
  },
  policySubtitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    color: 'blue',
  },
  subtitle: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  riskContent: {
    flexDirection: 'row',
    width: '100%',
    marginRight: 40,
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: Colours.border,
  },
  accountContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  contentHeader: {
    fontSize: 10,
    width: 100,
    marginBottom: 5,
    marginLeft: 5,
  },
  riskContentHeader: {
    fontSize: 10,
    width: 75,
    marginBottom: 5,
    marginLeft: 5,
  },
  contentData: {
    fontSize: 10,
    color: '#707070',
    marginLeft: 5,
  },
  riskContentData: {
    fontSize: 10,
    width: 75,
    color: '#707070',
    marginLeft: 5,
    marginTop: 8,
  },
})

function SlipHeader({ policyId, avatar, title }) {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Image src={avatar} style={styles.image} />
      </View>
      <View style={styles.titleColumn}>
        <Text style={styles.name}>{title}</Text>
      </View>
      <View style={styles.markupColumn}>
        <Text style={styles.policySubtitle}>Policy No. {policyId}</Text>
        <Text style={styles.subtitle}>Markup and Return</Text>
      </View>
    </View>
  )
}

function SectionHeader({ Title }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.headerTitle}>{Title}</Text>
    </View>
  )
}

function AccountDetails({ account, error, location }) {
  const {
    firstName,
    lastName,
    companyName,
    gender,
    dateOfBirth,
    industry,
    dlDateIssued,
    // maritalStatus,
    occupation,
    title,
    nationality,
    email,
    dlExpirationDate,
  } = account.person

  const { streetNumber, subPremise, premise, thoroughfare, country } =
    location || {}

  return (
    <>
      {error ? (
        <Content.Alert type="error" message={'something went wrong'} />
      ) : null}
      {gender ? (
        <View style={styles.AccountContainer}>
          <SectionHeader Title="Account Details" />
          <View style={styles.accountContent}>
            <View>
              <Text style={styles.contentHeader}>Title</Text>
              <Text style={styles.contentData}>{title ? title : '--'}</Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>Name</Text>
              <Text
                style={styles.contentData}
              >{`${firstName} ${lastName}`}</Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>Date of Birth</Text>
              <Text style={styles.contentData}>
                {dateOfBirth !== '0000-00-00'
                  ? new Date(
                      new Date(parseInt(dateOfBirth)).setDate(
                        new Date(parseInt(dateOfBirth)).getDate() + 1
                      )
                    ).toLocaleDateString()
                  : '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>Gender</Text>
              <Text style={styles.contentData}>{gender}</Text>
            </View>
            {/* <View>
              <Text style={styles.contentHeader}>Email</Text>
              <Text style={styles.contentData}>{email}</Text>
            </View> */}
          </View>
          <View style={styles.accountContent}>
            {/* <View>
              <Text style={styles.contentHeader}>Marital Status</Text>
              <Text style={styles.contentData}>{maritalStatus}</Text>
            </View> */}
            <View>
              <Text style={styles.contentHeader}>Occupation</Text>
              <Text style={styles.contentData}>{occupation}</Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>Nationality</Text>
              <Text style={styles.contentData}>{nationality}</Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>ID Issue Date</Text>
              <Text style={styles.contentData}>
                {dlDateIssued !== '0000-00-00'
                  ? new Date(
                      new Date(parseInt(dlDateIssued)).setDate(
                        new Date(parseInt(dlDateIssued)).getDate() + 1
                      )
                    ).toLocaleDateString()
                  : '-'}
              </Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>ID Exp. Date</Text>
              <Text style={styles.contentData}>
                {dlExpirationDate !== '0000-00-00'
                  ? new Date(
                      new Date(parseInt(dlExpirationDate)).setDate(
                        new Date(parseInt(dlExpirationDate)).getDate() + 1
                      )
                    ).toLocaleDateString()
                  : '-'}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={styles.AccountContainer}>
          <SectionHeader Title="Account Details" />
          <View style={styles.accountContent}>
            <View>
              <Text style={styles.contentHeader}>Company Name</Text>
              <Text style={styles.contentData}>
                {companyName ? companyName : '--'}
              </Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>Email</Text>
              <Text style={styles.contentData}>{email}</Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>Industry</Text>
              <Text style={styles.contentData}>
                {industry ? industry : '--'}
              </Text>
            </View>
            <View>
              <Text style={styles.contentHeader}>Locations</Text>
              <Text style={styles.contentData}>{`${
                streetNumber ? streetNumber : ''
              } ${subPremise ? subPremise + ', ' : ''} ${
                premise ? premise + ', ' : ''
              } ${thoroughfare ? thoroughfare : ''} ${
                country ? country : ''
              }`}</Text>
            </View>
          </View>
        </View>
      )}
    </>
  )
}

function PremiumDetails({ account, error, location }) {
  // const {} = account.person

  return (
    <>
      {error ? (
        <Content.Alert type="error" message={'something went wrong'} />
      ) : null}

      <View style={styles.AccountContainer}>
        <SectionHeader Title="Premium Details" />
        <View style={styles.accountContent}>
          <View>
            <Text style={styles.contentHeader}> Value A</Text>
            <Text style={styles.contentData}>
              ${currencyFormatter('10000') || '--'}
            </Text>
          </View>
          <View>
            <Text style={styles.contentHeader}>Value B</Text>
            <Text style={styles.contentData}>
              ${currencyFormatter('10000') || '--'}
            </Text>
          </View>
          <View>
            <Text style={styles.contentHeader}> Value C</Text>
            <Text style={styles.contentData}>
              ${currencyFormatter('10000') || '--'}
            </Text>
          </View>
          <View>
            <Text style={styles.contentHeader}>Premium</Text>
            <Text style={styles.contentData}>
              ${currencyFormatter('1000000') || '--'}
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

function MotorRisk({ policyMotorRiskData, policyId }) {
  let show = false
  if (policyMotorRiskData && policyMotorRiskData.MotorRisks.length > 0) {
    if (policyMotorRiskData.MotorRisks[0].MotorRisks.length > 0) {
      show =
        policyMotorRiskData.MotorRisks[0].policyId === parseInt(policyId) &&
        policyMotorRiskData.MotorRisks[0].MotorRisks[0].PolicyType !==
          'Property'
          ? true
          : false
    }
  }

  return show ? (
    <View style={styles.riskContainer}>
      <SectionHeader Title="Motor Risks" />
      <View style={styles.riskContent}>
        <Text style={styles.riskContentHeader}>Image</Text>
        {/* <Text style={styles.riskContentHeader}>Risk ID</Text> */}
        <Text style={styles.riskContentHeader}>Make</Text>
        <Text style={styles.riskContentHeader}>Model</Text>
        <Text style={styles.riskContentHeader}>Year</Text>
        <Text style={styles.riskContentHeader}>Mileage</Text>
        <Text style={styles.riskContentHeader}>Usage</Text>
      </View>
      {policyMotorRiskData &&
        policyMotorRiskData.MotorRisks.map((val, index) =>
          val.policyId === parseInt(policyId)
            ? val.MotorRisks.map(
                (
                  { make, model, year, id, base64Image, usage, mileage },
                  index
                ) => {
                  return (
                    <View style={styles.riskContent} key={`Motor${index}`}>
                      <Image
                        src={
                          base64Image
                            ? base64Image.replace('png', 'jpg')
                            : Motor
                        }
                        style={styles.riskImage}
                      />
                      {/* <Text style={styles.riskContentData}>{id}</Text> */}
                      <Text style={styles.riskContentData}>{make}</Text>
                      <Text style={styles.riskContentData}>
                        {model ? model : '--'}
                      </Text>
                      <Text style={styles.riskContentData}>{year}</Text>
                      <Text style={styles.riskContentData}>
                        {mileage ? mileage : '--'}
                      </Text>
                      <Text style={styles.riskContentData}>
                        {usage ? usage : '--'}
                      </Text>
                    </View>
                  )
                }
              )
            : null
        )}
    </View>
  ) : (
    <View></View>
  )
}
function NonMotorRisk({ policyNonMotorRiskData, policyId }) {
  let show = false

  if (
    policyNonMotorRiskData &&
    policyNonMotorRiskData.nonMotorRisks.length !== 0
  )
    show =
      policyNonMotorRiskData.nonMotorRisks[0].policyId === parseInt(policyId) &&
      policyNonMotorRiskData.nonMotorRisks[0].nonMotorRisks.length !== 0 &&
      policyNonMotorRiskData.nonMotorRisks[0].nonMotorRisks[0].PolicyType ===
        'Property'
        ? true
        : false
  return show ? (
    <View style={styles.riskContainer}>
      <SectionHeader Title="Property Risks" />
      <View style={styles.riskContent}>
        <Text style={styles.riskContentHeader}>Image</Text>
        {/* <Text style={styles.riskContentHeader}>Risk ID</Text> */}
        <Text style={styles.riskContentHeader}>Type</Text>
        <Text style={styles.riskContentHeader}>Storeys</Text>
        <Text style={styles.riskContentHeader}>Usage</Text>
        <Text
          style={{
            width: 150,
            marginBottom: 5,
            marginLeft: 5,
            fontSize: 10,
          }}
        >
          Location
        </Text>
      </View>
      {policyNonMotorRiskData &&
        policyNonMotorRiskData.nonMotorRisks.map((val, index) =>
          val.policyId === parseInt(policyId)
            ? val.nonMotorRisks.map(
                (
                  {
                    type,
                    storeys,
                    // id,
                    image,
                    usage,
                    thoroughfare,
                    premise,
                    country,
                  },
                  index
                ) => (
                  <View style={styles.riskContent} key={`House${index}`}>
                    <Image
                      src={image ? image : House}
                      style={styles.riskImage}
                    />
                    {/* <Text style={styles.riskContentData}>{id}</Text> */}
                    <Text style={styles.riskContentData}>{type}</Text>
                    <Text style={styles.riskContentData}>
                      {storeys ? storeys : '--'}
                    </Text>
                    <Text style={styles.riskContentData}>
                      {usage ? usage : '--'}
                    </Text>
                    <Text
                      style={{
                        width: 150,
                        color: '#707070',
                        marginLeft: 5,
                        marginTop: 8,
                        fontSize: 10,
                      }}
                    >
                      {`${premise ? premise : '--'}, ${
                        thoroughfare ? thoroughfare : '--'
                      }, ${country ? country.toUpperCase() : '--'}`}
                    </Text>
                  </View>
                )
              )
            : null
        )}
    </View>
  ) : (
    <View></View>
  )
}
function Extensions({ policyId, ExtensionData }) {
  return (
    <View style={styles.riskContainer}>
      <SectionHeader Title="Extensions" />
      <View style={styles.riskContent}>
        <Text
          style={{
            width: 130,
            marginBottom: 5,
            marginLeft: 5,
            fontSize: 10,
          }}
        >
          Name
        </Text>
        <Text style={styles.riskContentHeader}>Limit</Text>
        <Text style={styles.riskContentHeader}>Type</Text>
        <Text
          style={{
            width: 255,
            marginBottom: 5,
            marginLeft: 5,
            fontSize: 10,
          }}
        >
          Description
        </Text>
      </View>
      {ExtensionData &&
        ExtensionData.extensions.map((val, index) =>
          val.policyId === parseInt(policyId)
            ? val.extensions.map(
                ({ type, name, limit, description }, index) => (
                  <View
                    key={`Extensions${index}`}
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginRight: 40,
                      marginBottom: 15,
                      borderBottomWidth: 0.5,
                      borderColor: Colours.border,
                    }}
                  >
                    <Text
                      style={{
                        width: 130,
                        color: '#707070',
                        marginLeft: 5,
                        marginTop: 8,
                        fontSize: 10,
                      }}
                    >
                      {name}
                    </Text>
                    <Text style={styles.riskContentData}>
                      ${currencyFormatter(limit)}.00
                    </Text>
                    <Text style={styles.riskContentData}>{type}</Text>
                    <Text
                      style={{
                        width: 255,
                        color: '#707070',
                        marginLeft: 5,
                        marginTop: 8,
                        fontSize: 10,
                      }}
                    >
                      {description}
                    </Text>
                  </View>
                )
              )
            : null
        )}
    </View>
  )
}
function Limits({ policyId, LimitData }) {
  return (
    <View
      style={{
        flexDirection: 'column',
        height: 'auto',
        width: '100%',
      }}
    >
      <SectionHeader Title="Limits" />
      <View style={styles.riskContent}>
        <Text
          style={{
            width: 130,
            marginBottom: 5,
            marginLeft: 5,
            fontSize: 10,
          }}
        >
          Heading
        </Text>
        <Text style={styles.riskContentHeader}>Amount</Text>
        <Text style={styles.riskContentHeader}>Third Party</Text>
        <Text
          style={{
            width: 255,
            marginBottom: 5,
            marginLeft: 5,
            fontSize: 10,
          }}
        >
          Description
        </Text>
      </View>
      {LimitData &&
        LimitData.limits.map((val) =>
          val.policyId === parseInt(policyId)
            ? val.limit.map(
                ({ amount, heading, thirdParty, description }, index) => (
                  <View
                    key={`limits${index}`}
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      marginRight: 40,
                      marginBottom: 15,
                      borderBottomWidth: 0.5,
                      borderColor: Colours.border,
                    }}
                  >
                    <Text
                      style={{
                        width: 130,
                        color: '#707070',
                        marginLeft: 5,
                        marginTop: 8,
                        fontSize: 10,
                      }}
                    >
                      {heading ? heading : '-'}
                    </Text>
                    <Text style={styles.riskContentData}>
                      ${currencyFormatter(amount)}.00
                    </Text>
                    <Text style={styles.riskContentData}>
                      {thirdParty === '1' ? 'Yes' : 'No'}
                    </Text>
                    <Text
                      style={{
                        width: 255,
                        color: '#707070',
                        marginLeft: 5,
                        marginTop: 8,
                        fontSize: 10,
                      }}
                    >
                      {description}
                    </Text>
                  </View>
                )
              )
            : null
        )}
    </View>
  )
}

export {
  SlipHeader,
  MotorRisk,
  NonMotorRisk,
  Extensions,
  Limits,
  AccountDetails,
  PremiumDetails,
}
