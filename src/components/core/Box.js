import styled from 'styled-components'

/**
 * A base component used for composing more complex components like cards and alerts etc
 * @prop {string} color - applies a text color that a child text node can inherit
 * @prop {string} border - apply a border to all side of a Box.
 * @prop {string} bt- declaration for border-top.
 * @prop {string} bb - declaration for border-bottom.
 * @prop {string} bl - declaration for border-Left.
 * @prop {string} br - declaration for border-right.
 * @prop {number} z - z-index.
 * @prop {string} top - top.
 * @prop {string} bottom - bottom.
 * @prop {string} left - left.
 * @prop {string} right - right.
 * @prop {string} position - position type of absolute, relative etc.
 * @prop {string} radius - declaration for border-radius.
 * @prop {string} cusor - cursor style on hover.
 * @prop {string} width - the width of the box.
 * @prop {string} maxWidth - the maximium width to occupy.
 * @prop {string} minWidth - the minimum width to occupy.
 * @prop {string} height - the height of the box.
 * @prop {string} maxHeight - the maximum height of the box.
 * @prop {string} minHeight - The minimum height of the box.
 * @prop {string} bg - Apply a Background color, defaults to transparent .
 * @prop {string} pd - Declaration of Box padding.
 * @prop {string} pt - Declaration of Box padding-top.
 * @prop {string} pb - Declaration of Box padding-bottom.
 * @prop {string} pl - Declaration of Box padding-left.
 * @prop {string} pr - Declaration of Box padding-right.
 * @prop {string} textAlign - The text alignment of child text based nodes.
 * @prop {string} mg - Declaration of Box margin.
 * @prop {string} ml - Declaration of Box margin-left.
 * @prop {string} mr - Declaration of Box margin-right.
 * @prop {string} mt - Declaration of Box margin-top.
 * @prop {string} mb - Declaration of Box margin-bottom.
 * @prop {string} display - display;
 */

const Box = styled.div`
  z-index: ${(props) => props.z || 0};
  position: ${(props) => props.pos || 'initial'};
  top: ${(props) => props.top || 'initial'};
  bottom: ${(props) => props.bottom || 'initial'};
  left: ${(props) => props.left || 'initial'};
  right: ${(props) => props.right || 'initial'};
  color: ${(props) => props.color || 'inherit'};
  border: ${(props) => props.border || 'none'};
  border-top: ${(props) => props.bt || props.border};
  border-bottom: ${(props) => props.bb || props.border};
  border-left: ${(props) => props.bl || props.border};
  border-right: ${(props) => props.br || props.border};
  cursor: ${(props) => props.cursor || 'initial'};
  border-radius: ${(props) => props.radius || '5px'};
  width: ${(props) => props.width || 'initial'};
  max-width: ${(props) => props.maxWidth || 'initial'};
  min-width: ${(props) => props.minWidth || 'initial'};
  height: ${(props) => props.height || 'initial'};
  max-height: ${(props) => props.maxHeight || 'initial'};
  min-height: ${(props) => props.minHeight || 'initial'};
  background: ${(props) => props.bg || 'initial'};
  padding: ${(props) => props.pd || '8px'};
  padding-top: ${(props) => props.pt || props.pd};
  padding-bottom: ${(props) => props.pb || props.pd};
  padding-left: ${(props) => props.pl || props.pd};
  padding-right: ${(props) => props.pr || props.pd};
  text-align: ${(props) => props.textAlign || 'center'};
  margin: ${(props) => props.mg || 'initial'};
  margin-top: ${(props) => props.mt || props.mg};
  margin-left: ${(props) => props.ml || props.mg};
  margin-right: ${(props) => props.mr || props.mg};
  margin-bottom: ${(props) => props.mb || props.mg};
  display: ${(props) => props.display || 'block'};
`
export default Box
