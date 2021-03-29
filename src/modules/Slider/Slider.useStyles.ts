import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { store } from '~/redux/store';
import { SliderProps } from './Slider';


const useStyles = (props: SliderProps) => {
    const pageData = store.getState().pageData;
    const {layout, style} = props;
    const lw =
        (window.innerWidth - (pageData?.space || 0)) / (pageData?.cols || 1);
    const width = (layout?.w || 1) * lw - (pageData?.space || 0);
    const height =
        (layout?.h || 1) * (pageData?.rowHeight || 1) +
        (layout?.h - 1 || 1) * (pageData?.space || 1);


    const createClsaas = useCallback(
        createUseStyles({
            sliderWrap: {
                width: `${width}px`,
                height: `${height}px`,
            },
            next:{
                background: 'green',
                '&:after': {
                    content: '"下一个"'
                }
            },
            prev: {
                background: 'yellow',
                '&:after': {
                    content: '"上一个"'
                }
            },
            swiperPagination: {
                width: '100px',
                background: 'orange',
                height: 100
            },
            swiperslide: {
            }
        }),
        [style],
    )

    return createClsaas();
};


export default useStyles