import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";
import { AppDataElementsTypes } from "~/types/appData";
import styleCompiler from "~/compiler";
import s from "./Conterner.module.less";
import usePostMessage from "~/hooks/usePostMessage";

interface paraments extends AppDataElementsTypes {
  id: string;
}

const Conterner: React.FC<paraments> = ({
  id,
  style,
  children,
  content,
}) => {
  /**
   * Conterner 自身的样式
   */
  const [basicStyle, setBasicStyle] = useState<{ [keys: string]: any }>({});
  const actId = useSelector((state: RootState) => state.controller.editingId);

  const setEditingId = useDispatch<Dispatch>().controller.setEditingId;

  const controller = useSelector((state: RootState) => state.controller);

  const sendMessage = usePostMessage(()=> {})

  useEffect(() => {
    const { basic } = style;
    setBasicStyle(styleCompiler(basic));
    if (basic.display?.zIndex !== undefined) {
      document.getElementById(
        `wrap-${id}`
      )!.style.zIndex = `${basic.display.zIndex}`;
    }
  }, [id, style]);

  /**
   * 图层被触发
   */
  const onLayoutClick = useCallback(() => {
    if(!controller.isEditing) return;
    setEditingId(id)
    // 向父级窗口通知当前激活Id
    sendMessage({tag: 'id', value: id}, window.top)
  }, [controller.isEditing, id, sendMessage, setEditingId]);

  return (
    <div
      className={s.touchwrap}
      onTouchStart={onLayoutClick}
      onMouseDown={onLayoutClick}
    >
      {actId === id ? <div className={s.actwrap} /> : null}
      <div id={id} style={basicStyle.style}>
        {children || content.text}
      </div>
    </div>
  );
};



export default Conterner;
