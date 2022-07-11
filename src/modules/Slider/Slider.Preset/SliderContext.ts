import React from 'react';
import { ExposeFunctions } from '~/types/modules';

interface SliderContextType {
  /** 结果 */
  runningData?: ExposeFunctions[];
  /** 修改结果 */
  setRunningData?: (data: ExposeFunctions[]) => void;
}

export const SliderContext = React.createContext<SliderContextType>({});
