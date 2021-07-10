import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GroupOutlined,
} from '@ant-design/icons';
import {
  useLocation,
  Link
} from "react-router-dom";
import s from './Layout.module.less';
import menus from './../minu';
const { Header, Sider, Content } = Layout;


interface Props {}
const MainLayout: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(true);
  let location = useLocation();

  return (
    <Layout>
      <Sider theme="light" className={s.side} trigger={null} collapsible collapsed={collapsed}>
        <div className={s.logo} ><GroupOutlined /> {collapsed ? '' : 'YUG'}</div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
          {menus.map(item => <Menu.Item key={item.path} icon={item.icon}>
            {item.name}
            <Link to={item.path || '/'} />
          </Menu.Item>)}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className={s.layout} style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className={s.content}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

