import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { ImageProps } from "./Image";

function createStyles(props: ImageProps) {
  return {
    image: (style: Style) => toStyle(style.image),
  }
};
// export type key of classes list
export type ClassesKey = 'image';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles