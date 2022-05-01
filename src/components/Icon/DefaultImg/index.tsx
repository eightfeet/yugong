import * as React from "react"

interface Props {
  className?: string,
  style?: React.CSSProperties
}

const DefaultImg:React.FC<Props> = (props) => (
  <svg
    id="\u56FE\u5C42_1"
    xmlns="http://www.w3.org/2000/svg"
    x={0}
    y={0}
    viewBox="0 0 64 64"
    xmlSpace="preserve"
    {...props}
  >
    <style>{".st0{fill:#dbdbdb}"}</style>
    <path
      className="st0"
      d="M41.2 28.6c-2.7 0-4.1 2.5-5.2 4.6-.7 1.3-1.5 2.7-2.2 2.7-.8-.2-1.3-.7-2-1.2-.9-.8-1.9-1.7-3.7-1.6-2.2.1-4.1 1.6-5.8 4.5-.2.4-.1 1 .3 1.2s1 .1 1.2-.3c1.4-2.4 2.8-3.6 4.3-3.6 1 0 1.6.5 2.4 1.2.8.7 1.6 1.4 3 1.7h.1c1.8 0 2.8-1.9 3.8-3.7.8-1.4 1.6-2.9 2.7-3.5V41H20.8V23.1h13.7c.5 0 .9-.4.9-.9s-.4-.9-.9-.9H19.9c-.5 0-.9.4-.9.9v19.7c0 .5.4.9.9.9h21.3c.5 0 .9-.4.9-.9V29.5c0-.5-.4-.9-.9-.9z"
    />
    <path
      className="st0"
      d="M22.3 28.5c0 1.6 1.3 3 3 3s3-1.3 3-3-1.3-2.9-3-2.9-3 1.3-3 2.9zm4.1 0c0 .6-.6 1.1-1.2 1.1s-1.1-.5-1.1-1.1c0-.6.6-1.1 1.2-1.1s1 .5 1.1 1.1zm17.7-7h-1.7v-1.7c0-.5-.4-.9-.9-.9s-.9.4-.9.9v1.7h-2.3c-.5 0-.9.4-.9.9s.4.9.9.9h2.3v2.3c0 .5.4.9.9.9s.9-.4.9-.9v-2.3h1.7c.5 0 .9-.4.9-.9s-.4-.9-.9-.9z"
    />
  </svg>
)

export default DefaultImg
