/**
 * App入口，通过url的isEditing参数确定当前是否编辑模式，编辑模式下注意与dashbard的数据通信
 */

import { useCallback, useEffect, useMemo } from 'react';
import AppLayout from '~/AppLayout';
import EventEmitter from '~/core/EventEmitter';
import { Modules } from '~/types/modules';
import getResult from '~/core/getDataFromRunningTime';
import './App.less';

interface Props {}

const App: Modules<Props> = () => {

    // 创建全站事件处理器
    const eventEmitter = useMemo(() => {
        const env = new EventEmitter();
        // 暴露事件到window下
        (window.top as any).eventEmitter = (window as any).eventEmitter = env;
        return env;
    }, []);

    const onMount = useCallback(
      async () => {
        // 1、api处理
        console.log('api处理！')
        // 2、事件处理
        console.log('mount！')
        const emitList: any[] = [];
        eventEmitter.emit(emitList);
      },
      [eventEmitter],
    )

    const onUnmount = useCallback(
      () => {
        // 1、事件处理
        console.log('unmount！')
        const emitList: any[] = [];
        eventEmitter.emit(emitList);
      },
      [eventEmitter],
    )

    useMemo(() => {
      eventEmitter.addEventListener('mount', onMount);
      eventEmitter.addEventListener('unmount', onUnmount);
    }, [eventEmitter, onMount, onUnmount])

    useEffect(() => {
      if (eventEmitter) {
        onMount();
        console.log('挂载！！！')
      }
      return () => {
        if (eventEmitter) {
          onUnmount();
          console.log('卸载！！！')
        }
      }
    }, [eventEmitter, onMount, onUnmount])

    if (!eventEmitter) return null;

    return (
        <AppLayout
            eventEmitter={eventEmitter}
            rowHeight={parseInt(
                process.env.REACT_APP_APPLAYOUT_ROWHEIGHT || '0'
            )}
            cols={parseInt(process.env.REACT_APP_APPLAYOUT_COLS || '0')}
        />
    );
};

// 全局Api
App.exposeApi = [];

// 全局事件
App.exposeEvents = [
    {
        name: 'mount',
        description: '挂载',
    },
    {
        name: 'unmount',
        description: '卸载',
    },
];

// 全局方法
App.exposeFunctions = [
    {
        name: 'fun1',
        description: '方法1',
        arguments: [{
          type: "object",
          name: "fun1",
          describe: "fun1 描述",
          data: {
            data: 'fun1',
          },
        }]
    },
    {
        name: 'fun2',
        description: '方法2',
    },
];

export default App;
