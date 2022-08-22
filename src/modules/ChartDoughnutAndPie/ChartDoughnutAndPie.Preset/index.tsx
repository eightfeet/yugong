import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import ChartOptions from './components/ChartOptions';
import DataGroups from './components/DataGroups';
import LabelsGroup from './components/LabelsGroup';

export const runningDataPath = {
  labels: '[0].arguments[0]',
  dataGroups: '[1].arguments[0]',
  dataGroups_data: '[1].arguments[0].data',
  chartOptions: '[2].arguments[0]'
}

const Preset: React.FC<CustomPersetProps> = ({ runningData, onChange}) => {
  return (
    <>
      <LabelsGroup />
      <DataGroups />
      <ChartOptions />
    </>
  )
}

export default Preset;