import React, { useCallback, useEffect, useState } from "react";
import StyleController from "~/components/MiniDashboard/StyleController";
import ConfigurationController from '~/components/MiniDashboard/ConfigurationController';
import s from "./Dashboard.module.less";
import { Menu, Button } from "antd";
import {
  FormatPainterOutlined,
  SettingOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
const { Item } = Menu;

interface Props {}

const Dashboard: React.FC<Props> = () => {
  // 菜单数据源
  const style =
    useSelector((state: RootState) => state.activationItem.style) || {};
  // 菜单类型
  const type = useSelector((state: RootState) => state.activationItem.type);

  // 模板ID
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );

  // 当前编辑路径
  const [stylePath, setStylePath] = useState("");

  // 面板收起与展开开关
  const [collapsed, setCollapsed] = useState(true);
  const toggleCollapsed = useCallback(() => {
    if (!moduleId) {
      return;
    }
    setCollapsed(!collapsed);
  }, [collapsed, moduleId]);

  // 设置当前编辑路径
  const onSelectStylePath = useCallback((e) => {
    setStylePath(e.key);
  }, []);

  // 更换模板时初始化选择
  useEffect(() => {
    setStylePath("basic");
  }, [moduleId]);

  // 样式与设置菜单面板
  const [mainTag, setMainTag] = useState("style");
  const onSelectMainTag = useCallback((e) => {
    setMainTag(e.key);
  }, []);

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
          <Menu
            onClick={() => setMainTag("style")}
            onSelect={onSelectMainTag}
            selectedKeys={[mainTag]}
            mode="horizontal"
            className={s.contentmenu}
          >
            <Menu.Item
              key={`title-${type}`}
              className={s.discfirstitem}
              disabled
            >
              {type}
              {"（未标题）"}
            </Menu.Item>
            <Menu.Item key="style" icon={<FormatPainterOutlined />}>
              样式
            </Menu.Item>
            <Menu.Item key="config" icon={<ToolOutlined />}>
              设置
            </Menu.Item>
          </Menu>
        </div>
        {/* style dashboard */}
        {mainTag === "style" ? (
          <div className={s.dashboardstylewrap}>
            <div className={s.menu}>
              <Menu
                className={s.tab}
                selectedKeys={[stylePath]}
                mode="inline"
                inlineCollapsed={collapsed}
                onSelect={onSelectStylePath}
              >
                {Object.keys(style).map((key: string, index: number) => (
                  <Item key={key}>{key}</Item>
                ))}
              </Menu>
            </div>
            <div className={s.dashboard}>
              <StyleController path={stylePath} />
            </div>
          </div>
        ) : null}
        {
          mainTag === "config" ? <ConfigurationController /> : null
        }
      </div>
    </div>
  );
};

export default Dashboard;
