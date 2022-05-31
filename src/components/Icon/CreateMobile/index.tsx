import React from 'react';

interface Props {
  className?: string;
}

const CreateMobile: React.FC<Props> = ({ className }) => (
  <span className={className} style={{ width: 40, height: 40}}>
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path fill='currentColor' d="M28 24h-4v-4h-2v4h-4v2h4v4h2v-4h4v-2z" />
      <path fill='currentColor' d="M10 28V10h12v7h2V6a2.002 2.002 0 0 0-2-2H10a2.002 2.002 0 0 0-2 2v22a2.002 2.002 0 0 0 2 2h6v-2Zm0-22h12v2H10Z" />
      <path
        style={{
          fill: 'none',
        }}
        d="M0 0h32v32H0z"
      />
    </svg>
    </span>
);

export default CreateMobile;
