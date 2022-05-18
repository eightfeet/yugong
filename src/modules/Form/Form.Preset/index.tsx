import { PageHeader } from 'antd';
import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import SortableFormData from './components/SortableFormData';
import { FormModuleContext } from './FormModuleContext';

const Index: React.FC<CustomPersetProps> = ({ runningData, onChange }) => {
  return (
    <FormModuleContext.Provider
      value={{
        runningData,
        onChangeRunningData: onChange,
        dataPath: '[0].arguments[0].data'
      }}
    >
      <PageHeader title="表单设置" />
      <SortableFormData />
    </FormModuleContext.Provider>
  );
};

export default Index;
