import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import EventEmitter from "~/core/EventEmitter";
import { RootState } from "~/redux/store";
import { EventsType, ExposeEvents } from "~/types/modules";

interface Registers {
    [keys: string]: Function
}

interface EventsResult {
    events?: EventsType;
    staticEvents?:  ExposeEvents[]
}

interface EventDispatch {
    [key: string]: any
}

export const useLifeCycle = (eventEmitter: EventEmitter, moduleId: string, registers:Registers ) => {
    const appData = useSelector((state: RootState) => state.appData);
    const {events, staticEvents} = useMemo(() => {
        const eventsResult: EventsResult = {events: {}, staticEvents: []};
        appData.some(item => {
            if (item.moduleId === moduleId) {
                if (item.events) {
                    eventsResult.events = item.events;
                }
                eventsResult.staticEvents = require(`~/modules/${item.type}`).default.exposeEvents;
                return true;
            }
            return false;
        })
        return eventsResult;
    }, [appData, moduleId]);

    // 注册事件
    // 向eventEmitter注册事件，向外公布当前组件包含的生命周期事件
    useMemo(() => {
        for (const key in registers) {
            if (Object.prototype.hasOwnProperty.call(registers, key)) {
                const fun = registers[key];
                eventEmitter.addEventListener(key, fun);
            }
        }
    }, [eventEmitter, registers])

    // 事件派发
    const eventDispatch: EventDispatch = useMemo(() => {
        const dispatch = {};
        staticEvents?.forEach(({name}) => {
            dispatch[name] = () => eventEmitter.emit(events?.[name]);
        });
        return dispatch;
    }, [eventEmitter, events, staticEvents]);
    
    // 基本事件
    useEffect(() => {
        // 执行挂载事件
        eventEmitter.emit(events?.mount);
        return () => {
            // 执行卸载事件
            eventEmitter.emit(events?.unmount);
        };
    }, [eventEmitter, events?.mount, events?.unmount]);

    return eventDispatch
}


export default useLifeCycle;

// const Button = () => {
//     const value = useLifeCycle({
//         mount: () => {
//             console.log()
//         }
//         show: () => {},
//         hide: () => {},
//     });

//     value.

//     return <></>;
// };

// type EventDispatch<K> = {
//     [key in K extends string ? K : undefined]: () => any;
// };

// function useLifeCycle<T>(
//     events: T
// ): EventDispatch<keyof T | 'mount' | 'unmount'> {
//     throw new Error();
// }