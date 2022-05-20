import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { FormProps } from "./Form";

function createStyles(props: FormProps) {
  return {
    form: (style: Style) => ({
      ...toStyle(style.form),
      '& .ant-form-item, & .ant-form-item-label > label' : toStyle(style.label),
      '& .ant-space.ant-space-horizontal.ant-space-align-center': {
        width: '100%',
        display: 'block',
        textAlign: 'left',
        '& .ant-space-item': {display: 'inline-block !important', width: 'unset'},
        ...toStyle(style.footer),
      },
      '& .ant-checkbox-wrapper': toStyle(style.checkbox),
      '& .ant-radio-wrapper': toStyle(style.radiobox),
      '& .ant-radio-button-wrapper': {
        ...toStyle(style.radiobutton)
      },
      '& .ant-radio-button-wrapper:not(:first-child)::before': { display: 'none'},
      '& .ant-radio-button.ant-radio-button-checked': toStyle(style.radiobuttonchecked)
    }),
    submit: (style: Style) => ({
      ...toStyle(style.submit),
      '&.ant-btn:hover, &.ant-btn:focus': toStyle(style.submit),
    }),
    reset: (style: Style) => ({
      ...toStyle(style.reset),
      '& .ant-btn:hover, .ant-btn:focus': toStyle(style.reset)
    }),
  }
};
// export type key of classes list
export type ClassesKey = 'button' | 'submit' | 'reset' | 'form' | 'footer' | 'label' | 'checkbox' | 'radiobox' | 'radiobutton' | 'radiobuttonchecked';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles
