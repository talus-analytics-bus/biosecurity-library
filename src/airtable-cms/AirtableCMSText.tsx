import React from 'react'
import { AirtableCMSData } from './types'

export const getCMSText = (data: AirtableCMSData, name: string) =>
  data.nodes.find(n => n.data.Name === name)?.data.Text

const AirtableCMSText: React.FC<{
  name: string
  data: AirtableCMSData
}> = ({ data, name }) => {
  const text = getCMSText(data, name)
  if (text) return <>{text}</>
  throw new Error(
    `Text section ${name} not found in ` +
      `Airtable. Does the query include the ` +
      `right tables, and does one of those ` +
      `tables include a section called ${name}?.`
  )
}

export default AirtableCMSText
