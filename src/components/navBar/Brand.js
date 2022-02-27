import React, { useContext, useState, useEffect } from 'react'
import { OrganisationContext } from 'context'
import styled from 'styled-components'
import 'styled-components/macro'
import { useHistory, useLocation } from 'react-router-dom'
import fallback from '../../assets/logo.svg'
import { Core, Colours } from 'components'

const Brand = () => {
  const { logoUrl, orgName } = useContext(OrganisationContext)
  const { pathname } = useLocation()
  const [error, setError] = useState(false)
  const path = pathname.split('/')[1].split('/')[0]
  const history = useHistory()
  useEffect(() => {
    if (logoUrl === null || logoUrl === undefined) {
      setError(true)
    }
    /*eslint-disable-next-line*/
  }, [])

  return (
    <div
      css={`
        display: grid;
        align-items: center;
        @media (max-width: 769px) {
          grid-template-columns: max-content max-content;
          grid-gap: 10px;
        }
      `}
      onClick={() =>
        history.push(`/${path}/${path === 'support' ? 'organisation' : 'home'}`)
      }
    >
      <img
        alt=""
        style={{ display: 'none' }}
        src={logoUrl}
        onError={() => {
          setError(true)
          console.log('gggg')
        }}
      />
      <Image src={error ? fallback : logoUrl} alt="Company Logo" />
      <div
        css={`
          @media (min-width: 769px) {
            display: none;
          }
        `}
      >
        <Core.Text color={Colours.text}>{orgName || 'PrintZ'}</Core.Text>
      </div>
    </div>
  )
}

export default Brand

const Image = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin: 0 auto;
  &:hover {
    cursor: pointer;
  }
`
