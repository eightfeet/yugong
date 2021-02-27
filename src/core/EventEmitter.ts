interface EventEmitterEvents {
  [key: string]: Function;
}

interface EventEmitterEmitArgs {
  /**
   * 事件名称 EventEmitterEvents[key]
   */
  name: string;
  /**
   * 参数 EventEmitterEvents arguments
   */
  arguments: any[];
}


class EventEmitter {
  public events: EventEmitterEvents;
  constructor(events?: EventEmitterEvents) {
    this.events = events || {
      hourglass: (times: number) =>
        new Promise((res) => setTimeout(() => res(""), times || 1000)),
    };
  }

  /**
   *
   * 事件发布
   * @param args
   */
  public emit(queues: EventEmitterEmitArgs[]) {
    const queuesArray = async () => {
      for (let i = 0; i < queues.length; i++) {
        const item = queues[i];
        const method = this.events[item.name];
        if (method instanceof Function) {
          await Promise.resolve().then(() => method(...item.arguments));
        } else {
          continue;
        }
      }
    };
    return queuesArray();
  }

  /**
   * 事件订阅
   * @param name
   * @param cb
   */
  public addEventListener(name: string, cb: Function) {
    this.events[name] = cb;
  }

  public removeEventListener(name: string, cb: Function) {
    delete this.events[name];
  }

  public bind(id: string) {
    return {
      addEventListener: (name: string, cb: Function) =>
        this.addEventListener(`${id}/${name}`, cb),

      removeEventListener: (name: string, fn: Function) =>
        this.removeEventListener(`${id}/${name}`, fn),

      emit: this.emit,

      events: this.events,
    };
  }

  public clear(id: string) {
    for (const eventName in this.events) {
      if (Object.prototype.hasOwnProperty.call(this.events, eventName)) {
        const element = this.events[eventName];
        console.log('清除', element)
      }
    }
  }
}

export default EventEmitter;
