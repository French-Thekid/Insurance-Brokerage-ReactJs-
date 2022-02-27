import React, { useEffect, useState, useContext } from 'react'
import { Layout, Core, Content, Icons, FormControl } from 'components'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { WorkflowContext } from './workflowContext'
import { ColourContext } from 'context'
import { useHistory } from 'react-router-dom'
import { useDialog, usePermission } from '../../../hooks'
import { Formik } from 'formik'
import Help from './help'
import 'styled-components/macro'
import CreateWorkflowForm from './forms/CreateWorkflowForm'
import Approvers from './Approvers'
import Notify from './Notify'

export default function WorkflowEditor(props) {
  const { Colours } = useContext(ColourContext)
  let initialised = useContext(WorkflowContext)
  const [workflow] = useState(
    props.location.state?.update
      ? initialised.load(props.location.state.update)
      : initialised
  )
  const [permissions, Access] = usePermission()
  const [trigger, fireTrigger] = useState(Math.random())
  const [modalContent, setModalContent] = useState('')
  const [title, setTitle] = useState('')
  const { open, toggle, Dialog } = useDialog()
  const [dark] = useState(false)
  const [stepId, setStepId] = useState()
  const history = useHistory()
  const handleModal = (type, fieldId) => {
    setModalContent(type)
    setTitle(
      type === 'step'
        ? 'Edit Step'
        : type === 'approver'
        ? 'Approval'
        : type === 'save'
        ? 'Save'
        : type === 'notify'
        ? 'Notifications'
        : type === 'message'
        ? 'Notification Message'
        : 'Help'
    )
    toggle()
  }

  const InnerContent = () => {
    switch (modalContent) {
      case 'help':
        return <Help />
      case 'step':
        let steps = [...workflow.Step.getAll()]
        let thisStep = workflow.Util.selectStep(steps, 'id', stepId)[0] || {}
        return (
          <Formik
            initialValues={{
              description: thisStep.description,
            }}
            onSubmit={async (values, action) => {
              action.setSubmitting(true)
              thisStep.description = values.description
              workflow.Step.update(stepId, thisStep)
              update()
              toggle()
            }}
          >
            {(props) => {
              const { values, handleChange, handleSubmit, isSubmitting } = props
              return (
                <form onSubmit={handleSubmit}>
                  <FormControl.Input
                    id="description"
                    label="description"
                    type="text"
                    multiline
                    value={values.description}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <Core.Button
                    bgColour={Colours.blue}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </Core.Button>
                </form>
              )
            }}
          </Formik>
        )
      case 'message':
        let messageSteps = [...workflow.Step.getAll()]
        let currentMessageStep =
          workflow.Util.selectStep(messageSteps, 'id', stepId)[0] || {}
        return (
          <Formik
            initialValues={{
              message: currentMessageStep.message,
            }}
            onSubmit={async (values, action) => {
              action.setSubmitting(true)
              currentMessageStep.message = values.message
              workflow.Step.update(stepId, currentMessageStep)
              update()
              toggle()
            }}
          >
            {(props) => {
              const { values, handleChange, handleSubmit, isSubmitting } = props
              return (
                <form onSubmit={handleSubmit}>
                  <FormControl.Input
                    id="message"
                    label="message"
                    type="text"
                    multiline
                    value={values.message}
                    onChange={handleChange}
                  />
                  <br />
                  <br />
                  <Core.Button
                    bgColour={Colours.blue}
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Save
                  </Core.Button>
                </form>
              )
            }}
          </Formik>
        )
      case 'approver':
        let approverStep = workflow.Util.selectStep(
          [...workflow.Step.getAll()],
          'id',
          stepId
        )[0]
        return (
          <Core.Box
            maxHeight="50vh"
            maxWidth="800px"
            mg="0px"
            minWidth="300px"
            style={{ overflowY: 'auto' }}
          >
            <Approvers stepData={approverStep} workflow={workflow} />
          </Core.Box>
        )
      case 'notify':
        let notifyStep = workflow.Util.selectStep(
          [...workflow.Step.getAll()],
          'id',
          stepId
        )[0]
        return (
          <Core.Box
            maxHeight="80vh"
            maxWidth="80vw"
            mg="0px"
            minWidth="300px"
            style={{ overflowY: 'auto' }}
          >
            <Notify stepData={notifyStep} workflow={workflow} />
          </Core.Box>
        )
      case 'save':
        return (
          <Core.Box
            maxHeight="50vh"
            maxWidth="600px"
            mg="0px"
            minWidth="300px"
            style={{ overflowY: 'auto' }}
          >
            {permissions.WORKFLOW_CREATE_TYPEWORKFLOW ? (
              <CreateWorkflowForm workflow={workflow} />
            ) : (
              <Access />
            )}
          </Core.Box>
        )
      default:
        return null
    }
  }

  const update = () => {
    fireTrigger(Math.random)
  }

  const sort = ({ oldIndex, newIndex }) => {
    let stepArray = workflow.Step.getAll()
    let newArray = workflow.Util.moveArrayEntry(stepArray, oldIndex, newIndex)
    workflow.Step.setAll(newArray)
    update()
  }

  useEffect(() => {}, [trigger, stepId])

  const SortableItem = SortableElement(({ step, update, workflow }) => (
    <Layout.Flex align="center">
      <Core.Box
        tabIndex="0"
        color={Colours.text}
        radius="2px"
        width="20px"
        bg={Colours.foreground}
        pd="8px 4px"
        css={`
          &:hover,
          active {
            cursor: grab;
            background: ${Colours.blue};
            color: ${Colours.foreground};
          }
        `}
      >
        <Icons.DragIndicatorRoundedIcon fontSize="inherit" />
      </Core.Box>
      <WorkflowCard
        title={step.name}
        key={step.id}
        minWidth="400px"
        maxWidth="400px"
        titleAside={
          <Layout.Flex>
            {step.stepType === 'APPROVER' ? (
              <>
                <Core.Box
                  color={Colours.blue}
                  cursor="pointer"
                  data-cy="role-step"
                >
                  <Icons.PersonRounded
                    onClick={() => {
                      setStepId(step.id)
                      handleModal('approver')
                    }}
                  />
                </Core.Box>
                <Core.Box
                  color={Colours.blue}
                  cursor="pointer"
                  data-cy="edit-step"
                  // border={`1px solid ${Colours.blue}`}
                  onClick={() => {
                    setStepId(step.id)
                    handleModal('step')
                  }}
                >
                  <Icons.EditRounded />
                </Core.Box>
              </>
            ) : step.stepType === 'NOTIFICATION' ? (
              <>
                <Core.Box color={Colours.blue} cursor="pointer">
                  <Icons.NotificationsRoundedIcon
                    onClick={() => {
                      setStepId(step.id)
                      handleModal('notify')
                    }}
                  />
                </Core.Box>
                <Core.Box
                  color={Colours.blue}
                  cursor="pointer"
                  data-cy="edit-step"
                  onClick={() => {
                    setStepId(step.id)
                    handleModal('message')
                  }}
                >
                  <Icons.EditRounded />
                </Core.Box>
              </>
            ) : (
              <Core.Box
                color={Colours.blue}
                cursor="pointer"
                data-cy="edit-step"
                // border={`1px solid ${Colours.blue}`}
                onClick={() => {
                  setStepId(step.id)
                  handleModal('step')
                }}
              >
                <Icons.EditRounded />
              </Core.Box>
            )}

            <Core.Box
              // border={`1px solid ${Colours.red}`}
              ml="4px"
              color={Colours.red}
              cursor="pointer"
              data-cy="delete-step"
              onClick={() => {
                workflow.Step.delete(step.id)
                update()
              }}
            >
              <Icons.DeleteRounded />
            </Core.Box>
          </Layout.Flex>
        }
      >
        <Core.Text align="left">{step.description || ''}</Core.Text>

        {step.userIDs ? (
          <Core.Box textAlign="left" pd="4px" radius="4px" mg="0px" mt="4px">
            <Content.Badge text="Users" />{' '}
            <Content.Badge bg="#360568" text={step.userIDs.length} />
          </Core.Box>
        ) : null}
        {step.roleIDs ? (
          <Core.Box textAlign="left" pd="4px" radius="4px" mg="0px" mt="4px">
            <Content.Badge text="Role groups" />{' '}
            <Content.Badge
              bg="#360568"
              color="#fff"
              text={step.roleIDs.length}
            />
          </Core.Box>
        ) : null}
        {step.message ? (
          <Core.Box
            textAlign="left"
            bg="#e9e9e9"
            pd="4px"
            radius="4px"
            mg="0px"
            mt="12px"
          >
            <Content.Badge text="Message" mb="4px" />
            <Core.Text align="left">{step.message}</Core.Text>
          </Core.Box>
        ) : null}
      </WorkflowCard>
    </Layout.Flex>
  ))

  const SortableList = SortableContainer(() => {
    return (
      <Layout.Flex justify="center" direction="column">
        {workflow.Step.getAll().map((step, index) => (
          <div key={step.id}>
            <SortableItem
              index={index}
              step={step}
              update={update}
              workflow={workflow}
            />
          </div>
        ))}
      </Layout.Flex>
    )
  })

  return (
    <div
      css={`
        height: inherit;
      `}
    >
      <EditorCanvas dark={dark}>
        <Bar
          dark={dark}
          name={workflow.get().name}
          workflow={workflow}
          add={workflow.Step.make}
          trigger={update}
          history={history}
          openModal={handleModal}
        />
        <Core.Box pt="80px" display="block" width="100%">
          <Layout.Flex justify="center" align="center">
            <SortableList onSortEnd={sort} distance={4} />
          </Layout.Flex>
        </Core.Box>
      </EditorCanvas>

      <Dialog title={title} open={open} close={toggle}>
        {InnerContent()}
      </Dialog>
    </div>
  )
}

function Bar(props) {
  const { Colours } = useContext(ColourContext)
  let StepsList = [
    // {
    //   type: 'action',
    //   text: 'Create Account',
    //   onClick: () => {
    //     props.add('ACCOUNT_CREATE', {
    //       description: 'This step requires an account to be created',
    //       name: 'Create Account',
    //     })
    //     props.trigger()
    //   },
    // },
    {
      type: 'action',
      text: 'Edit Account',
      onClick: () => {
        props.add('ACCOUNT_EDIT', {
          description: 'This step requires an account to be mofiied',
          name: 'Edit Account',
        })
        props.trigger()
      },
    },
    {
      type: 'action',
      text: 'Account',
      onClick: () => {
        props.add('ACCOUNT', {
          description: 'Visit the Account page to perform an action',
          name: 'Account',
        })
        props.trigger()
      },
    },
    {
      type: 'action',
      text: 'Event',
      onClick: () => {
        props.add('EVENT', {
          description: 'This step requires a calendar event to be created',
          name: 'Event',
        })
        props.trigger()
      },
    },
    {
      type: 'action',
      text: 'Email',
      onClick: () => {
        props.add('EMAIL', {
          description: 'Visit email list',
          name: 'Email',
        })
        props.trigger()
      },
    },
    {
      type: 'action',
      text: 'Write Email',
      onClick: () => {
        props.add('EMAIL', {
          description:
            'An email should be sent, for example Attach slip document and send to account holder',
          name: 'Email Create',
        })
        props.trigger()
      },
    },
    {
      type: 'line',
    },
    {
      type: 'action',
      text: 'Approval',
      onClick: () => {
        props.add('APPROVER', {
          description:
            'Assign a user that checks this worfklow and approves it for progress.',
          name: 'Approver',
          userIDs: [],
        })
        props.trigger()
      },
    },
    // {
    //   type: 'action',
    //   text: 'Notification',
    //   onClick: () => {
    //     props.add('NOTIFICATION', {
    //       name: 'Notification',
    //       userIDs: [],
    //       roleIDs: [],
    //       message:
    //         'Send a notification to users or groups of users selected. This is an example message body that will be sent in the notification, be sure to change this.',
    //     })
    //     props.trigger()
    //   },
    // },
    {
      type: 'line',
    },
    {
      type: 'action',
      text: 'Notes',
      onClick: () => {
        props.add('NOTE', {
          description: 'Note',
          name: 'Note',
        })
        props.trigger()
      },
    },
    {
      type: 'action',
      text: 'Slip',
      onClick: () => {
        props.add('SLIP', {
          description: 'Slip',
          name: 'Slip',
        })
        props.trigger()
      },
    },
    {
      type: 'action',
      text: 'Policy',
      onClick: () => {
        props.add('POLICY', {
          description: 'A Policy',
          name: 'Policy',
        })
        props.trigger()
      },
    },
    {
      type: 'action',
      text: 'Create Policy',
      onClick: () => {
        props.add('CREATE_POLICY', {
          description: 'Creat a Policy',
          name: 'Create Policy',
        })
        props.trigger()
      },
    },
    // {
    //   type: 'action',
    //   text: 'Limit',
    //   onClick: () => {
    //     props.add('POLICY_LIMIT', {
    //       description: 'A policy limit',
    //       name: 'Limit',
    //     })
    //     props.trigger()
    //   },
    // },
    {
      type: 'line',
    },
    // {
    //   type: 'action',
    //   text: 'Extension',
    //   onClick: () => {
    //     props.add('POLICY_EXTENSION', {
    //       description: 'A policy Extension',
    //       name: 'Extension',
    //     })
    //     props.trigger()
    //   },
    // },
    // {
    //   type: 'action',
    //   text: 'Risk',
    //   onClick: () => {
    //     props.add('POLICY_RISK', {
    //       description: 'A policy risk',
    //       name: 'Risk',
    //     })
    //     props.trigger()
    //   },
    // },
    // {
    //   type: 'action',
    //   text: 'Motor Risk',
    //   onClick: () => {
    //     props.add('POLICY_MOTOR_RISK', {
    //       description: 'A policy Motor risk',
    //       name: 'Motor Risk',
    //     })
    //     props.trigger()
    //   },
    // },
    {
      type: 'action',
      text: 'Insurers',
      onClick: () => {
        props.add('INSURERS', {
          description: 'Manage insurers',
          name: 'Insurers',
        })
        props.trigger()
      },
    },
    {
      type: 'action',
      text: 'Create Insurers',
      onClick: () => {
        props.add('INSURERS_CREATE', {
          description: 'Manage insurers',
          name: 'Create Insurers',
        })
        props.trigger()
      },
    },
  ]

  return (
    <Core.Box
      z="2"
      pos="fixed"
      top="20px"
      left="20px"
      radius="4px"
      bg={Colours.foreground}
      border={Colours.border}
      style={{
        boxShadow: '0 5px 0px rgba(0, 0, 0, 0.07)',
      }}
    >
      <Layout.Flex justify="space-between" align="center">
        <Core.Text
          style={{ padding: '4px' }}
          size="rg"
          weight="700"
          color={props.dark ? '#fff' : Colours.text}
        >
          {props.name}
        </Core.Text>
        <Core.Box ml="20px" pd="0px" mg="0px">
          <Layout.Flex>
            <EditorButton
              action="READ"
              bg={props.dark ? '#fff' : Colours.blue}
              color={props.dark ? '#2b2c34' : '#fff'}
              aria-label="Workflow home"
              data-balloon-pos="down"
              onClick={() => props.history.push('/broker/settings/workflows/')}
            >
              <Icons.HomeRoundedIcon />
            </EditorButton>
            <EditorButton
              action="READ"
              bg={props.dark ? '#fff' : Colours.yellow}
              color={props.dark ? '#2b2c34' : '#fff'}
              aria-label="Help"
              data-balloon-pos="down"
              onClick={() => props.openModal('help')}
            >
              <Icons.HelpRoundedIcon />
            </EditorButton>
            <EditorButton
              onClick={() => {
                props.openModal('save')
              }}
              bg={props.dark ? '#fff' : Colours.green}
              color={props.dark ? '#2b2c34' : '#fff'}
              data-cy="save"
              aria-label="Save workflow"
              data-balloon-pos="down"
            >
              <Icons.SaveOutlinedIcon />
            </EditorButton>
            <Core.Dropdown
              width="200px"
              height="300px"
              x="-126px"
              y="12px"
              items={StepsList}
            >
              <EditorButton
                width="50px"
                bg="#2699fb"
                data-cy="insert-step"
                aria-label="Insert step"
                data-balloon-pos="down"
              >
                <Layout.Flex align="center">
                  <Icons.AddBoxRoundedIcon />
                </Layout.Flex>
              </EditorButton>
            </Core.Dropdown>
          </Layout.Flex>
        </Core.Box>
      </Layout.Flex>
    </Core.Box>
  )
}

function EditorCanvas(props) {
  return (
    <Core.Box
      id="workflowEditor"
      pd="0px"
      radius="4px"
      height="calc(100vh - 95px)"
      bg={
        props.dark
          ? 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAJElEQVQoU2N08/T5z0AEYBxViC+U8AaPrpY6w+VrN8H6iQ5HALNnFY/ouEjnAAAAAElFTkSuQmCC) repeat'
          : 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAHElEQVQoU2NkIBIwEqmOYVQh3pAiKnjWrl37HwARfQMRG5jYrwAAAABJRU5ErkJggg==) repeat;background-color:#f5f5f5;'
      }
      style={{ overflowY: 'auto', overflowX: 'hidden' }}
    >
      {props.children}
    </Core.Box>
  )
}

function EditorButton(props) {
  return (
    <Core.Button
      bgColour={props.bg || 'black'}
      width="max-content"
      style={{ margin: '0px 8px', boxShadow: 'none', color: props.color }}
      {...props}
    >
      {props.children}
    </Core.Button>
  )
}

function WorkflowCard(props) {
  return (
    <Content.TitleCard
      disableHover={false}
      title={props.title || 'No name'}
      {...props}
    >
      {props.children}
    </Content.TitleCard>
  )
}
