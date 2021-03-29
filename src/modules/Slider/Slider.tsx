import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppDataElementsTypes } from '~/types/appData';
import Swiper from 'swiper';
import SwiperCore, {
    Navigation,
    Pagination,
    Scrollbar,
    Lazy,
} from 'swiper/core';
import 'swiper/swiper-bundle.min.css';
import EventEmitter from '~/core/EventEmitter';
import { Modules } from '~/types/modules';
import Wrapper from '../Wrapper';
import isUrl from '~/core/helper/isUrl';
import getResult from '~/core/getDataFromRunningTime';
import s from './Slider.module.less';
import useStyles from './Slider.useStyles';
import staticConstants from './Slider.staticConstants';
import classNames from 'classnames';

export interface SliderProps extends AppDataElementsTypes {
    id: string;
    eventEmitter: EventEmitter;
}

interface ImagesType {
    imageUrl?: string;
    imageLink?: string;
}

interface Configs {}

SwiperCore.use([Navigation, Pagination, Scrollbar, Lazy]);

/**
 * 组件 https://github.com/kidjp85/react-id-swiper
 * 组件Props接收AppDataElementsTypes类型数据，
 * 同时接受事件处理器eventEmitter注册事件(addEventListener)、执行事件(emit)
 * @param props
 * @returns
 */

const Slider: Modules<SliderProps> = (props) => {
    // ===================================获取变量=================================== //
    const { style, eventEmitter, events = {}, layout, moduleId } = props;
    // ===================================创建运行时class============================ //
    const useClass = useStyles(props);
    // ===================================定义方法=================================== //
    const mount = useCallback(() => {
        eventEmitter.emit(events.mount);
    }, [eventEmitter, events]);

    const unmount = useCallback(() => {
        eventEmitter.emit(events.unmount);
    }, [eventEmitter, events]);

    const [images, setImages] = useState<ImagesType[]>();
    const setData = useCallback((imageUrls, imageLinks) => {
        const data: ImagesType[] = [];
        imageUrls?.forEach((element: any, index: number) => {
            data.push({
                imageUrl: getResult(element),
                imageLink: getResult(imageLinks[index]),
            });
        });

        const result = data.filter((item) => isUrl(item.imageUrl || '')) || [];
        setImages(result);
    }, []);

    const [config, setConfig] = useState<Configs>({});
    const setSlider = useCallback(
        (config: Configs) => {
            if (config) {
                setConfig(config);
            }
        },
        [setConfig]
    );

    useEffect(() => {
        // 页面挂载
        mount();
        // 页面卸载
        return () => {
            unmount();
        };
    }, [eventEmitter, mount, unmount]);

    // ===================================定义组件方法=================================== //
    //向eventEmitter注册事件，向外公布
    useMemo(() => {
        eventEmitter.addEventListener('setData', setData);
        eventEmitter.addEventListener('setSlider', setSlider);
    }, [eventEmitter, setData, setSlider]);

    const onClickImg = useCallback(
        (item) => () => {
            if (isUrl(item.imageLink)) {
                window.location.href = item.imageLink;
            }
        },
        []
    );

    // 初始化组件参数
    const params = {
        navigation: {
            nextEl: `.${useClass.next}`,
            prevEl: `.${useClass.prev}`,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    };

    useEffect(() => {
        (window as any).Swiper = Swiper;
        const swiper = new Swiper('.swiper-container', {
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                dynamicBullets: true,
            },
        });

        return () => {
            swiper.destroy();
        };
    }, [params, layout]);

    // // 创建组件
    return (
        <Wrapper {...props}>
            <div className={useClass.sliderWrap}>
                <div
                    className={classNames(
                        'swiper-container',
                        s.swipercontainer
                    )}
                >
                    <div className="swiper-wrapper">
                        {images?.map((item, index) => (
                            <div
                                className={classNames(
                                    'swiper-slide',
                                    s.swiperslide,
                                    useClass.swiperslide
                                )}
                                key={`${moduleId}-slideContent-${index}`}
                                onClick={onClickImg(item)}
                            >
                                <img
                                    src={item.imageUrl || ''}
                                    alt={`${index}`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </div>
        </Wrapper>
    );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Slider.exposeFunctions = staticConstants.exposeFunctions;

/**
 * 发布事件的静态描述
 */
Slider.exposeEvents = staticConstants.exposeEvents;

/**
 * 发布默认porps
 */
Slider.exposeDefaultProps = staticConstants.exposeDefaultProps;

export default Slider;
