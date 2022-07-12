import { AppDataElementsStyleTypes, StyleItemsTypes } from "~/types/appData";
import styleCompiler from "~/compiler";

export function toStyles<T = undefined>(style: AppDataElementsStyleTypes, isPrecedence: boolean = false): {
  [keys in keyof T]: any;
} & { basic: any } {
  const optStyles: any = {}
  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const element = style[key];
      if (element) {
        if (isPrecedence) {
          optStyles[key] = addImportant(styleCompiler(element).style || {})
        } else {
          optStyles[key] = styleCompiler(element).style || {}
        }
      };
    }
  }
  return optStyles
}

export function toStyle(style?: StyleItemsTypes, isPrecedence: boolean = false) {
  if (isPrecedence) {
    return addImportant(styleCompiler(style || {}).style || {})
  }
  return styleCompiler(style || {}).style || {}
}

export const addImportant = (obj: React.CSSProperties = {}) => {
  const newObj = { ...obj };
  Object.keys(newObj).forEach(key => {
    const val = newObj[key];
    if (val) newObj[key] = `${val} !important`
  })
  return newObj;
}