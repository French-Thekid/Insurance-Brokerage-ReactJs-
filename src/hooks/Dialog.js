import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import 'styled-components/macro'
import { motion } from 'framer-motion'
import useOnClickOutside from './useOnClickOutside'
import { Content } from '../components'

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}
function Dialog(props) {
  const ref = useRef()
  useOnClickOutside(ref, () => props.close || null)
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'initial'
    }
  }, [])

  if (!props.open) return null
  return ReactDOM.createPortal(
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        ease: 'easeIn',
        duration: props.transitionBackground || 0,
      }}
    >
      <DialogBackground>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{
            ease: 'easeIn',
            duration: props.transitionBody || 0.6,
          }}
        >
          <Content.DialogCard
            title={props.title}
            minWidth={props.minWidth || '300px'}
            close={props.close}
          >
            {props.children}
          </Content.DialogCard>
        </motion.div>
      </DialogBackground>
    </motion.div>,
    document.getElementById('portal')
  )
}

const DialogBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 55%);
  backdrop-filter: blur(6px);
  top: 0px;
  left: 0px;
  position: fixed;
  z-index: 8;
`

export default Dialog
