import * as React from "react";

function Track({ width }: { width: number|string }) {
  // ${width}
  return (
    <svg viewBox="0 0 100 0.5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="0.5" opacity={0.3} rx="0.25"> 
        <animate attributeName="width" values={`0;100`} dur={`0.2s`}  />
      </rect>
      <rect fill="currentColor" style={{transition: width === 1 ? undefined : "width 1s", width, }} width={width} height="0.5" rx="0.25" />
    </svg>
  );
}

const MemoTrack = React.memo(Track);
export default MemoTrack;
