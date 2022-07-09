import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { VideoPlayerProps } from "./VideoPlayer";

function createStyles(props: VideoPlayerProps) {
  return {
    player: (style: Style) => toStyle(style.player),
  }
};
// export type key of classes list
export type ClassesKey = 'player';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles