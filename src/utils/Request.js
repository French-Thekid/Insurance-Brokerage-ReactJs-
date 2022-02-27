import { config } from '../config/config'
import { isEmpty } from './General'

export default function Request({
  url = '/',
  type = 'get',
  body = {},
  authorization = '',
}) {
  const payload = {
    method: type,
    headers: {
      Accept: 'application/json',
      'content-Type': 'application/json',
      Authorization: `cognito ${authorization}`,
    },
  }
  if (!isEmpty(body)) {
    Object.assign(payload, { body: JSON.stringify(body) })
  }
  return fetch(
    `https://${config.API_KEY}.execute-api.${config.REGION}.amazonaws.com/${config.STAGE}/${url}`,
    payload
  ).then((result) => {
    return result
  })
}
