import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import ChartOptions from './components/ChartOptions';
import DataGroups from './components/DataGroups';
import Labels from './components/Labels';

const Preset: React.FC<CustomPersetProps> = ({ runningData, onChange}) => {
  return (
    <>
      <Labels runningData={runningData} onChange={onChange} path="[0].arguments[0]"/>
      <DataGroups runningData={runningData} onChange={onChange} path="[0].arguments[0]"/>
      <ChartOptions runningData={runningData} onChange={onChange}  path="[2].arguments[0]" />
    </>
  )
}

export default Preset;