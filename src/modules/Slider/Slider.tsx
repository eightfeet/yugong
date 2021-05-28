import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AppDataElementsTypes, ArgumentsArray, ArgumentsBoolean, ArgumentsNumber } from "~/types/appData";
import Swiper, { Autoplay } from "swiper";
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
import s from "./Slider.module.less";
import useStyles from "./Slider.useStyles";
import config from "./Slider.config";
import classNames from "classnames";
import requester from "~/core/fetch";
import { getArguments, getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import useLifeCycle from "~/hooks/useLifeCycle";

export interface SliderProps extends AppDataElementsTypes {
  id: string; // Wrapper 组件使用
  eventEmitter: EventEmitter;
}

interface ImagesType {
  imageUrl?: string;
  imageLink?: string;
}

SwiperCore.use([Navigation, Pagination, Scrollbar, Lazy, Autoplay]);

/**
 * 组件 https://github.com/kidjp85/react-id-swiper
 * 组件Props接收AppDataElementsTypes类型数据，
 * 同时接受事件处理器eventEmitter注册事件(addEventListener)、执行事件(emit)
 * @param props
 * @returns
 */

const Slider: Modules<SliderProps> = (props) => {
  // ===================================获取变量=================================== //
  const { style, moduleId, api } = props;
  const prefix = `swiper${moduleId}`;
  // ===================================创建运行时class============================ //
  const useClass = useStyles(props.style);
  // ===================================定义方法=================================== //

  const [images, setImages] = useState<ImagesType[]>();
  const [delay, setDelay] = useState<number>(0);
  const [hideNav, setHideNav] = useState(false);
  const [hidePage, setHidePage] = useState(false);
  const [breakInterface, setBreakInterface] = useState(false);
  // ===================================eventEmitter事件定义=================================== //
  const setData = useCallback((imageUrls: ArgumentsArray, imageLinks: ArgumentsArray) => {
    const data: ImagesType[] = [];
    const imageUrlsData = getArgumentsItem(imageUrls);
    const imageLinksData = getArgumentsItem(imageLinks);
    (imageUrlsData as any[])?.forEach((element: any, index: number) => {
      data.push({
        imageUrl: element,
        imageLink: imageLinksData[index],
      });
    });

    const result = data.filter((item) => isUrl(item.imageUrl || "")) || [];
    setImages(result);
  }, []);

  const setSlider = useCallback(
    (
      navigation: ArgumentsBoolean,
      pagination: ArgumentsBoolean,
      delay: ArgumentsNumber,
      disableOnInteraction: ArgumentsBoolean
    ) => {
      const data = getArguments([navigation, pagination, delay, disableOnInteraction]);
  
      if (data.delay && data.delay > 0) {
        setDelay(data.delay);
      } else {
        setDelay(0);
      }

      if (data.disableOnInteraction) {
        setBreakInterface(true);
      } else {
        setBreakInterface(false);
      }

      if (data.navigation) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }

      if (data.pagination) {
        setHidePage(true);
      } else {
        setHidePage(false);
      }
    },
    [setDelay]
  );

  const [,eventEmitter] = useLifeCycle(moduleId, {mount: '初始化', unmount: '卸载'}, {setData, setSlider})

  // API请求 注意依赖关系
  useEffect(() => {
    const apiArguments = api?.find((item) => item.apiId === "init");
    requester(apiArguments || {});
  }, [api]);

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
  const swiperRef = useRef<Swiper>();
  useEffect(() => {
    const params: { [keys: string]: any } = {
      resizeObserver: true,
    };

    if (hideNav === false) {
      params.navigation = {
        nextEl: `.${prefix}next`,
        prevEl: `.${prefix}prev`,
      };
    }
    if (hideNav === true) {
      delete params.navigation;
    }

    if (hidePage === false) {
      params.pagination = {
        el: ".swiper-pagination",
        clickable: true,
      };
    }
    if (hidePage === true) {
      delete params.pagination;
    }

    if (delay > 0) {
      params.autoplay = {
        delay,
      };
      if (breakInterface === true) {
        params.autoplay.disableOnInteraction = true;
      } else {
        params.autoplay.disableOnInteraction = false;
      }
    } else {
      delete params.autoplay;
    }
    swiperRef.current = new Swiper(`.${prefix}container`, params);
    return () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
      }
    };
  }, [prefix, delay, hideNav, hidePage, breakInterface]);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [images, style]);

  // 创建组件
  return (
    <Wrapper {...props} maxWidth maxHeight>
      <div
        className={classNames(
          "swiper-container",
          s.swipercontainer,
          `${prefix}container`
        )}
      >
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
        {hideNav ? null : (
          <>
            <div className={classNames(s.next, useClass.next, `${prefix}next`)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 443.52 443.52"
              >
                <path d="M336.226 209.591l-204.8-204.8c-6.78-6.548-17.584-6.36-24.132.42-6.388 6.614-6.388 17.099 0 23.712l192.734 192.734-192.734 192.734c-6.663 6.664-6.663 17.468 0 24.132 6.665 6.663 17.468 6.663 24.132 0l204.8-204.8c6.663-6.665 6.663-17.468 0-24.132z" />
              </svg>
            </div>
            <div className={classNames(s.prev, useClass.prev, `${prefix}prev`)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 443.52 443.52"
              >
                <path d="M143.492 221.863L336.226 29.129c6.663-6.664 6.663-17.468 0-24.132-6.665-6.662-17.468-6.662-24.132 0l-204.8 204.8c-6.662 6.664-6.662 17.468 0 24.132l204.8 204.8c6.78 6.548 17.584 6.36 24.132-.42 6.387-6.614 6.387-17.099 0-23.712L143.492 221.863z" />
              </svg>
            </div>
          </>
        )}
        {hidePage ? null : (
          <div
            className={classNames(
              "swiper-pagination",
              useClass.swiperPagination
            )}
          ></div>
        )}
      </div>
    </Wrapper>
  );
};

// bind static
for (const key in config) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    Slider[key] = config[key];
  }
}

export default Slider;
