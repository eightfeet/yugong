import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { ChartBarAndLineProps } from "./ChartBarAndLine";

function createStyles(props: ChartBarAndLineProps) {
  return {
    style1: (style: Style) => toStyle(style.style1),
  }
};
// export type key of classes list
export type ClassesKey = 'style1';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles