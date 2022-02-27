import React from 'react'
import 'styled-components/macro'
import { useQuery } from '@apollo/react-hooks'

import { Loading, Content } from 'components'

import { InsurerCard } from './sections'
import { LIST_INSURERS } from '../../../../Insurers/forms/queries'

export default function ({ policyIds, setInsurerEmails }) {
  const {
    loading: isInsurersLoading,
    error: InsurerErrors,
    data: InsurerList,
  } = useQuery(LIST_INSURERS)

  if (isInsurersLoading) return <Loading small />
  if (InsurerErrors)
    return <Content.Alert type="error" message="Failed to load Insurers" />

  return (
    <div
      css={`
        height: calc(100% - 2px);
        width: 100%;
        overflow-y: auto;
        padding-top: 2px;
        @media (min-width: 1919px) {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 10px;
          grid-auto-rows: 90px;
        }
      `}
    >
      {InsurerList.listInsurer.data.map(
        ({ id, firstName, lastName, company, email, avatar }, index) => (
          <InsurerCard
            policyId={policyIds}
            setInsurerEmails={setInsurerEmails}
            key={index}
            id={id}
            image={avatar}
            email={email}
            firstName={firstName}
            lastName={lastName}
            company={company}
          />
        )
      )}
    </div>
  )
}
