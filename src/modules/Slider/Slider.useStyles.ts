import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { SliderProps } from './Slider';


const useStyles = (props: SliderProps) => {

    const createClsaas = useCallback(
        () => createUseStyles({
            sliderWrap: {},
            next:{
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:after': {
                    content: '"下一个"'
                },
                '&.swiper-button-disabled': {
                    opacity: 0
                }
                
            },
            prev: {
                backgroundColor: 'rgba(0,0,0,0.3)',
                '&:after': {
                    content: '"上一个"'
                },
                '&.swiper-button-disabled': {
                    opacity: 0
                }
            },
            swiperPagination: {
                '& .swiper-pagination-bullet': {
                    backgroundColor: 'red',
                },
                '& .swiper-pagination-bullet-active': {
                    backgroundColor: 'green',
                }
            },
            swiperslide: {
            }
        }),
        [],
    )

    return createClsaas()();
};


export default useStyles