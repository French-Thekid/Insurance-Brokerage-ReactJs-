import { useEffect, useState } from 'react'
import { config } from '../config/config'

const useFetch = (options) => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  if (!options.url) throw Error('useFetch hook missing options.url!')
  if (!options.tokens) throw Error('useFetch hook missing Cognito tokens!')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://${config.API_KEY}.execute-api.${config.REGION}.amazonaws.com/${config.STAGE}${options.url}`,
          {
            ...options,
            headers: {
              Accept: 'application/json',
              'content-type': 'application/json',
              Authorization: `cognito ${options.tokens}`,
            },
          }
        )
        const json = await res.json()
        setData(json)
        setLoading(false)
      } catch (error) {
        setError(error)
      }
    }
    fetchData()
    // eslint-disable-next-line
  }, [])
  return { data, error, loading }
}

export default useFetch
