import Menu from "antd/lib/menu";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import s from "./StyleController.module.less";
import { RootState } from "~/redux/store";
import StyleSheetPanel from "../StyleSheetPanel";
const { Item } = Menu;

interface Props {

}

const StyleController: React.FC<Props> = () => {
  // 菜单数据源
  const style =
    useSelector((state: RootState) => state.activationItem.style) || {};

  // 模板ID
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId
  );

  // 当前编辑路径
  const [stylePath, setStylePath] = useState("");

  // 设置当前编辑路径
  const onSelectStylePath = useCallback((e) => {
    setStylePath(e.key);
  }, []);

  // 更换模板时初始化选择
  useEffect(() => {
    setStylePath("basic");
  }, [moduleId]);

  return (
    <div className={s.dashboardstylewrap}>
      <div className={s.menu}>
        <Menu
          selectedKeys={[stylePath]}
          mode="inline"
          onSelect={onSelectStylePath}
        >
          {Object.keys(style).map((key: string) => (
            <Item key={key}>{key}</Item>
          ))}
        </Menu>
      </div>
      <div className={s.dashboard}>
        <StyleSheetPanel path={stylePath} />
      </div>
    </div>
  );
};

export default StyleController;
