import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnyObjectType, AppDataElementsTypes } from "~/types/appData";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import styleCompiler from "~/compiler";
import EventEmitter from "~/core/EventEmitter";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import isUrl from "~/core/helper/isUrl";
import getResult from "~/core/getDataFromRunningTime";
import s from "./Slider.module.less";

const withAutoplay = require("react-awesome-slider/dist/autoplay").default;

const AutoSlide = withAutoplay(AwesomeSlider);
interface Props extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

interface ImagesType {
  imageUrl?: string;
  imageLink?: string;
}

interface Configs {
  /* 自动播放 */
  autoPlay?: "0" | "1";
  /** 交互时打断自动播放 */
  cancelOnInteraction?: "0" | "1";
  break?: "0" | "1";
  /** 显示底部导航按钮 */
  bullets?: "0" | "1";
  /** 宽屏时显示左右箭头按钮 */
  buttons?: "0" | "1";
  /** 动画 */
  animation?: string;
  /* 间隔时间 */
  interval?: string;
}

/**
 * 组件 换个组件 https://github.com/kidjp85/react-id-swiper
 * 组件Props接收AppDataElementsTypes类型数据，
 * 同时接受事件处理器eventEmitter注册事件(addEventListener)、执行事件(emit)
 * @param props
 * @returns
 */

const Slider: Modules<Props> = (props) => {
  const { style, eventEmitter, events = {}, layout } = props;

  const [config, setConfig] = useState<Configs>({});
  const sliderRef = useRef(null);
  useEffect(() => {
    // do auto play 😭 !!!
    if (
      sliderRef.current &&
      config.autoPlay === "0" &&
      config.buttons !== "0"
    ) {
      const ele = sliderRef.current;
      setTimeout(() => {
        ((ele as any).querySelector(".awssld__next") as any).click();
      }, parseInt(config.interval || "") || 2000);
    }
  }, [sliderRef, config]);

  const pageData = useSelector((state: RootState) => state.pageData);
  const lw =
    (window.innerWidth - (pageData?.space || 0)) / (pageData?.cols || 1);
  const width = (layout?.w || 1) * lw - (pageData?.space || 0);
  const height =
    (layout?.h || 1) * (pageData?.rowHeight || 1) +
    (layout?.h - 1 || 1) * (pageData?.space || 1);

  const [images, setImages] = useState<ImagesType[]>();

  const mount = useCallback(() => {
    eventEmitter.emit(events.mount);
  }, [eventEmitter, events]);

  const unmount = useCallback(() => {
    eventEmitter.emit(events.unmount);
  }, [eventEmitter, events]);

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
  const setSlider = useCallback(
    (config: Configs) => {
      if (config) {
        config.cancelOnInteraction = config.break;
        delete config.break;
        setConfig(config);
      }
    },
    [setConfig]
  );

  // ===================================创建组件=================================== //

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

  const [ready, setReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 1000);
  }, []);

  // 显示按钮 bullets
  return (
    <Wrapper {...props}>
      <div ref={sliderRef}>
        {ready ? (
          <AutoSlide
            style={{
              overflow: "hidden",
              width: `${width}px`,
              height: `${height}px`,
              ...(styleCompiler(style.slider).style || {}),
            }}
          >
            {images?.map((item, index) => (
              <div className={s.imgwrap} key={index} onClick={onClickImg(item)}>
                <img src={item.imageUrl || ""} alt={`${index}`} />
              </div>
            ))}
          </AutoSlide>
        ) : null}
      </div>
    </Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Slider.exposeFunctions = [
  {
    name: "setData",
    description: "设置数据源",
    arguments: [
      {
        type: "array",
        name: "imageUrls",
        describe: "图片地址",
        data: [],
        fieldName: "imageUrls",
      },
      {
        type: "array",
        name: "imageLinks",
        describe: "与图片地址保持索引一致空值图片不可点击",
        data: [],
        fieldName: "imageLinks",
      },
    ],
  },
  /* 自动播放 */
  // autoPlay?: '0' | '1';
  // /** 交互时打断自动播放 */
  // cancelOnInteraction?: '0' | '1';
  // /** 显示底部导航按钮 */
  // bullets?: '0' | '1';
  // /** 宽屏时显示左右箭头按钮 */
  // buttons?: '0' | '1';
  // /** 动画 */
  // animation?: string;
  // /* 间隔时间 */
  // interval?: string
  {
    name: "setSlider",
    description: "Slider 设置",
    arguments: [
      {
        type: "object",
        name: "configs",
        describe: `
          (autoPlay: 自动播放-0开启1关闭)
        `,
        data: {
          autoPlay: "0",
        } as Configs,
        fieldName: "configs",
      },
    ],
  },
];

/**
 * 发布事件的静态描述
 */
Slider.exposeEvents = [
  {
    name: "mount",
    description: "挂载",
  },
  {
    name: "unmount",
    description: "卸载",
  },
];

/**
 * 发布默认porps
 */
Slider.exposeDefaultProps = {
  layout: {
    w: 4, // 宽
    h: 4, // 高
  },
  style: {
    basic: {},
    slider: {},
  },
};

export default Slider;
