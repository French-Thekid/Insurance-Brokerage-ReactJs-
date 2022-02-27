import React, { useContext, useState } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'
import { Core, Icons } from 'components'
import { SearchVehicles } from './forms'

export default function Lookup() {
  const [result, setResult] = useState('')
  const { Colours } = useContext(ColourContext)

  let company = ''
  let coverage = ''
  console.log(result)
  if (result !== '') {
    console.log('In')
    const { VehicleCoverage } = result || {}
    console.log('Data: ', VehicleCoverage[0], result)
    const { Vehicle_Covered, COMPANY } = VehicleCoverage[0] || {}
    console.log({ Vehicle_Covered, COMPANY })
    company = COMPANY
    coverage = Vehicle_Covered
  }

  return (
    <div
      css={`
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px;
        height: 100%;
      `}
    >
      <div
        css={`
          display: grid;
          place-items: center;
        `}
      >
        <SearchVehicles setResult={setResult} />
      </div>
      <div
        css={`
          display: grid;
          place-items: center;
          border: 5px;
          background: rgb(70, 135, 258, 0.05);
          border-radius: 5px;
          padding: 10px;
        `}
      >
        {result === '' ? (
          <Core.Text color={Colours.blue}>
            Enter a vechicle's information on the left to see its coverage
          </Core.Text>
        ) : (
          <div
            css={`
              display: grid;
              place-items: center;
            `}
          >
            {coverage === true ? (
              <Icons.VerifiedUserRoundedIcon
                style={{ color: Colours.blue, fontSize: '200px' }}
              />
            ) : (
              <Icons.GppBadRoundedIcon
                style={{ color: Colours.red, fontSize: '200px' }}
              />
            )}
            <br />
            <br />
            <Core.Text customSize="25px">
              {coverage === true ? 'Covered!' : 'Not Covered!'}
            </Core.Text>
            <Core.Text color={Colours.blue} customSize="35px">
              {company}
            </Core.Text>
          </div>
        )}
      </div>
    </div>
  )
}
