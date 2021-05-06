import { useEffect } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';

export interface RouletteProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Roulette:Modules<RouletteProps> = (props) => {
    const { eventEmitter, events = {}, api} = props;
    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find(item => item.apiId === '');
        requester(apiArguments || {});
    }, [api])
    // 基本事件
    useEffect(() => {
        // 执行挂载事件
        eventEmitter.emit(events.mount);
        return () => {
            // 执行卸载事件
            eventEmitter.emit(events.unmount);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <Wrapper {...props}>
             抽奖模块
        </Wrapper>
    )
}

/**
* 注册方法的静态描述与默认参数定义
*/
Roulette.exposeFunctions = [];

/**
* 发布事件的静态描述
*/
Roulette.exposeEvents = [
    {
        name: 'mount',
        description: '初始化',
    },
    {
        name: 'unmount',
        description: '卸载',
    }
];

/**
* 发布默认porps
*/
Roulette.exposeDefaultProps = {};

/**
* 发布默认Api
*/
Roulette.exposeApi = [];

export default Roulette;