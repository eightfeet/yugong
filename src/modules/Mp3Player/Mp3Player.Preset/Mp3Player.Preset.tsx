import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, PageHeader, Row, Tooltip } from 'antd';
import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import PlayList from './components/PlayList';

const Mp3PlayerPreset: React.FC<CustomPersetProps> = ({
  runningData,
  onChange,
}) => {
  return (
    <div>
      <PageHeader
        title="播放列表"
      />
      <PlayList />
    </div>
  );
};

export default Mp3PlayerPreset;
