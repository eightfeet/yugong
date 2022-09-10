import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { Mp3PlayerProps } from "./Mp3Player";

function createStyles(props: Mp3PlayerProps) {
  return {
    wrap: (style: Style) => toStyle(style.wrap, true),
    toolbar: (style: Style) => toStyle(style.toolbar, true),
    prev: (style: Style) => toStyle(style.prev, true),
    play: (style: Style) => toStyle(style.play, true),
    pause: (style: Style) => toStyle(style.pause, true),
    next: (style: Style) => toStyle(style.next, true),
    info: (style: Style) => toStyle(style.info, true),
    progress: (style: Style) => toStyle(style.progress, true),
    title: (style: Style) => toStyle(style.title, true),
    time: (style: Style) => toStyle(style.time, true),
  }
};
// export type key of classes list
export type ClassesKey = 'wrap' | 'toolbar' | 'prev' | 'play' | 'pause' | 'next' | 'info' | 'progress' | 'title' | 'time';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles
