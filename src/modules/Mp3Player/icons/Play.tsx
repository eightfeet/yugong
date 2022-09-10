import * as React from "react";

function Play() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
    >
      <path
        d="M66.47 853.23l5.34-684.51c1.44-59.26 50.65-106.13 109.91-104.68 16.33.4 32.35 4.52 46.85 12.05l671.14 344.26c51.53 25.64 72.51 88.2 46.87 139.73a104.184 104.184 0 01-46.87 46.87L223.23 947.62c-52.21 27.55-116.86 7.56-144.41-44.65a106.715 106.715 0 01-12.35-49.71v-.03z"
      />
    </svg>
  );
}

const MemoPlay = React.memo(Play);
export default MemoPlay;
