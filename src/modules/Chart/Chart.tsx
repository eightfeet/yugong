import EventEmitter from '~/core/EventEmitter';
import ReactECharts from 'echarts-for-react';
import { AppDataElementsTypes, ArgumentsItem, ArgumentsNumber } from '~/types/appData';
import { Modules } from '~/types/modules';
import requester from '~/core/fetch';
import config from './Chart.config';
import Wrapper from '../Wrapper';
import useLifeCycle from '~/hooks/useLifeCycle';
import useStyles from './Chart.useStyles';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import isType from '~/core/helper/isType';
import { indexOf, isNumber } from 'lodash';

export interface ChartProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

const Chart:Modules<ChartProps> = (props) => {
    const timer = useRef<number | NodeJS.Timeout>();
    const { style, moduleId, api } = props;

    const [options, setOptions] = useState<{[keys: string]: any}>({});
    const [cycle, setCycle] = useState<number>(3000)

    const getOption = useCallback((options) => {
        const optionsArg = getArgumentsItem(options) as any;
        if (isType(optionsArg, 'Object')) {
            const opt = {...options, ...optionsArg};
            if (timer.current !== undefined) {
                clearInterval(timer.current as number)
            }
            setOptions(opt);
        }
    }, []);

    // 设置数据周期
    const setDataIntervalNumber = useCallback(
        (int: ArgumentsItem) => {
            const intArg = getArgumentsItem(int) as ArgumentsNumber;
            if ( isNumber(intArg) && intArg > 0) setCycle(intArg);
        },
        [],
    )

    // inject class from jss
    const userClass = useStyles(style);
    // Register events and publish functions
    const [eventsDispatch] = useLifeCycle(
        moduleId,
        // register events
        {
            mount: '初始化',
            unmount: '卸载'
        },
        // publish functions
        { 
            getOption,
            setDataIntervalNumber
        }
    );

    const handleChartData = useCallback(
        async () => {
            const apiArguments = (api || config.exposeApi)?.find(
                (item) => item.apiId === 'dataSet'
            );
            let data = undefined;
            let opt = options;
            // 启用模拟数据
            if (apiArguments?.url && apiArguments?.url?.indexOf('chartmock') !== -1) {
                apiArguments.url = `${process.env.REACT_APP_PUBLIC_PATH || ''}/template/chartmock/${Math.floor(Math.random()*4)+1}.json`;
                opt = {};
            }
            data = await requester(apiArguments || {});

            if (data && isType(data, 'Object')) {
                opt = {...opt, ...data.response};
                setOptions(opt);
            }
        },
        [api, options]
    );

    useEffect(() => {
        // 当有设置interval时更新数据定时更新数据
        if (cycle) {
            timer.current = setInterval(async () => {
                await handleChartData();
            }, cycle);
        } else {
            // 仅更新一次数据
            handleChartData();
        }
        
        return () => {
            if (timer.current !== undefined) {
                clearInterval(timer.current as number)
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cycle]);

    return (
        <Wrapper {...props} maxWidth maxHeight>
            <div className={userClass.wrap}>
                <ReactECharts option={options} />
            </div>
        </Wrapper>
    )
}

// bind static
for (const key in config) {
    if (Object.prototype.hasOwnProperty.call(config, key)) {
        Chart[key] = config[key];
    }
}

export default Chart;