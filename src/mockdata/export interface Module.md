``` typescript
import React, { useEffect } from 'react';

export interface Manifest {
    exposeEvents: string[];

    settings: {
        style: 
        api: [{
            label: '抽奖',
            url： {type： 'text'},
            method: {type: checkbox, options: ['get', 'post']}
        }, {
            label: '抽奖记录',
            url： {type： 'text'},
            method: {type: checkbox, options: ['get', 'post']}
        }], 
        content: {
            label: '抽奖记录',
        }]
    };
}

export interface ComponentState {


    "抽奖",
    "抽奖记录": 
}

class Modal implements Module {
    public exposeEvents = [{'show'}, 'hide'];

    public settings: {
        events: [{text: '确定' , event:'onOk', desc: '点击确认按钮时触发'}, 'onCancel'];
    };

    private defaultHandlers = {
        onOk: () => this.hide(),
        onCancel: () => this.hide(),
    };

    constructor(config: any) {
        if (config.events) {
            this.defaultHandlers = {
                ...this.defaultHandlers,
                ...config.events,
            };
        }
    }

    public show() {}
    public hide() {}

    private _onOk() {
        this.defaultHandlers.onOk();
    }
}

const model = new Modal({
    events: {
        onOk: () => {
            setTimeout(() => {
                model.hide();
            }, 3000);
        },
    },
});

class Button extends React.Component {
    static exposeEvents = [];

    constructor(props) {
        super(props);
        

        this.id = uuid();
        this.builder = props.builder;
    }
    componentDidMount() {
        this.builder.register(this.id, {
            type: 'button',
            exposeEvents: [],

        });
    }

    render() {
        return null;
    }
}

function ButtonFC() {
    useEffect(() => {

    }, [])
}

ButtonFC.exposeStatic = {}


const buttonConfig = {
    events: {
        onClick: '1.show',
    },
};

const moduleInstances = {
    'uid1': {
        $ref: modal,
        x,
        y,
        api
    },
    'uid2': {
        $ref: button,
    }
};

const eventMappings = {
    '1.show'
};

// 遍历界面上所有组件
for (const moduleId in moduleInstances) {
    // 获取组件暴露的事件
    const { exposeEvents } = moduleInstances[moduleId];
    for (let i = 0; i < exposeEvents.length; i++) {
        // 把事件缓存到一个map里面
        const eventName = exposeEvents[i];
        eventMappings[`${moduleId}.${eventName}`] =
            moduleInstances[moduleId][eventName];
    }
}

// eventMappings = {
//     "1.show": () => {},
//     "1.hide": () => {},
// }

```

```typescript

import React from "react";

const COMPONENT_TYPES = {
  BUTTON: ButtonComponent,
  MODAL: ModalComponent,
};

class EventEmitter {
  events: {
    `a:click`: [c,b]
    `b:click`: [c]
  };

  public addEventListener(eventName, fn) {}
  public removeEventListener(eventName, fn) {}
  public emit(eventName, ...args) {
    // todo Promise
  }

  public bind(id) {
    return {
      addEventListener: (eventName, fn) =>
        this.addEventListener(`${id}/${eventName}`, fn),

      removeEventListener: (eventName, fn) =>
        this.removeEventListener(`${id}/${eventName}`, fn),

      emit: (eventName, ...args) => this.emit(`${id}/${eventName}`, ...args),
    };
  }

  public clear(id) {}
  
}

class Layout extends React.Component {
  private emitter = new EventEmitter();

  constructor(props) {
    super(props);

    this.state = {
      appData: {
        "f51f1f95-f6a6-49f1-b640-5e5d8ad5555b": {
          type: "BUTTON",
          name: "�齱��ť1",
          events: {
            onClick: "8ccdf7cd-7f3d-4244-9a81-bd5493c342b7/show",
          },
        },
        "f51f1f95-f6a6-49f1-b640-5e5d8ad5555c": {
          type: "BUTTON",
          name: "�齱��ť2",
          events: {
            onClick: "8ccdf7cd-7f3d-4244-9a81-bd5493c342b7/show",
          },
        },
        "8ccdf7cd-7f3d-4244-9a81-bd5493c342b7": {
          type: "MODAL",
          name: "���ֵ���",
          events: {
            onClose: "8ccdf7cd-7f3d-4244-9a81-bd5493c342b7/hide",
            onConfirm: "8ccdf7cd-7f3d-4244-9a81-bd5493c342b7/hide",
            onCancel: "8ccdf7cd-7f3d-4244-9a81-bd5493c342b7/hide",
          },
        },
      },
    };
  }

  render() {
    const { appData } = this.state;

    return Object.keys(appData).map((id) => {
      const config = appData[id];
      const Component = COMPONENT_TYPES[config.type];

      const { events } = config;
      for (const eventName in events) {
        this.emitter.addEventListener(`${id}/${eventName}`, (...args) => {
          this.emitter.emit(events[eventName], ...args); // 2.

          Component[eventName](...args);
        });
      }

      return <Component show emitter={this.emitter.bind(id)} />;
    });
  }
}

class ButtonComponent extends React.Component {
  private emitter: any;

  constructor(props) {
    super(props);

    this.emitter = props.emitter;
  }

  render() {
    return <button onClick={() => this.emitter.emit("onClick")}></button>; // 1.
  }
}

class ModalComponent extends React.Component {
  static exposeEvents: ["show", "hide"];

  private emitter: any;

  constructor(props) {
    super(props);

    this.emitter = props.emitter;
    this.emitter.addEventListener("show", this.show); // 3
    this.emitter.addEventListener("hide", this.hide); 
  }

  public componentWillUnmount() {}

  public show() {} // 4
  public hide() {}

  render() {
    return (
      <dialog>
        <header>
          <button onClick={() => this.emitter.emit("onClose")}>X</button>
        </header>
        <section></section>
        <footer>
          <button onClick={() => this.emitter.emit("onConfirm")}>
            Confirm
          </button>
          <button onClick={() => this.emitter.emit("onCancel")}>Cancel</button>
        </footer>
      </dialog>
    );
  }
}


```