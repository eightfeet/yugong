import React, { useCallback } from "react";
import s from "./EventsSetting.module.less";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import EventGroup from "./EventGroup";
import useMergeAppData from "~/hooks/useMergeAppData";
import { EventsType, EventsTypeItem, ExposeEvents } from "~/types/modules";
import usePostMessage from "~/hooks/usePostMessage";

/**
 * 确定当前激活组件是否向全局发布事件
 * 如果没有则不渲染事件面板
 *
 */
interface Props {
  exposeEvents?: ExposeEvents[]
}

const EventsSetting: React.FC<Props> = ({ exposeEvents=[] }) => {
  const activationItem = useSelector(
    (state: RootState) => state.activationItem
  );

  const sendMessage = usePostMessage(() => {})
  
  const { events, moduleId } = activationItem;

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
    (
      eventName: string, // 事件名称，mounnt unmount ...
      events: EventsType | undefined
    ) => {
      // 事件清单存在，则返回事件清单的事件值
      if (events && Object.prototype.toString.call(events) === '[object Object]') {
        return events[eventName] || []
      }
      return []
    },
    [],
  )

  const onPlay = useCallback(
    (curentEventInfomation: ExposeEvents, data: EventsTypeItem[]) => {
      const win = (document.getElementById('wrapiframe') as HTMLIFrameElement)
            .contentWindow;
      sendMessage(
        {
            tag: 'playEventEmit',
            value: {
              event: curentEventInfomation,
              args: data
            },
        },
        win
    );
    },
    [sendMessage],
  )

  if (!moduleId) return null;

  // 检查当前激活项模块无事件发布不做渲染，有则渲染事件编辑设置面板
  if (!exposeEvents?.length) return null;

  return <div className={s.root}>
    {
      exposeEvents.map(element => (<EventGroup
        eventName={element.name}
        key={element.name}
        value={getCurentEventByEventName(element.name, events)}
        curentEventInfomation={element}
        onChange={onChangeEventGroup}
        onPlay={onPlay}
      />))
    }
  </div>;
};

export default EventsSetting;
