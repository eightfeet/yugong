import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";
import { AppDataElementsTypes } from "~/types/appData";
import styleCompiler from "~/compiler";
import s from "./Wrapper.module.less";
import usePostMessage from "~/hooks/usePostMessage";

interface Props extends AppDataElementsTypes {
  id: string;
}

const Wrapper: React.FC<Props> = ({
  id,
  style,
  children,
}) => {
  
  /**
   * Wrapper 自身的样式
   */
  const [basicStyle, setBasicStyle] = useState<{ [keys: string]: any }>({});
  const actId = useSelector((state: RootState) => state.controller.editingId);

  const setEditingId = useDispatch<Dispatch>().controller.setEditingId;

  const isEditing = useSelector((state: RootState) => state.controller.isEditing);

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
    if(!isEditing) return;
    setEditingId(id)
    // 向父级窗口通知当前激活Id
    sendMessage({tag: 'id', value: id}, window.top)
  }, [isEditing, id, sendMessage, setEditingId]);

  return (
    <div
      className={s.touchwrap}
      onTouchStart={onLayoutClick}
      onMouseDown={onLayoutClick}
    >
      {actId === id ? <div className={s.actwrap} /> : null}
      <div id={id} style={basicStyle.style}>
        {children}
      </div>
    </div>
  );
};



export default Wrapper;
