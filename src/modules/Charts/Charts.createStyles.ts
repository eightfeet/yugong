import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { ChartsProps } from "./Charts";

function createStyles(props: ChartsProps) {
  return {
    style2: (style: Style) => toStyle(style.style2),
  }
};
// export type key of classes list
export type ClassesKey = 'style2';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles