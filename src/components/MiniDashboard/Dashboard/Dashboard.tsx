import React, { useCallback, useState } from "react";
import ConfigurationController from "~/components/MiniDashboard/ConfigurationController";
import s from "./Dashboard.module.less";
import { Menu, Button, Select } from "antd";
import {
  FormatPainterOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { RootState, Dispatch } from "~/redux/store";
import StyleController from "../StyleController";
import usePostMessage from "~/hooks/usePostMessage";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  // appdata
  const appData = useSelector((state: RootState) => state.appData);

  // 模板ID
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );

  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );

  const updateActivationItem = useDispatch<Dispatch>().activationItem
    .updateActivationItem;

  // 面板收起与展开开关
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = useCallback(() => {
    if (!moduleId) {
      return;
    }
    setCollapsed(!collapsed);
  }, [collapsed, moduleId]);

  // 样式与设置菜单面板
  const [mainTag, setMainTag] = useState("style");
  const onSelectMainTag = useCallback((e) => {
    setMainTag(e.key);
  }, []);

  const sendMessage = usePostMessage(() => {});
  //
  // 收发处理，子窗口onload时向子窗口发送信息, 通知当前正处于编辑模式下，

  const onChangeSelect = useCallback(
    (e) => {
      if (activationItem.moduleId === e) return;
      for (let index = 0; index < appData.length; index++) {
        const element = appData[index];
        if (element.moduleId === e) {
          const value = { ...element };
          updateActivationItem(value);
          const win = (document.getElementById(
            "wrapiframe"
          ) as HTMLIFrameElement).contentWindow;
          console.log(win);
          if (win) {
            sendMessage({ tag: "id", value: element.moduleId }, win);
          }
          break;
        }
      }
    },
    [activationItem.moduleId, appData, sendMessage, updateActivationItem]
  );

  return (
    <div
      className={s.root}
      style={collapsed ? { width: "0px", border: "0 solid #eee" } : {}}
    >
      <Button
        className={s.menuicon}
        type={collapsed ? "primary" : "dashed"}
        onClick={toggleCollapsed}
      >
        <SettingOutlined />
      </Button>
      <div className={s.dashboardwrap}>
        <div className={s.headtab}>
          <div className={s.moduleselect}>
            <Select
              onChange={onChangeSelect}
              className={s.select}
              value={moduleId}
              showSearch
              placeholder="请选择编辑模块"
              optionFilterProp="children"
              filterOption={
                (input, option) => {
                  const str = option?.children.join('').toLowerCase();
                  if (str.indexOf(input) !== -1) {
                    return true
                  }
                  return false
                }
                // option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {appData.map((item) => (
                <Select.Option value={item.moduleId} key={item.moduleId}>
                  {item.type}
                  （{item.name || '未标题'}-{item.moduleId}）
                </Select.Option>
              ))}
            </Select>
          </div>

          <Menu
            onClick={() => setMainTag("style")}
            onSelect={onSelectMainTag}
            selectedKeys={[mainTag]}
            mode="horizontal"
            className={s.contentmenu}
          >
            <Menu.Item key="style" icon={<FormatPainterOutlined />}>
              样式
            </Menu.Item>
            <Menu.Item key="config" icon={<ToolOutlined />}>
              设置
            </Menu.Item>
          </Menu>
        </div>
        <div
          className={s.controllerwrap}
          style={{ display: mainTag === "style" ? "block" : "none" }}
        >
          <StyleController />
        </div>
        <div
          className={s.controllerwrap}
          style={{ display: mainTag === "config" ? "block" : "none" }}
        >
          <ConfigurationController />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
