import { PlusOutlined } from '@ant-design/icons';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { Button, Input } from 'antd';
import React, { useCallback, useContext } from 'react';
import s from './DataGroupsContener.module.scss';
import SortableContener from './SortableContener';
import { get, set } from 'lodash';
import { runningDataPath } from '../..';

interface Props {
  items: any[],
  index: number,
}

const DataGroupsContener: React.FC<Props> = ({items, index}) => {
  const { runningData, onChange } = useContext(CustomPresettingContext);

  const onPlus = useCallback(
    () => {
      const res = get(runningData, `${runningDataPath.dataGroups_data}[${index}].data`);
      res?.push('');
      set(runningData, `${runningDataPath.dataGroups_data}[${index}].data`, res);
      onChange(runningData);
    },
    [index, onChange, runningData],
  )
  
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
