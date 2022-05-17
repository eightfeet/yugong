import { PageHeader } from 'antd';
import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import SortableFormData from './components/SortableFormData';
import s from './Form.Preset.module.scss';

const valuePath = {
  formColumns: '[0].arguments[0].data',
};

const Index: React.FC<CustomPersetProps> = ({ runningData, onChange }) => {
  console.log(runningData);
  console.log(onChange);
  
  return <div>
    <PageHeader title="表单设置" />
    <SortableFormData list={[]} />
  </div>;
};

export default Index;
