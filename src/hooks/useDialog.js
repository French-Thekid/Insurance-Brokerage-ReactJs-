import { useState } from 'react'
import Dialog from './Dialog'

function useDialog() {
  const [open, setOpen] = useState(false)
  function toggle() {
    setOpen(!open)
  }
  return { open, toggle, Dialog }
}

export default useDialog
