import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { ButtonProps } from "./Button";

function createStyles(props: ButtonProps) {
  return {
    button: (style: Style) => {
      return {
        ...(toStyle(style.normal)),
        "&:disabled": toStyle(style.disabled),
        "&:focus": toStyle(style.focus),
        "&:active": {
          ...toStyle(style.active),
          "&:before": toStyle(style.activebefore),
          "&:after": toStyle(style.activeafter),
        },
        "&:hover": toStyle(style.hover),
        "&:before": toStyle(style.before),
        "&:after": toStyle(style.after),
      };
    },
    disabled: (style: Style) => toStyle(style.disabled),
    focus: (style: Style) => toStyle(style.focus),
    active: (style: Style) => ({
      ...toStyle(style.active),
      "&:before": toStyle(style.activebefore),
      "&:after": toStyle(style.activeafter),
    }),
    hover: (style: Style) => toStyle(style.hover),
  }
};
// export type key of classes list
export type ClassesKey =
  'button' | 'disabled' | 'focus' | 'active' | 'hover' |
  'normal' | 'activebefore' | 'activeafter' | 'before' | 'after';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles