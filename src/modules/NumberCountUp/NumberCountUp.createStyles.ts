import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { NumberCountUpProps } from "./NumberCountUp";

function createStyles(props: NumberCountUpProps) {
  return {
    prefix: (style: Style) => toStyle(style.prefix),
    suffix: (style: Style) => toStyle(style.suffix),
    numbers: (style: Style) => toStyle(style.numbers),
  }
};
// export type key of classes list
export type ClassesKey = 'prefix' | 'suffix' | 'numbers';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles