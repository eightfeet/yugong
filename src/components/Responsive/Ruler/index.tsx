import React, { useCallback, useRef, useState } from "react";
import s from "./Ruler.module.less";

interface Prop {
  onChange?: (width: string, height: string) => any;
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
        onChange(e.target.getAttribute("data-width"), e.target.getAttribute("data-height"));
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
            data-width="414px"
            data-height="736px"
            data-text="Mobile L - 414px*736px"
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            style={{ width: "414px" }}
          >
            <div
              data-width="375px"
              data-height="677px"
              data-text="Mobile M(iphone6/7/8) - 375px*677px"
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              style={{ width: "375px" }}
            >
              <div
                data-width="320px"
                data-height="568px"
                data-text="Mobile S(iphone5s) - 320px*568px"
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
