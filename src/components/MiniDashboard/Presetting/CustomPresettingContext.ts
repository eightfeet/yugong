import React from 'react';
import { AppDataLayoutItemTypes } from '~/types/appData';
import { ExposeFunctions } from '~/types/modules';

interface CustomPresettingContextProps {
  /** 结果 */
  activationItem: AppDataLayoutItemTypes;
  runningData: ExposeFunctions[];
  onChange: (copyRunningData: ExposeFunctions[]) => void;
}

export const CustomPresettingContext = React.createContext<CustomPresettingContextProps>({} as CustomPresettingContextProps);