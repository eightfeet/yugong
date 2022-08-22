import React from 'react';

interface OptionsContext {
  /** 结果 */
  OptionsX?: any;

}

export const PagesContext = React.createContext<OptionsContext>({});
