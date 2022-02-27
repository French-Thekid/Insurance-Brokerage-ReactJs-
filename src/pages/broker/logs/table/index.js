import React, { useState, useEffect } from 'react'
import { get } from 'idb-keyval'

import { Table } from 'components'

export default function () {
  const [Logs, setLogs] = useState([])
  const HeaderData = ['User', 'IP Address', 'Activity', 'Type', 'Path', 'Date']

  useEffect(() => {
    get('log').then((val) => {
      if (val !== undefined || val !== null) setLogs(val)
    })
  }, [])

  const RowData = Logs.map(
    ({ name, ip, message, logType, path, readableDate, ...rest }, index) => {
      return {
        name,
        ip,
        message,
        logType,
        path,
        readableDate,
        ...rest,
      }
    }
  )

  return (
    <Table
      title="Activities"
      RowData={RowData}
      HeaderData={HeaderData}
      Columns={`1fr 80px 2fr 1fr 2fr 1fr`}
      searchPlaceholder="Search Logs"
      searchEnable
      noTopButton
    />
  )
}
