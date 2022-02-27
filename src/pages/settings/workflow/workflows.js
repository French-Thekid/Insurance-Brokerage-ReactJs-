import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Content, Core, Icons, Loading, PageHeader } from '../../../components'
import { SessionContext } from '../../../context'
import { useDialog, useFetch, usePermission } from '../../../hooks'
import { DeleteWorkflowForm } from './forms'
import 'styled-components/macro'

const queryString = require('query-string')

export default function Workflow() {
  const history = useHistory()
  const { search } = useLocation()
  const { action } = queryString.parse(search)
  const { idToken } = useContext(SessionContext)
  const [permissions, Access] = usePermission()
  const { Dialog } = useDialog()
  const { loading, error, data } = useFetch({
    url: '/v1/organization/read',
    tokens: idToken,
  })
  if (loading) return <Loading small />
  if (error) return <Content.Alert type="error" message={error} />
  const { templates } = data || {}
  const { workflows } = templates

  return (
    <div
      css={`
        height: 100%;
        display: grid;
        grid-template-rows: max-content 1fr;
      `}
    >
      <PageHeader noBack title="Workflows">
        <Core.Button
          onClick={() => history.push(`/broker/settings/workflows/editor`)}
        >
          New Workflow
        </Core.Button>
      </PageHeader>
      <div
        css={`
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
          @media (max-width: 769px) {
            justify-content: space-between;
          }
          @media (min-width: 1050px) {
            justify-content: start;
          }
        `}
      >
        {workflows.map((workflow, index) => (
          <WorkflowCard key={index} data={workflow} />
        ))}
      </div>
      <Dialog
        title="Delete workflow"
        open={action === 'delete'}
        close={() => history.goBack()}
      >
        <Core.Box width="300px">
          {permissions.WORKFLOW_DELETE_TYPEWORKFLOW ? (
            <DeleteWorkflowForm />
          ) : (
            <Access />
          )}
        </Core.Box>
      </Dialog>
    </div>
  )
}

function WorkflowCard(props) {
  const { name, id, description, createdAt } = props.data
  const history = useHistory()
  const deleteQuery = queryString.stringify({
    action: 'delete',
    workflowId: id,
  })
  return (
    <Content.TitleCard1
      date={new Date(createdAt).toLocaleDateString()}
      title={name}
      deleteQuery={deleteQuery}
      props={props}
      description={description}
      titleAside={
        <Core.Dropdown
          width="100px"
          x="-70px"
          y="5px"
          items={[
            {
              type: 'action',
              text: 'Edit',
              onClick: () => {
                history.push(`/broker/settings/workflows/editor`, {
                  update: props.data,
                })
              },
            },
            {
              type: 'line',
            },
            {
              type: 'action',
              text: 'Delete',
              color: 'red',
              onClick: () => {
                history.push(`?${deleteQuery}`)
              },
            },
          ]}
        >
          <Icons.MoreVertIcon data-cy="menu" />
        </Core.Dropdown>
      }
      width="300px"
      minHeight="160px"
      // disableHover
    >
      <Core.Text mb="8px" size="sm">
        created at: {new Date(createdAt).toLocaleDateString()}
      </Core.Text>
      <Core.Text>{description}</Core.Text>
    </Content.TitleCard1>
  )
}
