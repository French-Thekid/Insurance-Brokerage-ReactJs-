import React, { useState, createContext, useContext } from 'react'
import { Request } from '../utils'
import { useQuery } from '@apollo/react-hooks'
import { SessionContext } from './session'
import { Loading, Content } from 'components'
import { GET_ORGANIZATION } from './queries'

const queryString = require('querystring')

const organisation = {
  Organisations: [],
}
const OrganisationContext = createContext(organisation)
const { Provider } = OrganisationContext

function OrganisationProvider({ children }) {
  const { idToken } = useContext(SessionContext)
  const userType = JSON.parse(localStorage.getItem('session'))
  const [Organisations] = useState(organisation.Organisations)
  const [organisationErrors, setOrganisationErrors] = useState(null)

  //getting Organization
  let orgDetails = {}
  if (userType === undefined || userType === null) orgDetails = {}
  else {
    orgDetails = GetOrganization()
  }
  /**
   * Code Above is used to prevent api call when user is logged out
   */
  const {
    emailLogo,
    logoUrl,
    name: orgName = 'loading',
    templates,
    message,
    status,
  } = orgDetails || {}
  localStorage.setItem('templates', JSON.stringify(templates))

  try {
    const template = []
    //Todo Refer backend about improvement
    Object.keys(!message && templates.slip).length > 0
      ? template.push({
          avatar: templates.slip.avatar,
          title: templates.slip.headerContent,
          name: templates.slip.templateName,
          footer: templates.slip.footerContent,
          sections: templates.slip.body.map((section) => section.title),
        })
      : console.log('no template created')
    localStorage.setItem('template', JSON.stringify(template))
  } catch (e) {
    console.log('Fail Extraction')
  }

  //Update Organization Support Side
  const UpdateOrganisation = async ({
    name,
    taxId,
    organizationId,
    replyToEmail,
    logoUrl,
    adminContact,
    technicalContact,
    billingContact,
    location,
  }) => {
    const query = queryString.stringify({
      query: organizationId,
    })
    try {
      const result = await Request({
        url: `v1/organization/update-attribute?${query}`,
        type: 'post',
        body: {
          name,
          taxId,
          replyToEmail,
          base64Logo: logoUrl.split(',')[1],
          emailLogo: logoUrl,
          adminContact,
          billingContact,
          technicalContact,
          location,
        },
        authorization: idToken,
      })

      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }

  //Update organization Broker Side
  const UpdateOrganisationAttribute = async ({ body, organizationId }) => {
    const query = queryString.stringify({
      query: organizationId,
    })
    try {
      const result = await Request({
        url: `v1/organization/update-attribute?${query}`,
        type: 'post',
        body: body,
        authorization: idToken,
      })

      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }

  //Delete Organization
  const DeleteOrganisation = async (organisationId, noRefresh) => {
    try {
      const query = queryString.stringify({
        query: organisationId,
      })
      const result = await Request({
        url: `v1/support/organization/delete?${query}`,
        type: 'delete',
        authorization: idToken,
      })
      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      } else {
        if (!noRefresh) setTimeout(() => window.location.reload(), 1000)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }

  //Suspend and Enable Organization
  const ToggleOrganisation = async (organisationId, status) => {
    const query = queryString.stringify({
      query: organisationId,
    })
    // console.log(query)
    try {
      const result = await Request({
        url: `v1/organization/update-attribute?${query}`,
        type: 'post',
        body: {
          status,
        },
        authorization: idToken,
      })

      const json = await result.json()
      if (!result.ok) {
        setOrganisationErrors(json)
      }
    } catch (error) {
      setOrganisationErrors(error)
    }
  }
  const store = {
    status,
    logoUrl,
    emailLogo,
    templates,
    orgName,
    Organisations,
    DeleteOrganisation,
    organisationErrors,
    ToggleOrganisation,
    UpdateOrganisation,
    UpdateOrganisationAttribute,
  }
  return <Provider value={store}>{children}</Provider>
}
export function GetOrganization() {
  //Query
  const { loading, error, data } = useQuery(GET_ORGANIZATION)
  if (loading) return <Loading />
  if (error) return <Content.Alert type="error" message={error.message} />

  const { readFacility } = data || {}
  return readFacility
}

export { OrganisationContext, OrganisationProvider }
