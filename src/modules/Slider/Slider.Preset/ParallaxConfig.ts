import React from 'react';
import { UnitType } from '~/types/appData';
import { ChildrenItem } from '../type';

export type ParallaxTypeKey = 'x' | 'y' | 'scale' | 'opacity' | 'duration';

interface ParallaxConfigType {
  /** 修改结果 */
  parallax?: ChildrenItem['parallax'];
  /** 更改页面或元素配置 */
  setParallax?: (ParallaxType: ParallaxTypeKey, value: UnitType | string ) => void;
}

export const ParallaxConfig = React.createContext<ParallaxConfigType>({});
