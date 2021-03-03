import React, { useCallback } from "react";
import Wrapper from "./../Wrapper";
import { AppDataElementsTypes } from "~/types/appData";
import EventEmitter from "~/core/EventEmitter";
import useRunningTime from "~/hooks/useRunningTime";

interface paraments extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

// Extends FC with custom static methods
interface Props<TProps> extends React.FC<TProps> {
  exposeEvents: any[]
}

const Conterner: Props<paraments> = (props) => {
  const { eventEmitter, events } = props;

  const getResult = useRunningTime();

  console.log('result', getResult("{{aaa.b}}4444{{adasdc}}{{5555}}"))

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

export default Conterner;


