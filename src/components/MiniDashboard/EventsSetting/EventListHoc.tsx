/**
 * 高阶组件，支持拖拽方式变更事件排序，同时处理参数面板：模块->事件->参数，
 */
import { useCallback } from "react";
import { SortableContainer } from "react-sortable-hoc";
import EventItem from "./EventItem";
import { EventDataList } from "./EventGroup";


interface Props {
  moduleEvents: EventDataList[];
  onChange: (data: EventDataList[]) => void;
  onMinus: (index: number) => void;
  handlePlay?: () => void;
}

const EventListHoc =
  ({ moduleEvents, onChange, onMinus }: Props) => {
    // 单项数据的更新
    const onChangeItem = useCallback(
      (index: number) => async (eventDataList: EventDataList) => {
        const operateEvents = [...moduleEvents];
        operateEvents[index] = eventDataList;
        if (onChange instanceof Function) {
          onChange(operateEvents);
        }
      },
      [moduleEvents, onChange]
    );

    return (
      <div>
        {
          // 当前模块发布的事件状态清单
          moduleEvents?.map((event, index) => <EventItem
            index={index}
            onMinus={() => onMinus(index)}
            onChange={onChangeItem(index)}
            key={`${index}${event.moduleUuid}${event.dispatchedFunctions}`}
            {...event}
          />)
        }
      </div>
    );
  };

export default SortableContainer(EventListHoc);
