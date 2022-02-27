import React from 'react'
import { Table } from 'components'

export default function ({ Insureds }) {
  const HeaderData = ['Avatar', 'Name', 'ID Number', 'Email', 'Main Insured']
  const RowData = Insureds.map(
    (
      {
        person: {
          avatar,
          gender,
          firstName,
          companyName,
          lastName,
          dlNumber,
          email,
          id,
          ...rest
        },
        isMain,
      },
      index
    ) => {
      let formattedDl = dlNumber

      // eslint-disable-next-line
      if (dlNumber != null || dlNumber != undefined) {
        formattedDl = dlNumber?.toString().split('')
        formattedDl.splice(3, 0, '-')
        formattedDl.splice(7, 0, '-')
        formattedDl.join('')
      }

      return {
        avatar,
        name: gender ? `${firstName} ${lastName}` : companyName,
        number: formattedDl || 'None Provided',
        email,
        isMain: isMain ? 'Yes' : 'No',
        id,
        dlNumber,
        firstName,
        lastName,
        gender,
        companyName,
        ...rest,
      }
    }
  )

  return (
    <Table
      title="Insureds"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 1fr 1fr 2fr 1fr`}
      breakingPoint="1280px"
      noTopButton
      hasAvatar
    />
  )
}
