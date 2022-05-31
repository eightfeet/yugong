/**
 * 模块相关类型定义与标准
 */
import EventEmitter from '~/core/EventEmitter';
import {
    Api,
    AppDataElementsStyleTypes,
    AppDataElementsTypes,
    ArgumentsItem,
} from './appData';

/**
 * 模块事件项引用的全局方法以及参数
 * @member name 引用方法名（模块名/方法名）
 * @member arguments 引用方法关联的参数与描述信息
 * @export
 * @interface EventsTypeItem
 */
export interface EventsTypeItem {
  name: string;
  arguments: ArgumentsItem[];
}

/**
 * 事件类型清单
 * @export
 * @interface EventsType
 */
export interface EventsType {
  [key: string]: EventsTypeItem[];
}

/**
 * 静态事件与描述定义
 * @member name 事件名
 * @member description 描述
 */
export interface ExposeEvents {
    name: string;
    description: string;
}

/**
 * 静态方法名称与描述
 * @export
 * @interface ExposeFunctions
 */
export interface ExposeFunctions {
    name: string;
    description: string;
    arguments?: ArgumentsItem[];
    presettable?: boolean;
}

/**
 *
 * 静态Api定义
 * @export
 * @interface ExposeApi
 * @extends {Api}
 */
export interface ExposeApi extends Api {}


/**
 * 静态默认Props定义
 * @export
 * @interface ExposeDefaultProps
 */
export interface ExposeDefaultProps {
    /**
     * 布局
     */
    layout?: {
        x?: number;
        y?: number;
        w?: number;
        h?: number;
    };
    /**
     * 样式
     */
    style?: AppDataElementsStyleTypes;
    /**
     * 事件
     */
    events?: EventsType;
    /**
     * 接口
     **/
    api?: Api[];
    styleDescription?: {
      [keys: string]: string
    } | StyleDescItem[];
    /**模块自定义预设 */
    preset?: boolean;
}

export interface StyleDescItem {
  title: string,
  value: string,
  children?: StyleDescItem[] 
}

interface Necessary<N, D> {
  name: N,
  description: D
}

export type ComExposeEvents = [Necessary<'mount', "初始化">, Necessary<'unmount', '卸载'>, ...ExposeEvents[]];

/**
 * 静态
 */
export interface ModulesStatic {
  exposeEvents?: ComExposeEvents;
  exposeFunctions?: ExposeFunctions[];
  exposeApi?: ExposeApi[];
  exposeDefaultProps?: ExposeDefaultProps;
}

/**
 * 静态事件导出
 * @export
 * @interface Modules
 * @extends {React.FC<TProps>}
 * @template TProps
 */
export interface Modules<TProps={}> extends React.FC<TProps & {eventEmitter: EventEmitter} & AppDataElementsTypes> {
    exposeEvents?: ComExposeEvents;
    exposeFunctions?: ExposeFunctions[];
    exposeApi?: ExposeApi[];
    exposeDefaultProps?: ExposeDefaultProps;
}


/**
 * output静态事件导出
 * @export
 * @interface Modules
 * @extends {React.FC<TProps>}
 * @template TProps
 */
 export interface OutputModules<TProps={}> extends React.FC<TProps> {
  exposeEvents?: ComExposeEvents;
  exposeFunctions?: ExposeFunctions[];
  exposeApi?: ExposeApi[];
  exposeDefaultProps?: ExposeDefaultProps;
}

