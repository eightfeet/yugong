import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import s from "./StyleController.module.less";
import { RootState } from "~/redux/store";
import StyleSheetPanel from "../StyleSheetPanel";
import TreeSelect from "antd/lib/tree-select";
import { Col, Row } from "antd";
import { AnyObjectType } from "~/types/appData";
import { findPath } from './helper';

interface Props {}

const StyleController: React.FC<Props> = () => {
  // 模板ID
  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );

  const moduleId = activationItem.moduleId;
  const moduleType: { [keys: string]: string }[] = useMemo(() => {
    if (activationItem.moduleId) {
      return (
        require(`~/modules/${activationItem.type}`)?.default?.exposeDefaultProps
          ?.styleDescription || []
      );
    }
    return [];
  }, [activationItem.moduleId, activationItem.type]);

  // 当前编辑路径
  const [stylePath, setStylePath] = useState("");

  const [path, setPath] = useState<AnyObjectType[]>([{title: '基础'}])

  // 设置当前编辑路径
  const onSelectStylePath = useCallback((value) => {
    console.log('pathData', moduleType);
    const pathData = findPath(value, moduleType).reverse();
    console.log('pathData', pathData);
    setPath(pathData);
    setStylePath(value);
  }, [moduleType]);

  // 更换模板时初始化选择
  useEffect(() => {
    setStylePath("basic");
  }, [moduleId]);

  const height = useMemo(() => window.innerHeight - 200, []);
  return (
    <div className={s.dashboardstylewrap}>
      <div className={s.wrap}>
        <div className={s.top}>
          <Row className={s.row}>
            <Col span={4}>当前编辑元素</Col>
            <Col span={20}>
              <div className={s.bar}>
                <div className={s.path}>
                  {path?.map((item, index) => <span key={index}>{item.title}</span>)}
                </div>
                <TreeSelect
                  style={{ width: "100%", height: "100%"}}
                  className={s.select}
                  value={stylePath}
                  dropdownStyle={{ maxHeight: `${height}px`, overflow: "auto" }}
                  listHeight={height}
                  treeData={(moduleType || [])}
                  placeholder="请选择"
                  treeDefaultExpandAll
                  onChange={onSelectStylePath}
                />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <StyleSheetPanel path={stylePath} />
    </div>
  );
};

export default StyleController;
