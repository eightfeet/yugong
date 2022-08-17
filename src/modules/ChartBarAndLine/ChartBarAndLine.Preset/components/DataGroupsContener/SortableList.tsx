import { Input } from 'antd';
import React, { useCallback, useContext } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';

import s from './SortableList.module.scss';
import { get, set } from 'lodash';
import { runningDataPath } from '../..';

interface Props {
  data: any[],
  dataGroup: number;
}

const SortableList: React.FC<Props> = ({ data, dataGroup }) => {
  const path = `${runningDataPath.dataGroups_data}[${dataGroup}]`;
  const { runningData, onChange } = useContext(CustomPresettingContext);
  const group = get(runningData, path);
  const handleChange = useCallback(
    (value: string, ind: number) => {
      const res = [...data];
      res[ind] = value;
      set(runningData, `${path}.data`, res);
      onChange(runningData);
    },
    [data, onChange, path, runningData],
  )
  
  return (
    <div>
      {data.map((item, index) => <SortableItem index={index} dataGroup={dataGroup}>
        <Input onChange={(e) => handleChange(e.target.value, index)} addonAfter={<span style={{ color: '#ddd' }}>{group.label}</span>} value={item} />
      </SortableItem>)}
    </div>
  )
}

export default SortableContainer(SortableList);
