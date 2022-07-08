import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { VideoPlayerProps } from "./VideoPlayer";

function createStyles(props: VideoPlayerProps) {
  return {
    style1: (style: Style) => toStyle(style.style1),
    style2: (style: Style) => toStyle(style.style2),
  }
};
// export type key of classes list
export type ClassesKey = 'style1' | 'style2';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles