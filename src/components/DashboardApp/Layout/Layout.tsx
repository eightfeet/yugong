import React, { useState } from "react";
import { Avatar, Button, Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GroupOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useLocation, Link, useHistory } from "react-router-dom";
import s from "./Layout.module.less";
import menus from "./../minu";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
const { Header, Sider, Content } = Layout;

interface Props {}
const MainLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  let location = useLocation();
  const history = useHistory();
  const { auth } = useSelector((state: RootState) => state.controller);
  return (
    <Layout>
      <Sider
        theme="light"
        className={s.side}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className={s.logo}>
          <GroupOutlined /> {collapsed ? "" : "YUG"}
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
        >
          {menus.map((item) => (
            <Menu.Item key={item.path} icon={item.icon}>
              {item.name}
              <Link to={item.path || "/"} />
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className={s.layout} style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: s.trigger,
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className={s.auto} />
          <div className={s.auth}>
            {auth?.isLogin ? (
              <div>
                <Avatar size="small" icon={<UserOutlined />} />&nbsp;&nbsp;
                {auth.session?.username}
                <Button type="link">退出</Button>
              </div>
            ) : (
              <>
              {location.pathname !== '/login' ? <Button type="link" onClick={() => history.push('/login')}>登录</Button> : null}
              {location.pathname !== '/register' ? <Button type="link" onClick={() => history.push('/register')}>注册</Button> : null}
              </>
            )}
          </div>
        </Header>
        <Content className={s.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
