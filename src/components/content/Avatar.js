import { Core } from 'components'
import React, { useState, useContext } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'

/**
 * Avatar image size defaults to small.
 * @prop {string} src: url to avatar image
 * @prop {string} size: size of avatar accepts small, medium, large, huge.
 * @prop {string} firstName: firstname of the user
 * @prop {string} lastName: lastname of the user
 * @prop {string} borderColor: adds border to avatar
 */

export default function Avatar({
  size = 'small',
  src,
  firstName = 'Loading',
  lastName = 'User..',
  borderColor,
  shadow,
  responsive,
  responsiveLogo,
  square,
}) {
  const { mode } = useContext(ColourContext)
  const [srcError, setSrcError] = useState(false)
  if (firstName === '') firstName = 'Loading'
  if (lastName === '') lastName = 'User..'
  let initial = '...'
  let colorIndex = 0
  let fontSize = '18px'
  let colors = [
    '#BF211E',
    '#E57F27',
    '#2A7221',
    '#390099',
    '#9E0059',
    '#1357DD',
    '#4B9E9C',
    '#8FB515',
    '#006992',
    '#ECA400',
    '#FC440F',
  ]

  switch (size) {
    case 'small':
      size = '30px'
      fontSize = '14px'
      break
    case 'medium':
      size = '40px'
      fontSize = '15px'
      break
    case 'medium+':
      size = '50px'
      fontSize = '20px'
      break
    case 'large':
      size = '60px'
      fontSize = '26px'
      break
    case 'largee':
      size = '70px'
      fontSize = '26px'
      break
    case 'large+':
      size = '80px'
      fontSize = '30px'
      break
    case 'huge':
      size = '100px'
      fontSize = '35px'
      break
    case 'huge+':
      size = '140px'
      fontSize = '50px'
      break
    case 'bbw':
      size = '180px'
      fontSize = '70px'
      break
    case 'xxl':
      size = '240px'
      fontSize = '90px'
      break
    case 'square':
      size = '100%'
      fontSize = '90px'
      break
    default:
      size = '30px'
      fontSize = '18px'
  }

  if (firstName === undefined || lastName === undefined) {
    initial = '...'
  } else {
    initial =
      firstName.split('')[0].toUpperCase() + lastName.split('')[0].toUpperCase()

    let charIndex = initial.charCodeAt(0) - 65
    colorIndex = charIndex % 11
  }

  /* eslint-disable */
  return (
    <>
      <img
        alt=""
        style={{ display: 'none' }}
        src={src}
        onError={() => {
          setSrcError(true)
        }}
      />
      <div
        css={`
          background-image: url('${srcError ? 'none' : src}');
          background-size: cover;
          background-repeat: no-repeat;
          background-position-y: center;
          background-color: ${colors[colorIndex]};
          height: ${size};
          width: ${size};
          border-radius: ${square ? '5px' : '50%'};
          display: grid;
          place-items: center;
          border: ${borderColor ? `1px solid ${borderColor}` : 'none'};
          box-shadow: ${shadow && mode === 'Dark'
            ? `0px 8px 20px -10px rgba(16,15,28,1)`
            : (shadow && mode === 'Light') || (shadow && mode === '')
            ? `0px 8px 20px -10px rgba(113, 113, 138, 1)`
            : 'none'};

          @media screen and (min-width: 1440px) {
            height: ${responsiveLogo ? '70px' : responsive ? '140px' : size};
            width: ${responsiveLogo ? '70px' : responsive ? '140px' : size};
            border-radius: ${square ? '5px' : '50%'};
          }
        `}
      >
        {srcError || src === null || src === undefined ? (
          <Core.Text customSize={fontSize} color={'#fff'}>
            {initial}
          </Core.Text>
        ) : (
          ''
        )}
      </div>
    </>
  )
}
