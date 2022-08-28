import { CountdownTimerProps } from "./CountdownTimer";

import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";

function createStyles(props: CountdownTimerProps) {
  return {
    text: (style: Style) => toStyle(style.text),
  }
};
// export type key of classes list
export type ClassesKey = 'text';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles