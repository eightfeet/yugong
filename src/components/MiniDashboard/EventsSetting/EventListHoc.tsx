import { MinusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import { RootState } from '~/redux/store';
import { ArgumentsItem } from '~/types/appData';
import { ExposeFunctions } from '~/types/modules';
import EventItem from './EventItem';
import App from '~/components/Output';
import s from './EventListHoc.module.less';

interface EventDataList {
    /**
     * 模块名
     */
    moduleUuid: string;
    /**
     * 模块发布的方法
     */
    dispatchedFunctions: string;
    /**
     * 模块发布的方法对应的参数
     */
    arguments?: ArgumentsItem[];
}

interface Props {
    moduleEvents: EventDataList[];
}

const EventListHoc = SortableContainer(({ moduleEvents }: Props) => {
    const appData = useSelector((state: RootState) => state.appData);

    /**
     * 获取方法参数
     */
    const getFunArguments = useCallback(
        (moduleId: string): ExposeFunctions[] => {
            if (moduleId === 'global') {
                return App.exposeFunctions || [];
            }
            for (let index = 0; index < appData.length; index++) {
                const element = appData[index];
                if (moduleId === element.moduleId) {
                    return require(`~/modules/${element.type}`).default
                        .exposeFunctions;
                }
            }
            return [];
        },
        [appData]
    );


    return (
        <div>
            {
                // 当前模块发布的事件状态清单
                moduleEvents?.map((event, index) => {
                    // 获取模块静态导出的方法参数
                    const moduleExportFunctionArguments =
                        getFunArguments(event.moduleUuid) || [];
                    // 当前id模块导出的方法参数
                    const currentExportFunctionArguments =
                        moduleExportFunctionArguments.filter(
                            (item) => item.name === event.dispatchedFunctions
                        )[0]?.arguments || [];

                    let canNotSetArguments = false;
                    // 没有选择方法时不可以编辑
                    if (!event.dispatchedFunctions) {
                        canNotSetArguments = true;
                    }
                    // 无需配置参数是不可编辑
                    if (currentExportFunctionArguments.length <= 0) {
                        canNotSetArguments = true;
                    }

                    return (
                        <EventItem
                            index={index}
                            key={`${index}${event.moduleUuid}${event.dispatchedFunctions}`}
                            moduleUuid={event.moduleUuid}
                            dispatchedFunctions={event.dispatchedFunctions}
                            argumentList={event.arguments || []}
                            onChange={data => console.log(data)}
                        />
                    );
                })
            }
        </div>
    );
});

export default EventListHoc;
