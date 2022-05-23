import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { BroadcastProps } from "./Broadcast";

function createStyles(props: BroadcastProps) {
  return {
    item: (style: Style) => toStyle(style.item),
  }
};
// export type key of classes list
export type ClassesKey = 'item';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles

