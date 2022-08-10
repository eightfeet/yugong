import { PlusOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import React from 'react';
import s from './DataGroupsContener.module.scss';
import SortableContener from './SortableContener';

interface Props {}

const DataGroupsContener: React.FC<Props> = ({}) => {
  return (
    <div className={s.root}>
      <Button size="small" type="text" icon={<PlusOutlined />}>
        增加数据
      </Button>
      <SortableContener items={[1,2,3,4,5,]} />
      <Input addonBefore="label" defaultValue="mysite" />
    </div>
  );
};

export default DataGroupsContener;
