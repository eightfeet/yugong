import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { SliderProps } from './Slider';

const useStyles = (props: SliderProps) => {
    const {
        sliderWrap,
        slideItem,
        pagination,
        paginationBullet,
        paginationBulletActive,
        prev,
        next
    } = props.style as any;
    const createClsaas = useCallback(
        () =>
            createUseStyles({
                sliderWrap: sliderWrap || {},
                next: {
                    ...(next || {}),
                    '&.swiper-button-disabled': {
                        opacity: 0,
                    },
                },
                prev: {
                    ...(prev || {}),
                    '&.swiper-button-disabled': {
                        opacity: 0,
                    },
                },
                swiperPagination: {
                    ...(pagination || {}),
                    '& .swiper-pagination-bullet': (paginationBullet || {}),
                    '& .swiper-pagination-bullet-active': (paginationBulletActive || {}),
                },
                slideItem: (slideItem || {}),
            }),
        []
    );

    return createClsaas()();
};

export default useStyles;
