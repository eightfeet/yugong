import { useCallback, useEffect, useState } from 'react';
import requester from '~/core/fetch';
import EventEmitter from '~/core/EventEmitter';
import parse from 'html-react-parser';
import {
    AnyObjectType,
    AppDataElementsTypes,
    ArgumentsArray,
    ArgumentsBoolean,
    ArgumentsNumber,
    ArgumentsString,
} from '~/types/appData';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import s from './Table.module.less';
import useStyles from './Table.useStyle';
import classNames from 'classnames';
import PullToRefresh from 'rmc-pull-updown-to-refresh';
import { compilePlaceholderFromDataSource as getResult } from '~/core/getDataFromSource';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import config from './Table.config';
import useLifeCycle from '~/hooks/useLifeCycle';

export interface TableProps extends AppDataElementsTypes {}

const Table: Modules<TableProps> = (props) => {
    const { events = {}, api, style, moduleId } = props;
    const userClass = useStyles(style);
    const [theadDataStatu, setTheadDataStatu] =
        useState<{
            width: any[];
            data: (string | number | JSX.Element | JSX.Element[])[];
        }>();
    const [tbodyDataStatu, setTbodyDataStatu] = useState<
        (
            | string
            | number
            | boolean
            | any[]
            | Element
            | Element[]
            | AnyObjectType
        )[][]
    >([]);
    // 保留一份源数据表格替换用
    const [copyDataSource, setCopyDataSource] = useState<any>();
    // 是否开启下拉与上拉事件
    const [pullStates, setPullStates] =
        useState<{
            pullDown: boolean;
            pullUp: boolean;
        }>();
    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find((item) => item.apiId === 'mount');
        requester(apiArguments || {});
    }, [api]);
    // 基本事件
    useEffect(() => {
        // 执行挂载事件
        eventEmitter.emit(events.mount);
        return () => {
            // 执行卸载事件
            eventEmitter.emit(events.unmount);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**设置表格交互 */
    const setTable = useCallback(
        (isPullDown: ArgumentsBoolean, isPullUp: ArgumentsBoolean) => {
            setPullStates({
                pullDown: getArgumentsItem(isPullDown) as boolean,
                pullUp: getArgumentsItem(isPullUp) as boolean,
            });
        },
        []
    );

    /**设置表格头部 */
    const setTheadData = useCallback(
        (argsName: ArgumentsArray, argWidth: ArgumentsArray) => {
            const data = getArgumentsItem(argsName);
            const width = getArgumentsItem(argWidth);
            setTheadDataStatu({ data: data as any[], width: width as any[] });
        },
        []
    );

    /**设置表格数据 */
    const setTbodyData = useCallback(
        (
            dataSource: ArgumentsArray,
            isConcate: ArgumentsBoolean,
            rowMap: ArgumentsArray
        ) => {
            const data = getArgumentsItem(dataSource);
            setCopyDataSource(data);
            const concat = getArgumentsItem(isConcate);
            // 这里单独处理，定义列数据从原数据映射
            const map = rowMap.data;
            if (!Array.isArray(data)) {
                return;
            }

            const result: any[] = [];
            data.forEach((element) => {
                const temp: any[] = [];
                if (Array.isArray(map)) {
                    map.forEach((item) => {
                        if (item) {
                            temp.push(parse(getResult(item, element)));
                        }
                    });
                }
                result.push(temp);
            });
            // 递增翻页
            if (concat) {
                setTbodyDataStatu(tbodyDataStatu.concat(result));
            } else {
                setTbodyDataStatu(result);
            }
        },
        [tbodyDataStatu]
    );

    /**
     * 从数据源覆写表格，做到表格项灵活覆写，满足列表样式的各种变换
     *
     * */
    const overrideTbodyItem = useCallback(
        (
            rowItem: ArgumentsNumber,
            colItem: ArgumentsNumber,
            override: ArgumentsString
        ) => {
            const row = (getArgumentsItem(rowItem) as number) - 1;
            const col = (getArgumentsItem(colItem) as number) - 1;

            if (
                tbodyDataStatu[row] &&
                tbodyDataStatu[row][col] &&
                copyDataSource
            ) {
                const optTbodyDataStatu = [...tbodyDataStatu];
                optTbodyDataStatu[row][col] = getArgumentsItem(
                    override,
                    copyDataSource[row]
                );
                setTbodyDataStatu(optTbodyDataStatu);
            }
        },
        [tbodyDataStatu, copyDataSource]
    );

    const [eventsDispatch, eventEmitter] = useLifeCycle(
        moduleId,
        { mount: '初始化', unmount: '卸载', pullDown: '下拉', pullUp: '上拉' },
        { setTable, setTheadData, setTbodyData, overrideTbodyItem }
    );

    /** 下拉事件*/
    const onPullDown = useCallback(async () => {
        const apiArguments = api?.find((item) => item.apiId === 'pullDown');
        if (apiArguments) {
            await requester(apiArguments || {});
        }
        // 执行下拉事务
        eventsDispatch.pullDown();
    }, [api, eventsDispatch]);

    /** 上拉事件*/
    const onPullUp = useCallback(async () => {
        const apiArguments = api?.find((item) => item.apiId === 'pullUp');
        if (apiArguments) {
            await requester(apiArguments || {});
        }
        // 执行下拉事务
        eventsDispatch.pullUp();
    }, [api, eventsDispatch]);

    return (
        <Wrapper {...props} maxHeight maxWidth>
            <div className={s.tablewrap}>
                <PullToRefresh
                    className={s.bg_orange}
                    onPullDown={onPullDown}
                    disablePullUp={!pullStates?.pullUp}
                    disablePullDown={!pullStates?.pullDown}
                    pullDownText="下拉更新"
                    pullUpText="上拉更新"
                    onPullUp={onPullUp}
                >
                    <table className={classNames(s.table, userClass.table)}>
                        {theadDataStatu?.data.length ? (
                            <thead>
                                <tr>
                                    {theadDataStatu.data.map((item, index) => (
                                        <th
                                            key={index}
                                            scope="col"
                                            style={{
                                                width: theadDataStatu.width[
                                                    index
                                                ],
                                            }}
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        ) : null}
                        {tbodyDataStatu.length ? (
                            <tbody>
                                {tbodyDataStatu.map((item, ind) => (
                                    <tr key={ind}>
                                        {item.map((itemsub, index) => (
                                            <td key={index}>{itemsub}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        ) : null}
                    </table>
                </PullToRefresh>
            </div>
        </Wrapper>
    );
};

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        Table[key] = config[key];
    }
}

export default Table;
