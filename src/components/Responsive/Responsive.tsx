/**
 * 包含模式设置、响应式编辑通信iframe、与样式编辑面板MiniDashboard
 *
 */

import {
  CloseOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Affix, Button, message, Drawer } from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import usePostMessage from "~/hooks/usePostMessage";
import { Dispatch, RootState } from "~/redux/store";
import MiniDashboard from "../MiniDashboard";
import s from "./Responsive.module.less";
import Draggable from "react-draggable";
import Ruler from "./Ruler";
import Repository from "../MiniDashboard/Repository";
import PageSetting from "../MiniDashboard/PageSetting";

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
  const removeActivationItem = useDispatch<Dispatch>().activationItem.removeActivationItem;
  
  const setRunningTimes = useDispatch<Dispatch>().runningTimes.setRunningTimes;

  useEffect(() => {
    setIsEditing(true);
  }, [setIsEditing]);

  const ref = useRef(null);

  const [iframeWidth, setIframeWidth] = useState();

  const [showDrawer, setShowDrawer] = useState(false);
  const [showPageDrawer, setShowPageDrawer] = useState(false);

  // 创建postmessage通信 usePostMessage收集数据 redux 更新数据
  const sendMessage = usePostMessage(({ tag, value }) => {
    switch (tag) {
      case "setIsEditing":
        setIsEditing(value);
        break;
      case "updateAppData":
        updateAppData(value);
        break;
      case "updateRunningTimes":
        setRunningTimes(value);
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
        setShowDashboard(true);
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

  const [showDashboard, setShowDashboard] = useState(false);
  const [opacity, setOpacity] = useState("1");
  // 无激活模块时隐藏设置面板
  useEffect(() => {
    if (!activationItem.moduleId) {
      setShowDashboard(false)
    } 
  }, [activationItem])

  const hideDashboard = useCallback(
    () => {
      setShowDashboard(false)
      removeActivationItem();
      if (win) {
        sendMessage({ tag: "removeActivationItem", value: undefined }, win);
      }
    },
    [removeActivationItem, sendMessage, win],
  )

  return (
    <div className={s.main}>
      {showDashboard ? (
        <Draggable
          axis="both"
          handle={`.${s.header}`}
          onDrag={() => setOpacity("0.5")}
          onStop={() => setOpacity("1")}
        >
          <div className={s.dashboard} style={{ opacity }}>
            <div className={s.header}>
              <h3>设置面板</h3>
              <CloseOutlined
                className={s.icon}
                onClick={hideDashboard}
              />
            </div>
            <MiniDashboard />
          </div>
        </Draggable>
      ) : null}
      <div>
        <Button
          type="primary"
          icon={<SettingOutlined />}
          onClick={() => setShowPageDrawer(true)}
        >
          页面
        </Button>
        &nbsp;
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowDrawer(true)}
        >
          组件
        </Button>
      </div>
      <Ruler onChange={onChangeRule} />
      <Drawer
          className={s.drawer}
          title="页面设置"
          width={550}
          onClose={() => setShowPageDrawer(false)}
          visible={showPageDrawer}
          bodyStyle={{ padding:'10px 10px 80px 10px', overflow: 'auto' }}
          footer={null}
        >
          <PageSetting />
        </Drawer>
        <Drawer
          className={s.drawer}
          title="组件库"
          width={550}
          onClose={() => setShowDrawer(false)}
          visible={showDrawer}
          bodyStyle={{ padding:'10px 10px 80px 10px' }}
          footer={null}
        >
          <Repository />
        </Drawer>
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
              src={`/${window.location.search}`}
              style={{
                width: "1px",
                border: "none",
                minWidth: "100%",
                minHeight: `${window.innerHeight}px`,
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Responsive;
