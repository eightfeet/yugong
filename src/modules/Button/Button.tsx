import { useEffect, useState } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import s from './Button.module.less'

export interface ButtonProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Button:Modules<ButtonProps> = (props) => {
    const { eventEmitter, events = {}, api} = props;
    const [text, setText] = useState('')
    // 方法定义
    // 定义文字
    // 点击事件
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
             <button className={s.btn}></button>
        </Wrapper>
    )
}

/**
* 注册方法的静态描述与默认参数定义
*/
Button.exposeFunctions = [
    {
        name: "setButton",
        description: "设置按钮",
        arguments: [
            {
                type: "string",
                name: "按钮文字",
                describe: "按钮显示文字",
                data: "按钮",
            },
            {
                type: "boolean",
                name: "禁用按钮",
                describe: "禁用按钮，true禁用，false启用",
                data: {
                    comparableAverageA: undefined,
                    comparableAverageB: undefined,
                    method: "==="
                },
            },
        ],
    },
];

/**
* 发布事件的静态描述
*/
Button.exposeEvents = [
    {
        name: 'mount',
        description: '挂载',
    },
    {
        name: 'unmount',
        description: '卸载',
    }
];

/**
* 发布默认porps
*/
Button.exposeDefaultProps = {};

/**
* 发布默认Api
*/
Button.exposeApi = [];

export default Button;