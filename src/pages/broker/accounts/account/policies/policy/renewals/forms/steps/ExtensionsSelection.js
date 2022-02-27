import React, { useContext } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { ColourContext } from 'context'
import 'styled-components/macro'
import { LIST_EXTENSIONS } from '../../../queries'
import { useQuery } from '@apollo/react-hooks'
import { Content, Loading, Core, FormControl } from 'components'
import { currencyFormatter } from 'utils'

export default function ExtensionSelection({ extensions = [], setExtensions }) {
  const {
    params: { accountId, policyId },
  } = useRouteMatch()
  const { Colours } = useContext(ColourContext)

  //Fetching Motor Risks
  const {
    loading: extensionsLoading,
    error: extensionsError,
    data: extensionsData,
  } = useQuery(LIST_EXTENSIONS, {
    variables: {
      accountID: parseInt(accountId),
      policyID: parseInt(policyId),
    },
  })

  if (extensionsLoading) return <Loading Contained small />
  if (extensionsError)
    return <Content.Alert type="error" message={'Fail to Load Extensions'} />

  const { listPolicyExtension } = extensionsData || {}
  const { data } = listPolicyExtension || {}

  if (
    data &&
    (localStorage.getItem('existingExtensions') === null ||
      localStorage.getItem('existingExtensions') === undefined)
  ) {
    console.log('extensions stored')
    let oldExtensions = []
    data.map(({ id }, index) => {
      oldExtensions.push(id)
      return null
    })
    localStorage.setItem('existingExtensions', JSON.stringify(oldExtensions))
  }

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
        grid-gap: 20px;
        margin-bottom: 20px;
      `}
    >
      <div
        css={`
          margin: 10px 0px 10px 0px;
          border-bottom: 1px solid ${Colours.border};
        `}
      >
        <Core.Text>
          Please remove extension(s) that are not required for this renewal.
        </Core.Text>
      </div>
      <ExtensionTable
        data={data}
        extensions={extensions}
        setExtensions={setExtensions}
      />
    </div>
  )
}

const ExtensionTable = ({ data, extensions = [], setExtensions }) => {
  const { Colours } = useContext(ColourContext)

  return (
    <div
      css={`
        display: grid;
        grid-template-rows: max-content 1fr;
      `}
    >
      <div
        css={`
          display: grid;
          grid-template-columns: 1fr 100px 1fr 2fr 80px;
          grid-gap: 10px;
          background: ${Colours.title};
          padding: 10px 5px;
          justify-items: start;
          align-items: Center;
          border-radius: 2px;
        `}
      >
        <Core.Text>Name</Core.Text>
        <Core.Text>Limit</Core.Text>
        <Core.Text>Type</Core.Text>
        <Core.Text>Description</Core.Text>
        <div
          css={`
            display: grid;
            justify-items: center;
            width: 100%;
          `}
        >
          <Core.Text>Toggle</Core.Text>
        </div>
      </div>
      <div
        css={`
          max-height: 300px;
          overflow-y: auto;
        `}
      >
        {data.map((item, index) => {
          const { id, name, limit, type, description } = item || {}
          return (
            <div
              key={index}
              css={`
                display: grid;
                grid-template-columns: 1fr 100px 1fr 2fr 80px;
                grid-gap: 10px;
                padding: 10px 5px;
                justify-items: start;
                align-items: start;
                border-bottom: 1px solid ${Colours.border};
              `}
            >
              <Core.Text customSize="12px">{name}</Core.Text>
              <Core.Text customSize="12px">
                ${currencyFormatter(limit)}
              </Core.Text>
              <Core.Text customSize="12px">{type}</Core.Text>
              <Core.Text customSize="12px">{description}</Core.Text>{' '}
              <div
                css={`
                  display: grid;
                  width: 100%;
                  justify-items: center;
                `}
              >
                <FormControl.Toggle
                  startwithoff={
                    extensions.length === 0 || extensions.includes(id) === false
                      ? null
                      : 'On'
                  }
                  onChange={(e) => {
                    e.persist()
                    if (e.target.checked) {
                      setExtensions((prevState) => {
                        const a = prevState.filter((item, index) => item !== id)
                        return a
                      })
                    } else {
                      setExtensions((prevState) => {
                        const a = prevState.concat(id)
                        return a
                      })
                    }
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
