/**
 * 包含模式设置、响应式编辑通信iframe、与样式编辑面板MiniDashboard
 *
 */

import { Button } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePostMessage from "~/hooks/usePostMessage";
import { Dispatch, RootState } from "~/redux/store";
import MiniDashboard from "../MiniDashboard";
import s from "./Responsive.module.less";
import Ruler from "./Ruler";

interface Props {}
const Responsive: React.FC<Props> = () => {
  /**
   * ----------
   * 定义编辑模式
   * ----------
   */
  const isEditing = useSelector(
    (state: RootState) => state.controller.isEditing
  );

  const appData = useSelector((state: RootState) => state.appData);
  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );
  const stateTag = useSelector((state: RootState) => state.controller.stateTag);

  const forceUpdateByStateTag = useDispatch<Dispatch>().controller
    .forceUpdateByStateTag;
  const setIsEditing = useDispatch<Dispatch>().controller.setIsEditing;
  const updateAppData = useDispatch<Dispatch>().appData.updateAppData;
  const updateActivationItem = useDispatch<Dispatch>().activationItem
    .updateActivationItem;

  useEffect(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const ref = useRef(null);

  const [iframeWidth, setIframeWidth] = useState();

  // 创建postmessage通信 usePostMessage收集数据 redux 更新数据
  const sendMessage = usePostMessage(({ tag, value }) => {
    switch (tag) {
      case "setIsEditing":
        setIsEditing(value);
        break;
      case "updateAppData":
        updateAppData(value);
        break;
      case "id":
        // 设置当前项正在被编辑
        // 禁止重复设置当前编辑项
        if (activationItem.moduleId === value) return;
        for (let index = 0; index < appData.length; index++) {
          const element = appData[index];
          if (element.moduleId === value) {
            updateActivationItem({ ...element });
            break;
          }
        }
        break;
      default:
        break;
    }
  });

  // 收发处理，子窗口onload时向子窗口发送信息, 通知当前正处于编辑模式下，
  const win: Window | null = ref.current
    ? (ref.current as any).contentWindow
    : null;
  useEffect(() => {
    if (win) {
      win.onload = () => {
        sendMessage({ tag: "setIsEditing", value: true }, win);
      };
    }
  }, [isEditing, sendMessage, setIsEditing, win]);

  // 切换编辑视图
  const setEditing = useCallback(() => {
    if (win) {
      sendMessage({ tag: "setIsEditing", value: !isEditing }, win);
    }
    setIsEditing(!isEditing);
  }, [isEditing, sendMessage, setIsEditing, win]);

  // 收发处理，编辑完数据后通过sendMessage向子窗口发送最新数据。
  useEffect(() => {
    sendMessage(
      {
        tag: "updateAppData",
        value: appData,
      },
      win
    );
  }, [sendMessage, win, appData]);

  const onChangeRule = (width: any) => {
    setIframeWidth(width);
    if (win) {
      sendMessage({ tag: "setIsEditing", value: true }, win);
    }
    setIsEditing(true);
    forceUpdateByStateTag();
  };

  return (
    <div className={s.main}>
      <div className={s.menu}>
        <div className={s.lefttitle}>
          标题：
        </div>
        <div className={s.rightbtn}>
          {isEditing === true ? (
            <Button type="default" size="small" onClick={setEditing}>
              设计模式
            </Button>
          ) : (
            <Button type="default" size="small" onClick={setEditing}>
              预览模式
            </Button>
          )}
          &nbsp;
          <Button
            type="default"
            size="small"
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
          >
            重置
          </Button>
        </div>
      </div>
      <Ruler onChange={onChangeRule} />
      <div className={s.box}>
        {!stateTag ? (
          <div
            className={s.iframebox}
            style={iframeWidth ? { width: iframeWidth } : {}}
          >
            <iframe
              ref={ref}
              id="wrapiframe"
              title="wrapiframe"
              src="/?isEditing=true"
              style={{
                width: "1px",
                border: "none",
                minWidth: "100%",
                minHeight: `${window.innerHeight}px`,
              }}
            />
          </div>
        ) : null}
        <MiniDashboard />
      </div>
    </div>
  );
};

export default Responsive;
