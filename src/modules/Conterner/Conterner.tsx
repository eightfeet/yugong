import React, { useCallback } from "react";
import Wrapper from "./../Wrapper";
import { AppDataElementsTypes } from "~/types/appData";
import EventEmitter from "~/core/EventEmitter";

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
  onClick: {

  }
}, 'bbb', 'ccc']

export default Conterner;


