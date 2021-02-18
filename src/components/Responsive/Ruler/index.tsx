import React, { useCallback, useRef, useState } from "react";
import s from "./Ruler.module.less";

interface Prop {
  onChange?: (width: string) => any;
}
const Ruler: React.FC<Prop> = ({ onChange }) => {
  const [, setIframeWidth] = useState();
  const [iframeWidthText, setIframeWidthText] = useState();
  const [iframeWidthOverText, setIframeWidthOverText] = useState();
  const ref = useRef(null);

  const onMouseOver = useCallback((e: any) => {
    e.preventDefault();
    e.target.style.background = "#aaa";
    setIframeWidthOverText(e.target.getAttribute("data-text"));
  }, []);

  const onMouseOut = useCallback((e: any) => {
    e.preventDefault();
    e.target.style.background = "none";
    setIframeWidthOverText(undefined);
  }, []);

  const onClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setIframeWidth(e.target.getAttribute("data-width"));
      setIframeWidthText(e.target.getAttribute("data-text"));
      if (onChange instanceof Function) {
        onChange(e.target.getAttribute("data-width"));
      }
    },
    [onChange]
  );

  return (
    <div className={s.responsive}>
      <div onMouseOver={onMouseOver} onMouseOut={onMouseOut} onClick={onClick}>
        <div
          data-width="768px"
          data-text="Tablet - 768px"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          onClick={onClick}
          style={{ width: "768px" }}
        >
          <div
            data-width="425px"
            data-text="Mobile L - 425px"
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            style={{ width: "425px" }}
          >
            <div
              data-width="375px"
              data-text="Mobile M - 375px"
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              style={{ width: "375px" }}
            >
              <div
                data-width="320px"
                data-text="Mobile S - 320px"
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                onClick={onClick}
                style={{ width: "320px" }}
                ref={ref}
              >
                {iframeWidthOverText || iframeWidthText || <>&nbsp;</>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ruler;
