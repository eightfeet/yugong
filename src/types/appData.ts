import { Layout } from "react-grid-layout";
import { EventsType } from "./modules";

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
export interface ArgumentsObject extends ArgumentBase<"object"> {
  data: {
    [keys: string]: any;
  };
}

/**
 * 数组参数
 */
export interface ArgumentsArray extends ArgumentBase<"array"> {
  data: any[];
}

/**
 * 布尔参数
 */
export interface ArgumentsBoolean extends ArgumentBase<"boolean"> {
  data: {
    comparableAverageA: any;
    comparableAverageB: any;
    method: ">" | ">=" | "<" | "<=" | "===" | "==" | "!==" | "&&" | "||";
  };
}

/**
 * 文本参数
 */
export interface ArgumentsString extends ArgumentBase<"string"> {
  data: string;
}

/**
 * 数字参数
 */
export interface ArgumentsNumber extends ArgumentBase<"number"> {
  data: string;
}

/**
 * 运行时参数
 */
export interface ArgumentsRunningTime extends ArgumentBase<"runningTime"> {
  data: string;
}

/**
 * 注入运行时参数
 */
 export interface ArgumentsMixed extends ArgumentBase<"mixed"> {
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
   * api识别Id
   */
  apiId?: string;
  /**
   * api Url地址
   */
  url?: string;
  method?: RequestInit["method"];
  headers?: RequestInit["headers"];
  hideBodyInput?: boolean;
  body?: ArgumentsItem[];
  credentials?: RequestInit["credentials"];
  mode?: RequestInit["mode"];
  successPublic?: ArgumentsItem[];
  errorPublic?: ArgumentsItem[];
}

/**
 * 模块类型
 */
export type AppDataModuleTypes = "Conterner" | "Modal" | "Root";

export interface AppDataElementsTypes {
  style: AppDataElementsStyleTypes;
  rootFontsize?: number;
  events?: EventsType;
  content: AnyObjectType;
  type: AppDataModuleTypes;
  moduleId: string;
  moduleName?: string;
  api?: Api[];
  layout?: Layout;
}

export interface AppDataLayoutItemTypes extends AppDataElementsTypes {
  layout?: Layout;
}

export interface StyleItemsTypes {
  backgroundCommon?: BackgroundCommonTypesOfStyleItems;
  backgroundGradient?: BackgroundGradientTypesOfStyleItems;
  border?: BorderTypesOfStyleItems;
  boxShadow?: BoxShadowTypesOfStyleItems[];
  textShadow?: TextShadowTypesOfStyleItems[];
  font?: FontTypesOfStyleItems;
  display?: DisplayTypesOfStyleItems;
  transform?: TransformTypesOfStyleItems;
}

export interface TransformTypesOfStyleItems {
  scale?: number;
  rotate?: number;
  translateX?: number;
  translateY?: number;
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
  margin?: (UnitType|null)[];
  padding?: (UnitType|null)[];
  display?: string;
  overflow?: string;
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

export interface AppDataElementsStyleTypes {
  basic: StyleItemsTypes;
  [keys: string]: StyleItemsTypes;
}

export type AppDataListTypes = AppDataLayoutItemTypes[];

export type AllCssType = BackgroundCommonTypesOfStyleItems &
  BackgroundGradientTypesOfStyleItems &
  BorderTypesOfStyleItems &
  BoxShadowTypesOfStyleItems &
  TextShadowTypesOfStyleItems &
  FontTypesOfStyleItems &
  DisplayTypesOfStyleItems &
  TransformTypesOfStyleItems;
