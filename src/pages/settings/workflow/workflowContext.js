import { WorkflowBuilder } from './workflowUtil'
import React from 'react'
let newWorkflow = new WorkflowBuilder()
export const WorkflowContext = React.createContext(newWorkflow)
