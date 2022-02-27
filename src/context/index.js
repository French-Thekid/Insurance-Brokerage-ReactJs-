import React from 'react'
import { SessionContext, SessionProvider } from './session'
import { UserProvider, UserContext } from './user'
import { AuthContext, AuthProvider } from './auth'
import { OrganisationContext, OrganisationProvider } from './organisation'
import { RoleContext, RoleProvider } from './role'
import { PermissionContext, PermissionProvider } from './permissions'
import { WalkthroughContext, WalkthroughProvider } from './walkthrough'
import ApolloProvider from './apollo'
import { ColourContext, ColourProvider } from './Colours'

function AppProviders({ children }) {
  return (
    <SessionProvider>
      <ColourProvider>
        <AuthProvider>
          <ApolloProvider>
            <OrganisationProvider>
              <RoleProvider>
                <PermissionProvider>
                  <UserProvider>
                    <WalkthroughProvider>{children}</WalkthroughProvider>
                  </UserProvider>
                </PermissionProvider>
              </RoleProvider>
            </OrganisationProvider>
          </ApolloProvider>
        </AuthProvider>
      </ColourProvider>
    </SessionProvider>
  )
}
export {
  AppProviders,
  SessionContext,
  UserContext,
  AuthContext,
  OrganisationContext,
  RoleContext,
  PermissionContext,
  WalkthroughContext,
  ColourContext,
}
