import { DashboardOutlined, ProjectOutlined } from "@ant-design/icons";
import React from "react";

export interface MenuDataItem {
    authority?: string[] | string;
    children?: MenuDataItem[];
    hideChildrenInMenu?: boolean;
    hideInMenu?: boolean;
    icon?: string | JSX.Element;
    locale?: string;
    name?: string;
    path?: string;
    [key: string]: any;
}

const menu: MenuDataItem[] = [
    {
        path: '/',
        name: '首页',
        icon: <DashboardOutlined />,
    },
    {
        path: '/project',
        name: '创建项目',
        icon: <ProjectOutlined />
    }
];

export default menu;
