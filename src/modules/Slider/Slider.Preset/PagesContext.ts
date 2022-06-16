import React from 'react';
import { SliderDataItem } from '../type';

interface PagesContextType {
  /** 结果 */
  pages?: SliderDataItem[];
  /** 修改结果 */
  path?: string;
  /** 更改页面或元素配置 */
  setSliderElement?: (pageIndex: number, elementIndex?: number ) => void;
  /** 更改页面元素 */
  setSliderPage?: (pageIndex: number ) => void;
  /** 当前页面 */
  currentPage?: SliderDataItem;
  /** 修改背景 */
  onChangeCurrentPageBackground?: (result: any) => void;
}

export const PagesContext = React.createContext<PagesContextType>({});
