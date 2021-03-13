import { useCallback, useEffect } from "react";
import Wrapper from "./../Wrapper";
import { AppDataElementsTypes } from "~/types/appData";
import EventEmitter from "~/core/EventEmitter";
import { ModulesProps } from "~/types/modules";
import requester from "~/core/fetch";

interface Props extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

/**
 * 容器
 */
const Conterner: ModulesProps<Props> = (props) => {
  const { eventEmitter, events, api } = props;
  useEffect(() => {
    api?.forEach((item) => (item.url ? requester(item) : null));
  }, [api]);
  const onClick = useCallback(() => {
    if (eventEmitter.events) {
      eventEmitter.emit(events.onClick);
    }
  }, [eventEmitter, events.onClick]);

  return (
    <Wrapper {...props}>
      <div onClick={onClick}>{props.content.text}</div>
    </Wrapper>
  );
};

Conterner.exposeEvents = [
  {
    name: "onClick",
    description: "点击",
  },
];

Conterner.exposeApi = [
  {
    apiId: "findEmployeeByPhone",
    name: "获取雇员信息",
    url: "/employee/findEmployeeByPhone",
    method: "GET",
    body: [
      {
        type: "string",
        data: "{{search.mobilePhone}}",
        name: "mobilePhone",
        describe: "店员手机号码",
      },
    ],
  },
  {
    apiId: "record",
    name: "记录",
  },
];

export default Conterner;
