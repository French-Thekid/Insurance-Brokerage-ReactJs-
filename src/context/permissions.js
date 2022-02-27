import React, { createContext, useState } from 'react'

const PermissionContext = createContext({})
const { Provider } = PermissionContext
function PermissionProvider({ children }) {
  // const { hasValidSession } = useContext(SessionContext)
  const [permissions] = useState({})
  // const hasPermissions = (permission) => {
  //   if (permission instanceof Array && hasValidSession) {
  //     return true

  //   } else {
  //     return false
  //   }
  // }

  return <Provider value={permissions}>{children}</Provider>
}

// const CheckRun = (checkFunc) => {
//   checkFunc([
//     //Organisation
//     { endpoint: 'Organisation:Update', type: 'Organisation' },
//     //insurer
//     {
//       endpoint: 'Insurer:Create',
//       type: 'Insurer',
//     },
//     {
//       endpoint: 'Insurer:Update',
//       type: 'Insurer',
//     },
//     {
//       endpoint: 'Insurer:Read',
//       type: 'Insurer',
//     },
//     {
//       endpoint: 'Insurer:Delete',
//       type: 'Insurer',
//     },
//     //User
//     {
//       endpoint: 'User:Create',
//       type: 'User',
//     },
//     {
//       endpoint: 'User:Update',
//       type: 'User',
//     },
//     {
//       endpoint: 'User:Read',
//       type: 'User',
//     },
//     {
//       endpoint: 'User:Delete',
//       type: 'User',
//     },
//     {
//       endpoint: 'User:PasswordReset',
//       type: 'User',
//     },
//     //Task
//     {
//       endpoint: 'Task:Create',
//       type: 'User',
//     },
//     {
//       endpoint: 'Task:Update',
//       type: 'User',
//     },
//     {
//       endpoint: 'Task:Read',
//       type: 'User',
//     },
//     {
//       endpoint: 'Task:Delete',
//       type: 'User',
//     },
//     //Person
//     {
//       endpoint: 'Person:Create',
//       type: 'Person',
//     },
//     {
//       endpoint: 'Person:Update',
//       type: 'Person',
//     },
//     {
//       endpoint: 'Person:Read',
//       type: 'Person',
//     },
//     {
//       endpoint: 'Person:Delete',
//       type: 'Person',
//     },
//     //Account
//     {
//       endpoint: 'Account:Create',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Account:Update',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Account:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Account:Delete',
//       type: 'Account',
//     },
//     //Slip
//     {
//       endpoint: 'Slip:Create',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Slip:Submit',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Slip:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Slip:Delete',
//       type: 'Account',
//     },
//     //Calendar
//     {
//       endpoint: 'Calendar:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'CalendarEvent:Create',
//       type: 'Account',
//     },
//     {
//       endpoint: 'CalendarEvent:Update',
//       type: 'Account',
//     },
//     {
//       endpoint: 'CalendarEvent:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'CalendarEvent:Delete',
//       type: 'Account',
//     },
//     //Workflow
//     {
//       endpoint: 'Workflow:Create',
//       type: 'Workflow',
//     },
//     {
//       endpoint: 'Workflow:Update',
//       type: 'Workflow',
//     },
//     {
//       endpoint: 'Workflow:Read',
//       type: 'Workflow',
//     },
//     {
//       endpoint: 'Workflow:Delete',
//       type: 'Workflow',
//     },
//     //
//     {
//       endpoint: 'Email:Create',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Email:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Email:Delete',
//       type: 'Account',
//     },
//     //Note
//     {
//       endpoint: 'Note:Create',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Note:Update',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Note:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Note:Delete',
//       type: 'Account',
//     },
//     //Payment
//     // {
//     //   endpoint: 'PaymentPlan:Create',
//     //   type: 'PaymentPlan',
//     // },
//     // {
//     //   endpoint: 'PaymentPlan:Update',
//     //   type: 'PaymentPlan',
//     // },
//     // {
//     //   endpoint: 'PaymentPlan:Delete',
//     //   type: 'PaymentPlan',
//     // },
//     // {
//     //   endpoint: 'PaymentPlan:Read',
//     //   type: 'PaymentPlan',
//     // },
//     // Policy - Policy
//     {
//       endpoint: 'Policy:Update',
//       type: 'Policy',
//     },
//     {
//       endpoint: 'Policy:Read',
//       type: 'Policy',
//     },
//     {
//       endpoint: 'Policy:Delete',
//       type: 'Policy',
//     },
//     {
//       endpoint: 'Policy:Create',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Policy:Update',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Policy:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Policy:Delete',
//       type: 'Account',
//     },
//     //Risk
//     {
//       endpoint: 'Risk:Update',
//       type: 'Risk',
//     },
//     {
//       endpoint: 'Risk:Read',
//       type: 'Risk',
//     },
//     {
//       endpoint: 'Risk:Delete',
//       type: 'Risk',
//     },
//     {
//       endpoint: 'Risk:Create',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Risk:Update',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Risk:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Risk:Delete',
//       type: 'Account',
//     },
//     //Claim
//     {
//       endpoint: 'Claim:Update',
//       type: 'Claim',
//     },
//     {
//       endpoint: 'Claim:Read',
//       type: 'Claim',
//     },
//     {
//       endpoint: 'Claim:Delete',
//       type: 'Claim',
//     },
//     {
//       endpoint: 'Claim:Update',
//       type: 'Policy',
//     },
//     {
//       endpoint: 'Claim:Read',
//       type: 'Policy',
//     },
//     {
//       endpoint: 'Claim:Delete',
//       type: 'Policy',
//     },
//     {
//       endpoint: 'Claim:Create',
//       type: 'Policy',
//     },
//     //Document
//     {
//       endpoint: 'Document:Update',
//       type: 'Document',
//     },
//     {
//       endpoint: 'Document:Delete',
//       type: 'Document',
//     },
//     {
//       endpoint: 'Document:Read',
//       type: 'Document',
//     },
//     {
//       endpoint: 'Document:Create',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Document:Update',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Document:Delete',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Document:Read',
//       type: 'Account',
//     },
//     {
//       endpoint: 'Role:Create',
//       type: 'Role',
//     },
//     {
//       endpoint: 'Role:Update',
//       type: 'Role',
//     },
//     {
//       endpoint: 'Role:Read',
//       type: 'Role',
//     },
//     {
//       endpoint: 'Role:Delete',
//       type: 'Role',
//     },
//     //Permission
//     {
//       endpoint: 'RolePermissions:Create',
//       type: 'Object',
//     },
//     {
//       endpoint: 'RolePermissions:Delete',
//       type: 'Object',
//     },
//     {
//       endpoint: 'RolePermissions:List',
//       type: 'Role',
//     },
//     //User Roles
//     {
//       endpoint: 'UserRoles:Create',
//       type: 'Role',
//     },
//     {
//       endpoint: 'UserRoles:Delete',
//       type: 'Role',
//     },
//     // Role Roles
//     {
//       endpoint: 'RoleRoles:Create',
//       type: 'Role',
//     },
//     {
//       endpoint: 'RoleRoles:Delete',
//       type: 'Role',
//     },
//     //Role Permissions
//     {
//       endpoint: 'RoleRoles:Delete',
//       type: 'Account',
//     },
//     {
//       endpoint: 'RoleRoles:Create',
//       type: 'Account',
//     },
//   ])
// }

export { PermissionContext, PermissionProvider }
