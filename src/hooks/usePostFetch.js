import { useState } from 'react'
import { config } from '../config/config'

const usePostFetch = (options) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [errorCode, setErrorCode] = useState(null)
  const [bodyData, setBodyData] = useState(null)
  const [loading, setLoading] = useState(false)
  if (!options.url) throw Error('usePostFetch hook missing options.url!')
  if (!options.tokens) {
    const { useTokens } = options
    if (useTokens) {
      throw Error('usePostFetch hook missing Cognito tokens!')
    }
  }
  async function postData(body) {
    setBodyData(body)
    try {
      setLoading(true)
      const res = await fetch(
        `https://${config.API_KEY}.execute-api.${config.REGION}.amazonaws.com/${config.STAGE}${options.url}`,
        {
          ...options,
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `cognito ${options.tokens}`,
          },
          body: JSON.stringify(body),
        }
      )
      let json = await res.json()
      if (!res.ok) {
        setLoading(false)
        setErrorCode(json)
        setError(json.message)
        return
      }
      setData(json)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setErrorCode(error.code)
      setError(error.message)
    }
  }
  return { postData, data, errorCode, bodyData, error, loading }
}

export default usePostFetch
