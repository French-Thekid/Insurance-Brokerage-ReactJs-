import { useContext } from 'react'
import { Content } from '../components'
import { PermissionContext } from '../context'

function usePermission() {
  const permissions = useContext(PermissionContext)
  return [permissions, Content.StateCard]
}

export default usePermission
