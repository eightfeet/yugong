import { Button, Input } from 'antd';
import React, { useCallback, useContext } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { get, set } from 'lodash';
import { runningDataPath } from '../..';

interface Props {
  data: any[],
  dataGroup: number;
}

const SortableList: React.FC<Props> = ({ data, dataGroup }) => {
  const path = `${runningDataPath.dataGroups_data}[${dataGroup}]`;
  const { runningData, onChange } = useContext(CustomPresettingContext);
  const labelArr = get(runningData, runningDataPath.labels);
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
      {data?.map((item, index) => <SortableItem index={index} key={index}>
        <Input
          onChange={(e) => handleChange(e.target.value, index)}
          addonAfter={
            <span style={{ color: labelArr.data[index]?.backgroundColor }}>
              {labelArr.data[index]?.label}
            </span>
          }
          value={item}
        />
      </SortableItem>)}
    </div>
  )
}

export default SortableContainer(SortableList);
