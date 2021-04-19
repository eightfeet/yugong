import { useEffect } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import s from './Form.module.less';

export interface FormProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Form:Modules<FormProps> = (props) => {
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
             <div className={s.root}>
                 表单
             <br /><br /><br /><br /><br /><br />
             </div>
        </Wrapper>
    )
}

/**
* 注册方法的静态描述与默认参数定义
*/
Form.exposeFunctions = [];

/**
* 发布事件的静态描述
*/
Form.exposeEvents = [
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
Form.exposeDefaultProps = {};

/**
* 发布默认Api
*/
Form.exposeApi = [];

export default Form;