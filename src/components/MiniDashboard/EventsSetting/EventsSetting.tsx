import React from "react";
import s from "./EventsSetting.module.less";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import EventGroup from "./EventGroup";
import useMergeAppData from "~/hooks/useMergeAppData";

/**
 * 事件描述
 */
interface EventEmitterExpose {
  name: string;
  description: string;
}

interface EventEmitterEventData {
  name: string;
  arguments: any[];
}

interface Props {}

const EventsSetting: React.FC<Props> = () => {
  const { events, type, moduleId } = useSelector(
    (state: RootState) => state.activationItem
  );
  const update = useMergeAppData();

  if (!moduleId) return null;
  const onChange = (
    type: EventEmitterExpose,
    data: EventEmitterEventData[]
  ) => {
    const path = `events.${type.name}`;
    update(data, path);
  };

  // 当前激活项是否有事件导出，
  const exposeEvents: EventEmitterExpose[] = require(`~/modules/${type}`)
    .default.exposeEvents;
  // 无事件导清除当前模块
  if (exposeEvents.length === 0) return null;
  return (
    <div className={s.root}>
      {Object.keys(events).map((eventTypeName) => {
        const eventType =
          exposeEvents.filter((element) => element.name === eventTypeName)[0] ||
          {};
        return (
          <EventGroup
            key={eventTypeName}
            eventData={events[eventTypeName]}
            eventType={eventType}
            onChange={onChange}
          />
        );
      })}
    </div>
  );
};

export default EventsSetting;
