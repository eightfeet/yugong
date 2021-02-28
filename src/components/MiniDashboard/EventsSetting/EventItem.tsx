import React, { useCallback, useEffect, useState } from "react";
import { Col, Select } from "antd";
import s from "./EventItem.module.less";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

/**
 * 事件描述
 */
interface EventEmitterExpose {
  name: string;
  description: string;
}

interface FunctionListItem {
  name: string;
  value: string;
}

interface ModuleListItem extends FunctionListItem {
  type: string;
}

interface Props {
  moduleValue: string;
  functionValue: string;
  onChange: (data: {
    type: "moduleValue" | "functionValue";
    value: any
  }) => void;
}

const EventItem: React.FC<Props> = ({ moduleValue, functionValue }) => {
  const appData = useSelector((state: RootState) => state.appData);
  // 模块options清单
  const [moduleList, setModuleList] = useState<ModuleListItem[]>([]);
  // 方法清单
  const [functionList, setFunctionList] = useState<EventEmitterExpose[]>([]);
  // 收集方法清单
  const getFunctionOptionsList = useCallback(
    // 根据被选模块获取模块方法清单
    (moduleValue: string) => {
      console.log("moduleValue", moduleValue);
      // 获取模块type
      const result: ModuleListItem | undefined = moduleList.find(
        (item) => item.value === moduleValue
      );

      if (result && result.value !== "globalModule") {
        const exposeFunctions: EventEmitterExpose[] = require(`~/modules/${result.type}`)
          .default.exposeFunctions;
          setFunctionList(exposeFunctions)
        console.log("result.value, exposeFunctions", exposeFunctions);
      }
    },
    [moduleList]
  );
  useEffect(() => {
    const data: ModuleListItem[] = [];
    for (let index = 0; index < appData.length; index++) {
      const item = appData[index];
      // 检查可选模块是否有方法导出
      const exposeFunctions: EventEmitterExpose[] = require(`~/modules/${item.type}`)
        .default.exposeFunctions;
      if (exposeFunctions && exposeFunctions.length > 0) {
        data.push({
          name: item.moduleName || `'未标题'-${item.moduleId}`,
          value: item.moduleId,
          type: item.type,
        });
      }
    }
    data.push({
      name: "全局",
      value: "globalModule",
      type: "global",
    });
    setModuleList(data);
  }, [appData]);

  useEffect(() => {
    getFunctionOptionsList(moduleValue)
  }, [getFunctionOptionsList, moduleValue]);

  const onDataChange = useCallback((type) => (data: any) => {
    console.log(type, data);
  }, []);


  return (
    <>
      <Col span={11}>
        <Select
          value={moduleValue}
          className={s.selecter}
          onChange={onDataChange('moduleValue')}
          placeholder="请选择要操作的模块"
        >
          {moduleList.map((item) => (
            <Select.Option key={item.value} value={item.value}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={11}>
        <Select
          value={functionValue}
          className={s.selecter}
          placeholder="请选择方法"
          onChange={onDataChange('functionValue')}
        >
          {functionList.map((item) => (
            <Select.Option value={item.name}>{item.description}</Select.Option>
          ))}
        </Select>
      </Col>
    </>
  );
};

export default EventItem;
