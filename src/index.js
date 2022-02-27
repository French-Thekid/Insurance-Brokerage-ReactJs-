import React from 'react'
import ReactDOM from 'react-dom'
import './assets/styles/index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'
import { config } from './config/config'
import { BrowserRouter } from 'react-router-dom'

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools()
}

Sentry.init({
  dsn: config.SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  release: 'Printz@' + process.env.npm_package_version,
  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
})

document.onmouseenter = function () {
  window.innerDocClick = true
}

document.onmouseleave = function () {
  window.innerDocClick = false
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
