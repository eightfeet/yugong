import { Col, Input, PageHeader, Row, Tooltip } from "antd";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { ExposeFunctions, Modules } from "~/types/modules";
import ArrayArguments from "../ArgumentsSetting/ArrayArguments";
import BooleanArguments from "../ArgumentsSetting/BooleanArguments";
import HtmlSuffix from "../ArgumentsSetting/HtmlSuffix";
import MixedArguments from "../ArgumentsSetting/MixedArguments";
import ObjectArguments from "../ArgumentsSetting/ObjectArguments";
import s from "./Presetting.module.less";

interface Props {}
/**
 * 所有预设事件将在挂载时运行，
 * 其根本还是EventEmitter对事件流控制，
 * 作为预设模块只操作组件自己的内置方法
 * */

const Presetting: React.FC<Props> = ({}) => {
  // 获取当前激活组件信息
  const { events, type, moduleId } = useSelector(
    (state: RootState) => state.activationItem
  );


  const module:Modules<any> = useMemo(() => !!type ? require(`~/modules/${type}`).default : {}, [type])

  if (!moduleId) {
      return null;
  }

  // 获取当前运行时模块已配置的内置方法
  const setFunctions = events?.mount || [];

  // 获取当前模块类导出的内置方法，
  const exposeFunctions: ExposeFunctions[] = module.exposeFunctions || [];


  
  return (
    <div>
      {exposeFunctions.map((item, index) => !!item.arguments?.length ? (
        <div key={index} className={s.item}>
            <PageHeader title={item.description} />
          {item.arguments?.map((argItem, argIndex) => (
            <Row className={s.row} key={argIndex} gutter={10}>
              <Col span={5} className={s.label}>
              <Tooltip
                    placement="topRight"
                    title={argItem.describe}
                >
                {argItem.name}
                </Tooltip>
              </Col>
              <Col span={19}>
                {argItem.type === "number" ||
                argItem.type === "string" ||
                argItem.type === "runningTime" ? (
                  <Input
                    onChange={() => console.log()}
                    placeholder={`请输入值,${argItem.describe || ""}`}
                    value={argItem.data}
                    type="text"
                    suffix={!!argItem.html ? <HtmlSuffix /> : null}
                  />
                ) : null}
                {argItem.type === "array" ? (
                  <ArrayArguments
                    typeArguments={argItem}
                    flexible
                    htmlInput={!!argItem.html}
                    onChange={() => console.log()}
                  />
                ) : null}
                {argItem.type === "boolean" ? (
                  <BooleanArguments
                    typeArguments={argItem}
                    flexible={false}
                    onChange={() => console.log()}
                  />
                ) : null}
                {argItem.type === "object" ? (
                  <ObjectArguments
                    describe={argItem.describe}
                    htmlInput={!!argItem.html}
                    onChange={() =>console.log()}
                    typeArguments={argItem}
                    flexible={false}
                  />
                ) : null}
                {argItem.type === "mixed" ? (
                  <MixedArguments 
                    onChange={() => console.log()}
                    typeArguments={argItem}
                    flexible={false}
                  />
                ) : null}
              </Col>
            </Row>
          ))}
        </div>
      ) : null)}
    </div>
  );
};

export default Presetting;
