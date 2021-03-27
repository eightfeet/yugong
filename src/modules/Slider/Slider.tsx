import { useCallback, useEffect, useMemo, useState } from "react";
import { AppDataElementsTypes } from "~/types/appData";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import styleCompiler from "~/compiler";
import EventEmitter from "~/core/EventEmitter";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import { useSelector } from "react-redux";
import { RootState } from "~/redux/store";
import isUrl from "~/core/helper/isUrl";
import getResult from "~/core/getDataFromRunningTime";
import s from './Slider.module.less'

interface Props extends AppDataElementsTypes {
  id: string;
  eventEmitter: EventEmitter;
}

interface ImagesType {
  imageUrl?: string;
  imageLink?: string;
}

/**
 * 组件
 * 组件Props接收AppDataElementsTypes类型数据，
 * 同时接受事件处理器eventEmitter注册事件(addEventListener)、执行事件(emit)
 * @param props
 * @returns
 */

const Slider: Modules<Props> = (props) => {
  const { style, eventEmitter, events = {}, layout } = props;
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

  const onMount = useCallback((imageUrls, imageLinks) => {
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
  const onUnmount = useCallback(() => {}, []);

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
    eventEmitter.addEventListener("onMount", onMount);
    eventEmitter.addEventListener("onUnmount", onUnmount);
  }, [eventEmitter, onMount, onUnmount]);

  const onClickImg = useCallback(
    (item) => () => {
      if (isUrl(item.imageLink)) {
        window.location.href = item.imageLink;
      }
    },
    [],
  )
  
  return (
    <Wrapper {...props}>
      <AwesomeSlider style={{ width: `${width}px`, height: `${height}px`, ...(styleCompiler(style.slider).style || {}) }}>
        {images?.map((item, index) => (
          <div className={s.imgwrap} key={index} onClick={onClickImg(item)}>
            <img src={item.imageUrl || ""} alt={`${index}`} />
          </div>
        ))}
      </AwesomeSlider>
    </Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Slider.exposeFunctions = [
  {
    name: "onMount",
    description: "当广告挂载后",
    arguments: [
      {
        type: "array",
        name: "imageUrls",
        describe: "图片地址",
        data: [null, null, null, null, null, null],
        fieldName: "imageUrls",
      },
      {
        type: "array",
        name: "imageLinks",
        describe: "与图片地址保持索引一致空值图片不可点击",
        data: [null, null, null, null, null, null],
        fieldName: "imageLinks",
      },
    ],
  },
  {
    name: "onUnmount",
    description: "当广告卸载后",
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
    slider: {}
  },
};

export default Slider;
