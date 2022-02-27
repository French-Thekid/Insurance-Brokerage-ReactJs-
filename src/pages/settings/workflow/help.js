import React, { useContext } from 'react'
import { Core } from '../../../components'
import toolbar from './assets/toolbar.png'
import stepcard from './assets/stepCard.png'
import { ColourContext } from 'context'

export default function Help() {
  const { Colours } = useContext(ColourContext)
  return (
    <Core.Box
      maxWidth="600px"
      minWidth="300px"
      maxHeight="50vh"
      style={{ overflowY: 'auto' }}
    >
      <Core.Text
        size="rg"
        color={Colours.blue}
        weight="600"
        align="left"
        mb="8px"
      >
        Introduction
      </Core.Text>
      <Core.Text color={Colours.text} align="left">
        Welcome to the workflows editor this is where you will be able to edit
        and create new workflow processes. Workflows are templates of recurring
        activities that you are able to carry out, for example a workflow for
        adding a new client.
        <br />
        <br />
        Workflows are great for outlining how internal processes should work or
        for helping new brokers during onboarding in your organization.
      </Core.Text>
      <Core.Text
        size="rg"
        color={Colours.blue}
        weight="600"
        align="left"
        mb="8px"
        mt="44px"
      >
        The Workflow Editor
      </Core.Text>
      <Core.Text color={Colours.text} align="left">
        The workflow editor consists of three main parts: the toolbar, the step
        and the canvas.
        <br />
        <br />
        <ul>
          <li>
            <Core.Text size="rg" color={Colours.text} weight="600" align="left">
              The Toolbar
            </Core.Text>
            <br />
            The Toolbar holds all the main controls of the editor.
            <img src={toolbar} alt="toolbar" />
            <ul style={{ listStyle: 'decimal', marginTop: '12px' }}>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Workflow Name
                </Core.Text>{' '}
                This area is reserved for showing the name of the workflow
                currently being created or modified, you can edit the name by
                clicking it and changing the text.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Home
                </Core.Text>{' '}
                Takes you back to the workflow lists page.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Help
                </Core.Text>{' '}
                Opens this help dialog that guides you through using the
                workflow editor.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Save
                </Core.Text>{' '}
                Saves your workflow for use and takes you back to the workflow
                list page.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Insert Step
                </Core.Text>{' '}
                Allows you to add the steps that makes up a workflow. Steps have
                a default description this can be changed.
              </li>
            </ul>
          </li>
          <li>
            <Core.Text size="rg" color={Colours.text} weight="600" align="left">
              Steps
            </Core.Text>
            <br />
            Steps form the individual processes that make up a workflow each
            step carries the user to a section of the application where the
            process or task should take place.
            <br />
            <img src={stepcard} width="400px" alt="individual step card" />
            <ul style={{ listStyle: 'decimal', marginTop: '12px' }}>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Drag Handle
                </Core.Text>{' '}
                The drag handle can be clicked and dragged to move steps around.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Name
                </Core.Text>{' '}
                The name of the step.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Step Description
                </Core.Text>{' '}
                The description of the step, this message can be edited to help
                guide a workflow user as to what action should be taken.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Edit action
                </Core.Text>{' '}
                Used to edit the step description.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Delete Action
                </Core.Text>{' '}
                Used to remove a step.
              </li>
              <li style={{ marginBottom: '18px' }}>
                <Core.Text
                  size="rg"
                  color={Colours.text}
                  weight="600"
                  align="left"
                >
                  Canvas
                </Core.Text>{' '}
                Non interactive background.
              </li>
            </ul>
          </li>
        </ul>
      </Core.Text>
    </Core.Box>
  )
}
