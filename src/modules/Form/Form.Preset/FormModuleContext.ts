import React from 'react';
import { ExposeFunctions } from '~/types/modules';

interface FormModuleContextType {
  /** 结果 */
  runningData?: ExposeFunctions[];
  /** 修改结果 */
  onChangeRunningData?: (data: ExposeFunctions[]) => void;
  /**数据路径 */
  dataPath: string;
}

export const FormModuleContext = React.createContext<FormModuleContextType>({
  dataPath: '[0].arguments[0].data'
});
