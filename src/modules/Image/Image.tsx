import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { getArgumentsItem } from "~/core/getArgumentsTypeDataFromDataSource";
import useLifeCycle from "~/hooks/useLifeCycle";
import { RootState } from "~/redux/store";
import { AppDataElementsTypes, ArgumentsObject } from "~/types/appData";
import { Modules } from "~/types/modules";
import Wrapper from "../Wrapper";
import config from './Image.config';
import useStyles from "./Image.useStyle";

export interface ImageProps extends AppDataElementsTypes {
}

interface ImgUrl {
  url: string,
  alt: string,
  linkUrl: string
}

const Image: Modules<ImageProps> = (props) => {
  const { style, moduleId } = props;
  const [imgurl, setImgUrl] = useState<ImgUrl>();
  const userClass = useStyles(style);
  const isEditing = useSelector((state: RootState) => state.controller.isEditing)
  // 设置图片地址
  const setImg = useCallback((img: ArgumentsObject) => {
    const data = getArgumentsItem(img)
    setImgUrl(data as ImgUrl);
  }, []);

  useLifeCycle(moduleId, {mount: "初始化", unmount: "卸载"}, {setImg})

  const onClick = useCallback(
    () => {
      if (imgurl?.linkUrl && !isEditing) {
        window.location.href = imgurl.linkUrl;
      }
    },
    [imgurl?.linkUrl, isEditing],
  )

  return (
    <Wrapper {...props} maxWidth maxHeight>
      <img
        src={imgurl?.url}
        onClick={onClick}
        className={userClass.image}
        style={{ maxWidth: "100%", maxHeight: "100%", pointerEvents: isEditing ? 'none' : 'auto'}}
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