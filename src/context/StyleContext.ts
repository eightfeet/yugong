import React from 'react';

export type StyleType =
  | 'transform'
  | 'animation'
  | 'border'
  | 'boxShadow'
  | 'textShadow'
  | 'backgroundGroup'
  | 'display'
  | 'font';

interface StyleContextType {
  unit?: string;
  onChange?: (result: any, type: StyleType) => void;
  getDefaultData?: (type: StyleType) => any;
  path?: string;
}

export const StyleContext = React.createContext<StyleContextType>({});
