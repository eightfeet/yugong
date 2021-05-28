import React from 'react';
import { AppDataElementsTypes } from 'types/appData';
import LazyLoader from '~/components/LazyLoader';

/**
 * 元素
 * @interface ElementsProps
 * @extends {AppDataElementsTypes}
 */
interface ElementsProps extends AppDataElementsTypes {}

const Elements: React.FC<ElementsProps> = (props) => {
    console.log('props', props);
    
    const { type } = props;
    return (
        <LazyLoader
            path={`modules/${type}`}
            {...props}
        />
    );
};

export default Elements;
