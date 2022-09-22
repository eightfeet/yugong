import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { Mp3SpriteProps } from "./Mp3Sprite";

function createStyles(props: Mp3SpriteProps) {
  return {
    wrap: (style: Style) => toStyle(style.wrap),
    toolbar: (style: Style) => toStyle(style.toolbar),
    prev: (style: Style) => toStyle(style.prev),
    play: (style: Style) => toStyle(style.play),
    pause: (style: Style) => toStyle(style.pause),
    next: (style: Style) => toStyle(style.next),
    info: (style: Style) => toStyle(style.info),
    progress: (style: Style) => toStyle(style.progress),
    title: (style: Style) => toStyle(style.title),
    time: (style: Style) => toStyle(style.time),
    list: (style: Style) => toStyle(style.list),
    item: (style: Style) => toStyle(style.item),
    currentitem: (style: Style) => toStyle(style.currentitem),
  }
};
// export type key of classes list
export type ClassesKey = 'wrap' | 'toolbar' | 'prev' | 'play' | 'pause' | 'next' | 'info' | 'progress' | 'title' | 'time' | 'list' | 'item' | 'currentitem';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles
