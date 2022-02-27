import React, { useState, useContext } from 'react'
import { useDrop } from 'react-dnd'
import { useLocation } from 'react-router-dom'
import 'styled-components/macro'
import { Icons } from 'components'
import ItemTypes from './types'
import { ColourContext } from 'context'

function TemplateArea({
  children,
  canDrop = false,
  border = 'rgba(119,119,119, .7)',
  contained,
  sections = [],
}) {
  const { Colours } = useContext(ColourContext)
  const location = useLocation()
  const [nodes, setNodes] = useState(() =>
    location.pathname.split('/')[4] === 'update' && sections.length !== 0
      ? sections.map((section) => {
          return {
            title: section,
            type:
              section === 'Account Details'
                ? 'ACCOUNT'
                : section === 'Premium'
                ? 'PREMIUM'
                : section === 'Risk'
                ? 'RISK'
                : section === 'Limit'
                ? 'LIMITS'
                : section === 'Extensions'
                ? 'EXTENSION'
                : null,
            Icon:
              section === 'Account Details'
                ? Icons.ContactsRoundedIcon
                : section === 'Premium'
                ? Icons.MonetizationOnIcon
                : section === 'Risk'
                ? Icons.WarningRoundedIcon
                : section === 'Limit'
                ? Icons.ContactsRoundedIcon
                : section === 'Extensions'
                ? Icons.AddModeratorRoundedIcon
                : null,
          }
        })
      : []
  )

  //Get all acceptable drop types
  const acceptedTypes = Object.values(ItemTypes)
  const handleDrop = (item, monitor) => {
    const uniqueNodes = new Set(nodes.map(({ type }) => type))
    setNodes((nodes) => (uniqueNodes.has(item.type) ? nodes : [...nodes, item]))
  }
  const handleDelete = (index) => {
    let newNodes = [...nodes.slice(0, index), ...nodes.slice(index + 1)]
    setNodes(newNodes)
  }
  //Set Canvas to accept Draggable items
  const [{ isOver }, dropRef] = useDrop({
    accept: acceptedTypes,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      type: monitor.getItemType(),
    }),
  })
  return (
    <div
      ref={dropRef}
      css={`
        border-radius: 3px;
        border: ${isOver && canDrop
          ? `5px dashed ${Colours.blue};`
          : `2px dashed ${border};`};
        transition: ease-out 0.1s;
        width: ${contained ? 'Max-content' : '100%'};
      `}
    >
      {canDrop ? children({ nodes, handleDelete }) : children}
    </div>
  )
}

export default TemplateArea
