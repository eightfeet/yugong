import { Layout } from "react-grid-layout";
import {
  Api,
  AppDataElementsStyleTypes,
  AppDataElementsTypes,
  ArgumentsItem,
  EventsType,
} from "./appData";

/**
 * 静态事件名称与描述
 * @member name 事件名
 * @member description 描述
 */
export interface ExposeEvents {
  name: string;
  description: string;
}

/**
 * 静态方法名称与描述
 */
export interface ExposeFunctions extends ExposeEvents {
  arguments?: ArgumentsItem[];
}

/**
 * 静态Api
 */
export interface ExposeApi extends Api {}

export interface ExposeDefaultProps {
  layout?: {
    x?: number;
    y?: number;
    w?: number;
    h?: number;
  };
  style?: AppDataElementsStyleTypes;
  events?: EventsType;
  api?: Api[];
}

/**
 * 静态事件导出
 */
export interface ModulesProps<TProps> extends React.FC<TProps> {
  exposeEvents?: ExposeEvents[];
  exposeFunctions?: ExposeFunctions[];
  exposeApi?: ExposeApi[];
  exposeDefaultProps?: ExposeDefaultProps;
}
