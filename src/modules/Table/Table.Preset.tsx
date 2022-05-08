import { message, PageHeader, Select } from 'antd';
import { cloneDeep, isObject, update, throttle, get, lowerFirst } from 'lodash';
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

export type TablePathKeys = keyof typeof tableValuePath;

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
    (params: {
      [keys in TablePathKeys]?: any;
    }) => {
      const copyRunningData = cloneDeep(runningData);
      for (const key in params) {
        if (Object.prototype.hasOwnProperty.call(params, key)) {
          const value = params[key];
          update(copyRunningData, tableValuePath[key], () => value);
        }
      }
      onChangeDebounce(copyRunningData);
    },
    [onChangeDebounce, runningData],
  )

  const onChangeRunningTimes = useCallback(
    (e) => {
      const dataSource = (runningTimes[e] || []) as Object[];
      if (Array.isArray(dataSource) && dataSource.length && isObject(dataSource[0])) {
        onChangeRunningData({ runningTimes: e })
      } else {
        message.error('请选择合规数组对象 [ { element:string, ... }, ... ]');
      }
    },
    [onChangeRunningData, runningTimes],
  )

  const getDataFromRunningData = useCallback(
    (keys: TablePathKeys[]) => {
      const objRes: { [keys in TablePathKeys]?: any } = {};
      keys.forEach(key => {
        objRes[key] = get(runningData, tableValuePath[key]);
      });

      return objRes;
    },
    [runningData],
  )

  return (
    <>
      {JSON.stringify(dataSource)}
      <TableModuleContext.Provider value={{ disabled, setDisabled, dataSource, runningData, onChangeRunningData, getDataFromRunningData }}>
        <PageHeader title="表格设置" />
        <LineItem label="数据源">
          <Select
            placeholder="请选择"
            value={get(runningData, tableValuePath.runningTimes)}
            onChange={onChangeRunningTimes}
            style={{ width: "100%" }}
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