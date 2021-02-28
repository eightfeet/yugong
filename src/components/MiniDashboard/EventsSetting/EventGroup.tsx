import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import s from "./EventGroup.module.less";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import EventItem from "./EventItem";

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

interface Props {
  eventType: EventEmitterExpose;
  eventData: EventEmitterEventData[];
  onChange: (
    eventType: EventEmitterExpose,
    data: EventEmitterEventData[]
  ) => void;
}

interface EventDataList {
  moduleValue: string;
  functionValue: string;
}

const EventGroup: React.FC<Props> = ({ eventType, eventData, onChange }) => {
  const [selectedModule, setSelectedModule] = useState<EventDataList[]>([]);

  // 收集当前模块已选择数据
  useEffect(() => {
    const eventDataList = eventData.map((event) => {
      const selectData = event.name.split("/");
      const result = {
        moduleValue: selectData[0],
        functionValue: selectData[1],
      };
      return result;
    });
    setSelectedModule(eventDataList);
  }, [eventData]);

  const onPlus = useCallback(() => {
    console.log("plus");
  }, []);

  const onMinus = useCallback(() => {
    console.log("minus");
  }, []);

  const onChangeItem = useCallback(
    (index: number) => (data: string[]) => {
      const operateData = [...eventData];
      operateData[index] = { name: `${data[0]}/${data[1]}`, arguments: [] };
      onChange(eventType, operateData);
    },
    [eventData, eventType, onChange]
  );

  return (
    <>
      <div className={s.divide}>
        <div className={s.title}>{eventType.description}</div>
        <div className={s.menu}>
          <Button size="small" icon={<PlusOutlined onClick={onPlus} />} />
        </div>
      </div>
      {selectedModule.map((event, index) => {
        return (
          <Row
            className={s.row}
            gutter={4}
            key={`${index}${event.moduleValue}${event.functionValue}`}
          >
            <EventItem
              moduleValue={event.moduleValue}
              functionValue={event.functionValue}
              onChange={onChangeItem(index)}
            />
            <Col span={2} className={s.minuswrap}>
              <Button size="small" icon={<MinusOutlined onClick={onMinus} />} />
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default EventGroup;
