import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";

function useRem() {
  const pageData = useSelector((state: RootState) => state.pageData);
  const setBestFont = useDispatch<Dispatch>().controller.setBestFont;
  const uiWidth = useSelector((state: RootState) => state.pageData.UIWidth);
  const uiFontSize = useSelector((state: RootState) => state.pageData.baseFont);
  const setRemSize = useDispatch<Dispatch>().runningTimes.setRemSize;
    
  const resizeFn = useCallback(() => {
    let clientWidth = document.documentElement.clientWidth;
    const fontSizeValue = (uiFontSize && uiWidth) ? (uiFontSize || 1) * (clientWidth / (uiWidth || 1)) : 16;
    setBestFont(fontSizeValue);
    setRemSize(fontSizeValue)
  }, [uiFontSize, uiWidth, setBestFont, setRemSize]);
  
  useEffect(() => {
    resizeFn();
    if (
      (pageData.toUnit === "rem" || pageData.unit === "rem") &&
      pageData.UIWidth &&
      pageData.baseFont
    ) {
      window.addEventListener("resize", resizeFn, true);
    }
    return () => {
      if (
        (pageData.toUnit === "rem" || pageData.unit === "rem") &&
        pageData.UIWidth &&
        pageData.baseFont
      ) {
        window.removeEventListener("resize", resizeFn, true);
      }
    };
  }, [
    pageData.UIWidth,
    pageData.baseFont,
    pageData.toUnit,
    pageData.unit,
    resizeFn
  ]);
}

export default useRem;
