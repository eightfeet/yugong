import Menu from "antd/lib/menu";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import s from "./StyleController.module.less";
import { RootState } from "~/redux/store";
import StyleSheetPanel from "../StyleSheetPanel";
import Tooltip from "antd/lib/tooltip";
const { Item } = Menu;

interface Props {}

const StyleController: React.FC<Props> = () => {
  // 菜单数据源
  const style =
    useSelector((state: RootState) => state.activationItem.style) || {};

  // 模板ID
  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );

  const moduleId = activationItem.moduleId;
  const moduleType: { [keys: string]: string } = useMemo(() => {
    if (activationItem.moduleId) {
      return (
        require(`~/modules/${activationItem.type}`)?.default?.exposeDefaultProps
          ?.styleDescription || {}
      );
    }
    return {};
  }, [activationItem.moduleId, activationItem.type]);
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
            <Item className={s.menuitem} key={key}>
              <Tooltip title={moduleType[key] || key}>
                {moduleType[key] || key}
              </Tooltip>
            </Item>
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
