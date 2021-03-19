import React, { useCallback } from "react";
import s from "./EventsSetting.module.less";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import EventGroup from "./EventGroup";
import useMergeAppData from "~/hooks/useMergeAppData";
import { EventsTypeItem, ExposeEvents } from "~/types/modules";

/**
 * 确定当前激活组件是否向全局发布事件
 * 如果没有则不渲染事件面板
 *
 */
interface Props {}

const EventsSetting: React.FC<Props> = () => {
  const { events, type, moduleId } = useSelector(
    (state: RootState) => state.activationItem
  );
  
  /** 更新结果 */
  const update = useMergeAppData();
  const onChangeEventGroup = useCallback(
    (type: ExposeEvents, data: EventsTypeItem[]) => {
      const path = `events.${type.name}`;
      update(data, path);
    },
    [update]
  );

  /** 获取当前实例元素的事件清单 */
  const getCurentEventByEventName = useCallback(
    (eventName: string) => {
      if (events && Object.prototype.toString.call(events) === '[object Object]') {
        return events[eventName] || []
      }
      return []
    },
    [events],
  )

  if (!moduleId) return null;
  // 当前激活项模块是否向全局发布事件，
  const exposeEvents: ExposeEvents[] = require(`~/modules/${type}`).default
    .exposeEvents;
  // 检查当前激活项模块无事件发布不做渲染，有则渲染事件编辑设置面板
  if (exposeEvents.length === 0) return null;

  return <div className={s.root}>
    {
      exposeEvents.map(element => (<EventGroup
        key={element.name}
        curentEvent={getCurentEventByEventName(element.name)}
        curentEventInfomation={element}
        onChange={onChangeEventGroup}
      />))
    }
  </div>;
};

export default EventsSetting;
