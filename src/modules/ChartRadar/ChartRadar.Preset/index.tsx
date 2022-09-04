import React, { useState } from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import ChartOptions from './components/ChartOptions';
import DataGroups from './components/DataGroups';
import Labels from './components/Labels';

export const runningDataPath = {
  labels: '[0].arguments[0]',
  dataGroups: '[1].arguments[0]',
  dataGroups_data: '[1].arguments[0].data',
  chartOptions: '[2].arguments[0]'
}

const Preset: React.FC<CustomPersetProps> = ({ runningData, onChange}) => {
  const [, setShowCode] = useState(false)
  return (
    <>
      <div onClick={() => setShowCode(true)}>显示</div>
      <Labels />
      <DataGroups />
      <ChartOptions />
    </>
  )
}

export default Preset;