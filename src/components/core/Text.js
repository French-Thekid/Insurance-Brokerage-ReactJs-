import React, { useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

/**
 * A component for creating text using standard scales .
 * @prop {string} size - text size accepts: xs, sm, rg, md, lg, xl, xxl defaults to rg.
 * @prop {string} mt - margin top specified in css units.
 * @prop {string} mb - margin bottom specified in css units.
 * @prop {number} lh - specify line-height.
 * @prop {string} align - specify the text alignment left | center | right , defaults to left.
 * @prop {string} decoration - apply decoration such as underline etc.
 * @prop {number} weight - can also be string defines text weight.
 * @prop {string} color - color of the text.
 * @prop {string} customSize - allow custom fontSize of the text.
 * @prop {string} responsive - allow responsive text size.
 */

export default function Text({
  children,
  size,
  mt,
  mb,
  lh,
  align,
  decoration,
  weight,
  color,
  customSize,
  overrideCustomSize,
  screen,
  Contained,
  id,
  width,
}) {
  const { Colours } = useContext(ColourContext)

  let finalSize = '16px'
  if (customSize) finalSize = customSize
  else
    switch (size) {
      case 'xs':
        finalSize = '10px'
        break
      case 'sm':
        finalSize = '13px'
        break
      case 'rg':
        finalSize = '16px'
        break
      case 'md':
        finalSize = '24px'
        break
      case 'lg':
        finalSize = '32px'
        break
      case 'xl':
        finalSize = '48px'
        break
      case 'xxl':
        finalSize = '62px'
        break
      default:
        finalSize = '16px'
        break
    }

  return (
    <p
      id={id || ''}
      css={`
        width: ${width || 'auto'};
        transition: ease-out 1s;
        color: ${color || Colours.text};
        font-weight: ${weight || 400};
        margin-top: ${mt || 'initial'};
        margin-bottom: ${mb || 'initial'};
        text-decoration: ${decoration || 'initial'};
        line-height: ${lh || 'initial'};
        text-align: ${align || 'left'};
        font-size: ${finalSize};
        white-space: ${Contained ? 'nowrap' : 'inherit'};
        overflow: ${Contained ? 'hidden' : 'inherit'};
        text-overflow: ${Contained ? 'ellipsis' : 'inherit'};
        font-family: 'Nunito', 'sans-serif';
        @media screen and (max-width: ${screen}) {
          font-size: ${overrideCustomSize || finalSize};
        }
      `}
    >
      {children}
    </p>
  )
}


