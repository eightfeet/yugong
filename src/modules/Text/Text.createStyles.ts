import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { TextProps } from "./Text";

function createStyles(props: TextProps) {

  return {
    wrap: (style: Style) => toStyle(style.wrap),
    paragraph: (style: Style) => {
      return ({
        ...toStyle(style.paragraph),
        '& >span': toStyle(style.prefix),
        "&:nth-child(even)": toStyle(style.even),
        "&:nth-child(odd)": toStyle(style.odd),
        "&:first-child": toStyle(style.first),
        "&:last-child": toStyle(style.last),
      })
    },

  }
};

export type ClassesKey = 'wrap' | 'paragraph' | 'prefix' | 'even' | 'odd' | 'first' | 'last';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles
