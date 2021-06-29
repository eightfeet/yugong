import EventEmitter from '~/core/EventEmitter';
import { AppDataElementsTypes, ArgumentsItem } from '~/types/appData';
import { Modules } from '~/types/modules';
import config from './Broadcast.config';
import Wrapper from '../Wrapper';
import useLifeCycle from '~/hooks/useLifeCycle';
import useStyles from './Broadcast.useStyles';
import s from './Broadcast.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import useRefState from '~/hooks/useRefState';

export interface BroadcastProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Broadcast: Modules<BroadcastProps> = (props) => {
    const { style, moduleId } = props;
    // 列表
    const [list, setList, listRef] = useRefState<string[]>([]);
    // 限制交叉条目
    const [intersection, setIntersection] = useState<number>(3);
    // 间隔时长
    const [interval, setInterval] = useState<number>(2500);
    // listwrap
    const listWrapRef = useRef<any>();
    const [listWrapStyle, setListWrapStyle] = useState<React.CSSProperties>({
        height: 0,
    });
    const [listItemHeight, setListItemHeight, listItemHeightRef] =
        useRefState<number>(0);
    const currentItem = useRef(0);

    const setMessages = useCallback(
        (
            messages: ArgumentsItem,
            counter: ArgumentsItem,
            interval: ArgumentsItem
        ) => {
            const argMessages = getArgumentsItem(messages) as string[];
            const argCounter = getArgumentsItem(counter) as number;
            const argInterval = getArgumentsItem(interval) as number;
            setList(argMessages);
            // setInterval 间隔时长
            if (argInterval) setInterval(argInterval);
            // setIntersection 限制交叉条目
            if (argCounter)
                setIntersection(
                    argMessages.length < argCounter
                        ? argMessages.length
                        : argCounter
                );
        },
        [setList]
    );

    // inject class from jss
    const userClass = useStyles(style);
    // Register events and publish functions
    useLifeCycle(
        moduleId,
        // register events
        {
            mount: '初始化',
            unmount: '卸载',
        },
        // publish functions
        { setMessages }
    );

    const refTimerId = useRef<any>(undefined);

    const wrapStyle = useCallback(
        (s: number, reset?: boolean) => {
            const style: React.CSSProperties = {
                height: listRef.current.length * listItemHeightRef.current * 2,
                top: currentItem.current * listItemHeightRef.current * -1,
                transition: `all ease-in ${s}ms`,
            };
            if (reset) {
                delete style.transition;
                style.top = 0;
            }
            return style;
        },
        [listRef, listItemHeightRef]
    );

    const loop = useCallback(
        (interval) => {
            if (refTimerId.current) {
                clearTimeout(refTimerId.current);
            }
            const times = 300;
            const itemHeight = (listWrapRef.current?.children[0]
                ?.offsetHeight || 0) as number;
            setListItemHeight(itemHeight);
            setListWrapStyle(wrapStyle(times));
            currentItem.current++;
            currentItem.current = list.length
                ? currentItem.current % (list.length + 1)
                : 0;
            let currentInterval = interval;
            if (currentItem.current === 0) {
                currentInterval = times + 10;
                setTimeout(() => {
                    setListWrapStyle(wrapStyle(times, true));
                }, times);
            }
            refTimerId.current = setTimeout(loop, currentInterval, interval);
        },
        [list.length, setListItemHeight, setListWrapStyle, wrapStyle]
    );

    // 运行
    useEffect(() => {
        loop(interval);
    }, [loop, interval]);

    useEffect(() => {
        return () => {
            if (refTimerId.current) {
                clearTimeout(refTimerId.current);
            }
        };
    }, []);

    return (
        <Wrapper {...props} maxWidth>
            <div
                className={s.display}
                style={{ height: listItemHeight * intersection }}
            >
                <div className={s.listwrap} style={listWrapStyle}>
                    <ul ref={listWrapRef}>
                        {list.map((item, index) => (
                            <li key={`top${index}`} style={{opacity: 1/(intersection + index)}}>
                                <div>
                                    <div className={userClass.item}>{item}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {list.map((item, index) => (
                            <li key={`buttom${index}`} style={{opacity: currentItem.current === index ? '1' : '0.5'}}>
                                <div>
                                    <div className={userClass.item}>{item}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Wrapper>
    );
};

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        Broadcast[key] = config[key];
    }
}

export default Broadcast;
