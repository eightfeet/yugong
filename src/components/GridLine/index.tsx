import React, { useState, useEffect, useCallback } from "react";
import s from "./style.module.scss";

interface GridLineProps {
  height: number;
  width: number;
  cols: number;
  rowHeight: number;
  space: number;
}

/**
 * 编辑参考线
 * @export
 * @param {GridLineProps} {
 *   height,
 *   width,
 *   cols,
 *   rowHeight,
 *   space,
 * }
 * @return {*} 
 */
export default function GridLine({
  height,
  width,
  cols,
  rowHeight,
  space,
}: GridLineProps) {
  const [xl, setxl] = useState<any>([]);
  const [yl, setyl] = useState<any>([]);
  const WH = window.innerHeight;
  useEffect(() => {
    const xdata = [];
    const ydata = [];
    // y间隔
    for (let index = space; index < height; index += rowHeight + space) {
      xdata.push({ top: Math.floor(index - space) });
      xdata.push({ top: Math.floor(index) });
    }

    // x间隔
    const stx = (width - space) / cols;
    for (let index = space; index <= width + space; index += stx) {
      ydata.push({ left: Math.floor(index) });
      ydata.push({ left: Math.floor(index - space) });
    }

    setxl(xdata);
    setyl(ydata);
    return () => { };
  }, [cols, height, rowHeight, space, width]);

  const renderPageLine = useCallback(
    () => {
      return <div className={s.pagelinewrap}>
        <div className={s.pageline} style={{ height: WH }} />
      </div>
    },
    [WH],
  )


  return (
    <>
      {renderPageLine()}
      <div className={s.cwrap} style={{ minHeight: WH }}>
        {xl.map(({ top }: any, index: number) => (
          <div key={index} className={s.x} style={{ top }} />
        ))}
        {yl.map(({ left }: any, index: number) => (
          <div key={index} className={s.y} style={{ left }} />
        ))}
      </div>
    </>
  );
}
