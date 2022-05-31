import { Layout } from 'react-grid-layout';
import { EventsType } from './modules';

export interface AnyObjectType {
  [keys: string]: any;
}

/**
 * 参数
 */
export type ArgumentsItem =
  | ArgumentsObject
  | ArgumentsArray
  | ArgumentsBoolean
  | ArgumentsString
  | ArgumentsNumber
  | ArgumentsRunningTime
  | ArgumentsMixed;

/**
 * 参数基本
 */
interface ArgumentBase<T> {
  /**
   * 参数中文名
   */
  name?: string;
  /**
   * 参数描述
   */
  describe?: string;
  /**
   * 参数字段名
   */
  fieldName: string;
  /**
   * 允许html参数
   */
  html?: boolean | 'innerhtml';
  /**
   * 参数类型
   */
  type: T;
}

/**
 * 单位数值
 */
export type UnitType = [string | number | null, string];

/**
 * 对象参数
 */
export interface ArgumentsObject extends ArgumentBase<'object'> {
  data: {
    [keys: string]: any;
  };
}

/**
 * 数组参数
 */
export interface ArgumentsArray extends ArgumentBase<'array'> {
  data: any[];
}

/**
 * 布尔参数
 */
export interface ArgumentsBoolean extends ArgumentBase<'boolean'> {
  data: {
    comparableAverageA: any;
    comparableAverageB: any;
    method: '>' | '>=' | '<' | '<=' | '===' | '==' | '!==' | '&&' | '||';
  };
}

/**
 * 文本参数
 */
export interface ArgumentsString extends ArgumentBase<'string'> {
  // 为了方便数据录入，这里允许通过配置select来设置字段值
  // 常用于约定值的录入，默认设置值
  // 通过下拉来选择值, 如果有select，按照下拉选择来展示
  // key为值,value为展示字段
  select?: { [keys: string]: string };
  data: string;
}

/**
 * 数字参数
 */
export interface ArgumentsNumber extends ArgumentBase<'number'> {
  // 为了方便数据录入，这里允许通过配置select来设置字段值
  // 常用于约定值的录入，默认设置值
  // 通过下拉来选择值, 如果有select，按照下拉选择来展示
  // key为值,value为展示字段
  select?: { [keys: string]: string };
  data: string;
}

/**
 * 运行时参数
 */
export interface ArgumentsRunningTime extends ArgumentBase<'runningTime'> {
  data: string;
}

/**
 * 注入运行时参数
 */
export interface ArgumentsMixed extends ArgumentBase<'mixed'> {
  data: any;
}

/**
 * Api
 */
export interface Api {
  /**
   * api名称
   */
  name?: string;
  /**
   * api描述
   */
  description?: string;
  /**
   * api入参描述
   */
  enterDescription?: string;
  /**
   * api识别Id
   */
  apiId?: string;
  /**
   * api Url地址
   */
  url?: string;
  method?: RequestInit['method'];
  headers?: RequestInit['headers'];
  hideBodyInput?: boolean;
  body?: ArgumentsItem[];
  credentials?: RequestInit['credentials'];
  mode?: RequestInit['mode'];
  successPublic?: ArgumentsItem[];
  errorPublic?: ArgumentsItem[];
  hideLoading?: boolean;
  /**
   * 映射关系
   */
  dataMap?: {
    /**源 */
    source?: string;
    /**目标 */
    target?: string;
    /**映射关系 */
    map?: ArgumentsObject;
  }[];
  /**
   * 入参映射关系
   */
  enterMap?: {
    /**源 */
    source?: string;
    /**目标 */
    target?: string;
    /**映射关系 */
    map?: ArgumentsObject;
  }[];
}

/**
 * 模块类型
 */
export type AppDataModuleTypes = 'Conterner' | 'Modal' | 'Root';

export interface AppDataElementsTypes {
  style: AppDataElementsStyleTypes;
  rootFontsize?: number;
  events?: EventsType;
  type: AppDataModuleTypes;
  moduleId: string;
  moduleName?: string;
  api?: Api[];
  layout?: Layout;
}

export interface AppDataLayoutItemTypes extends AppDataElementsTypes {
  layout?: Layout;
}

export interface BackgroundGroupListTypesOfStyleItems {
  /**背景url - 渐变位置和过度色值 */
  gradient?: {
    color: string;
    transition: number;
  }[];
  /**背景url - 渐变方向 */
  gradientDirections?: string;
  /**背景url - 图片 */
  imageUrl?: string;
  /**背景x */
  positionX?: UnitType;
  /**背景y */
  positionY?: UnitType;
  /**横向尺寸 */
  sizeX?: UnitType;
  /**纵向尺寸 */
  sizeY?: UnitType;
  /**是否重复 */
  repeat?: string;
}

export interface BackgroundGroupTypesOfStyleItems {
  /**背景列表 */
  backgroundList?: BackgroundGroupListTypesOfStyleItems[];
  /**背景颜色 */
  backgroundColor?: string;
}

export interface StyleItemsTypes {
  backgroundCommon?: BackgroundCommonTypesOfStyleItems;
  backgroundGradient?: BackgroundGradientTypesOfStyleItems;
  backgroundGroup?: BackgroundGroupTypesOfStyleItems;
  border?: BorderTypesOfStyleItems;
  boxShadow?: BoxShadowTypesOfStyleItems[];
  textShadow?: TextShadowTypesOfStyleItems[];
  font?: FontTypesOfStyleItems;
  display?: DisplayTypesOfStyleItems;
  transform?: TransformTypesOfStyleItems;
  animation?: AnimationTypesOfStyleItems;
}

export interface AnimationTypesOfStyleItems {
  animationDuration?: number;
  animationTimingFunction?: string;
  animationDelay?: number;
  animationIterationCount?: 'infinite' | number;
  animationDirection?: string;
  animationFillMode?: string;
  animationName?: string;
  animationPlayState?: 'paused'|'running';
  animationPlayInView?: boolean;
}

export interface TransformTypesOfStyleItems {
  scale?: number;
  rotate?: number;
  translateX?: UnitType;
  translateY?: UnitType;
  skewX?: number;
  skewY?: number;
}

export interface FontTypesOfStyleItems {
  fontSize?: UnitType;
  lineHeight?: UnitType;
  color?: string;
  letterSP?: UnitType;
  wordSp?: UnitType;
  fontWeight?: string;
  decoration?: string;
  fontStyle?: string;
  align?: string;
}

export interface TextShadowTypesOfStyleItems {
  shiftRight?: UnitType;
  shiftDown?: UnitType;
  blur?: UnitType;
  color?: string;
}

export interface BoxShadowTypesOfStyleItems {
  shiftRight?: UnitType;
  shiftDown?: UnitType;
  spread?: UnitType;
  blur?: UnitType;
  inset?: boolean;
  color?: string;
}

export interface BorderTypesOfStyleItems {
  radiusTopLeft?: UnitType;
  radiusTopRight?: UnitType;
  radiusBottomLeft?: UnitType;
  radiusBottomRight?: UnitType;
  borderColor?: string;
  borderPosition?: {
    borderTop?: boolean;
    borderRight?: boolean;
    borderBottom?: boolean;
    borderLeft?: boolean;
    border?: boolean;
  };
  borderStyle?: string;
  borderWidth?: UnitType;
}

export interface DisplayTypesOfStyleItems {
  width?: UnitType;
  height?: UnitType;
  zIndex?: number;
  position?: string;
  left?: UnitType;
  right?: UnitType;
  top?: UnitType;
  bottom?: UnitType;
  margin?: (UnitType | null)[];
  padding?: (UnitType | null)[];
  display?: string;
  overflow?: string;
  boxSizing?: string;
  pointerEvents?: string;
}

export interface BackgroundGradientTypesOfStyleItems {
  /**渐变位置和过度色值 */
  gradient?: {
    color: string;
    transition: number;
  }[];
  /**渐变方向 */
  gradientDirections?: string;
}

export interface BackgroundCommonTypesOfStyleItems {
  imageUrl?: string;
  backgroundColor?: string;
  position?: string;
  positionX?: UnitType;
  positionY?: UnitType;
  sizeX?: UnitType;
  sizeY?: UnitType;
  repeat?: string;
}

export type AppDataElementsStyleTypes<T = {[key: string]: any}> = {
  [keys in keyof T]?: StyleItemsTypes;
} & {
  basic: StyleItemsTypes;
};

export type AppDataListTypes = AppDataLayoutItemTypes[];

export type AllCssType = BackgroundCommonTypesOfStyleItems &
  BackgroundGradientTypesOfStyleItems &
  BackgroundGroupTypesOfStyleItems &
  BorderTypesOfStyleItems &
  BoxShadowTypesOfStyleItems &
  TextShadowTypesOfStyleItems &
  FontTypesOfStyleItems &
  DisplayTypesOfStyleItems &
  TransformTypesOfStyleItems;
