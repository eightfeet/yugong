import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch, RootState } from "~/redux/store";
import { AppDataElementsTypes } from "~/types/appData";
import styleCompiler from "~/compiler";
import s from "./Conterner.module.less";

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
  /**
   * 获取全部数据
   * appData（运行时数据）、activationItem（被激活数据）、controller（控制状态）
   */
  const appData = useSelector((state: RootState) => state.appData);
  const activationItem = useSelector((state: RootState) => state.activationItem);
  const controller = useSelector((state: RootState) => state.controller);

  const dispatch:Dispatch = useDispatch<Dispatch>();
  /**
   * 更新当前激活项
   */
  const { updateActivationItem } = dispatch.activationItem
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
    // 禁止重复设置当前编辑项
    if (activationItem.moduleId === id) return;
    for (let index = 0; index < appData.length; index++) {
      const element = appData[index];
      if (element.moduleId === id) {
        updateActivationItem({ ...element });
        break;
      }
    }
  }, [activationItem.moduleId, appData, controller.isEditing, id, updateActivationItem]);

  return (
    <div
      className={s.touchwrap}
      onTouchStart={onLayoutClick}
      onMouseDown={onLayoutClick}
    >
      {activationItem.moduleId === id ? <div className={s.actwrap} /> : null}
      <div id={id} style={basicStyle.style}>
        {children || content.text}
      </div>
    </div>
  );
};



export default Conterner;
