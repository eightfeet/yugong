
export interface Parallax {
  x?: number,
  y?: number,
  scale?: number,
  opacity?: number,
  duration?: number,
  delay?: number
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
  backgroundGroup?: any,
  childrens?: ChildrenItem[]
}
