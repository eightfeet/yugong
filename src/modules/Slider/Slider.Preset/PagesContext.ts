import React from 'react';
import { SliderDataItem } from '../type';

interface PagesContextType {
  /** 结果 */
  pages?: SliderDataItem[];
  /** 修改结果 */
  path?: string;
  /** 更改页面或元素配置 */
  setPageAndElement?: (pageIndex: number, elementIndex?: number ) => void;
}

export const PagesContext = React.createContext<PagesContextType>({});
