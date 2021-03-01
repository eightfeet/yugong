import React, { useCallback, useEffect, useState } from "react";
import { Col, Select } from "antd";
import s from "./EventItem.module.less";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import { globalOption, globalExposeFunctions } from '~/core/globalEvents';

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
  onChange: (data: string[]) => void;
}

const EventItem: React.FC<Props> = ({
  moduleValue,
  functionValue,
  onChange,
}) => {
  const [selectItem, setSelectItem] = useState<any[]>([]);

  useEffect(() => {
    setSelectItem([moduleValue, functionValue]);
  }, [moduleValue, functionValue]);

  const appData = useSelector((state: RootState) => state.appData);
  // 模块options清单
  const [moduleList, setModuleList] = useState<ModuleListItem[]>([]);
  // 方法清单
  const [functionList, setFunctionList] = useState<EventEmitterExpose[]>([]);
  // 收集方法清单
  const getFunctionOptionsList = useCallback(
    // 根据被选模块获取模块方法清单
    (moduleValue: string) => {
      // 获取模块type
      const result: ModuleListItem | undefined = moduleList.find(
        (item) => item.value === moduleValue
      );
      if (!result) return;
      let exposeFunctions: EventEmitterExpose[] = [];
      if (result.type !== 'global') {
        exposeFunctions = require(`~/modules/${result.type}`)
          .default.exposeFunctions;
      } else  {
        exposeFunctions = globalExposeFunctions;
      }
      setFunctionList(exposeFunctions);
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
    // 全局数据
    data.push(globalOption);
    setModuleList(data);
  }, [appData]);

  useEffect(() => {
    getFunctionOptionsList(moduleValue);
  }, [getFunctionOptionsList, moduleValue]);

  /**
   * 事件对应模块被修改时，模块对应的方法要做同步修改
   */  
  const onChangeModuleValue = useCallback((data: string) => {
    const operateData = [...selectItem];
    operateData[0] = data;
    getFunctionOptionsList(data);
    operateData[1] = '';
    setSelectItem(operateData);
    if (onChange instanceof Function) {
      onChange(operateData)
    }
  }, [selectItem, getFunctionOptionsList, onChange]);

  const onChangeFunctionValue = useCallback((data: string) => {
    const operateData = [...selectItem];
    operateData[1] = data;
    setSelectItem(operateData);
    if (onChange instanceof Function) {
      onChange(operateData)
    }
  }, [selectItem, onChange]);

  return (
    <>
      <Col span={11}>
        <Select
          value={selectItem[0] || null}
          className={s.selecter}
          onChange={onChangeModuleValue}
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
          value={selectItem[1] || null}
          className={s.selecter}
          placeholder="请选择方法"
          onChange={onChangeFunctionValue}
        >
          {functionList.map((item) => (
            <Select.Option key={item.name} value={item.name}>{item.description}</Select.Option>
          ))}
        </Select>
      </Col>
    </>
  );
};

export default EventItem;
