import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createUseStyles } from "react-jss";
import { EventsType, ModulesStatic } from '~/types/modules';
import EventEmitter, { eventEmitter as globalEventEmitter, EventEmitterEmitArgs, EventEmitterEvents } from "~/core/EventEmitter";
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '~/redux/store';
import { AppDataElementsTypes } from '~/types/appData';

interface PresetModuleProps { };
interface anyObj { [key: string]: any };
interface FunObj {
  [keys: string]: Function;
}

interface CurrentEventEmitter {
  addEventListener: EventEmitter['addEventListener'],
  removeEventListener: EventEmitter['removeEventListener'],
  emit: (queues?: EventEmitterEmitArgs[]) => Promise<void>,
  events: EventEmitterEvents
}

export type EventsDispatch<T = {}> = T & {
  mount: Function;
  unmount: Function;
}

export default function PresetModule<T extends PresetModuleProps = PresetModuleProps>(
  WrappedComponent: React.ComponentType<T>,
  config: ModulesStatic,
  createStyle?: (props: T) => anyObj
) {
  // Try to create a nice displayName for React Dev Tools.
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  const ComponentPresetModule = (props: Omit<T, keyof PresetModuleProps>) => {
    const { style, moduleId: id } = props as any;

    const editorMode = useSelector(
      (state: RootState) => state.controller.isEditing,
    );
  
    const { runningTimes } = useSelector((state: RootState) => state);
    const { setRunningTimes } = useDispatch<Dispatch>().runningTimes;

    useEffect(() => {
      const evn = globalEventEmitter.bind(id)
      setEventEmitter(evn);
    }, [id]);

    const [eventEmitter, setEventEmitter] = useState<CurrentEventEmitter>();

    const appData = useSelector((state: RootState) => state.appData);
    const runningTimeEvent = useRef<EventsType>()
    useEffect(() => {
      let evn: EventsType = {}
      appData.some(item => {
        if (item.moduleId === id) {
          if (item.events) {
            evn = item.events;
          }
          return true;
        }
        return false;
      })
      runningTimeEvent.current = evn;
    }, [appData, id]);

    // registers
    const registersFunction = useCallback(
      (funObj: FunObj) => {
        for (const key in funObj) {
          if (Object.prototype.hasOwnProperty.call(funObj, key)) {
            const fun = funObj[key];
            eventEmitter?.addEventListener(key, fun);
          }
        }
      },
      [eventEmitter],
    )
    const dispatch = useRef<FunObj>({})
    // dispatch
    const eventDispatch = useCallback(() => {
      if (Object.keys(dispatch.current).length) return dispatch.current;
      config.exposeEvents?.forEach(item => {
        dispatch.current[item.name] = () => eventEmitter?.emit(runningTimeEvent.current?.[item.name]);
      })
      return dispatch.current;
    }, [eventEmitter]);

    const useStyles = createUseStyles<string, any>(createStyle?.(props) || {});
    const classes = useStyles(style);
    return eventEmitter ? <WrappedComponent
      eventDispatch={eventDispatch}
      eventEmitter={eventEmitter}
      registersFunction={registersFunction}
      editorMode={editorMode}
      runningTimes={runningTimes}
      setRunningTimes={setRunningTimes}
      classes={{ ...classes }} {...(props as T)} /> : null;
  };

  // bind static
  for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
      ComponentPresetModule[key] = config[key];
    }
  }

  ComponentPresetModule.displayName = `PresetModule(${displayName})`;

  return ComponentPresetModule;
}

export interface ClassClassModuleBaseProps<Classes = anyObj, Evevnts = FunObj> extends AppDataElementsTypes {
  classes: Classes;
  eventDispatch: () => EventsDispatch & Evevnts;
  eventEmitter: CurrentEventEmitter;
  registersFunction: (registers: FunObj) => void;
  /**编辑器模式 */
  editorMode: boolean;
  runningTimes: {
    [keys: string]: any;
  }
  setRunningTimes: (params: { [keys: string]: any }) => void;
}