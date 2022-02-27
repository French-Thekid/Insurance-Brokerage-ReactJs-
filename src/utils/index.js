import { ArrayHelper } from './ArrayHelper'
import { SimpleCache } from './SimpleCache'
import { set, get } from 'idb-keyval'
import Request from './Request'
import { config } from '../config/config'

const timestampToTime = (timestamp) => {
  let minutes = new Date(parseInt(timestamp)).getMinutes().toString()
  if (minutes.length < 2) minutes = '0' + minutes
  return `${
    twentyFourToTwelve(new Date(parseInt(timestamp)).getHours()) + ':' + minutes
  }${new Date(parseInt(timestamp)).getHours() > 12 ? 'pm' : 'am'}`
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export const currencyFormatter = (number) => {
  var key = number.toString().split('.')
  if (key[0].length >= 4) {
    key[0] = key[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }
  if (key[0].length >= 5) {
    key[0] = key[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,')
  }
  if (key[1] && key[1].length >= 5) {
    key[1] = key[1].replace(/(\d{3})/g, '$1 ')
  }
  return key.join('.')
}

function twentyFourToTwelve(hour) {
  switch (hour) {
    case 0:
      return 12
    case 13:
      return 1
    case 14:
      return 2
    case 15:
      return 3
    case 16:
      return 4
    case 17:
      return 5
    case 18:
      return 6
    case 19:
      return 7
    case 20:
      return 8
    case 21:
      return 9
    case 22:
      return 10
    case 23:
      return 11
    default:
      return hour
  }
}

function GetTemplate(idToken) {
  //Fetching template
  const template = []
  try {
    Request({
      type: 'get',
      url: 'v1/organization/read',
      authorization: idToken,
    })
      .then((result) => result.json())
      .then((json) => {
        console.log(json)
        //Todo Refer backend about improvement
        Object.keys(!json.message && json.templates.slip).length > 0
          ? template.push({
              avatar: json.templates.slip.avatar,
              title: json.templates.slip.headerContent,
              name: json.templates.slip.templateName,
              footer: json.templates.slip.footerContent,
              sections: json.templates.slip.body.map(
                (section) => section.title
              ),
            })
          : console.log('no template created')
        localStorage.setItem('template', JSON.stringify(template))
      })
  } catch (error) {
    console.log(error)
  }
}

function Logger(message, type = 'general', rid = null, callback = () => {}) {
  let user = JSON.parse(localStorage.getItem('user')) || {}
  fetch('https://api.ipify.org/?format=json')
    .then((response) => response.json())
    .then((data) => {
      let values = {}
      values.user = user.id || null
      values.name = user.name || null
      values.timestamp = new Date().getTime()
      values.readableDate = new Date().toUTCString()
      values.path = window.location.pathname
      values.message = message
      values.logType = localStorage.getItem('walkthroughId') ? 'workflow' : type
      values.resourceId = rid
      values.ip = data.ip
      Store(values, callback)
    })
    .catch(() => callback())
}

function Store(obj, callback) {
  get('log')
    .then((res) => {
      //retrieve update and store
      if (res) {
        let data = [...res]
        data.push(obj)
        set('log', data)
      } else {
        //create and store
        let data = []
        data.push(obj)
        set('log', data)
      }
    })
    .then(() => {
      callback()
    })
    .catch(() => {
      callback()
    })
}

async function refetchUser() {
  // Default options are marked with *
  const token = JSON.parse(localStorage.getItem('session'))
    ?.AuthenticationResult?.IdToken
  const response = await fetch(config.GQL_ENDPOINT, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `cognito ${token}`,
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({
      query:
        '{\n  loggedInUser {\n    id\n    firstName\n    lastName\n    email\n    status\n    position\n    avatar\n    __typename\n  }\n}\n',
      variables: {},
    }),
  })
  return response.json()
}

function persistUser(user) {
  if (user) {
    let existing = JSON.parse(localStorage.getItem('user'))
    let name = user.firstName + ' ' + user.lastName
    existing.name = name
    localStorage.setItem('user', JSON.stringify(existing))
  }
}

export {
  Logger,
  GetTemplate,
  ArrayHelper,
  twentyFourToTwelve,
  formatNumber,
  SimpleCache,
  Request,
  timestampToTime,
  persistUser,
  refetchUser,
}
