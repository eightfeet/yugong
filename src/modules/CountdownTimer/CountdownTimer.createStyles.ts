import { CountdownTimerProps } from "./CountdownTimer";

import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";

function createStyles(props: CountdownTimerProps) {
  return {
    text: (style: Style) => toStyle(style.text),
    time: (style: Style) => toStyle(style.time),
  }
};
// export type key of classes list
export type ClassesKey = 'text' | 'time';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles