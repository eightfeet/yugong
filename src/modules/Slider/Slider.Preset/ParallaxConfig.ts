import React from 'react';

export type ParallaxTypeKey = 'x' | 'y' | 'scale' | 'opacity' | 'duration';

interface ParallaxConfigType {
  /** 修改结果 */
  path?: string;
  /** 更改页面或元素配置 */
  setParallax?: (ParallaxType: ParallaxTypeKey, value: number ) => void;
}

export const ParallaxConfig = React.createContext<ParallaxConfigType>({});
