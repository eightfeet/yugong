import React, { useCallback } from "react";
import s from "./EventsSetting.module.less";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import EventGroup from "./EventGroup";
import useMergeAppData from "~/hooks/useMergeAppData";
import { ExposeEvents } from "~/types/modules";
import { EventsTypeItem } from "~/types/appData";


interface Props {}

const EventsSetting: React.FC<Props> = () => {

  const { events, type, moduleId } = useSelector(
    (state: RootState) => state.activationItem
  );

  const update = useMergeAppData();

  const onChangeEventGroup = useCallback(
    (
      type: ExposeEvents,
      data: EventsTypeItem[]
    ) => {
      const path = `events.${type.name}`;
      update(data, path);
    },
    [update],
  );

  if (!moduleId) return null;
  
  // 当前激活项模块是否向全局发布事件，
  const exposeEvents: ExposeEvents[] = require(`~/modules/${type}`)
    .default.exposeEvents;
  // 检查当前激活项模块无事件发布不做渲染，有则渲染事件编辑设置面板
  if (exposeEvents.length === 0) return null;
  // 遍历当前激活项保存的事件对象数据
  return (
    <div className={s.root}>
      {Object.keys(events).map((eventName) => {
        // 获取当前事件描述
        const curentEventInfomation =
          exposeEvents.filter((exposeEvent) => exposeEvent.name === eventName)[0] ||
          {};
        return (
          <EventGroup
            key={eventName}
            curentEvent={events[eventName]}
            curentEventInfomation={curentEventInfomation}
            onChange={onChangeEventGroup}
          />
        );
      })}
    </div>
  );
};

export default EventsSetting;
