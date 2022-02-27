import React from 'react'
import { Route } from 'react-router-dom'
import { SlipProvider } from '../context'

import SlipGeneration from './SlipGeneration'
import PDFPreview from './PDFPreview'
import SlipSubmission from '../SlipSubmission'

export default function () {
  return (
    <SlipProvider>
      <Route
        exact
        path={`/broker/account/slips/:accountId/slip-generation/:accountId`}
        component={SlipGeneration}
      />
      <Route
        exact
        path={`/broker/account/slips/:accountId/slip-generation/:accountId/slip`}
        component={PDFPreview}
      />
      <Route
        exact
        path={`/broker/account/slips/:accountId/slip-generation/:accountId/slip/submission/`}
        component={SlipSubmission}
      />
    </SlipProvider>
  )
}
