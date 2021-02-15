import React from 'react'

interface Prop {
    data?: {
        [keys: string]: any
    }
}
const MessageData: React.FC<Prop> = (props) => {
  const { data } = props

  return data ? (
    data.message ? (
      <span>
        <b>Frame ID:</b> {data.iframe.id} &nbsp;
        <b>Message:</b> {data.message}
      </span>
    ) : (
      <span>
        <b>Frame ID:</b> {data.iframe.id} &nbsp;
        <b>Height:</b> {data.height} &nbsp;
        <b>Width:</b> {data.width} &nbsp;
        <b>Event type:</b> {data.type}
      </span>
    )
  ) : null
}

export default MessageData