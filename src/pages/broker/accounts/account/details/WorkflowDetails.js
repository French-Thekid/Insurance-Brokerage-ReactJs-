import { Formik } from 'formik'
import React, { useContext, useRef, useState, useEffect } from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import 'styled-components/macro'
import * as Yup from 'yup'
import { config } from '../../../../../config/config'
import {
  UserContext,
  ColourContext,
  WalkthroughContext,
} from '../../../../../context'
import {
  ADD_ACCOUNT_TO_WORKFLOW,
  READ_USER,
} from '../../../../../context/queries'
import { Icons, Core, Layout, Content, Notification } from 'components'
import { useDialog, useOnClickOutside } from 'hooks'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { ArrayHelper } from '../../../../../utils/ArrayHelper'
import { Logger } from '../../../../../utils'
import DenialForm from './forms/DenialForm'
import { SEND_MAIL } from '../email/mutations'

const Section = ({
  children,
  Columns = '1fr',
  style = { outline: 'initial' },
}) => (
  <div
    style={style}
    css={`
      align-items: center;
      display: grid;
      grid-template-columns: ${Columns};
      grid-column-gap: 10px;
    `}
  >
    {children}
  </div>
)
const SubSection = ({ children }) => (
  <div
    css={`
      align-items: center;
      display: grid;
      grid-template-rows: max-content max-content;
      grid-row-gap: 4px;
    `}
  >
    {children}
  </div>
)

const Steps = ({ workflows, workflowId, stepId, height = 'max-content' }) => {
  let array = ArrayHelper.findArrayById(workflows, workflowId)
  const history = useHistory()
  const { Colours } = useContext(ColourContext)

  return (
    <ul
      css={`
        list-style: none;
        padding-inline-start: 0px;
        counter-reset: steps;
        border: 1px solid ${Colours.border};
        padding: 24px 12px;
        border-radius: 5px;
        max-height: 160px;
        height: ${height};
        overflow-y: auto;
        overscroll-behavior: contain;

        ::-webkit-scrollbar {
          width: 0px;
        }

        & > li {
          padding: 0 0 20px 50px;
          position: relative;
          margin: 0;
          color: ${Colours.text};
        }

        & > li:after {
          position: absolute;
          top: 0;
          left: 0;
          content: counter(steps);
          counter-increment: steps;
          font-size: 12px;
          border: 2px solid #d3d7d9;
          border-radius: 50%;
          display: inline-block;
          height: 20px;
          width: 20px;
          text-align: center;
          line-height: 20px;
          background: ${Colours.foreground};
        }
        & > li[data-current='true']:after {
          border: 3px solid #3590f3;
        }
        & > li[data-current='true'] {
          color: ${Colours.blue};
        }
        & > li:before {
          position: absolute;
          left: 13px;
          top: 0;
          content: '';
          height: 100%;
          width: 0;
          border-left: 1px solid #d3d7d9;
        }
        & > li:last-of-type:before {
          border: none;
        }
      `}
    >
      {array ? (
        array.steps.map((step) => (
          <li data-current={step.id === stepId} key={step.id}>
            <p
              css={`
                color: ${Colours.text};
                margin: 0px;
              `}
            >
              {step.name || step.content}
            </p>
          </li>
        ))
      ) : (
        <>
          <Layout.Flex justify="center">
            <Core.Box>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40px"
                height="40px"
                viewBox="0 0 24 24"
              >
                <path d="M17 12.645v-2.289c-1.17-.417-1.907-.533-2.28-1.431-.373-.9.07-1.512.6-2.625l-1.618-1.619c-1.105.525-1.723.974-2.626.6-.9-.374-1.017-1.117-1.431-2.281h-2.29c-.412 1.158-.53 1.907-1.431 2.28h-.001c-.9.374-1.51-.07-2.625-.6l-1.617 1.619c.527 1.11.973 1.724.6 2.625-.375.901-1.123 1.019-2.281 1.431v2.289c1.155.412 1.907.531 2.28 1.431.376.908-.081 1.534-.6 2.625l1.618 1.619c1.107-.525 1.724-.974 2.625-.6h.001c.9.373 1.018 1.118 1.431 2.28h2.289c.412-1.158.53-1.905 1.437-2.282h.001c.894-.372 1.501.071 2.619.602l1.618-1.619c-.525-1.107-.974-1.723-.601-2.625.374-.899 1.126-1.019 2.282-1.43zm-8.5 1.689c-1.564 0-2.833-1.269-2.833-2.834s1.269-2.834 2.833-2.834 2.833 1.269 2.833 2.834-1.269 2.834-2.833 2.834zm15.5 4.205v-1.077c-.55-.196-.897-.251-1.073-.673-.176-.424.033-.711.282-1.236l-.762-.762c-.52.248-.811.458-1.235.283-.424-.175-.479-.525-.674-1.073h-1.076c-.194.545-.25.897-.674 1.073-.424.176-.711-.033-1.235-.283l-.762.762c.248.523.458.812.282 1.236-.176.424-.528.479-1.073.673v1.077c.544.193.897.25 1.073.673.177.427-.038.722-.282 1.236l.762.762c.521-.248.812-.458 1.235-.283.424.175.479.526.674 1.073h1.076c.194-.545.25-.897.676-1.074h.001c.421-.175.706.034 1.232.284l.762-.762c-.247-.521-.458-.812-.282-1.235s.529-.481 1.073-.674zm-4 .794c-.736 0-1.333-.597-1.333-1.333s.597-1.333 1.333-1.333 1.333.597 1.333 1.333-.597 1.333-1.333 1.333z" />
              </svg>
            </Core.Box>
          </Layout.Flex>
          <Layout.Flex justify="center">
            <Core.Box>
              <Core.Text mb="8px">No workflows selected</Core.Text>
              <Core.Button
                onClick={() =>
                  history.push('/broker/settings/workflows/editor')
                }
              >
                Create One
              </Core.Button>
            </Core.Box>
          </Layout.Flex>
        </>
      )}
    </ul>
  )
}
const SelectContainer = ({
  workflows = [],
  disabled = true,
  handleChange = (val) => {
    console.log('no handle')
  },
}) => {
  if (workflows === null) workflows = []
  let select = useRef()
  return (
    <select
      aria-label="Whats up!"
      data-balloon-pos="up"
      data-cy="workflow-select"
      ref={select}
      disabled={disabled}
      defaultValue="select new workflow"
      onChange={(s) => {
        let valueObject = {
          value: s.target.value,
          name: s.target.options[s.target.options.selectedIndex].text,
        }
        handleChange(valueObject)
      }}
      css={`
        border: 1px solid #d3d7d9;
        width: 100%;
        padding: 10px 12px;
        border-radius: 4px;
        z-index: 1;
        &:disabled {
          border: 1px solid #dbdedf;
          cursor: not-allowed;
          opacity: 0.5;
        }
      `}
    >
      <option disabled>select new workflow</option>
      {workflows.map((wf, index) => (
        <option key={index} value={wf.id}>
          {wf.name}
        </option>
      ))}
    </select>
  )
}

const ApprovalForm = ({ close = () => {}, account, workflows }) => {
  const [editWorkflow] = useMutation(ADD_ACCOUNT_TO_WORKFLOW)
  const [sendMail] = useMutation(SEND_MAIL)
  const { workflowRanBy, person } = account
  const { loading: userLoading, data: userData } = useQuery(READ_USER, {
    variables: { id: workflowRanBy },
  })
  const [auth, setAuth] = useState(false)
  const {
    loggedInUser: { id: userId, email, firstName, lastName },
  } = useContext(UserContext)
  const {
    params: { accountId: id },
  } = useRouteMatch()
  const currentWorkflow = ArrayHelper.findObjectByAttributeValue(
    workflows,
    'id',
    account.workflowId
  )[0]
  let currentStep = ArrayHelper.findObjectByAttributeValue(
    currentWorkflow.steps,
    'id',
    account.stepId
  )[0]
  let index = ArrayHelper.fieldIndex(currentWorkflow.steps, currentStep)
  let currentStepDetails = ArrayHelper.fieldDetails(
    currentWorkflow.steps,
    index
  )
  const email_data = {
    reason: 'This step was deemed appropriate and has been approved',
    account: parseInt(id),
    approvedByUser: {
      name: `${firstName} ${lastName}`,
      email: email,
    },
    ranbyUser: {
      name: `${userData?.readUser?.firstName || ''} ${
        userData?.readUser?.lastName || ''
      }`,
      email: userData?.readUser?.email || '',
    },
  }

  function allowedApprover() {
    if (currentStep.stepType === 'APPROVER') {
      let approverIDs = [...currentStep.userIDs, currentWorkflow.createdBy]
      return approverIDs.includes(userId)
    }
  }

  function Approve(callback = () => {}) {
    if (!currentWorkflow.steps[currentStepDetails.nextIndex]?.id) {
      localStorage.removeItem('walkthroughId')
      window.location.reload()
    }
    const clonePerson = { ...account.person }
    delete clonePerson.__typename
    delete clonePerson.avatar
    editWorkflow({
      variables: {
        id: parseInt(id),
        workflowId: account.workflowId,
        stepId: currentWorkflow.steps[currentStepDetails.nextIndex].id,
        person: clonePerson,
      },
    })
      .then(() => {
        callback()
        // window.location.reload()
      })
      .catch((e) => {
        console.log(e)
        Notification({
          title: 'Error',
          body: 'We are unable to approve this workflow at this time',
          titleBackground: '#E83151',
        })
      })
  }

  const { Colours } = useContext(ColourContext)
  const [beingDenied, setBeingDenied] = useState(false)
  useEffect(() => {}, [auth])
  if (userLoading) {
    return (
      <Core.Box>
        <Core.Text mb="12px">Please wait...</Core.Text>
      </Core.Box>
    )
  }
  if (currentStep.stepType !== 'APPROVER')
    return (
      <Core.Box>
        <Core.Text mb="12px">
          This account does not currently require an approval to progress.
        </Core.Text>
        <Core.Button width="60px" onClick={close}>
          okay
        </Core.Button>
      </Core.Box>
    )
  if (auth && !allowedApprover())
    return (
      <Core.Box>
        <Core.Text mb="12px">
          You are unable to approve this account please contact your
          administrator for help.
        </Core.Text>
        <Core.Button width="60px" onClick={close}>
          okay
        </Core.Button>
      </Core.Box>
    )
  if (auth && allowedApprover())
    return (
      <Core.Box width="300px">
        {!beingDenied ? (
          <>
            <Core.Text mb="12px">
              Approve moving from step{' '}
              <span style={{ color: Colours.blue }}>
                {currentWorkflow.steps[currentStepDetails.previousIndex]
                  ?.name || 'Start'}
              </span>{' '}
              to step{' '}
              <span style={{ color: Colours.blue }}>
                {currentWorkflow.steps[currentStepDetails.nextIndex]?.name ||
                  'Complete'}
              </span>{' '}
              for account{' '}
              <span style={{ color: Colours.blue }}>
                {account.person.firstName} {account.person.lastName}?
              </span>
            </Core.Text>
            <br />
            <Layout.Flex>
              <Core.Button
                width="70px"
                style={{ marginRight: '6px' }}
                onClick={() =>
                  Approve(() => {
                    sendMail({
                      variables: {
                        params: {
                          accountId: email_data.account,
                          to: email_data.ranbyUser.email,
                          cc: email_data.approvedByUser.email,
                          subject: `Workflow for account ${person.firstName} ${person.lastName} approved by ${email_data.approvedByUser.name}`,
                          html: email_data.reason,
                        },
                      },
                    })
                      .then(() => {
                        setTimeout(() => window.location.reload(), 1000)
                      })
                      .catch((e) => console.log(e))
                  })
                }
              >
                Approve
              </Core.Button>
              <Core.Button
                width="70px"
                bgColour="#ff2e63"
                onClick={() => setBeingDenied(true)}
              >
                Deny
              </Core.Button>
            </Layout.Flex>
          </>
        ) : (
          <>
            <Core.Text>Enter a reason for denying this step</Core.Text>
            <br />
            <DenialForm
              cancel={setBeingDenied}
              workflow={currentWorkflow}
              account={account}
            />
          </>
        )}
      </Core.Box>
    )
  return (
    <Formik
      initialValues={{ password: '', username: email }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(8, 'minimum 8 characters')
          .trim('no spaces')
          .required('password is required')
          .strict(true),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true)
        await fetch(
          `https://${config.API_KEY}.execute-api.${config.REGION}.amazonaws.com/${config.STAGE}/v1/auth/signin`,
          {
            method: 'POST',
            useTokens: false,
            headers: {
              Accept: 'application/json',
              'content-type': 'application/json',
            },
            body: JSON.stringify(values),
          }
        )
          .then((res) => {
            return res.json()
          })
          .then((data) => {
            if (data.AuthenticationResult) {
              setAuth(true)
            } else if (data.message) {
              Notification({
                title: 'Error',
                body: 'Password is incorrect',
                titleBackground: '#E83151',
              })
            }
          })
        setSubmitting(false)
      }}
    >
      {({
        errors,
        touched,
        values,
        isSubmitting,
        handleChange,
        handleSubmit,
      }) => (
        <>
          <Core.Text mb="12px">
            Approve the current workflow on this account by entering your
            password
          </Core.Text>

          {errors && touched ? (
            <small
              css={`
                color: red;
              `}
            >
              {' '}
              {errors.password}
            </small>
          ) : null}
          <input
            css={`
              border: 2px solid #adadad;
              border-radius: 4px;
              padding: 4px;
              width: calc(100% - calc(4px * 4));
            `}
            name="password"
            value={values.password}
            onChange={handleChange}
            type="password"
          />
          <br />
          <br />
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}
          >
            <Core.Button
              style={{ margin: 'initial', marginRight: '12px' }}
              width="100px"
              type="button"
              disabled={isSubmitting}
              onClick={handleSubmit}
              bgColour={Colours.blue}
            >
              {isSubmitting ? 'Loading' : 'Continue'}
            </Core.Button>

            <Core.Button
              style={{ margin: 'initial' }}
              width="100px"
              action="READ"
              bgColour="#E83151"
              onClick={() => close()}
            >
              Cancel
            </Core.Button>
            <br />
          </div>
        </>
      )}
    </Formik>
  )
}

export default function WorkflowDetails({
  account = { stepId: '', workflowId: '', person: {} },
  workflows = [],
}) {
  const { Colours } = useContext(ColourContext)
  const match = useRouteMatch()
  const dd = useRef()
  const id = parseInt(match.params.accountId)
  const ddmenu = useRef()
  useOnClickOutside(ddmenu, () => {
    if (dd.current.checked === true) {
      dd.current.checked = false
    }
  })
  const [editing, setEditing] = useState(false)
  const { ...user } = useContext(UserContext)
  const [tempSelecetValue, setTempSelectValue] = useState({})
  const [name, setName] = useState(
    ArrayHelper.findObjectByAttributeValue(
      workflows,
      'id',
      account.workflowId
    )[0]?.name || 'none'
  )
  const { Initialise } = useContext(WalkthroughContext)
  const {
    open: approvalOpen,
    toggle: toggleApproval,
    Dialog: ApprovalDialog,
  } = useDialog()
  const {
    open: removalOpen,
    toggle: toggleRemoval,
    Dialog: RemovalDialog,
  } = useDialog()

  const toggleEdit = () => {
    setEditing(!editing)
  }

  const [addToWorkflow, { error: workflowMutationError }] = useMutation(
    ADD_ACCOUNT_TO_WORKFLOW
  )

  const removeFromWorkflow = () => {
    const clonePerson = { ...account.person }
    delete clonePerson.__typename
    delete clonePerson.avatar
    addToWorkflow({
      variables: {
        id,
        workflowId: 'null',
        stepId: '',
        person: clonePerson,
      },
    })
      .then((res) => {
        Logger('remove account from workflow', 'workflow', null, () => {
          setName(null)
          window.location.reload()
        })
      })
      .catch((e) => console.log(e))
  }

  async function editWorkflow(e) {
    const clonePerson = { ...account.person }
    delete clonePerson.__typename
    delete clonePerson.avatar
    return addToWorkflow({
      variables: {
        id,
        workflowId: tempSelecetValue.value,
        stepId:
          ArrayHelper.findArrayById(workflows, tempSelecetValue.value)?.steps[0]
            .id || '',
        person: clonePerson,
        workflowRanBy: user.loggedInUser.id,
      },
    })
  }

  const saveChanges = () => {
    editWorkflow()
      .then(() => {
        setName(tempSelecetValue.name)
        toggleEdit()
        window.location.reload()
      })
      .catch((e) => {
        toggleEdit()
        console.log(e)
        // window.location.reload()
      })
  }

  const handleChange = (values) => {
    setTempSelectValue(values)
  }

  useEffect(() => {}, [name, workflows])

  return (
    <div
      css={`
        flex: 1;
        @media (min-width: 1367px) {
          flex: 0;
          min-width: 500px;
        }
        min-width: 230px;
        height: 550px;
        margin-bottom: 10px;
        display: grid;
        grid-template-rows: repeat(3, max-content) 1fr;
        grid-row-gap: 15.5px;
        border: 1px solid ${Colours.border};
        padding: 10px;
        border-radius: 5px;
      `}
    >
      <Section Columns="1fr max-content">
        <Icons.DeviceHubRounded
          style={{ color: Colours.blue, fontSize: '40px' }}
        />
        <Core.Text weight="600" color={Colours.blue}>
          WorkFlow Details
        </Core.Text>
      </Section>
      {workflowMutationError ? (
        <Content.Alert
          type="error"
          pd="4px"
          message="An error occured while trying to update this workflow"
        />
      ) : null}

      <Section Columns="max-content max-content">
        {editing ? (
          <>
            {' '}
            <Core.Button
              bgColour={Colours.green}
              color={Colours.foreground}
              style={{ boxShadow: 'none', padding: '8px' }}
              width="120px"
              onClick={saveChanges}
            >
              Save
            </Core.Button>
            <Core.Button
              action="READ"
              bgColour={Colours.text}
              color={Colours.foreground}
              style={{ boxShadow: 'none', padding: '8px' }}
              width="120px"
              onClick={toggleEdit}
            >
              Cancel
            </Core.Button>
          </>
        ) : (
          <>
            <label className="dropdown">
              <div className="dd-button">Actions</div>

              <input type="checkbox" className="dd-input" id="test" ref={dd} />

              <ul className="dd-menu" ref={ddmenu}>
                <li>
                  <button
                    disabled={name === 'none'}
                    onClick={() => toggleApproval()}
                  >
                    Workflow Approval
                  </button>
                </li>

                <li>
                  <button onClick={() => toggleEdit()}>
                    {name === 'none' ? 'Select Workflow' : 'Switch Workflow'}
                  </button>
                </li>

                <li>
                  <button action="DELETE" onClick={toggleRemoval}>
                    {' '}
                    Remove from workflow
                  </button>
                </li>
              </ul>
            </label>
            <Core.Button
              aria-label={workflows ? null : 'no workflows available'}
              data-balloon-pos="up"
              onClick={() => {
                Logger(
                  `start workflow on account ${
                    account.person?.firstName || ''
                  }${account.person?.lastName || ''} `
                )
                Initialise(id)
              }}
              css={`
                &:disabled {
                  filter: grayscale(80%);
                  cursor: not-allowed;
                }
              `}
              bgColour={Colours.blue}
              color={Colours.foreground}
              disabled={name === 'none' ? true : false}
              style={{ boxShadow: 'none', padding: '8px' }}
            >
              Start
            </Core.Button>
          </>
        )}
      </Section>
      <SubSection>
        <Section Columns="max-content max-content">
          <Core.Text weight="600" color={Colours.text}>
            Current WorkFlow:
          </Core.Text>
          <Core.Text weight="600" color={Colours.blue}>
            {name}
          </Core.Text>
        </Section>
        <Section style={{ display: 'initial' }}>
          <SelectContainer
            workflows={workflows}
            disabled={!editing}
            handleChange={(v) => {
              handleChange(v)
            }}
          />
        </Section>
      </SubSection>
      <SubSection>
        <Section>
          <Core.Text weight="600" color={Colours.text}>
            Steps
          </Core.Text>
        </Section>
        <Section>
          <Steps
            height="350px"
            stepId={account.stepId}
            workflowId={account.workflowId}
            workflows={workflows}
          />
        </Section>
      </SubSection>
      <ApprovalDialog
        open={approvalOpen}
        title="Workflow Approval"
        close={toggleApproval}
      >
        <ApprovalForm
          account={account}
          workflows={workflows}
          close={toggleApproval}
        />
      </ApprovalDialog>
      <RemovalDialog
        open={removalOpen}
        title="Removal Aprroval"
        close={toggleRemoval}
      >
        <Core.Text>Are you sure you want to remove this workflow?</Core.Text>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '10px',
          }}
        >
          <Core.Button
            style={{ margin: 'initial', marginRight: '12px' }}
            width="100px"
            type="submit"
            // disabled={isSubmitting}
            onClick={() => {
              removeFromWorkflow()
              toggleRemoval()
            }}
            bgColour="#E83151"
          >
            {/* {isSubmitting ? 'Loading' : 'Continue'} */}
            Remove
          </Core.Button>

          <Core.Button
            style={{ margin: 'initial' }}
            width="100px"
            action="READ"
            bgColour={Colours.text}
            onClick={toggleRemoval}
          >
            Cancel
          </Core.Button>
          <br />
        </div>
      </RemovalDialog>
    </div>
  )
}
