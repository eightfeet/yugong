import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import EventEmitter, { eventEmitter as globalEventEmitter } from "~/core/EventEmitter";
import { RootState } from "~/redux/store";
import { ComExposeEvents, EventsType } from "~/types/modules";

interface RegistersFunction {
    [keys: string]: Function
}

type RegistersEvents<TEvent> = {
    [K in keyof TEvent]: any;
}

type DispatchEvents<TEvent> = {
    [K in keyof TEvent]: (...args: any[]) => any;
}

export type UseLifeCycleResult<TEvent={}> = [DispatchEvents<TEvent>, EventEmitter]

function useLifeCycle<TEvent> (moduleId: string, registersEvents: RegistersEvents<TEvent>,  registers:RegistersFunction ): UseLifeCycleResult<TEvent> {
    const eventEmitter = useMemo(() => globalEventEmitter.bind(moduleId), [moduleId]);
    const appData = useSelector((state: RootState) => state.appData);
    const events = useMemo(() => {
        let env: EventsType = {}
        appData.some(item => {
            if (item.moduleId === moduleId) {
                if (item.events) {
                    env = item.events;
                }
                return true;
            }
            return false;
        })
        return env;
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
    const eventDispatch = useMemo(() => {
        const dispatch = {};
        for (const key in registersEvents) {
            if (Object.prototype.hasOwnProperty.call(registersEvents, key)) {
                dispatch[key as string] = () => eventEmitter.emit(events?.[key])
            }
        }
        return dispatch as DispatchEvents<TEvent>;
    }, [eventEmitter, events, registersEvents]);
    
    // 基本事件
    useEffect(() => {
        // 执行挂载事件
        eventEmitter.emit(events?.mount);
        return () => {
            // 执行卸载事件
            eventEmitter.emit(events?.unmount);
        };
    }, [eventEmitter, events?.mount, events?.unmount]);

    return [eventDispatch, eventEmitter as EventEmitter ]
}

export function toRegEvents(events?: ComExposeEvents): {[key: string]: string} {
    const data = {}
    events?.forEach(({name, description }) => {
        data[name] = description
    })
    return data;
}

export default useLifeCycle;