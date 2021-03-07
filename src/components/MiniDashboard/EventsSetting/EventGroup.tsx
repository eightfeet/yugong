import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import s from "./EventGroup.module.less";
import {
  MinusOutlined,
  PlusOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import EventItem from "./EventItem";
import { ArgumentsItem, EventsTypeItem } from "~/types/appData";
import { ExposeEvents, ExposeFunctions } from "~/types/modules";
import ArgumentsSetting from "../ArgumentsSetting";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

interface Props {
  curentEventInfomation: ExposeEvents;
  curentEvent: EventsTypeItem[];
  onChange: (
    curentEventInfomation: ExposeEvents,
    data: EventsTypeItem[]
  ) => void;
}

interface EventDataList {
  moduleValue: string;
  dispatchedFunctions: string;
  arguments?: ArgumentsItem[];
}

interface ArgParames {
  /**
   * appdata数据参数
   */
  argumentList: ArgumentsItem[];
  /**
   * appdata数据参数索引
   */
  index: number;
  /**
   * 引用方法名
   */
  functionName: string;
  /**
   * 方法默认参数
   */
  functionArgumentList: ArgumentsItem[];
}

const EventGroup: React.FC<Props> = ({
  curentEventInfomation,
  curentEvent,
  onChange,
}) => {
  const [currentModuleEvents, setCurrentModuleEvents] = useState<
    EventDataList[]
  >([]);
  const [argumentsVisible, setArgumentsVisible] = useState(false);
  const [currentArgument, setCurrentArgument] = useState<ArgParames>();

  const appData = useSelector((state: RootState) => state.appData);

  // 收集当前已选择模块的事件数据
  useEffect(() => {
    const eventDataList = curentEvent.map((event) => {
      const selectData = event.name.split("/");
      const result = {
        moduleValue: selectData[0],
        dispatchedFunctions: selectData[1],
        arguments: event.arguments || [],
      };
      return result;
    });
    setCurrentModuleEvents(eventDataList);
  }, [curentEvent]);

  // state to appdata
  const stateToAppdata = useCallback(
    (data: EventDataList[]) => {
      const result = data.map((item) => {
        const data = {
          name: `${item.moduleValue}/${item.dispatchedFunctions}`,
          arguments: item.arguments || [],
        };
        return data;
      });
      onChange(curentEventInfomation, result);
    },
    [curentEventInfomation, onChange]
  );

  const onPlus = useCallback(() => {
    const newItem: any = {
      moduleValue: "",
      dispatchedFunctions: "",
    };
    currentModuleEvents.push(newItem);
    setCurrentModuleEvents([...currentModuleEvents]);
    stateToAppdata(currentModuleEvents);
  }, [currentModuleEvents, stateToAppdata]);

  // 整租数据的更新
  const onMinus = useCallback(
    (index: number) => () => {
      const data = currentModuleEvents.filter((el, i) => i !== index);
      setCurrentModuleEvents([...data]);
      stateToAppdata(data);
    },
    [currentModuleEvents, stateToAppdata]
  );

  // 单项数据的更新
  const onChangeItem = useCallback(
    (index: number) => (data: string[]) => {
      const operateData = [...curentEvent];
      operateData[index] = { name: `${data[0]}/${data[1]}`, arguments: [] };
      onChange(curentEventInfomation, operateData);
    },
    [curentEvent, curentEventInfomation, onChange]
  );

  // onArgumentsSettingOk 回收参数数据，关闭窗口
  const onArgumentsSettingOk = useCallback(
    (argumentList) => {
      const operateData = [...curentEvent];
      const index = currentArgument?.index;
      if (index !== undefined) {
        operateData[index].arguments = argumentList;
        onChange(curentEventInfomation, operateData);
        setArgumentsVisible(false);
      }
    },
    [curentEvent, curentEventInfomation, currentArgument?.index, onChange]
  );

  const getFunArguments = useCallback(
    (moduleId: string): ExposeFunctions[] => {
      if (moduleId === 'globalEffect') {
        return require(`~/core/globalEvents`).globalExposeFunctions;
      }
      for (let index = 0; index < appData.length; index++) {
        const element = appData[index];
        if (moduleId === element.moduleId) {
          return require(`~/modules/${element.type}`).default.exposeFunctions;
        }
      }
      return [];
    },
    [appData]
  );

  /**
   * 创建设置面板参数，
   */
  const onSetArg = useCallback(
    (parames: ArgParames) => () => {
      const { argumentList, index, functionName, functionArgumentList } = parames;
      
      setCurrentArgument({
        argumentList,
        index,
        functionName,
        functionArgumentList,
      });
      setArgumentsVisible(true);
    },
    []
  );

  return (
    <>
      <div className={s.divide}>
        <div className={s.title}>{curentEventInfomation.description}</div>
        <div className={s.menu}>
          <Button size="small" icon={<PlusOutlined onClick={onPlus} />} />
        </div>
      </div>
      {currentModuleEvents.map((event, index) => {
        const moduleExportFunctionArguments = getFunArguments(
          event.moduleValue
        ) || [];
        const currentExportFunctionArguments =
          moduleExportFunctionArguments.filter(
            (item) => item.name === event.dispatchedFunctions
          )[0]?.arguments || [];

        let canNotSetArguments = false;
        // 没有选择方法时不可以编辑
        if (!event.dispatchedFunctions) {
          canNotSetArguments = true;
        }
        // 无需配置参数是不可编辑
        if (currentExportFunctionArguments.length <= 0) {
          canNotSetArguments = true;
        }

        return (
          <Row
            className={s.row}
            gutter={4}
            key={`${index}${event.moduleValue}${event.dispatchedFunctions}`}
          >
            <EventItem
              moduleValue={event.moduleValue}
              dispatchedFunctions={event.dispatchedFunctions}
              argumentList={event.arguments || []}
              onChange={onChangeItem(index)}
            />
            <Col span={4} className={s.minuswrap}>
              {/** 未选择方法时不可以编辑参数 */}
              <Button
                icon={<SettingOutlined />}
                onClick={onSetArg({
                  argumentList: event.arguments || [],
                  index,
                  functionName: event.dispatchedFunctions,
                  functionArgumentList: currentExportFunctionArguments
                })}
                disabled={canNotSetArguments}
              >
                参数
              </Button>
            </Col>
            <Col span={2} className={s.minuswrap}>
              <Button
                size="small"
                icon={<MinusOutlined onClick={onMinus(index)} />}
              />
            </Col>
          </Row>
        );
      })}
      <ArgumentsSetting
        flexible
        title="参数设置"
        visible={argumentsVisible}
        onOk={onArgumentsSettingOk}
        argumentsData={currentArgument?.argumentList || []}
        initArgumentData={currentArgument?.functionArgumentList || []}
        onCancel={() => setArgumentsVisible(false)}
      />
    </>
  );
};

export default EventGroup;
