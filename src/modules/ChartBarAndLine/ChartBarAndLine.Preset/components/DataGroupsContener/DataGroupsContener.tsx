import { PlusOutlined } from '@ant-design/icons';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { Button, Input } from 'antd';
import React, { useCallback, useContext } from 'react';
import s from './DataGroupsContener.module.scss';
import SortableContener from './SortableContener';

interface Props {
  items: any[],
  index: number,
}

const DataGroupsContener: React.FC<Props> = ({items, index}) => {
  const { runningData } = useContext(CustomPresettingContext);

  const onPlus = useCallback(
    () => {
      
    },
    [],
  )
  
  console.log(runningData);
  
  return (
    <div className={s.root}>
      <Button size="small" className={s.add} type="text" onClick={onPlus} icon={<PlusOutlined />}>
        增加数据
      </Button>
      <SortableContener items={items} index={index} />
    </div>
  );
};

export default DataGroupsContener;
