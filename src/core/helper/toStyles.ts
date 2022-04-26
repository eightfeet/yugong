import { AppDataElementsStyleTypes, StyleItemsTypes } from "~/types/appData";
import styleCompiler from "~/compiler";

export function toStyles<T = undefined>(style: AppDataElementsStyleTypes): {
  [keys in keyof T]: any;
} & { basic: any } {
  const optStyles: any = {}
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const element = style[key];
      if (element) optStyles[key] = styleCompiler(element).style || {};
    }
  }
  return optStyles
}

export function toStyle(style?: StyleItemsTypes){
  return styleCompiler(style || {}).style || {}
}