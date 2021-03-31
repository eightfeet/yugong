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
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import requester from '~/core/fetch';

export interface SliderProps extends AppDataElementsTypes {
    id: string; // Wrapper 组件使用
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
    const { eventEmitter, style, events = {}, layout, moduleId, api } = props;
    const pageData = useSelector((state: RootState) => state.pageData);
    const prefix = `swiper${moduleId}`;
    // ===================================创建运行时class============================ //
    const useClass = useStyles(props.style);
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

    const [, setConfig] = useState<Configs>({});
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
    }, [mount, unmount]);

    // API请求 注意依赖关系
    useEffect(() => {
        const apiArguments = api?.find(item => item.apiId === 'init');
        requester(apiArguments || {});
    }, [api])

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
    const swiperRef = useRef<Swiper>();
    useEffect(() => {
        const params = {
            resizeObserver: true,
            navigation: {
                nextEl: `.${prefix}next`,
                prevEl: `.${prefix}prev`,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        };
        swiperRef.current = new Swiper(`.${prefix}container`, params);
        return () => {
            if (swiperRef.current) {
                swiperRef.current.destroy(true, true);
            }
        };
    }, [prefix]);

    useEffect(() => {
        if (swiperRef.current) {
            swiperRef.current.update();
        }
    }, [images, style]);

    // 高度需要实时变化，将他处理为内链样式
    const wrapWHStyle = useCallback(() => {
        const lw =
            (window.innerWidth - (pageData?.space || 0)) /
            (pageData?.cols || 1);
        const width = (layout?.w || 1) * lw - (pageData?.space || 0);
        const height =
            (layout?.h || 1) * (pageData?.rowHeight || 1) +
            (layout?.h - 1 || 1) * (pageData?.space || 1) -
            layout?.h;
        return { width: `${width}px`, height: `${height}px` };
    }, [
        layout?.h,
        layout?.w,
        pageData?.cols,
        pageData?.rowHeight,
        pageData?.space,
    ]);

    // 创建组件
    return (
        <Wrapper {...props}>
            <div className={classNames(s.sliderWrap, useClass.sliderWrap)} style={wrapWHStyle()}>
                <div
                    className={classNames(
                        'swiper-container',
                        s.swipercontainer,
                        `${prefix}container`
                    )}
                >
                    <div className="swiper-wrapper">
                        {images?.map((item, index) => (
                            <div
                                className={classNames(
                                    'swiper-slide',
                                    s.swiperslide,
                                    useClass.slideItem
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
                    <div
                        className={classNames(
                            s.next,
                            useClass.next,
                            `${prefix}next`
                        )}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 443.52 443.52"
                        >
                            <path d="M336.226 209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132.42-6.388 6.614-6.388 17.099 0 23.712l192.734 192.734-192.734 192.734c-6.663 6.664-6.663 17.468 0 24.132 6.665 6.663 17.468 6.663 24.132 0l204.8-204.8c6.663-6.665 6.663-17.468 0-24.132z" />
                        </svg>
                    </div>
                    <div
                        className={classNames(
                            s.prev,
                            useClass.prev,
                            `${prefix}prev`
                        )}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 443.52 443.52"
                        >
                            <path d="M143.492 221.863L336.226 29.129c6.663-6.664 6.663-17.468 0-24.132-6.665-6.662-17.468-6.662-24.132 0l-204.8 204.8c-6.662 6.664-6.662 17.468 0 24.132l204.8 204.8c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L143.492 221.863z" />
                        </svg>
                    </div>
                    <div
                        className={classNames(
                            'swiper-pagination',
                            useClass.swiperPagination
                        )}
                    ></div>
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

/**
 * 发布默认Api
 */
 Slider.exposeApi = staticConstants.exposeApi;

export default Slider;
