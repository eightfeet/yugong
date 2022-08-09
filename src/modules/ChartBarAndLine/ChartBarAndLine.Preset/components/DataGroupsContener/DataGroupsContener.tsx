import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import s from './DataGroupsContener.module.scss';

interface Props {}

const DataGroupsContener: React.FC<Props> = ({}) => {
  return (
    <div className={s.root}>
      <Button size="small" type="text" icon={<PlusOutlined />}>
        增加数据
      </Button>
    </div>
  );
};

export default DataGroupsContener;
