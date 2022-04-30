import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { SliderProps } from "./Slider";

function createStyles(props: SliderProps) {
  return {
    sliderWrap: (style: Style) => {
      return {
        ...toStyle(style.sliderWrap),
        '& .swiper-button-prev': toStyle(style.prev),
        '& .swiper-button-prev::after': toStyle(style.prevarrow),
        '& .swiper-button-next': toStyle(style.next),
        '& .swiper-button-next::after': toStyle(style.nextarrow),

        '& .swiper-pagination': (style: Style) => ({
          ...(toStyle(style.pagination)),
          '& .swiper-pagination-bullet': toStyle(style.paginationBullet),
          '& .swiper-pagination-bullet-active':
            toStyle(style.paginationBulletActive),
        })
      }
    },
    slideItem: (style: Style) => toStyle(style.slideItem),
  }
};
// export type key of classes list
export type ClassesKey = 'sliderWrap' | 'next' | 'nextarrow' | 'prev' | 'prevarrow' | 'pagination' | 'swiperPagination' | 'paginationBullet' | 'slideItem' | 'paginationBulletActive';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles