import { useEffect } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes } from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import s from './Text.module.less'
import useStyles from './Text.useStyle';

export interface TextProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Text:Modules<TextProps> = (props) => {
    const { eventEmitter, events = {}, api, style} = props;
    const userClass = useStyles(style);
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
        <Wrapper {...props} maxWidth itemAlign="top">
             <ul className={s.text}>
                <li className={userClass.paragraph}>align-items 属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。</li>
                <li className={userClass.paragraph}>提示：使用每个弹性对象元素的 align-self 属性可重写 align-items 属性。</li>
             </ul>
        </Wrapper>
    )
}

/**
* 注册方法的静态描述与默认参数定义
*/
Text.exposeFunctions = [];

/**
* 发布事件的静态描述
*/
Text.exposeEvents = [
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
Text.exposeDefaultProps = {
    style: {
        basic: {
            font: {
                align: 'left'
            }
        },
        paragraph: {

        },
        prefix: {

        }
    },
    styleDescription: {
        paragraph: '段落',
        prefix: '段落前缀'
    }
};

/**
* 发布默认Api
*/
Text.exposeApi = [];

export default Text;