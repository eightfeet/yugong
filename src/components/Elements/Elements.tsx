import React from 'react';
import { useSelector } from 'react-redux';
import { AppDataElementsTypes } from 'types/appData';
import LazyLoader from '~/components/LazyLoader';
import { RootState } from '~/redux/store';

/**
 * To do list !!!
 * step1: 元件按需加载处理
 * step2: 元件框架与数据结构定义
 * step3: 测试元件
 *
 * @interface ElementsProps
 * @extends {AppDataElementsTypes}
 */
interface ElementsProps extends AppDataElementsTypes {
    id?: string;
    layout?: {
        [keys: string]: any;
    };
}

const Elements: React.FC<ElementsProps> = (props) => {
    const { type } = props;
    return (
        <LazyLoader
            path={`modules/${type}`}
            {...props}
        />
    );
};

export default Elements;
