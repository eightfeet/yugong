import React, { useCallback, useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import s from "./EventGroup.module.less";
import Icon, {
  PlusOutlined,
} from "@ant-design/icons";
import { ArgumentsItem } from "~/types/appData";
import { EventsTypeItem, ExposeEvents } from "~/types/modules";
import EventListHoc from './EventListHoc';
import Play from "./play";
import arrayMove from "array-move";

interface Props {
  /**
   * 当前事件组信息
   */
  curentEventInfomation: ExposeEvents;
  /**事件组数据 */
  value: EventsTypeItem[];
  /**事件组变更 */
  onChange: (
    curentEventInfomation: ExposeEvents,
    data: EventsTypeItem[]
  ) => void;
  /**播放事件组 */
  onPlay: (curentEventInfomation: ExposeEvents, data: EventsTypeItem[]) => void;
}

export interface EventDataList {
  /**
   * 模块名
   */
  moduleUuid: string;
  /**
   * 模块发布的方法
   */
  dispatchedFunctions: string;
  /**
   * 模块发布的方法对应的参数
   */
  arguments?: ArgumentsItem[];
}

const EventGroup: React.FC<Props> = ({
  curentEventInfomation,
  value,
  onChange,
  onPlay,
}) => {

  // 当前模块发布的事件状态清单
  const [currentModuleEvents, setCurrentModuleEvents] = useState<
    EventDataList[]
  >([]);

  /**
   * 将当前被选组件传入Props事件执行清单转换为状态数据
   * 用于组件内部维护
   */
  useEffect(() => {
    const eventDataList = value.map((event) => {
      const selectData = event.name.split("/");
      const result = {
        moduleUuid: selectData[0],
        dispatchedFunctions: selectData[1],
        arguments: event.arguments || [],
      };
      return result;
    });
    setCurrentModuleEvents(eventDataList);
  }, [value]);

  /**
   * 组间内事件数据转换为appData
   */
  const stateToAppdata = useCallback(
    (data: EventDataList[]) => {
      const result = data.map((item) => {
        const data = {
          name: `${item.moduleUuid}/${item.dispatchedFunctions}`,
          arguments: item.arguments || [],
        };
        return data;
      });
      onChange(curentEventInfomation, result);
    },
    [curentEventInfomation, onChange]
  );

  /**
   * 数据变更
   */
  const handleOnChange = useCallback(
    (currentModuleEvents: EventDataList[]) => {
        // 更新事件状态清单
      setCurrentModuleEvents(currentModuleEvents);
      // onchange AppData数据
      stateToAppdata(currentModuleEvents);
    },
    [stateToAppdata],
  )

  /**
   * 新增事件执行
   */
  const onPlus = useCallback(() => {
    const newItem: any = {
      moduleUuid: "",
      dispatchedFunctions: "",
    };
    currentModuleEvents.push(newItem);
    handleOnChange(currentModuleEvents);
  }, [currentModuleEvents, handleOnChange]);

  /**
   * 删除事件执行
   */
  const onMinus = useCallback(
    (index: number) => {
      // 获取当前编辑的事件
      const data = currentModuleEvents.filter((el, i) => i !== index);
      handleOnChange(data);
    },
    [currentModuleEvents, handleOnChange]
  );

  const onPlayEnv = useCallback(() => {
    onPlay(curentEventInfomation, value);
  }, [curentEventInfomation, onPlay, value]);

  // 拖拽重新排序重置更新事件组数据
  const onSortEnd = useCallback(
    ({oldIndex, newIndex}) => {
      const items = [...currentModuleEvents]
       const result = arrayMove(items, oldIndex, newIndex);
       handleOnChange(result);
    },
    [currentModuleEvents, handleOnChange],
  )

  return (
    <>
      <div className={s.divide}>
        <div className={s.title}>{curentEventInfomation.description}</div>
        <div className={s.menu}>
          {!!value.length ? (
            <Tooltip mouseEnterDelay={1} title={`${curentEventInfomation.description}事件模拟`}>
              <Button
                size="small"
                icon={<Icon component={Play} />}
                onClick={onPlayEnv}
              />
            </Tooltip>
          ) : null}
          &nbsp;&nbsp;
          <Button size="small" onClick={onPlus} icon={<PlusOutlined />} />
        </div>
      </div>
      <EventListHoc onMinus={onMinus} onChange={handleOnChange} onSortEnd={onSortEnd} moduleEvents={currentModuleEvents} useDragHandle />
    </>
  );
};

export default EventGroup;
