import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import requester from '~/core/fetch';
import EventEmitter, { eventEmitter as globalEventEmitter } from "~/core/EventEmitter";
import { RootState } from "~/redux/store";
import { Api } from "~/types/appData";
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

function useLifeCycle<TEvent> (moduleId: string, registersEvents: RegistersEvents<TEvent>,  registersFunction:RegistersFunction, mountApi?: Api  ): UseLifeCycleResult<TEvent> {

    const eventEmitter = useRef(globalEventEmitter.bind(moduleId))
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
        for (const key in registersFunction) {
            if (Object.prototype.hasOwnProperty.call(registersFunction, key)) {
                const fun = registersFunction[key];
                eventEmitter.current.addEventListener(key, fun);
            }
        }
    }, [eventEmitter, registersFunction])

    // 事件派发
    const eventDispatch = useMemo(() => {
        const dispatch = {};
        for (const key in registersEvents) {
            if (Object.prototype.hasOwnProperty.call(registersEvents, key)) {
                dispatch[key as string] = () => eventEmitter.current.emit(events?.[key])
            }
        }
        return dispatch as DispatchEvents<TEvent>;
    }, [events, registersEvents]);

    const mount = useCallback(
        async () => {
            if (mountApi) {
                await requester(mountApi || {});
            }
            if (events) {
                eventEmitter.current.emit(events.mount);
            }
        },
        [events, mountApi],
    );
    
    // 基本事件
    useEffect(() => {
        mount();
        return () => {
            // 执行卸载事件
            eventEmitter.current.emit(events?.unmount);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [eventDispatch, eventEmitter.current as EventEmitter ]
}

export function toRegEvents(events?: ComExposeEvents): {[key: string]: string} {
    const data = {}
    events?.forEach(({name, description }) => {
        data[name] = description
    })
    return data;
}

export default useLifeCycle;