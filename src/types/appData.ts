import { Layout } from "react-grid-layout";

export interface AnyObjectType {
  [keys: string]: any;
}

/**
 * 模块事件项引用的全局方法以及参数
 * @member name 引用方法名（模块名/方法名）
 * @member arguments 引用方法关联的参数与描述信息
 */
export interface EventsTypeItem {
  name: string;
  arguments: ArgumentsItem[];
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
  data: number;
}

/**
 * 事件类型清单
 */
export interface EventsType {
  [key: string]: EventsTypeItem[];
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
  url: string;
  method?: RequestInit["method"];
  headers?: RequestInit["headers"];
  body?: AnyObjectType;
  credentials?: RequestInit["credentials"];
  mode?: RequestInit["mode"];
  successPublic?: AnyObjectType;
  errorPublic?: AnyObjectType;
}

/**
 * 模块类型
 */
export type AppDataModuleTypes = "Conterner" | "Modal" | "Root";

export interface AppDataElementsTypes {
  style: AppDataElementsStyleTypes;
  content: AnyObjectType;
  events: EventsType;
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
}

export interface BackgroundGradientTypesOfStyleItems {
  gradient?: {
    color: string;
    transition: number;
  }[];
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
