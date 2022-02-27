import React, { useContext } from 'react'
import * as Apollo from '@apollo/react-hooks'
import { ApolloClient } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { SessionContext } from './session'
import { config } from '../config/config'

const Provider = Apollo.ApolloProvider
function ApolloProvider({ children }) {
  const { idToken } = useContext(SessionContext)
  const httpLink = createHttpLink({ uri: config.GQL_ENDPOINT })
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    // const token = localStorage.getItem('token');
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        Authorization: `cognito ${idToken}`,
      },
    }
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <Provider client={client}>{children}</Provider>
}

export default ApolloProvider
