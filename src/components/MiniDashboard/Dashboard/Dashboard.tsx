import React, { useCallback, useEffect, useState } from "react";
import Controller from "./../Controller";
import s from "./Dashboard.module.scss";
import { Menu, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
const { Item } = Menu;

interface Props {}

const Dashboard: React.FC<Props> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const style = useSelector((state: RootState) => state.activationItem.style);
  const moduleId = useSelector((state: RootState) => state.activationItem.moduleId);

  const [stylePath, setStylePath] = useState('');
  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
  }, [collapsed]);
  const onSelectStylePath = useCallback(
    (e) => {
      setStylePath(e.key)
    },
    [],
  )
  // 更换模板时初始化选择
  useEffect(() => {
    setStylePath('')
  }, [moduleId])

  return (
    <div className={s.root} style={collapsed ? {width: '80px', maxHeight: '40px'} : {width: '550px', maxHeight: '440px'}}>
      <div className={s.menu}>
        <Button
          className={s.menuicon}
          type="primary"
          onClick={toggleCollapsed}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined
          )}
        </Button>
        <Menu
          className={s.tab}
          selectedKeys={[stylePath]}
          mode="inline"
          inlineCollapsed={collapsed}
          onSelect={onSelectStylePath}
        >
          {Object.keys(style).map((key: string) => <Item key={key}>{key}</Item>)}
        </Menu>
      </div>
      <div className={s.dashboard}  >
        <Controller path={stylePath} />
      </div>
    </div>
  );
};

export default Dashboard;
