import React, { useCallback, useState } from "react";
import { Layout as AntLayout, Menu } from 'antd';
import {
  PieChartOutlined,
} from '@ant-design/icons';


const Layout: React.FC = ({ children }) => {
  const { Footer, Sider, Content } = AntLayout;
  
  const [collapsed, setCollapsed] = useState(true);

  const onCollapse = useCallback(
    () => {
      setCollapsed(!collapsed)
    },
    [collapsed],
  )

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              菜单
            </Menu.Item>
          </Menu>
        </Sider>
        <AntLayout>
          <Content style={{ margin: '0 16px' }}>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </AntLayout>
      </AntLayout>
  );
};

export default Layout;


