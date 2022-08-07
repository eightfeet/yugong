import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import DataGroups from './components/DataGroups';
import Labels from './components/Labels';

const path = {
  labels: '[0].arguments[0]',
  dataGroup: '[1].arguments[0]',
  options: '[2].arguments[0]',
}

const Preset: React.FC<CustomPersetProps> = ({ runningData, onChange}) => {
  return (
    <>
      <Labels runningData={runningData} onChange={onChange} />
      <DataGroups />
    </>
  )
}

export default Preset;