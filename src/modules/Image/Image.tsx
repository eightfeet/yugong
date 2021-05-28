import { useCallback, useState } from "react";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import useLifeCycle from "~/hooks/useLifeCycle";
import { AppDataElementsTypes, ArgumentsObject } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import config from './Image.config';
import useStyles from "./Image.useStyle";

export interface ImageProps extends AppDataElementsTypes {
}

interface ImgUrl {
  url: string,
  alt: string
}

const Image: Modules<ImageProps> = (props) => {
  const { style, moduleId } = props;
  const [imgurl, setImgUrl] = useState<ImgUrl>();
  const userClass = useStyles(style);
  // 设置图片地址
  const setImg = useCallback((img: ArgumentsObject) => {
    const data = getArgumentsItem(img)
    setImgUrl(data as ImgUrl);
  }, []);

  useLifeCycle(moduleId, {mount: "初始化", unmount: "卸载"}, {setImg})

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

// bind static
for (const key in config) {
  if (Object.prototype.hasOwnProperty.call(config, key)) {
    Image[key] = config[key];
  }
}

export default Image;