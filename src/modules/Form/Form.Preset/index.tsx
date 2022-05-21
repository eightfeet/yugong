import { Input, PageHeader } from 'antd';
import { cloneDeep, get, set } from 'lodash';
import React, { useCallback } from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import LineItem from './components/LineItem';
import SortableFormData from './components/SortableFormData';
import { FormModuleContext } from './FormModuleContext';

const Index: React.FC<CustomPersetProps> = ({ runningData, onChange }) => {
  const btnreset = get(runningData, '[0].arguments[1].data');
  const btnsubmit = get(runningData, '[0].arguments[2].data');

  const handleChangeReset = useCallback(
    (e) => {
      const runD = cloneDeep(runningData);
      set(runD, '[0].arguments[1].data', e.target.value)
      onChange(runD)
    },
    [onChange, runningData],
  )
  
  const handleChangeSubmit = useCallback(
    (e) => {
      const runD = cloneDeep(runningData);
      set(runD, '[0].arguments[2].data', e.target.value)
      onChange(runD)
    },
    [onChange, runningData],
  )

  return (
    <FormModuleContext.Provider
      value={{
        runningData,
        onChangeRunningData: onChange,
        dataPath: '[0].arguments[0].data'
      }}
    >
      <PageHeader title="表单项" />
      <SortableFormData />
      <PageHeader title="表单按钮" />
      <LineItem label="重置">
        <Input value={btnreset} placeholder="重置" onChange={handleChangeReset}/>
      </LineItem>
      <LineItem label="提交">
        <Input value={btnsubmit} placeholder="提交" onChange={handleChangeSubmit} />
      </LineItem>
    </FormModuleContext.Provider>
  );
};

export default Index;
