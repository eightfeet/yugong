import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { ModalProps } from "./Modal";

function createStyles(props: ModalProps) {
  const id = `MD${props.moduleId}`;
  return {
    root: (style: Style) => {
      return {
        ...(toStyle(style.normal)),
        [`& .${id}_overlay`]: (toStyle(style.overlay)),
        [`& .${id}_modules`]: {
          backgroundColor: 'transparent'
        },
        [`& .${id}_modify`]: (toStyle(style.modify)),
      };
    },
    container: (style: Style) => (toStyle(style.container)),
    content: (style: Style) => (toStyle(style.content)),
    close: (style: Style) => (toStyle(style.close)),
    header: (style: Style) => (toStyle(style.header)),
    article: (style: Style) => (toStyle(style.article)),
    footer: (style: Style) => (toStyle(style.footer)),
    button: (style: Style) => (toStyle(style.button)),
    okButton: (style: Style) => (toStyle(style.okButton)),
    cancelButton: (style: Style) => (toStyle(style.cancelButton)),
  }
};
// export type key of classes list
export type ClassesKey = 
'root' |
'normal' | 
'overlay' | 
'modify' | 
'container' | 
'content' | 
'close' |
'header' |
'article' |
'footer' |
'button' |
'okButton' |
'cancelButton';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles