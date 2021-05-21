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
    currentModuleEvents: EventDataList[];
}

const Eventlisthoc = SortableContainer(({ currentModuleEvents }: Props) => {
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
        <>
            {
                // 当前模块发布的事件状态清单
                currentModuleEvents.map((event, index) => {
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
                        <Row
                            className={s.row}
                            gutter={4}
                            key={`${index}${event.moduleUuid}${event.dispatchedFunctions}`}
                        >
                            <EventItem
                                index={index}
                                moduleUuid={event.moduleUuid}
                                dispatchedFunctions={event.dispatchedFunctions}
                                argumentList={event.arguments || []}
                                onChange={onChangeItem(index)}
                            />
                            <Col span={4} className={s.minuswrap}>
                                {/** 未选择方法时不可以编辑参数 */}
                                <Button
                                    icon={<SettingOutlined />}
                                    onClick={onSetArg({
                                        argumentList: event.arguments || [],
                                        index,
                                        functionName: event.dispatchedFunctions,
                                        functionArgumentList:
                                            currentExportFunctionArguments,
                                    })}
                                    disabled={canNotSetArguments}
                                >
                                    参数
                                </Button>
                            </Col>
                            <Col span={2} className={s.minuswrap}>
                                <Button
                                    size="small"
                                    icon={
                                        <MinusOutlined
                                            onClick={onMinus(index)}
                                        />
                                    }
                                />
                            </Col>
                        </Row>
                    );
                })
            }
        </>
    );
});

export default Eventlisthoc;
