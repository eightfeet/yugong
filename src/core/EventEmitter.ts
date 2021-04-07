import getBooleanData from "./getBooleanData";
import getDefaultArgumentsByEventName from "./helper/getDefaultArgumentsByEventName";
import get from "lodash/get";
import getResult from "~/core/getDataFromRunningTime";
import { store } from "~/redux/store";

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
          let argumentsData = item.arguments || [];
          if (!argumentsData.length) {
            argumentsData = getDefaultArgumentsByEventName(item.name) || [];
          }
          const operateArgument: any[] = [];
          argumentsData.forEach((element) => {
            if (element.type === 'boolean') {
              operateArgument.push(getBooleanData(element.data))
            } else if (element.type === 'runningTime') {
              const runningTimes = store.getState().runningTimes;
              const value = get(runningTimes, element.data);
              operateArgument.push(value);
            } else {
              operateArgument.push(getResult(element.data));
            }

            const type = Object.prototype.toString.call(element.data);
            const dataType = type.substring(8, type.length - 1).toLowerCase();
            if (element.type !== dataType) {
              console.warn(
                `方法${item.name}的参数要求${element.type}类型, 但得到的是${dataType}类型!`
              );
            }
          });
          await Promise.resolve().then(() => method(...operateArgument));
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
    for (const eventName in this.events) {
      if (Object.prototype.hasOwnProperty.call(this.events, eventName)) {
        const element = this.events[eventName];
        console.log("清除", element);
      }
    }
  }
}

export default EventEmitter;
