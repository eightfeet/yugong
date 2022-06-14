import { UnitType } from "~/types/appData"

export interface Parallax {
  x?: UnitType,
  y?: UnitType,
  scale?: number,
  opacity?: number,
  duration?: number
}

export interface ChildrenItem {
  name?: string,
  content?: string,
  style?: any,
  link?: any,
  parallax?: Parallax,
}

export interface SliderDataItem {
  background?: string,
  childrens?: ChildrenItem[]
}
