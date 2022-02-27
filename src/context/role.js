import React, { createContext, useState } from 'react'

const RoleContext = createContext({})
const { Provider } = RoleContext

function RoleProvider({ children }) {
  const [SelectedRole, setSelectedRole] = useState(null)

  return (
    <Provider
      value={{
        SelectedRole,
        setSelectedRole,
      }}
    >
      {children}
    </Provider>
  )
}

export { RoleContext, RoleProvider }
