/**
 * 包含模式设置、响应式编辑通信iframe、与样式编辑面板MiniDashboard
 *
 */

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSendMessage, useSetMessageReceiver } from "~/hooks/usePostMessage";
import appData from "~/mockdata/appData";
import { Dispatch, RootState } from "~/redux/dashboardStore";
import MiniDashboard from "../MiniDashboard";

interface Props {}
const Responsive: React.FC<Props> = () => {

  const isEditing = useSelector((state: RootState) => state.controller.isEditing);
  const activationItem = useSelector((state: RootState) => state.activationItem);

  const setIsEditing = useDispatch<Dispatch>().controller.setIsEditing;
  
  const ref = useRef(null)

  // 收发处理，向子窗口发送信息
  // const win: Window | null = ref.current ? (ref.current as any).contentWindow : null;
  // useSendMessage({
  //   tag: 'setIsEditing',
  //   value: isEditing
  // }, win)

  // useSendMessage({
  //   tag: 'updateAppData',
  //   value: appData
  // }, win)

  // useSendMessage({
  //   tag: 'updateActivationItem',
  //   value: activationItem
  // }, win)

  // 收发处理，接收子窗口信息
  const actions = {
    updateAppData: useDispatch<Dispatch>().appData.updateAppData,
    updateActivationItem: useDispatch<Dispatch>().activationItem
      .updateActivationItem,
    setIsEditing
  };
  useSetMessageReceiver(({ tag, value }) => {
    if (tag) {
      actions[tag](value);
    }
  });

  return (
    <>
      <span>
        视图模式：{isEditing === true ? "设计模式" : "预览模式"}
        视图
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing === true ? "预览模式" : "设计模式"}
      </button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button>保存</button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <button
        onClick={() => {
          window.localStorage.clear();
          window.location.reload();
        }}
      >
        重置
      </button>
      <iframe
        ref={ref}
        title="wrapiframe"
        src="/?isEditing=true"
        style={{
          width: "1px",
          minWidth: "100%",
          minHeight: `${window.innerHeight}px`,
        }}
      />
      <MiniDashboard />
    </>
  );
};

export default Responsive;
