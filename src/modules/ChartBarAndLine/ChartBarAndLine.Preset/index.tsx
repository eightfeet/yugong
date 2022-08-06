import React from 'react';
import { CustomPersetProps } from '~/components/MiniDashboard/Presetting/Presetting';
import s from './ChartBarAndLine.Preset.module.scss';

const path = {
  labelPath: 'runningData[0]',
  // dataPath:
}

const Preset:React.FC<CustomPersetProps> = ({...props}) => {
  console.log(props);
  
  return (
    <div>
      预设
    </div>
  )
}

export default Preset;