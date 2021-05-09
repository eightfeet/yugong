import Menu from "antd/lib/menu";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import s from "./StyleController.module.less";
import { RootState } from "~/redux/store";
import StyleSheetPanel from "../StyleSheetPanel";
import Tooltip from "antd/lib/tooltip";
import TreeSelect from "antd/lib/tree-select";
import { Col, Row } from "antd";
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
  const onSelectStylePath = useCallback((value) => {
    setStylePath(value);
  }, []);

  // 更换模板时初始化选择
  useEffect(() => {
    setStylePath("basic");
  }, [moduleId]);

  return (
    <div className={s.dashboardstylewrap}>
      <div className={s.wrap}>
        <div className={s.top}>
          <Row className={s.row}>
            <Col span={4}>
              当前编辑元素
            </Col>
            <Col span={20}>
              <TreeSelect
                style={{ width: "100%" }}
                value={stylePath}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                treeData={moduleType as any}
                placeholder="Please select"
                treeDefaultExpandAll
                onChange={onSelectStylePath}
              />
            </Col>
          </Row>
        </div>
      </div>
      <StyleSheetPanel path={stylePath} />
    </div>
  );
};

export default StyleController;
