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
  | ArgumentsNumber;

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
  fieldName?: string;
  /**
   * 参数类型
   */
  type: T;
}

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
    method: ">" | ">=" | "<" | "<=" | "===" | "==" | "&&" | "||";
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
  events?: EventsType;
  content: AnyObjectType;
  type: AppDataModuleTypes;
  moduleId: string;
  moduleName?: string;
  api?: Api[];
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
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  letterSP?: number;
  wordSp?: number;
  fontWeight?: string;
  decoration?: string;
  fontStyle?: string;
  align?: string;
}

export interface TextShadowTypesOfStyleItems {
  shiftRight?: number;
  shiftDown?: number;
  blur?: number;
  color?: string;
}

export interface BoxShadowTypesOfStyleItems {
  shiftRight?: number;
  shiftDown?: number;
  spread?: number;
  blur?: number;
  inset?: boolean;
  color?: string;
}

export interface BorderTypesOfStyleItems {
  radiusTopLeft?: number;
  radiusTopRight?: number;
  radiusBottomLeft?: number;
  radiusBottomRight?: number;
  borderColor?: string;
  borderPosition?: {
    borderTop?: boolean;
    borderRight?: boolean;
    borderBottom?: boolean;
    borderLeft?: boolean;
    border?: boolean;
  };
  borderStyle?: string;
  borderWidth?: number;
}

export interface DisplayTypesOfStyleItems {
  width?: number;
  height?: number;
  zIndex?: number;
  position?: string;
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
  margin?: any[];
  padding?: any[];
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
  fontSize?: number;
  position?: string;
  positionX?: number;
  positionY?: number;
  sizeX?: number;
  sizeY?: number;
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
