import React from 'react';

interface TableModuleContextType {
  disabled?: boolean;
  onChangeDisable?: () => void;
  onChangeDataSource?: (data: Object[]) => void;
  dataSource?: Object[]
}

export const TableModuleContext = React.createContext<TableModuleContextType>({});
