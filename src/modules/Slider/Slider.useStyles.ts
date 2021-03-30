import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';


const useStyles = createUseStyles({
    sliderWrap: (style: any) => style.sliderWrap || {},

    next: (style) => ({
        ...(style.next || {}),
        '&.swiper-button-disabled': {
            opacity: 0,
        },
    }),
    prev: (style) => ({
        ...(style.prev || {}),

        '&.swiper-button-disabled': {
            opacity: 0,
        },
    }),

    swiperPagination: (style) => ({
        ...(styleCompiler(style.pagination).style || {}),

        '& .swiper-pagination-bullet': style.paginationBullet || {},
        '& .swiper-pagination-bullet-active':
            style.paginationBulletActive || {},
    }),

    slideItem: (style) => style.slideItem || {},
});

export default useStyles;
