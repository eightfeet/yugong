import { PageHeader } from 'antd';
import React, { useCallback, useContext, useState } from 'react';
import ChartOptionItem from '../ChartOptionItem';
import { CustomPresettingContext } from '~/components/MiniDashboard/Presetting/CustomPresettingContext';
import { cloneDeep, get, set } from 'lodash';
import { runningDataPath } from '../..';
import { CodeOutlined } from '@ant-design/icons';
import JsonDataEditor from '~/components/MiniDashboard/JsonDataEditor';

interface Props {}

const ChartOptions: React.FC<Props> = () => {
  const { runningData, onChange } = useContext(CustomPresettingContext)
  const optionsData = get(runningData, runningDataPath.chartOptions);
  const [showCode, setShowCode] = useState(false);

  const handleChange = useCallback(
    (value) => {
      const result = set(runningData, runningDataPath.chartOptions, value);
      onChange(result);
    },
    [onChange, runningData],
  )
  
  const onChangeOptions= useCallback(
    (data) => {
      optionsData.data = data;
      handleChange(optionsData)
    },
    [handleChange, optionsData],
  )

  const onConfirmCode = useCallback(
    (data) => {
      const copyData = cloneDeep(runningData);
      set(copyData, `${runningDataPath.chartOptions}.data`, data);
      onChange(copyData);
      setShowCode(false)
    },
    [onChange, runningData],
  )
  
  return (
    <>
      <PageHeader title="全局设置" extra={<CodeOutlined onClick={() => setShowCode(true)} />} />
      <ChartOptionItem onChange={onChangeOptions} defaultValue={optionsData.data} />
      <JsonDataEditor
        data={optionsData.data}
        okText="确定" 
        cancelText="取消" 
        visible={showCode} 
        onConfirm={onConfirmCode} 
        onCancel={() => setShowCode(false)} 
        title="数据编辑" />
    </>
  )
}

export default ChartOptions;