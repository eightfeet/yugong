import getDefaultArgumentsByEventName from "./helper/getDefaultArgumentsByEventName";

export interface EventEmitterEvents {
  [key: string]: Function;
}

export interface EventEmitterEmitArgs {
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
    this.events = events || {};
  }

  /**
   * 队列执行执行监听事件
   * @param args
   */
  public emit(queues: EventEmitterEmitArgs[] = []) {
    const queuesArray = async () => {
      
      for (let i = 0; i < queues.length; i++) {
        const item = queues[i];
        // 执行方法时发放对应参数,当参数没有定义时，使用模块对应方法的默认参数
        const method = this.events[item.name];
        if (method instanceof Function) {
          // 获取方法对应的参数
          let argumentsData = item.arguments || [];
          // 无参数时调用模块的默认参数
          if (!argumentsData.length) {
            argumentsData = getDefaultArgumentsByEventName(item.name) || [];
          }
          await Promise.resolve().then(() => method(...argumentsData));
        } else {
          continue;
        }
      }
    };
    return queuesArray();
  }

  /**
   * 件注册定事监听器
   * @param name 注册名
   * @param registerFunction 注册方法，将方法注册到全局
   */
  public addEventListener(name: string, registerFunction: Function) {
    this.events[name] = registerFunction;
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
    if (!id.length) return;
    for (const eventName in this.events) {
      if (Object.prototype.hasOwnProperty.call(this.events, eventName)) {
        if(eventName.indexOf(id) !== -1) {
          delete this.events[eventName];
        }
      }
    }
  }
}

const e = new EventEmitter();
(window as any).EventC = e;
export const eventEmitter = e;
export default EventEmitter;
