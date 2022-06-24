import React, { useCallback, useEffect, useState } from "react";
import { Button, Col, Row, Select } from "antd";
import s from "./EventItem.module.less";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import Output from "~/components/Output";
import { ArgumentsItem } from "~/types/appData";
import { ExposeFunctions } from "~/types/modules";
import { SortableElement, SortableHandle } from "react-sortable-hoc";
import MoveIcon from "./MoveIcon";
import { MinusOutlined, SettingOutlined } from "@ant-design/icons";
import classNames from "classnames";

const DragHandle = SortableHandle(() => (
  <span className={s.icon}>
    <MoveIcon />
  </span>
));

/**
 * 事件描述
 */
export interface EventEmitterExpose {
  name: string;
  description: string;
}

export interface ModuleListItem {
  type: string;
  name: string;
  uuid: string;
}

interface Props {
  /**
   *
   */
  moduleUuid: string;
  dispatchedFunctions: string;
  onChange: (data: string[]) => void;
  onMinus: () => void;
  argumentList: ArgumentsItem[];
  canNotSetArguments: boolean;
  onSetArg: () => void;
}

const EventItem: React.FC<Props> = ({
  moduleUuid,
  dispatchedFunctions,
  argumentList,
  onChange,
  onMinus,
  onSetArg,
  canNotSetArguments
}) => {
  const [selectItem, setSelectItem] = useState<any[]>([]);
  /**
   * 设置当前被选项
   */
  useEffect(() => {
    setSelectItem([moduleUuid, dispatchedFunctions]);
  }, [moduleUuid, dispatchedFunctions]);

  const appData = useSelector((state: RootState) => state.appData);

  /**
   * 运行时可选模块清单
   */
  const [moduleList, setModuleList] = useState<ModuleListItem[]>([]);

  /**
   * 初始化运行时模块清单，
   * 仅包含有方法导出的模块
   */
  useEffect(() => {
    // 处理全局方法
    const data: ModuleListItem[] = [
      {
        name: "全局",
        uuid: "global",
        type: "global",
      },
    ];
    for (let index = 0; index < appData.length; index++) {
      const item = appData[index];
      // 检查可选模块是否有方法导出
      const exposeFunctions: EventEmitterExpose[] =
        require(`~/modules/${item.type}`).default.exposeFunctions;
      if (exposeFunctions && exposeFunctions.length > 0) {
        data.push({
          name: item.moduleName || `'未标题'-${item.moduleId}`,
          uuid: item.moduleId,
          type: item.type,
        });
      }
    }
    setModuleList(data);
  }, [appData]);

  /**
   * 运行时可选方法清单
   */
  const [functionList, setFunctionList] = useState<ExposeFunctions[]>([]);

  /**
   * 通过所有运行时模块id
   * 找出包含有方法导出的模块
   * 保存到可选模块清单
   */
  const getFunctionOptionsList = useCallback(
    // 根据被选模块获取模块方法清单
    (moduleUuid: string) => {
      // 获取模块type
      const result: ModuleListItem | undefined = moduleList.find(
        (item) => item.uuid === moduleUuid
      );
      if (!result) return;
      let exposeFunctions: EventEmitterExpose[] = [];
      if (result.type !== "global") {
        exposeFunctions = require(`~/modules/${result.type}`).default
          .exposeFunctions;
      } else {
        exposeFunctions = Output.exposeFunctions || [];
      }
      setFunctionList(exposeFunctions);
    },
    [moduleList]
  );

  // 模块id变更时根据模块id获取当前模块的方法清单
  useEffect(() => {
    getFunctionOptionsList(moduleUuid);
  }, [getFunctionOptionsList, moduleUuid]);

  /**
   * 模块被修改时，模块对应的方法要做同步修改
   */
  const onChangemoduleUuid = useCallback(
    (data: string) => {
      // 修改被选数据
      const operateData = [...selectItem];
      operateData[0] = data;
      operateData[1] = "";
      setSelectItem(operateData);
      // 获取被选模块的方法清单
      getFunctionOptionsList(data);
      // 数据变更
      if (onChange instanceof Function) {
        onChange(operateData);
      }
    },
    [selectItem, getFunctionOptionsList, onChange]
  );

  /**
   * 修改方法
   */
  const onChangeDispatchedFunctions = useCallback(
    (data: string) => {
      const operateData = [...selectItem];
      operateData[1] = data;
      setSelectItem(operateData);
      if (onChange instanceof Function) {
        onChange(operateData);
      }
    },
    [selectItem, onChange]
  );

  return (
    <Row className={classNames(s.row, 'eventitem')} gutter={4}>
      <Col span={1}>
        <DragHandle />
      </Col>
      <Col span={9}>
        <Select
          value={selectItem[0] || null}
          className={s.selecter}
          onChange={onChangemoduleUuid}
          placeholder="请选择要操作的模块"
          showSearch
          filterOption={
            (input, option) => {
              const str = option?.children?.join("").toLowerCase();
              if (str?.indexOf(input) !== -1) {
                return true;
              }
              return false;
            }
          }
        >
          {moduleList.map((item) => (
            <Select.Option
              key={item.uuid}
              value={item.uuid}
            >
              {item.name}-{item.type}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={8}>
        <Select
          value={selectItem[1] || null}
          className={s.selecter}
          placeholder="请选择方法"
          onChange={onChangeDispatchedFunctions}
        >
          {functionList.map((item) => (
            <Select.Option key={item.name} value={item.name}>
              {item.description}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col span={4} className={s.minuswrap}>
        {/** 未选择方法时不可以编辑参数 */}
        <Button
          icon={<SettingOutlined />}
          onClick={onSetArg}
          disabled={canNotSetArguments}
        >
          参数
        </Button>
      </Col>
      <Col span={2} className={s.minuswrap}>
        <Button
          size="small"
          icon={<MinusOutlined onClick={onMinus} />}
        />
      </Col>
    </Row>
  );
};

export default SortableElement(EventItem);
