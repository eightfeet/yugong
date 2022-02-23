import {
  Row,
  Col,
  Button,
  Tooltip,
  Input,
  Modal,
  Upload as UploadPic,
} from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  PictureOutlined,
  DeleteOutlined,
  EyeOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import s from './Upload.module.scss';
import { UploadChangeParam } from 'antd/lib/upload/interface';
import { RootState } from '~/redux/store';
import isUrl from '~/core/helper/isUrl';
import { useSelector } from 'react-redux';
import { useCookie } from 'react-use';

interface UploadProps {
  label?: string;
  defaultImg?: string;
  onChange?: (data: string) => void;
}

const antIcon = <LoadingOutlined className={s.loading} spin />;
const Upload: React.FC<UploadProps> = ({ label, defaultImg, onChange }) => {
  const [img, setimg] = useState<string>();
  const [isloading, setIsloading] = useState(false);
  const [viewImg, setViewImg] = useState(false);
  const [wh, setWh] = useState(' ');
  const moduleId = useSelector(
    (state: RootState) => state.activationItem.moduleId,
  );
  const [csrfToken] = useCookie('csrfToken')
  
  const ref = useRef(null);

  // 创建临时图片文件
  const createTempImg = useCallback((url: string) => {
    const wrap = ref.current as any;
    if (wrap) {
      (ref.current as any).innerHTML = '';
      const image = new Image();
      image.src = url;
      image.onload = () => {};
      (ref.current as any).appendChild(image);
    }
  }, []);

  // 获取文件宽高属性
  const getTempImgWH = useCallback(() => {
    const image = (ref.current as any)?.querySelector('img');
    if (image) {
      const str = `宽:${image.offsetWidth}px 高:${image.offsetHeight}px`;
      setWh(str);
    }
  }, []);

  // 删除临时文件

  useEffect(() => {
    setimg(defaultImg);
    if (defaultImg) {
      createTempImg(defaultImg);
    }
  }, [createTempImg, defaultImg, moduleId]);

  const onChangeUpload = useCallback(
    (info: UploadChangeParam) => {
      if (info.file.status === 'uploading') {
        setIsloading(true);
      }

      if (info.file.status === 'error') {
        setIsloading(false);
      }

      if (info.file.response) {
        setTimeout(() => {
          setIsloading(false);
          setimg(info.file.response.fileUrl);
          createTempImg(info.file.response.fileUrl);
        }, 1000);

        if (onChange instanceof Function) {
          onChange(info.file.response.fileUrl);
        }
      }
    },
    [createTempImg, onChange],
  );

  const hideView = useCallback(() => {
    setViewImg(false);
  }, []);

  const showView = useCallback(() => {
    getTempImgWH();
    setViewImg(true);
  }, [getTempImgWH]);

  const deleteImage = useCallback(() => {
    setimg('');
    if (onChange instanceof Function) {
      onChange('');
    }
  }, [onChange]);

  const inputOnChange = useCallback(
    (e) => {
      const url = e.target.value;
      if (onChange instanceof Function && isUrl(url)) {
        onChange(url);
        setimg(url);
        createTempImg(url);
      }
    },
    [onChange],
  );

  return (
    <>
      <Row className={s.row} gutter={4}>
        <Col className={s.label} span={7}>
          {label || ''}
        </Col>
        <Col span={14}>
          <div className={s.button}>
            {process.env.REACT_APP_DEMO === 'true' ? (
              <Tooltip
              overlayInnerStyle={{width: 400}}
                title={
                  <Input style={{width: '100%'}} value={img} onChange={inputOnChange} placeholder="输入图片url" />
                }
              >
                <span
                  className={classNames(s.uploadicon, s.empty, s.flid)}
                  style={{
                    backgroundImage: `url(${!isloading && img ? img : ''})`,
                  }}
                >
                  {isloading ? antIcon : null}
                  {!img ? <PictureOutlined /> : null}
                </span>
              </Tooltip>
            ) : (
              <UploadPic
                accept=".jpg,.jpeg,.png"
                action={'/api/upload'}
                onChange={onChangeUpload}
                showUploadList={false}
                disabled={isloading}
                headers={{
                  'x-csrf-token': csrfToken || ''
                }}
              >
                <span
                  className={classNames(s.uploadicon, s.empty, s.flid)}
                  style={{
                    backgroundImage: `url(${!isloading && img ? img : ''})`,
                  }}
                >
                  {isloading ? antIcon : null}
                  {!img ? <PictureOutlined /> : null}
                </span>
              </UploadPic>
            )}
          </div>

          {!isloading && img ? (
            <>
              <Tooltip
                placement="top"
                trigger="hover"
                mouseEnterDelay={2}
                title="预览"
              >
                <Button
                  className={s.view}
                  type="link"
                  size={'small'}
                  onClick={showView}
                  icon={<EyeOutlined />}
                />
              </Tooltip>
              <Tooltip
                placement="top"
                trigger="hover"
                mouseEnterDelay={2}
                title="删除"
              >
                <Button
                  type="link"
                  danger
                  size={'small'}
                  onClick={deleteImage}
                  icon={<DeleteOutlined />}
                />
              </Tooltip>
            </>
          ) : null}
        </Col>
      </Row>
      <Modal visible={viewImg} onCancel={hideView} title={wh} footer={null}>
        <div className={s.ref}>
          {img ? <img ref={ref} src={img} alt={''} /> : null}
        </div>
      </Modal>
      {!isloading && img ? <div className={s.imgtemp} ref={ref} /> : null}
    </>
  );
};

export default Upload;
