import React, { createContext, useState } from 'react'

const SlipContext = createContext({})
const { Provider } = SlipContext

function SlipProvider({ children }) {
  const [motorRiskIdsPolicyPairs, setMotorRiskIdsPolicyPairs] = useState({
    MotorRisks: [],
  })
  const [nonMotorRiskIdsPolicyPairs, setNonMotorRiskIdsPolicyPairs] = useState({
    nonMotorRisks: [],
  })
  const [extensionsPair, setExtensionsPair] = useState({
    extensions: [],
  })
  const [limitsPair, setLimitsPair] = useState({
    limits: [],
  })

  const slipValues = {
    nonMotorRiskIdsPolicyPairs,
    setNonMotorRiskIdsPolicyPairs,
    motorRiskIdsPolicyPairs,
    setMotorRiskIdsPolicyPairs,
    extensionsPair,
    setExtensionsPair,
    limitsPair,
    setLimitsPair,
  }

  return <Provider value={slipValues}>{children}</Provider>
}

export { SlipContext, SlipProvider }
