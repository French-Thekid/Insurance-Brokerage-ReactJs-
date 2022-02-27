import React, { useContext } from 'react'
import { Core, Colours, Layout } from '../components'
import { OrganisationContext } from '../context'
import { useDialog } from '../hooks'

export function AccountSuspended() {
  const { status } = useContext(OrganisationContext)
  const { open, toggle, Dialog } = useDialog()
  const area = window.location.pathname.split('/')
  return (
    <>
      {status === 'SUSPENDED' && area.includes('broker') ? (
        <>
          <Core.Box
            onClick={toggle}
            bg={Colours.orange}
            cursor="pointer"
            mg="0px"
            pd="4px"
          >
            <Layout.Flex justify="center" align="center">
              <Core.Text size="sm" align="center" color={Colours.foreground}>
                Suspended{' '}
              </Core.Text>
            </Layout.Flex>
          </Core.Box>
          <Dialog open={open} close={toggle} title="Account suspended">
            <Layout.Flex justify="center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-alert-triangle"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke={Colours.orange}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 9v2m0 4v.01" />
                <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75" />
              </svg>{' '}
            </Layout.Flex>
            <Core.Box width="400px">
              <Core.Text weight="700" mb="4px">
                What Happened?
              </Core.Text>
              <Core.Text mb="16px">
                This organization has been marked as suspended. Activities such
                as updating, creating, and deleting data or files have been
                blocked, you may still view existing data created prior to the
                suspension.
              </Core.Text>
              <Core.Text weight="700" mb="4px">
                How to resolve?
              </Core.Text>
              <Core.Text mb="16px">
                Reach out to your organization's administrator as they will be
                able to rectify the suspension.
              </Core.Text>
            </Core.Box>
          </Dialog>
        </>
      ) : null}
    </>
  )
}
