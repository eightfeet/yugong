import { useCallback } from "react";
import Wrapper from "./../Wrapper";
import { AppDataElementsTypes } from "~/types/appData";
import EventEmitter from "~/core/EventEmitter";
import { ModulesProps } from "~/types/modules";

interface Props extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

/**
 * 容器
 */
const Conterner: ModulesProps<Props> = (props) => {
  const { eventEmitter, events } = props;

  const onClick = useCallback(
    () => {
      if (eventEmitter.events) {
        eventEmitter.emit(events.onClick)
      }
    },
    [eventEmitter, events.onClick],
  )

  return (
    <Wrapper {...props}>
      <div onClick={onClick}>
        {props.content.text}
      </div>
    </Wrapper>
  );
};

Conterner.exposeEvents = [{
  name: 'onClick',
  description: '点击'
}]

Conterner.exposeApi = [{
  apiId: 'lotter',
  name: '抽奖接口',
  url: 'http://api',
  description: '请求抽奖数据',
  headers: {
    
  },
  mode: 'cors'
}]

export default Conterner;


