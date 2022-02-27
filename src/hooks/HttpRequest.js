import { useContext } from 'react'
import queryString from 'query-string'
import { SessionContext } from '../context'
import { config } from '../config/config'

export function useRequest() {
  const { idToken } = useContext(SessionContext)

  const buildToken = (options) => `cognito ${options.idToken || idToken}`

  /**
   * This function is used to send data using the fetch API over http. on each request
   * the authorization token will be present on the header if the user
   * is authenticated.
   *
   * @param operationName
   * @param variables
   * @param query
   * @param options
   * @returns {Promise<Response>}
   */
  function httpGql(operationName, variables, query, options = {}) {
    const headers = { ...options.headers }

    if (options.idToken || idToken) headers.Authorization = buildToken(options)

    const request = {
      body: JSON.stringify({ operationName, variables, query }),
      headers,
    }

    return fetch(
      config.GQL_ENDPOINT,
      Object.assign({}, { method: 'POST' }, options, request)
    ).then(async (result) => {
      const json = await result.json()

      if (json.hasOwnProperty('errors')) {
        throw json
      }

      return json.data[operationName]
    })
  }

  return {
    /**
     * This function is used to fetch data over http request. on each request
     * the authorization token will be present on the header if the user
     * is authenticated.
     *
     * @param path
     * @param options
     * @returns {Promise<Response>}
     */
    httpFetch(path, options) {
      if (options.idToken || idToken) {
        options.headers = {
          Authorization: buildToken(options),
          ...(options.headers || {}),
        }
      }

      return fetch(path, options).then(async (result) => {
        if (result.status >= 400) throw await result.json()

        return await result.json()
      })
    },

    /**
     * This function is used to send data using the fetch API over http. on each request
     * the authorization token will be present on the header if the user
     * is authenticated.
     *
     * @param path
     * @param data
     * @param options
     * @returns {Promise<Response>}
     */
    httpPost(path, data, options = {}) {
      const headers = {}

      const query = queryString.stringify(options.query || {})

      if (options.idToken || idToken)
        headers.Authorization = buildToken(options)

      const init = Object.assign({}, options, {
        method: 'POST',
        body: JSON.stringify(data),
        headers,
      })

      return fetch(
        `${options.restEndpoint || config.REST_ENDPOINT}${path}${
          query.length > 0 ? `?${query}` : ''
        }`,
        init
      ).then(async (result) => {
        if (result.status >= 400) throw await result.json()

        return { ...result, data: await result.json() }
      })
    },

    /**
     * This function is used to get data using the fetch API over http. on each request
     * the authorization token will be present on the header if the user
     * is authenticated.
     *
     * @param path
     * @param params
     * @param options
     * @returns {Promise<Response>}
     */
    httpGet(path, params = {}, options = {}) {
      const headers = {}

      if (options.idToken || idToken)
        headers.Authorization = buildToken(options)

      const init = Object.assign({}, { headers }, options, { method: 'GET' })

      return fetch(
        `${options.endpoint || config.REST_ENDPOINT}${path}`,
        init
      ).then(async (result) => {
        if (result.status >= 400) throw result

        return await result.json()
      })
    },

    /**
     * This function is used to delete data using the fetch API over http. on each request
     * the authorization token will be present on the header if the user
     * is authenticated.
     *
     * @param path
     * @param options
     * @returns {Promise<Response>}
     */
    httpDelete(path, options = {}) {
      const headers = {}

      const query = queryString.stringify(options.query || {})

      if (options.idToken || idToken)
        headers.Authorization = buildToken(options)

      const init = Object.assign({}, options, {
        method: 'DELETE',
        headers,
        body: JSON.stringify(options.body || {}),
      })

      return fetch(
        `${options.restEndpoint || config.REST_ENDPOINT}${path}${
          query.length > 0 ? `?${query}` : ''
        }`,
        init
      ).then(async (result) => {
        if (result.status >= 400) throw await result.json()

        return await result.json()
      })
    },

    gql: new Proxy(
      {},
      {
        get(target, p, receiver) {
          return (variables, query, options = {}) =>
            httpGql(p, variables, query, options)
        },
      }
    ),

    httpGql,
  }
}
