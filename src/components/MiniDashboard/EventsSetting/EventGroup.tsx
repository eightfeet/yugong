import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Button } from "antd";
import s from "./EventGroup.module.less";
import { MinusOutlined, PlusOutlined, SettingOutlined } from "@ant-design/icons";
import EventItem from "./EventItem";
import { ArgumentsItem, EventsTypeItem } from "~/types/appData";
import { ExposeEvents } from "~/types/modules";


interface Props {
  eventDescribe: ExposeEvents;
  eventData: EventsTypeItem[];
  onChange: (
    eventDescribe: ExposeEvents,
    data: EventsTypeItem[]
  ) => void;
}

interface EventDataList {
  moduleValue: string;
  functionValue: string;
  arguments?: ArgumentsItem[];
}

const EventGroup: React.FC<Props> = ({ eventDescribe, eventData, onChange }) => {
  const [selectedModule, setSelectedModule] = useState<EventDataList[]>([]);

  // 收集当前模块已选择数据
  useEffect(() => {
    const eventDataList = eventData.map((event) => {
      const selectData = event.name.split("/");
      const result = {
        moduleValue: selectData[0],
        functionValue: selectData[1],
        arguments: event.arguments
      };
      return result;
    });
    setSelectedModule(eventDataList);
  }, [eventData]);

  // state to appdata
  const stateToAppdata = useCallback(
    (data: EventDataList[]) => {
      const result = data.map((item) => ({ name: `${item.moduleValue}/${item.functionValue}`, arguments: [] }))
      onChange(eventDescribe, result);
    },
    [eventDescribe, onChange],
  )

  const onPlus = useCallback(() => {
    const newItem: any = {
      moduleValue: '',
      functionValue: '',
    };
    selectedModule.push(newItem);
    setSelectedModule([...selectedModule]);
    stateToAppdata(selectedModule);
  }, [selectedModule, stateToAppdata]);

  // 整租数据的更新
  const onMinus = useCallback((index:number) => () => {
    const data = selectedModule.filter((el,i) => i !== index)
    setSelectedModule([...data]);
    stateToAppdata(data);
  }, [selectedModule, stateToAppdata]);

  // 单项数据的更新
  const onChangeItem = useCallback(
    (index: number) => (data: string[]) => {
      const operateData = [...eventData];
      operateData[index] = { name: `${data[0]}/${data[1]}`, arguments: [] };
      onChange(eventDescribe, operateData);
    },
    [eventData, eventDescribe, onChange]
  );

  return (
    <>
      <div className={s.divide}>
        <div className={s.title}>{eventDescribe.description}</div>
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
              argumentList={event.arguments || []}
              onChange={onChangeItem(index)}
            />
            <Col span={4} className={s.minuswrap}>
              <Button icon={<SettingOutlined />} onClick={() => console.log(event.arguments)}>参数</Button>
            </Col>
            <Col span={2} className={s.minuswrap}>
              <Button size="small" icon={<MinusOutlined onClick={onMinus(index)} />} />
            </Col>
          </Row>
        );
      })}
    </>
  );
};

export default EventGroup;
