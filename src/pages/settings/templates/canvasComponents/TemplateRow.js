import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import 'styled-components/macro'
import { Icons } from 'components'
import { ColourContext } from 'context'

function TemplateRow({
  index,
  type = 'CARD',
  title = 'Template',
  icon,
  hasDropped,
  onDelete = () => {},
}) {
  const [{ opacity }, dragRef] = useDrag({
    item: { title, type, icon },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })
  const { Colours } = useContext(ColourContext)

  return (
    <div
      ref={dragRef}
      css={`
        display: grid;
        align-items: center;
        grid-template-columns: 40px 1fr 10px;
        padding-left: 20px;
        padding-right: 20px;
        margin: 10px 10px 0px 10px;
        box-shadow: 0px 0px 2px 1px rgba(151, 151, 194, 1);
        opacity: ${opacity};
        background: white;
        height: 50px;
        border-radius: 5px;
        &:hover {
          cursor: ${hasDropped ? 'pointer' : 'grab'};
          box-shadow: 0px 0px 6px 1px rgba(151, 151, 194, 1);
          transition: ease-out 0.2s;
        }
        margin-bottom: ${hasDropped ? '10px' : '0px'};
      `}
    >
      {title === 'Account Details' ? (
        <Icons.ContactsRoundedIcon style={{ color: Colours.blue }} />
      ) : title === 'Premium' ? (
        <Icons.MonetizationOnIcon style={{ color: Colours.blue }} />
      ) : title === 'Risk' ? (
        <Icons.WarningRoundedIcon style={{ color: Colours.blue }} />
      ) : title === 'Limit' ? (
        <Icons.PaymentsRoundedIcon style={{ color: Colours.blue }} />
      ) : title === 'Extensions' ? (
        <Icons.AddModeratorRoundedIcon style={{ color: Colours.blue }} />
      ) : null}
      <h4>{title}</h4>
      {hasDropped && (
        <Icons.DeleteRounded
          style={{ color: Colours.red }}
          onClick={() => onDelete(index)}
        />
      )}
    </div>
  )
}

export default TemplateRow
