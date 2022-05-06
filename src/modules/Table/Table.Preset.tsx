import { message, PageHeader, Select } from 'antd';
import { cloneDeep, isObject, update, throttle, get } from 'lodash';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import { RootState } from '~/redux/store';
import LineItem from './components/LineItem/LineItem';
import SortableTableData from './components/SortableTableData';
import { TableModuleContext } from './TableModuleContext';

const Option = Select.Option;

export const tableValuePath = {
  runningTimes: '[0].arguments[0].data',
  headName: '[1].arguments[0].data',
  rowMap: '[1].arguments[1].data',
  dataType: '[1].arguments[2].data',
  format: '[1].arguments[3].data',
  columWidth: '[1].arguments[4].data'
}

export type TablePathKeys = 'runningTimes' | 'headName' | 'rowMap' | 'dataType' | 'format' | 'columWidth';

const TablePreset: React.FC<CustomPersetProps> = ({ runningData, onChange, activationItem }) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Object[]>([]);

  const { runningTimes } = useSelector((state: RootState) => state);

  useEffect(() => {
    const path: string = get(runningData, tableValuePath.runningTimes);
    if (path) {
      const dataSource = (runningTimes[path] || []) as Object[];
      if (dataSource.length) {
        setDataSource(dataSource);
      };
      setDisabled(!dataSource?.length)
    }
  }, [dataSource, runningData, runningTimes]);

  const onChangeDebounce = useMemo(
    () =>
      throttle((value) => {
        onChange(value);
      }, 500),
    [onChange]
  );

  const onChangeRunningData = useCallback(
    (value: any, path: string) => {
      const copyRunningData = cloneDeep(runningData);
      update(copyRunningData, path, () => value);
      onChangeDebounce(copyRunningData);
    },
    [onChangeDebounce, runningData],
  )

  const onChangeRunningTimes = useCallback(
    (e) => {
      const dataSource = (runningTimes[e] || []) as Object[];
      if (Array.isArray(dataSource) && dataSource.length && isObject(dataSource[0])) {
        onChangeRunningData(e, tableValuePath.runningTimes)
      } else {
        message.error('请选择合规数组对象 [ { element:string, ... }, ... ]');
      }
    },
    [onChangeRunningData, runningTimes],
  )

  return (
    <>
      {JSON.stringify(dataSource)}
      <TableModuleContext.Provider value={{ disabled, setDisabled, dataSource, runningData, onChangeRunningData }}>
        <PageHeader title="表格设置" />
        <LineItem label="数据源">
          <Select
            placeholder="请选择"
            value={get(runningData, tableValuePath.runningTimes)}
            onChange={onChangeRunningTimes}
          >
            {Object.keys(runningTimes)?.map(
              (item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              )
            )}
          </Select>
        </LineItem>
        <LineItem label='表格列'>
          <SortableTableData />
        </LineItem>
      </TableModuleContext.Provider>
    </>
  )
}

export default TablePreset;