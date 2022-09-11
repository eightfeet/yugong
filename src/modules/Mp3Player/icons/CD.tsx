import * as React from "react";

function CD({animate}: {animate: boolean}) {
  const props: any = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 22,
    strokeLinecap: 'round',
    strokeMiterlimit: 10,
  }
  return (
    <svg
      xmlSpace="preserve"
      viewBox="0 0 520 520"
    >
      <style>
        {`@keyframes cd___spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }`}
      </style>
      
      <g style={animate ? { animation: `1s linear 0s infinite normal forwards running cd___spin`, transformOrigin: "center", } : {}}>
        <circle  {...props} cx="260" cy="260" r="182.6" />
        <path  {...props} d="M260,145.2c25.8,0,50.9,8.7,71.1,24.7s34.5,38.3,40.5,63.4" />
        <path  {...props} d="M260,374.8c-25.8,0-50.9-8.7-71.1-24.7c-20.3-16-34.5-38.3-40.5-63.4" />
        <circle  {...props} cx="260" cy="260" r="48.4" />
      </g>
    </svg>
  );
}

const MemoCD = React.memo(CD);
export default MemoCD;

