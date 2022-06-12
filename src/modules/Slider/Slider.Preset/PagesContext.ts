import React from 'react';
import { SliderDataItem } from '../type';

interface PagesContextType {
  /** 结果 */
  pages?: SliderDataItem[];
  /** 修改结果 */
  path?: string;
}

export const PagesContext = React.createContext<PagesContextType>({});
