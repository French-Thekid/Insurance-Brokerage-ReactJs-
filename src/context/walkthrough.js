import React, { createContext, useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { READACCOUNT, ADD_ACCOUNT_TO_WORKFLOW } from './queries'
import { ArrayHelper, Logger } from '../utils'
import { Core, Notification } from '../components'
import { GetOrganization } from './organisation'

const WalkthroughContext = createContext({})
const { Provider } = WalkthroughContext

function WalkthroughProvider({ children }) {
  const [active] = useState(
    localStorage.getItem('walkthroughId') ? true : false
  )
  const userType = JSON.parse(localStorage.getItem('session'))
  const [history, setHistory] = useState(() => {})
  const [id, setId] = useState(parseInt(localStorage.getItem('walkthroughId')))
  const [workflows, setWorkflows] = useState([])
  const [trigger, setTrigger] = useState(Math.random())

  const [editWorkflow] = useMutation(ADD_ACCOUNT_TO_WORKFLOW)
  const { data, refetch } = useQuery(READACCOUNT, {
    variables: { accountId: id },
    skip: isNaN(id),
  })

  const getWorkflows = async (set) => {
    try {
      //getting Organization
      let orgDetails = {}
      if (userType === undefined || userType === null) orgDetails = {}
      else {
        orgDetails = GetOrganization()
      }

      const { readFacility } = orgDetails || {}
      const { templates } = readFacility || {}
      const { workflows } = templates || {}

      set(workflows)
    } catch (error) {
      console.log(error)
    }
  }

  const Initialise = (id) => {
    setId(id)
    localStorage.setItem('walkthroughId', id)
  }

  const PrepareData = (account, workflows) => {
    if (account && workflows.length > 0) {
      const person = account.readAccount.person
      const stepId = account.readAccount.stepId
      const workflowId = account.readAccount.workflowId
      const currentWorkflow = ArrayHelper.findObjectByAttributeValue(
        workflows,
        'id',
        workflowId
      )[0]
      const steps = currentWorkflow.steps
      const currentStep = ArrayHelper.findObjectByAttributeValue(
        steps,
        'id',
        stepId
      )[0]
      if (!currentStep) {
        const clonePerson = { ...person }
        delete clonePerson.__typename
        delete clonePerson.avatar
        editWorkflow({
          variables: {
            id,
            workflowId: 'null',
            workflowRanBy: JSON.parse(localStorage.getItem('user')).id,
            stepId: '',
            person: clonePerson,
          },
        }).then(() => {
          localStorage.removeItem('walkthroughId')
          window.location.reload()
        })
      }
      let currentIndex = ArrayHelper.fieldIndex(steps, currentStep)
      let currentDetails = ArrayHelper.fieldDetails(steps, currentIndex)
      let data = {
        person,
        stepId,
        workflowId,
        currentWorkflow,
        steps,
        currentStep,
        currentIndex,
        currentDetails,
      }
      return data
    }
  }

  const mutateWorkflow = (data, stepId, path) => {
    const clonePerson = { ...data.readAccount.person }
    delete clonePerson.__typename
    delete clonePerson.avatar
    editWorkflow({
      variables: {
        id,
        workflowId: data.readAccount.workflowId,
        workflowRanBy: JSON.parse(localStorage.getItem('user')).id,
        stepId: stepId,
        person: clonePerson,
      },
    })
      .then(() => {
        refetch()
        RouteTo(path)
      })
      .catch((e) =>
        Notification(
          {
            title: 'Workflow',
            titleBackground: '#fc1460',
            body: (
              <>
                <Core.Text size="sm" mb="8px">
                  We are having trouble carrying out this workflow please close
                  and try again later
                </Core.Text>
                <Core.Button
                  width="60px"
                  onClick={() => {
                    localStorage.removeItem('walkthroughId')
                    window.location.reload()
                  }}
                >
                  Save & exit workflow
                </Core.Button>
              </>
            ),
          },
          { autoClose: 9000 }
        )
      )
  }

  const Next = () => {
    let mutationData = PrepareData(data, workflows)
    if (mutationData) {
      let nextStepId =
        mutationData.steps[mutationData.currentDetails.nextIndex].id
      let path = mutationData.steps[mutationData.currentDetails.nextIndex].name
      mutateWorkflow(data, nextStepId, path)
      Logger(
        `move account forward to workflow step ${
          mutationData.steps[mutationData.currentDetails.nextIndex]?.name || ''
        }`,
        'workflow',
        null,
        () => {
          setTrigger(Math.random())
        }
      )
    }
  }

  const Previous = () => {
    let mutationData = PrepareData(data, workflows)
    if (mutationData) {
      let previousStepId =
        mutationData.steps[mutationData.currentDetails.previousIndex].id
      let path =
        mutationData.steps[mutationData.currentDetails.previousIndex].name
      mutateWorkflow(data, previousStepId, path)
      Logger(
        `move account back to workflow step ${
          mutationData.steps[mutationData.currentDetails.previousIndex]?.name ||
          ''
        }`,
        'workflow',
        null,
        () => {
          setTrigger(Math.random())
        }
      )
    }
  }

  const RouteData = (step) => {
    switch (step) {
      case 'Account':
        return `/broker/account/details/${id}`
      case 'Create Account':
        return `/broker/accounts?action=createAccount`
      case 'Edit Account':
        return `/broker/account/details/${id}?action=editOaccount`
      case 'Event':
        return `/broker/account/events/${id}`
      case 'Email':
        return `/broker/account/email/${id}`
      case 'Create Email':
        return `/broker/account/email/${id}?action=compose&accountId=${id}`
      case 'Document':
        return `/broker/account/documents/${id}`
      case 'Insurers':
        return `/broker/insurers`
      case 'Create Insurers':
        return `/broker/insurers?action=createInsurer`
      case 'Note':
        return `/broker/account/notes/${id}`
      case 'Slip':
        return `/broker/account/slips/${id}`
      case 'Policy':
        return `/broker/account/policies/${id}`
      case 'Create Policy':
        return `/broker/account/policies/${id}?action=createPolicy`
      case 'Limit':
        return `/broker/account/policies/${id}/limits/0?action=createLimit`
      case 'Extension':
        return `/broker/account/policies/${id}/extensions/0?action=createExtension`
      case 'Risk':
        return `/broker/account/policies/${id}/nonMotorRisks/0?action=createNonMotorRisk`
      case 'Motor Risk':
        return `/broker/account/policies/${id}/motorRisks/0?action=createMotorRisk`
      default:
        return null
    }
  }

  const RouteTo = (step) => {
    switch (step) {
      case 'Account':
        history.push(`/broker/account/details/${id}`)
        break
      case 'Create Account':
        history.push(`/broker/accounts?action=createAccount`)
        break
      case 'Edit Account':
        history.push(`/broker/account/details/${id}?action=editOaccount`)
        break
      case 'Event':
        history.push(`/broker/account/events/${id}`)
        break
      case 'Email':
        history.push(`/broker/account/email/${id}`)
        break
      case 'Create Email':
        history.push(
          `/broker/account/email/${id}?action=compose&accountId=${id}`
        )
        break
      case 'Document':
        history.push(`/broker/account/documents/${id}`)
        break
      case 'Insurers':
        history.push(`/broker/insurers`)
        break
      case 'Create Insurers':
        history.push(`/broker/insurers?action=createInsurer`)
        break
      case 'Note':
        history.push(`/broker/account/notes/${id}`)
        break
      case 'Slip':
        history.push(`/broker/account/slips/${id}`)
        break
      case 'Policy':
        history.push(`/broker/account/policies/${id}`)
        break
      case 'Create Policy':
        history.push(`/broker/account/policies/${id}?action=createPolicy`)
        break
      case 'Limit':
        history.push(
          `/broker/account/policies/${id}/limits/0?action=createLimit`
        )
        break
      case 'Extension':
        history.push(
          `/broker/account/policies/${id}/extensions/0?action=createExtension`
        )
        break
      case 'Risk':
        history.push(
          `/broker/account/policies/${id}/nonMotorRisks/0?action=createNonMotorRisk`
        )
        break
      case 'Motor Risk':
        history.push(
          `/broker/account/policies/${id}/motorRisks/0?action=createMotorRisk`
        )
        break
      default:
        return null
    }
  }

  const Walkthrough = {
    Initialise,
    Next,
    Previous,
    setHistory,
    active,
    walkthrough: PrepareData(data, workflows),
    RouteData,
  }

  useEffect(() => {
    getWorkflows(setWorkflows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  return <Provider value={Walkthrough}>{children}</Provider>
}

export { WalkthroughContext, WalkthroughProvider }
