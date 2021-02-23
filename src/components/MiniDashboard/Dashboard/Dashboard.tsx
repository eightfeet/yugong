import React, { useCallback, useState } from "react";
import ConfigurationController from "~/components/MiniDashboard/ConfigurationController";
import s from "./Dashboard.module.less";
import { Menu, Button, Select } from "antd";
import {
  FormatPainterOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import StyleController from "../StyleController";

interface Props {}

const Dashboard: React.FC<Props> = () => {
  // appdata
  const appData = useSelector((state: RootState) => state.appData);

  // 模板ID
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );

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

  // 
  const onChangeSelect = useCallback(
    (e) => {
      console.log(33333, e)
    },
    [],
  )

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
            <Select onChange={onChangeSelect} className={s.select} value={moduleId}>
              {appData.map((item) => (
                <Select.Option value={item.moduleId}>
                  {item.type}
                  {"（未标题）（未标题）（未标题）"}
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
