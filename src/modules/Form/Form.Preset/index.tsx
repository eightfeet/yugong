import { PageHeader } from 'antd';
import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import SortableFormData from './components/SortableFormData';

const Index: React.FC<CustomPersetProps> = ({ runningData, onChange }) => {
  return <div>
    <PageHeader title="表单设置" />
    <SortableFormData onChange={onChange} exposeFunctions={runningData} />
  </div>;
};

export default Index;
