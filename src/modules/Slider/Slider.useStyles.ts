import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';


const useStyles = createUseStyles<string, any>({
    sliderWrap: (style) => styleCompiler(style.sliderWrap).style || {},
    next: (style) => ({
        ...styleCompiler(style.next).style || {},
        '&.swiper-button-disabled': {
            opacity: 0,
        },
    }),
    prev: (style) => ({
        ...styleCompiler(style.prev).style || {},
        '&.swiper-button-disabled': {
            opacity: 0,
        },
    }),

    swiperPagination: (style) => ({
        ...(styleCompiler(style.pagination).style || {}),

        '& .swiper-pagination-bullet': styleCompiler(style.paginationBullet).style || {},
        '& .swiper-pagination-bullet-active':
        styleCompiler(style.paginationBulletActive).style || {},
    }),

    slideItem: (style) => styleCompiler(style.slideItem).style || {},
});

export default useStyles;


