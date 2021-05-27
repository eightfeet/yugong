import { useCallback, useEffect, useMemo, useState } from "react";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import { AppDataElementsTypes, ArgumentsObject } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
// import defaultImg from "./image.svg";
import useStyles from "./Image.useStyle";

export interface ImageProps extends AppDataElementsTypes {
}

interface ImgUrl {
  url: string,
  alt: string
}

const Image: Modules<ImageProps> = (props) => {
  const { eventEmitter, events = {}, style } = props;
  const [imgurl, setImgUrl] = useState<ImgUrl>();
  const userClass = useStyles(style);
  // 设置图片地址
  const setImg = useCallback((img: ArgumentsObject) => {
    const data = getArgumentsItem(img)
    setImgUrl(data as ImgUrl);
  }, []);

  // 向eventEmitter注册事件，向外公布
  useMemo(() => {
    eventEmitter.addEventListener("setImg", setImg);
  }, [eventEmitter, setImg]);

  // 基本事件
  useEffect(() => {
    // 执行挂载事件
    eventEmitter.emit(events.mount);
    return () => {
      // 执行卸载事件
      eventEmitter.emit(events.unmount);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Wrapper {...props} maxWidth maxHeight>
      <img
        src={imgurl?.url}
        className={userClass.image}
        style={{ maxWidth: "100%", maxHeight: "100%" }}
        alt={imgurl?.alt || "设置图片url"}
      />
    </Wrapper>
  );
};

/**
 * 注册方法的静态描述与默认参数定义
 */
Image.exposeFunctions = [
    {
        name: "setImg",
        description: "设置图片Url",
        arguments: [
          {
            type: "object",
            name: "图片路径与属性",
            describe: "图片url",
            data: {
              url: '',
              alt: ''
            },
            fieldName: "img",
          },
        ],
      },
];

/**
 * 发布事件的静态描述
 */
Image.exposeEvents = [
  {
    name: "mount",
    description: "初始化",
  },
  {
    name: "unmount",
    description: "卸载",
  },
];

/**
 * 发布默认porps
 */
Image.exposeDefaultProps = {
    style:{
        basic:{},
        image:{}
    },
    styleDescription: [
      {
        title: "基础",
        value: "basic",
        children: [
          {
            title: "图片",
            value: "image"
          }
        ]
      }
    ]
};

/**
 * 发布默认Api
 */
Image.exposeApi = [];

export default Image;