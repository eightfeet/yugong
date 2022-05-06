import React, { Dispatch, SetStateAction } from 'react';
import { ExposeFunctions } from '~/types/modules';
import { TablePathKeys } from './Table.Preset';

interface TableModuleContextType {
  /** 禁用 */ 
  disabled?: boolean;
  /** 禁用方法 */ 
  setDisabled?: Dispatch<SetStateAction<boolean>>;
  /** 更改数据源 */ 
  onChangeDataSource?: (data: Object[]) => void;
  /** 数据源 */ 
  dataSource?: Object[];
  /** 结果 */ 
  runningData?: ExposeFunctions[];
  /** 修改结果 */ 
  onChangeRunningData?: (runningData: ExposeFunctions[], path: string) => void;
}

export const TableModuleContext = React.createContext<TableModuleContextType>({});
