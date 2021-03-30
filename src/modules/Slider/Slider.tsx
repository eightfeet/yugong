import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppDataElementsTypes } from "~/types/appData";
import Swiper from "swiper";
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  Lazy,
} from "swiper/core";
import "swiper/swiper-bundle.min.css";
import EventEmitter from "~/core/EventEmitter";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import isUrl from "~/core/helper/isUrl";
import getResult from "~/core/getDataFromRunningTime";
import s from "./Slider.module.less";
import useStyles from "./Slider.useStyles";
import staticConstants from "./Slider.staticConstants";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";

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
  const { eventEmitter, events = {}, layout, moduleId } = props;
  const pageData = useSelector((state: RootState) => state.pageData)
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

    const result = data.filter((item) => isUrl(item.imageUrl || "")) || [];
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
  }, [eventEmitter, mount, unmount]);

  // ===================================定义组件方法=================================== //
  //向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("setData", setData);
    eventEmitter.addEventListener("setSlider", setSlider);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = {
    resizeObserver: true,
    navigation: {
      nextEl: `.${prefix}next`,
      prevEl: `.${prefix}prev`,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  };

  const swiperRef = useRef<Swiper>();
  const drawSwiper = useCallback(() => {
    if (swiperRef.current) {
      swiperRef.current.destroy(true, true);
    }
    swiperRef.current = new Swiper(`.${prefix}container`, params);
  }, [params, prefix]);

  
  useEffect(() => {
    drawSwiper()
  }, [drawSwiper, prefix]);

  // 高度需要实时变化，将他处理为内链样式
  const wrapWHStyle = useCallback(
    () => {
      const lw =
        (window.innerWidth - (pageData?.space || 0)) / (pageData?.cols || 1);
      const width = (layout?.w || 1) * lw - (pageData?.space || 0);
      const height =
          (layout?.h || 1) * (pageData?.rowHeight || 1) +
          (layout?.h - 1 || 1) * (pageData?.space || 1) - layout?.h;
          return {width: `${width}px`, height: `${height}px`}
      },
    [layout?.h, layout?.w, pageData?.cols, pageData?.rowHeight, pageData?.space],
  )

  // 创建组件
  return (
    <Wrapper {...props}>
      <div className={useClass.sliderWrap} style={wrapWHStyle()}>
        <div className={classNames("swiper-container", s.swipercontainer, `${prefix}container`)} >
          <div className="swiper-wrapper">
            {images?.map((item, index) => (
              <div
                className={classNames(
                  "swiper-slide",
                  s.swiperslide,
                  useClass.slideItem
                )}
                key={`${moduleId}-slideContent-${index}`}
                onClick={onClickImg(item)}
              >
                <img src={item.imageUrl || ""} alt={`${index}`} />
              </div>
            ))}
          </div>
          <div className={classNames(s.next, useClass.next, `${prefix}next`)} />
          <div className={classNames(s.prev, useClass.prev, `${prefix}prev`)} />
          <div className={classNames("swiper-pagination", useClass.swiperPagination)}></div>
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
