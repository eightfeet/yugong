import { ArrowLeftOutlined, CodeOutlined } from '@ant-design/icons';
import { Drawer, PageHeader } from 'antd';
import React, { useCallback, useContext, useState } from 'react';
import { SliderDataItem } from '~/modules/Slider/type';
import { PagesContext } from '../../PagesContext';
import CodeEditor from '../CodeEditor';
import BackgroundGroup from './BackgroundGroup';
import s from './PageSetter.module.scss';

interface Props {
  title: string;
  onClose: () => void;
  visible: boolean;
  data?: SliderDataItem
}

const PageSetter:React.FC<Props> = ({ onClose, visible, title, data={}}) => {
  
  
  return (
    <Drawer
      title={title}
      placement="right"
      bodyStyle={{
        padding: 0,
        backgroundColor: '#fafafa'
      }}
      width={580}
      mask={false}
      onClose={onClose}
      visible={visible}
      closeIcon={<><ArrowLeftOutlined />返回</>}
    >
      <div className={s.wrap}>
        <BackgroundGroup />
      </div>
    </Drawer>
  )
}

export default PageSetter;