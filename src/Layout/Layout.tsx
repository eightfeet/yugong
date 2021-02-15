import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import GridLayout, { Layout as LayoutDataType } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import s from './Layout.module.scss';
import GridLine from '~/components/GridLine';
import Elements from '~/components/Elements';
import classNames from 'classnames';
import { AppDataListTypes } from '~/types/appData';

interface LayoutProps {
    /**
     * 页面是否正在编辑
     * @type {boolean}
     * @memberof LayoutProps
     */
    isEditing?: boolean;
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
     * 宽度
     * @type {number}
     * @memberof LayoutProps
     */
    width?: number;
    /**
     * 高度
     * @type {number}
     * @memberof LayoutProps
     */
    height?: number;
    /**
     * 编辑器数据
     * @type {{
     *     layout: GridLayout.Layout;
     *     config: any
     *   }[]}
     * @memberof LayoutProps
     */
    data: AppDataListTypes;
    onChange?: (layout: LayoutDataType[]) => void;
    onClick?:(item: any) => void;
    /**
     * 设计模式 | 预览模式
     * true | false 
     * @type {boolean}
     * @memberof LayoutProps
     */
    designModal?: boolean;
}

/**
 * 编辑器
 *
 * @param {LayoutProps} { isEditing, rowHeight, cols, width, height, data}
 * @return {*}
 */
const Layout: React.FC<LayoutProps> = ({
    isEditing,
    rowHeight,
    cols,
    width,
    height,
    data,
    designModal,
    onChange,
    onClick
}) => {
    const [wrapWidth, setWrapWidth] = useState(0);
    const [wrapHeight, setWrapHeight] = useState(0);
    const ref = useRef(null);
    
    const setSize = useCallback(() => {
        let height = 0;
        let width = 0;
        if (ref !== null) {
            if (!ref.current) {
                return;
            }
            height = (ref.current as any).scrollHeight;
            width = (ref.current as any).scrollWidth;
            setWrapHeight(height);
            setWrapWidth(width);
        }
    }, []);

    useEffect(() => {
        setSize();
    }, [width, height, setSize]);


    const onLayoutChange = useCallback(
        (layout: LayoutDataType[]) => {
            if (onChange instanceof Function) {
                onChange(layout);
            }
            setSize();
        },
        [onChange, setSize]
    );

    return (
        <div className={s.layout} ref={ref}>
            {designModal ? (
                <GridLine
                    width={window.innerWidth}
                    cols={cols}
                    rowHeight={rowHeight}
                    height={wrapHeight}
                    space={10}
                />
            ) : null}
            <GridLayout
                onLayoutChange={onLayoutChange}
                cols={cols}
                rowHeight={rowHeight}
                width={wrapWidth}
                autoSize
            >
                {data.map((item) => (
                    <div
                        id={`wrap-${item.layout.i}`}
                        className={classNames(
                            s.block,
                            !designModal ? null : s.modify
                        )}
                        key={item.layout.i}
                        data-grid={{
                            ...(item.layout),
                            static: !isEditing,
                        }}
                    >
                        <Elements id={item.layout.i} {...item} />
                    </div>
                ))}
            </GridLayout>
        </div>
    );
};

export default Layout;
