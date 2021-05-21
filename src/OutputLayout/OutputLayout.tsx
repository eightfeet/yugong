/**
 * OutputLayout，应用端通过懒加按需加载模块以保证性能，
 * 在编辑模式下是需要通信appData到Dashboard，确保编辑端与应用端数据保持一致
 */
import React, { useCallback, useEffect, useRef } from 'react';
import GridLayout, { Layout as LayoutDataType } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import s from './OutputLayout.module.scss';
import GridLine from '~/components/GridLine';
import Elements from '~/components/Elements';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Dispatch } from '~/redux/store';
import useLocalStorage from '~/hooks/useLocalStorage';
import usePostMessage from '~/hooks/usePostMessage';
import EventEmitter from '~/core/EventEmitter';
import { backgroundGroup } from '~/compiler/compiler';
import { cloneDeep } from 'lodash';
// 当前是否被ifream引用
const visualSense = window.self === window.top;
// const windowsHeight = window.innerHeight;

interface LayoutProps {
    /**
     * 单行高度
     * @type {number}
     * @memberof LayoutProps
     */
    rowHeight: number;
    /**
     * 布局列数
     * @type {number}
     * @memberof LayoutProps
     */
    cols: number;
    /**
     * 事件中心
     * @memberof LayoutProps
     */
    eventEmitter: EventEmitter;
    /**
     * 字体尺寸
     */
    rootFontsize: number;
    /**间距 */
    space: number;
}

/**
 * App 应用端
 *
 * @param {LayoutProps} { isEditing, rowHeight, cols, width, height, data}
 * @return {*}
 */
const OutputLayout: React.FC<LayoutProps> = ({
    rowHeight,
    cols,
    space,
    eventEmitter,
}) => {
    const { updateAppData } = useDispatch<Dispatch>().appData;
    const { updatePage } = useDispatch<Dispatch>().pageData;
    const { setEditingId, setIsEditing } = useDispatch<Dispatch>().controller;
    const { removeActivationItem } = useDispatch<Dispatch>().activationItem;

    const pageData = useSelector((state: RootState) => state.pageData);
    const appData = useSelector((state: RootState) => state.appData);
    const runningTimes = useSelector((state: RootState) => state.runningTimes);
    const { isEditing, editingId } = useSelector((state: RootState) => state.controller);

    const ref = useRef(null);
    // 缓存
    const [, setAppdataLocalStorage] = useLocalStorage('appData', null);

    useEffect(() => {
        const topLocation = window.top?.location;
        if (
            topLocation.origin === window.origin &&
            topLocation.pathname === '/dashboard'
        ) {
            setIsEditing(true);
        }
    }, [setIsEditing]);

    // 接收与处理message
    const sendMessage = usePostMessage((data) => {
        const { tag, value } = data;
        switch (tag) {
            case 'setIsEditing':
                setIsEditing(value);
                break;
            case 'updateAppData':
                updateAppData(value);
                setAppdataLocalStorage(value);
                break;
            case 'removeActivationItem':
                removeActivationItem();
                eventEmitter.clear(editingId || '')
                break;
            case 'id':
                setEditingId(value);
                break;
            case 'updatePage':
                updatePage(value);
                break;
            default:
                break;
        }
    });

    /**
     * 更新GridLine布局数据到appData
     * 这里不要忽略被选择项（activationItem）的数据更新, 在编辑端修改
     */
    const onLayoutChange = useCallback(
        (layout: LayoutDataType[]) => {
            // 更新appData
            const optAppdata = cloneDeep(appData);
            optAppdata.forEach((item) => {
                layout.forEach((element) => {
                    if (item.moduleId === element.i) {
                        item.layout = element;
                    }
                });
            });

            // 通知父级窗口变更数据
            sendMessage(
                {
                    tag: 'updateAppData',
                    value: optAppdata,
                },
                window.top
            );
            updateAppData(optAppdata);
            setAppdataLocalStorage(optAppdata);
        },
        [appData, sendMessage, setAppdataLocalStorage, updateAppData]
    );

    const generateStyle = useCallback(() => {
        const style = {
            ...backgroundGroup(pageData.style?.backgroundGroup || {}).result,
        };
        return style;
    }, [pageData.style?.backgroundGroup]);

    // 同步runningTimeData
    useEffect(() => {
        sendMessage(
            {
                tag: 'updateRunningTimes',
                value: runningTimes,
            },
            window.top
        );
    }, [runningTimes, sendMessage]);

    // 渲染不展示模块
    const renderNoDisplay = () => {
        const copyData = [...appData];
        const optAppdata = copyData.filter(
            (fItem) => fItem.layout?.w === 0 || fItem.layout?.h === 0
        );
        return optAppdata.map((item) => {
            // 事件处理器的bind方法将事件处理器绑定到各个组件
            const itemMerge = {
                eventEmitter: eventEmitter.bind(item.moduleId),
                ...item,
            };
            return (
                <div
                    key={item.layout?.i}
                    className={s.nodisplay}
                    id={item.layout?.i}
                >
                    <Elements id={item.layout?.i} {...itemMerge} />
                </div>
            );
        });
    };

    const renderGridItem = () => {
        // const maxH = Math.floor(windowsHeight / rowHeight);
        const copyData = [...appData];
        const optAppdata = copyData.filter(
            (fItem) => fItem.layout?.w !== 0 && fItem.layout?.h !== 0
        );
        return optAppdata.map((item) => {
            // 确保宽度不超过屏幕栅格
            // if (item.layout && item.layout.h > maxH) {
                // item.layout.h = maxH;
            // }
            if (item.layout && item.layout.w > cols) {
                item.layout.w = cols;
            }
            // 事件处理器的bind方法将事件处理器绑定到各个组件
            const itemMerge = {
                eventEmitter: eventEmitter.bind(item.moduleId),
                ...item,
            };
            return (
                <div
                    id={`wrap-${item.layout?.i}`}
                    className={classNames(
                        s.block,
                        isEditing === false ? s.view : s.modify
                    )}
                    key={item.layout?.i}
                    data-grid={{
                        ...item.layout,
                        // 编辑模式或预览模式定义为不可编辑
                        // GridLayout data-grid未能热更新，这里用visualSense来确定当前是否在编辑模式下
                        static: visualSense,
                    }}
                >
                    <Elements id={item.layout?.i} {...itemMerge} />
                </div>
            );
        });
    };

    const renderGridLayout = () => (
        <GridLayout
            onLayoutChange={onLayoutChange}
            compactType={null}
            cols={cols}
            rowHeight={rowHeight}
            width={document.body.offsetWidth}
            margin={[space, space]}
            isDraggable={isEditing}
        >
            {renderGridItem()}
        </GridLayout>
    );

    return (
        <div className={s.layout} ref={ref} style={generateStyle()}>
            {isEditing ? (
                <GridLine
                    width={window.innerWidth}
                    cols={cols}
                    rowHeight={rowHeight}
                    height={document.body.scrollHeight}
                    space={space}
                />
            ) : null}
            {renderNoDisplay()}
            <>{renderGridLayout()}</>
        </div>
    );
};

export default OutputLayout;
