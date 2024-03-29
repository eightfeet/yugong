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

interface ElementStyleContextType {
  unit?: string;
  onChange?: (result: any, type: StyleType) => void;
  style?: any;
}

export const ElementStyleContext = React.createContext<ElementStyleContextType>({});
