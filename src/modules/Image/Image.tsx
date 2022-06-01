import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PresetModule from '~/components/PresetModule';
import { ClassClassModuleBaseProps } from '~/components/PresetModule/PresetModule';
import { ArgumentsObject } from '~/types/appData';
import { getArgumentsItem } from '~/core/getArgumentsTypeDataFromDataSource';
import { RootState } from '~/redux/store';
import Wrapper from '../Wrapper';
import config, { ExposeEventsKeys } from './Image.config';
import createStyles, { ClassesKey } from './Image.createStyles';
import DefaultImg from '~/components/Icon/DefaultImg';

export type ImageProps = ClassClassModuleBaseProps<
  { [keys in ClassesKey]: string },
  { [keys in ExposeEventsKeys]: Function }
>;

interface ImgUrl {
  url: string;
  alt: string;
  linkUrl: string;
}

const Image: React.FC<ImageProps> = (props) => {
  const { registersFunction, eventDispatch, classes } = props;
  const isEditing = useSelector(
    (state: RootState) => state.controller.isEditing,
  );
  const [imgurl, setImgUrl] = useState<ImgUrl>();

  // 设置图片地址
  const setImg = useCallback((img: ArgumentsObject) => {
    const data = getArgumentsItem(img);
    console.log(data);
    setImgUrl(data as ImgUrl);
  }, []);

  const handleClick = useCallback(() => {
    eventDispatch().click();
    if (imgurl?.linkUrl && !isEditing) {
      window.location.href = imgurl.linkUrl;
    }
  }, [eventDispatch, imgurl?.linkUrl, isEditing]);

  useEffect(() => {
    registersFunction({
      setImg,
    });
  }, [registersFunction, setImg]);

  useEffect(() => {
    eventDispatch().mount();
    return () => {
      eventDispatch().unmount();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper {...props} maxWidth maxHeight>
      {imgurl?.url ? <img
        src={imgurl?.url}
        onClick={handleClick}
        className={classes.image}
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          pointerEvents: isEditing ? 'none' : 'auto',
        }}
        alt={imgurl?.alt || '设置图片url'}
      />
      :<DefaultImg className={classes.image} />}
    </Wrapper>
  );
};

export default PresetModule<ImageProps>(Image, config, createStyles);
