import React from "react";
import Wrapper from "./../Wrapper";
import { AppDataElementsTypes } from "~/types/appData";
import EventEmitter from "~/core/EventEmitter";

interface paraments extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter
}

const Conterner: React.FC<paraments> = (props) => {
  const { eventEmitter, events } = props;
  console.log('events', events)
  for (const key in events) {
    if (Object.prototype.hasOwnProperty.call(events, key)) {
      const event = events[key];
      console.log(`${props.moduleId}/${key}`, event)
    }
  }

  return (
    <Wrapper {...props}>
      {props.content.text}
    </Wrapper>
  );
};

export default Conterner;
