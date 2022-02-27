import React, { useContext, useState } from 'react'
import 'styled-components/macro'
import { ColourContext } from 'context'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { FormControl, Core, Icons, Loading } from 'components'
import { keyframes } from 'styled-components'

export default function SearchVehicles({ setResult }) {
  const { Colours, mode } = useContext(ColourContext)
  const [loading, setLoading] = useState(false)

  const floating = keyframes`
  0% { transform: translate(0,  0px); }
  50%  { transform: translate(0, 10px); }
  100%   { transform: translate(0, -0px); } 
`

  return (
    <Formik
      initialValues={{
        license: '',
        chassis: '',
      }}
      validationSchema={object().shape({
        license: string('').required('License is required'),
        chassis: string(''),
      })}
      onSubmit={({ license, chassis }, action) => {
        setLoading(true)
        fetch(
          `https://www.ivisja.com/web/CheckCoverage?chassis=${chassis}&license=${license}`
        )
          .then(async (response) => {
            const json = await response.json()
            console.log({ json })
            setResult(json)
            return json
          })
          .then((data) => {
            if (data.status === 200 || data.status === 201) {
              setLoading(false)
            } else {
              setLoading(false)
            }
          })
          .catch((error) => {
            console.error('Error:', error)
            setLoading(false)
          })
      }}
    >
      {(props) => {
        const {
          values,
          handleChange,
          touched,
          handleBlur,
          handleSubmit,
          errors,
        } = props
        return (
          <form
            onSubmit={handleSubmit}
            css={`
              width: 500px;
              @media (max-width: 376px) {
                width: 300px;
              }
            `}
          >
            {loading && <Loading small Contained />}
            <div
              css={`
                margin-bottom: 20px;
                display: grid;
                place-items: Center;
                -webkit-animation: ${floating} 4s infinite ease-in-out both;
                animation: ${floating} 4s infinite ease-in-out both;
              `}
            >
              <Icons.SearchRoundedIcon
                style={{ fontSize: '120px', color: Colours.blue }}
              />
            </div>
            <div
              css={`
                margin-bottom: 20px;
                border: 1px solid ${Colours.blue};
                border-radius: 5px;
                padding: 10px;
                background: rgb(70, 135, 258, 0.05);
                box-shadow: ${mode === 'Dark'
                  ? '0px 0px 2px 0px rgba(16,15,28,1)'
                  : mode === 'Light' || mode === ''
                  ? ' 0px 10px 5px 0px rgba(251,250,255,1)'
                  : 'none'};
              `}
            >
              <Core.Text>
                Enter a vehicle registration number or chassis number to verify
                the status of the vehicle insurance.
              </Core.Text>
            </div>
            <FormControl.Input
              label="Registration Number"
              id="license"
              value={values.license}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Registration Number"
            />

            <FormControl.Error
              name="license"
              show={errors.license && touched.license}
              message={errors.license}
            />
            <br />
            <FormControl.Input
              label="Vin Number"
              id="chassis"
              value={values.chassis}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Vin Number"
            />

            <FormControl.Error
              name="chassis"
              show={errors.chassis && touched.chassis}
              message={errors.chassis}
            />
            <br />
            <br />
            <Core.Button type="submit" style={{ marginTop: '10px' }}>
              Search
            </Core.Button>
          </form>
        )
      }}
    </Formik>
  )
}
