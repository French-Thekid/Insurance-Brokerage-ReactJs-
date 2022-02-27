import { useRequest } from './HttpRequest'

export function useHttpPost(path) {
  const { httpPost } = useRequest()

  return (data, options = {}) => httpPost(path, data, options)
}
