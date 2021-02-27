import { Layout } from "react-grid-layout";

export interface AnyObjectType {
  [keys: string]: any;
}

export type AppDataModuleTypes = "Conterner" | "Modal" | "Root";

export interface AppDataElementsTypes {
  style: AppDataElementsStyleTypes;
  content: AnyObjectType;
  events: AnyObjectType;
  type: AppDataModuleTypes;
  moduleId: string;
  name?: string;
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
