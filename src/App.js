import React, { Suspense } from 'react'
import {
  Route,
  Switch,
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom'
import * as Sentry from '@sentry/react'
import { Loading } from 'components'
import ErrorPage from 'pages/ErrorPage'
import { AppProviders } from 'context'
import {
  SignIn,
  ForgetPassword,
  ForgetPasswordConfirmation,
  NewPassword,
} from './pages/auth'
import Broker from 'pages/broker'
import PrivateRoute from './routers/PrivateRoute'
import Support from 'pages/support'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  // Disable browser navigation buttons
  const history = useHistory()
  window.onpopstate = function () {
    if (window.innerDocClick) {
      //do nothing
    } else {
      history.go(1)
    }
  }

  return (
    <>
      <Sentry.ErrorBoundary fallback={'An error has occurred'}>
        <AppProviders>
          <Suspense fallback={<Loading />}>
            <Router>
              <Switch>
                <Route exact path="/" component={SignIn} />
                <Route path="/forget-password" component={ForgetPassword} />
                <Route
                  path="/forget-password-confirmation"
                  component={ForgetPasswordConfirmation}
                />
                <Route path="/new-password" component={NewPassword} />
                <PrivateRoute path="/broker" component={Broker} />
                <PrivateRoute path="/support" component={Support} />
                <Route component={ErrorPage} />
              </Switch>
            </Router>
          </Suspense>
        </AppProviders>
        <ToastContainer
          position="bottom-right"
          closeOnClick={false}
          transition={Slide}
          closeButton={false}
          autoClose={8000}
          hideProgressBar={true}
        />
      </Sentry.ErrorBoundary>
    </>
  )
}

export default Sentry.withProfiler(App)
