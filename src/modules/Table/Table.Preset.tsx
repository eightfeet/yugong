import { Form, message, PageHeader, Select } from 'antd';
import { cloneDeep, isObject, update } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import { RootState } from '~/redux/store';
import SortableTableData from './components/SortableTableData';
import { TableModuleContext } from './TableModuleContext';

const Option = Select.Option;

const data = [
  { headName: 'string1', rowMap: '{{string1}}', dataType: 'date', format: undefined, columWidth: '21px' },
  { headName: 'string2', rowMap: 'string2', dataType: 'date', format: undefined, columWidth: '22px' },
  { headName: 'string3', rowMap: 'string3', dataType: 'date', format: undefined, columWidth: '23px' },
]

const formLayout = {
  labelCol: { span: 4 }, wrapperCol: { span: 20 }
}

const TablePreset: React.FC<CustomPersetProps> = ({ runningData, onChange, activationItem }) => {
  const [setTbodyData] = runningData;
  console.log('runningData', runningData);

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


  const onChangeData = useCallback(
    () => {
      // 更新运行数据
      const copyRunningData = cloneDeep(runningData);
      const TbodyData = form.getFieldValue('TbodyData');
      const dataSource = runningTimes[TbodyData] as Object[];

      if (Array.isArray(dataSource) && dataSource.length && isObject(dataSource[0])) {
        onChangeDataSource(dataSource)
        update(copyRunningData, '[0].arguments[0].data', () => TbodyData);
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
        <Form.Item label="数据源" name="setDataSource"
          // initialValue={
          //   setDataSource.arguments?.[0].data
          // }
          rules={[{ required: true, message: '请从运行时中选择正确的表格数据' }]}
        >
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
        <Form.Item label="数据源" name="setTableData" initialValue={data}>
          <SortableTableData value={data} />
        </Form.Item>
      </Form>
    </TableModuleContext.Provider>
  )
}

export default TablePreset;