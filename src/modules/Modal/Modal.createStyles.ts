import React from "react";
import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { ModalProps } from "./Modal";

const addImportant = (obj: React.CSSProperties = {}) => {
  const newObj = {...obj};
  Object.keys(newObj).forEach(key => {
    const val = newObj[key];
    if (val) newObj[key] = `${val} !important`
  })
  return newObj;
}

function createStyles(props: ModalProps) {
  const id = `MD${props.moduleId}`;
  
  
  const data = {
    [id]: (style: Style) => {
      return {
        [`& div.${id}_modules`]: (addImportant(toStyle(style.modules))),
        [`& div.${id}_article > div`]: (addImportant(toStyle(style.container))),
        [`& div.${id}_overlay`]: (addImportant(toStyle(style.overlay))),
        [`& .${id}_modify:first-child`]: (toStyle(style.modifya)),
        [`& .${id}_modify:last-child`]: (toStyle(style.modifyb)),
        [`& div.${id}_close`]: (addImportant(toStyle(style.close))),
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
  return data
};
// export type key of classes list
export type ClassesKey = 
'root' |
'normal' | 
'overlay' | 
'modifya' | 
'modifyb' | 
'container' | 
'content' | 
'close' |
'header' |
'modules' |
'article' |
'footer' |
'button' |
'okButton' |
'cancelButton';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles