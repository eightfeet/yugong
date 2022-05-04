import { Form, PageHeader, Select } from 'antd';
import { cloneDeep, update } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import { RootState } from '~/redux/store';
import AddItem from './components/AddItem';
import Pull, { PullValues } from './components/Pull';

const { Option } = Select;

const formLayout = {
  labelCol: { span: 4 }, wrapperCol: { span: 20 }
}

type onChangeProps = {
  TheadName: string[];
  rowMap: string[];
  columWidth: string[];
}

const TablePreset: React.FC<CustomPersetProps> = ({ runningData, onChange, activationItem }) => {
  const { runningTimes } = useSelector((state: RootState) => state);
  const [form] = Form.useForm();
  const [setTbodyData, setTheadName, setColumWidth, setTablePull] = runningData;

  const [dataSource, setDataSource] = useState<Object[]>([]);

  const onChangeData = useCallback(
    () => {
      // 更新运行数据
      const copyRunningData = cloneDeep(runningData);
      const TbodyData = form.getFieldValue('TbodyData');
      setDataSource(runningTimes[TbodyData] as any);
      update(copyRunningData, '[0].arguments[0].data', () => TbodyData);
      onChange(copyRunningData)
    },
    [form, onChange, runningData, runningTimes],
  )

  const onChangeTConfig = useCallback(
    ({ rowMap, TheadName, columWidth }: onChangeProps) => {
      // 更新运行数据
      const copyRunningData = cloneDeep(runningData);
      update(copyRunningData, '[0].arguments[2].data', () => rowMap);
      update(copyRunningData, '[1].arguments[0].data', () => TheadName);
      update(copyRunningData, '[2].arguments[0].data', () => columWidth);
      onChange(copyRunningData)
    },
    [onChange, runningData],
  )

  const onChangePull = useCallback(
    ({ isPullDown, isPullUp, pullDownText, pullUpText }: PullValues) => {
      const copyRunningData = cloneDeep(runningData);
      update(copyRunningData, '[3].arguments[0].data', () => ({
        "comparableAverageA": "1",
        "comparableAverageB": isPullDown ? "1" : "2",
        "method": "==="
      }))
      update(copyRunningData, '[3].arguments[2].data', () => ({
        "comparableAverageA": "1",
        "comparableAverageB": isPullUp ? "1" : "2",
        "method": "==="
      }))
      update(copyRunningData, '[3].arguments[1].data', () => pullDownText)
      update(copyRunningData, '[3].arguments[3].data', () => pullUpText)
      onChange(copyRunningData)
    },
    [onChange, runningData],
  )

  useEffect(() => {
    const tableData = runningTimes[setTbodyData.arguments?.[0].data];
    if (tableData) {
      setDataSource(tableData as Object[])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <>
      <PageHeader title="表格设置" />
      <Form form={form} {...formLayout}>
        <Form.Item label="数据源" name="TbodyData"
          initialValue={
            setTbodyData.arguments?.[0].data
          }
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
        <Form.Item label="表格列" name="TConfig" initialValue={
          {
            TheadName: setTheadName.arguments?.[0]?.data || [],
            rowMap: setTbodyData.arguments?.[2]?.data || [],
            columWidth: setColumWidth.arguments?.[0]?.data || [],
          }
        }>
          <AddItem dataSource={dataSource} onChange={onChangeTConfig} />
        </Form.Item>
        <Form.Item label="刷新" name="setTablePull" initialValue={
          {
            isPullDown: (setTablePull.arguments?.[0]?.data.comparableAverageA ===
              setTablePull.arguments?.[0]?.data.comparableAverageB),
            isPullUp: (setTablePull.arguments?.[2]?.data.comparableAverageA ===
              setTablePull.arguments?.[2]?.data.comparableAverageB),
            pullDownText: setTablePull.arguments?.[1]?.data || '',
            pullUpText: setTablePull.arguments?.[3]?.data || ''
          }
        }>
          <Pull disabled={!dataSource?.length} onChange={onChangePull} />
        </Form.Item>
      </Form>
    </>

  )
}

export default TablePreset;