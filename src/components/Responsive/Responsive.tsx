/**
 * 包含模式设置、响应式编辑通信iframe、与样式编辑面板MiniDashboard
 *
 */

import {
  CloseOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Drawer } from "antd";
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
import classNames from "classnames";
import { AppDataListTypes } from "~/types/appData";
import loading from "~/core/loading";

let pageReady = false;
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
  const updatePageData = useDispatch<Dispatch>().pageData.updatePage;
  const updateActivationItem = useDispatch<Dispatch>().activationItem
    .updateActivationItem;
  const removeActivationItem = useDispatch<Dispatch>().activationItem
    .removeActivationItem;

  const setRunningTimes = useDispatch<Dispatch>().runningTimes.setRunningTimes;

  const ref = useRef(null);

  const [iframeWidth, setIframeWidth] = useState(414);
  const [iframeHeight, setIframeHeight] = useState(736);

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
        // 同步更新被选模块的属性
        if (activationItem.moduleId === undefined) return;
        const asynAcactivationItem = (value as AppDataListTypes).find(
          (item) => item.moduleId === activationItem.moduleId
        );
        if (asynAcactivationItem?.moduleId) {
          updateActivationItem(asynAcactivationItem);
        }
        break;
      case "updateRunningTimes":
        setRunningTimes(value);
        break;
      case "updatePage":
        updatePageData(value);
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
        setIsEditing(true);
      };
    }
  }, [isEditing, sendMessage, setIsEditing, win]);

  useEffect(() => {
    if (win && !pageReady) {
      pageReady = true;
      loading.show();
      win.onload = () => {
        loading.hide();
      };
    }
  }, [win])

  useEffect(() => {
    sendMessage({ tag: "setIsEditing", value: true }, win);
    setIsEditing(true);
  }, [sendMessage, setIsEditing, win]);

  const toggleEdit = useCallback(() => {
    const states = !isEditing;
    sendMessage({ tag: "setIsEditing", value: states }, win);
    setIsEditing(states);
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

  const onChangeRule = (width: any, height: any) => {
    setIframeWidth(width);
    setIframeHeight(height || (window.innerHeight - 140));
    if (win) {
      sendMessage({ tag: "setIsEditing", value: isEditing }, win);
    }
    setIsEditing(true);
    forceUpdateByStateTag();
  };

  const [showDashboard, setShowDashboard] = useState(false);
  const [opacity, setOpacity] = useState("1");
  // 无激活模块时隐藏设置面板
  useEffect(() => {
    if (!activationItem.moduleId) {
      setShowDashboard(false);
    }
  }, [activationItem]);

  const hideDashboard = useCallback(() => {
    setShowDashboard(false);
    removeActivationItem();
    if (win) {
      sendMessage({ tag: "removeActivationItem", value: undefined }, win);
    }
  }, [removeActivationItem, sendMessage, win]);

  return (
    <div className={s.main}>
      {showDashboard && isEditing ? (
        <Draggable
          axis="both"
          handle={`.${s.header}`}
          onDrag={() => setOpacity("0.5")}
          onStop={() => setOpacity("1")}
        >
          <div className={s.dashboard} style={{ opacity }}>
            <div className={s.header}>
              <h3>设置面板</h3>
              <CloseOutlined className={s.icon} onClick={hideDashboard} />
            </div>
            <MiniDashboard />
          </div>
        </Draggable>
      ) : null}
      <div>
        {!isEditing ? (
          <Button
            type="primary"
            className={s.toggle}
            onClick={toggleEdit}
            icon={<EditOutlined />}
          />
        ) : null}
        {isEditing ? (
          <Button
            type="primary"
            className={s.toggle}
            onClick={toggleEdit}
            icon={<EyeOutlined />}
          />
        ) : null}
        &nbsp;
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
        bodyStyle={{ padding: "0", overflow: "auto" }}
        maskStyle={{ backgroundColor: "transparent" }}
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
        bodyStyle={{ padding: "10px 10px 80px 10px" }}
        maskStyle={{ backgroundColor: "transparent" }}
        footer={null}
      >
        <Repository />
      </Drawer>
      <div className={s.box}>
        <div
          className={classNames({
            [s.viewbg]: !isEditing,
          })}
          style={{ transition: "all 0.5s" }}
        />
        {!stateTag ? (
          <div
            className={s.iframebox}
            style={
              iframeWidth ? { width: iframeWidth, height: iframeHeight } : {}
            }
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
                minHeight: iframeHeight,
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Responsive;
