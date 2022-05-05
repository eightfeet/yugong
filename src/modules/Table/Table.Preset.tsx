import { Form, message, PageHeader, Select } from 'antd';
import { cloneDeep, isObject, update } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import { RootState } from '~/redux/store';
import SortableTableData from './components/SortableTableData';
import { TableModuleContext } from './TableModuleContext';

const Option = Select.Option;

const formLayout = {
  labelCol: { span: 4 }, wrapperCol: { span: 20 }
}

const TablePreset: React.FC<CustomPersetProps> = ({ runningData, onChange, activationItem }) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Object[]>();
  const { runningTimes } = useSelector((state: RootState) => state);
  const [form] = Form.useForm();
  const onChangeDataSource = useCallback(
    (data: Object[]) => {
      setDataSource(data);
    },
    [],
  )

  useEffect(() => {
    setDisabled(!dataSource?.length)
  }, [dataSource])

  // did mount
  useEffect(() => {
    // 设置数据源
    const path = (runningData?.[0].arguments?.[0].data || '') as string;
    if (path) {
      const dataSource = (runningTimes[path] || []) as Object[] ;
      if (dataSource) {
        setDataSource(dataSource);
        form.setFieldsValue({
          setDataSource: path || undefined
        })
      };
    }
    // 设置表格
    form.setFieldsValue({
      setTableData: []
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const onChangeData = useCallback(
    () => {
      // 更新运行数据
      const copyRunningData = cloneDeep(runningData);
      const setDataSource = form.getFieldValue('setDataSource');
      const dataSource = runningTimes[setDataSource] as Object[];

      if (Array.isArray(dataSource) && dataSource.length && isObject(dataSource[0])) {
        onChangeDataSource(dataSource)
        update(copyRunningData, '[0].arguments[0].data', () => setDataSource);
        onChange(copyRunningData)
      } else {
        message.error('请选择合规数组对象 [ { element:string, ... }, ... ]');
        form.setFieldsValue({setDataSource: undefined})
      }
    },
    [form, onChange, onChangeDataSource, runningData, runningTimes],
  )

  return (
    <TableModuleContext.Provider value={{ disabled, onChangeDisable: () => setDisabled(!disabled), onChangeDataSource, dataSource }}>
      <PageHeader title="表格设置" />
      <Form form={form} {...formLayout}>
        <Form.Item label="数据源" required name="setDataSource">
          <Select
            placeholder="请选择"
            onChange={onChangeData}
          >
            {Object.keys(runningTimes)?.map(
              (item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              )
            )}
          </Select>
        </Form.Item>
        <Form.Item label="表格列" name="setTableData" >
          <SortableTableData />
        </Form.Item>
      </Form>
    </TableModuleContext.Provider>
  )
}

export default TablePreset;