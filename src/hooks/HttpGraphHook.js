import { useRequest } from './HttpRequest.js'
import { SimpleCache } from '../utils'

export function useGraph() {
  const { httpGql } = useRequest()

  return new Proxy(
    {},
    {
      get(target, operationName, receiver) {
        if (operationName.slice(-5).toLowerCase() === 'cache') {
          return SimpleCache.get(operationName)
        }

        return (variables, query, options = {}) =>
          new Promise((resolve, reject) => {
            httpGql(operationName, variables, query, options)
              .then((result) => {
                SimpleCache.put(`${operationName}Cache`, result)

                resolve(result)
              })
              .catch(reject)
          })
      },
    }
  )
}
