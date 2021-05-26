import React, { useCallback } from "react";

type Describer<TEvent, TConfig> = {
  name: string;
  exposeEvents: TEvent;
  exposeConfigs: TConfig;
};

type EventEmitter<TEvent> = {
  [K in keyof TEvent]: (...args: any[]) => any;
};

type Component<TEvent, TConfig> = (
  props: {},
  describer: {
    emitter: EventEmitter<TEvent>;
    configs: {
      [P in keyof TConfig]: any;
    };
  }
) => void;

function registerComponent<TEvent, TConfig>(
  describer: Describer<TEvent, TConfig>
): (comp: Component<TEvent, TConfig>) => void {
  throw new Error();
}

registerComponent({
  name: "button",
  exposeEvents: {
    close: () => {},
  },
  exposeConfigs: {
    timeout: {
      type: "number",
    },
  },
})((props, { emitter, configs }) => {
  emitter.close()
  return <></>;
});



// function registerComponent<TEvent, TConfig>(
//   describer: Describer<TEvent, TConfig>,
//   comp: Component<TEvent, TConfig>
// ): () => void {
//   throw new Error();
// }

// registerComponent({
//   name: "button",
//   exposeEvents: {
//     close: () => console.log(),
//   },
//   exposeConfigs: {
//     timeout: {
//       type: "number",
//     },
//   },
// })((props, { emitter, configs }) => {
//   emitter.close()
//   return <button onClick={onClick}></button>;
// });

// registerComponent({
//   name: "button",
//   exposeEvents: {
//     close: () => console.log(),
//   },
//   exposeConfigs: {
//     timeout: {
//       type: "number",
//     },
//   },
// },(props, describer) => {
//   describer.configs
// })
