import * as React from "react";

function Pause() {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
    >
      <path
        d="M176 848V176c0-61.85 50.14-112 112-112h37.33c61.86 0 112 50.15 112 112v672c0 61.85-50.14 112-112 112H288c-61.86 0-112-50.15-112-112zm522.67 112H736c61.86 0 112-50.15 112-112V176c0-61.85-50.14-112-112-112h-37.33c-61.86 0-112 50.15-112 112v672c0 61.85 50.14 112 112 112z"
      />
    </svg>
  );
}

const MemoPause = React.memo(Pause);
export default MemoPause;
