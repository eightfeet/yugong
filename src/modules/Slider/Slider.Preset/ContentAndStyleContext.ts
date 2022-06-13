import React from 'react';
import { AnyObjectType } from '~/types/appData';

export type ContentAndStyleKeys = 'content' | 'style' | 'click';

interface ContentAndStyleContextType {
  name?: string
  /** 内容 */
  content?: string;
  /** 样式 */
  style?: {};
  /** 点击 */
  link?: {};
  /** 更新内容 */
  setContentAndStyle?: (type: ContentAndStyleKeys, value: string | number | AnyObjectType) => void;
}

export const ContentAndStyleContext = React.createContext<ContentAndStyleContextType>({});
