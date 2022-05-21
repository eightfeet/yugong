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
      '& .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)': {
        ...toStyle(style.radiobuttonchecked)
      },
      '& .ant-input-affix-wrapper > input.ant-input': {backgroundColor: 'transparent', color: 'inherit'},
      '& .ant-input-affix-wrapper': toStyle(style.textbox),
      '& .ant-select .ant-select-selector': toStyle(style.textbox),
      '& .ant-picker': toStyle(style.textbox),
      '& .ant-input-number': toStyle(style.textbox),
      '& .ant-switch': toStyle(style.switch),
      '& .ant-switch.ant-switch-checked': toStyle(style.switchchecked),
      '& .ant-rate-star.ant-rate-star-zero': toStyle(style.star),
      '& .ant-rate-star-first, .ant-rate-star-second': toStyle(style.star),
      '& .ant-rate-star.ant-rate-star-full .ant-rate-star-first, .ant-rate-star.ant-rate-star-full .ant-rate-star-second': toStyle(style.starselected),
      '& .ant-rate-star.ant-rate-star-half .ant-rate-star-first': toStyle(style.starselected),
      '& .ant-form-item-explain-error': toStyle(style.requiremsg),
      '& .ant-form-item-label > label.ant-form-item-required:not(.ant-form-item-required-mark-optional)::before': toStyle(style.requiremsg),
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
export type ClassesKey = 
'button' | 
'submit' | 
'reset' | 
'form' | 
'footer' | 
'label' | 
'checkbox' | 
'radiobox' | 
'radiobutton' | 
'radiobuttonchecked' |
'textbox' |
'switchchecked' |
'switch' |
'star' |
'starselected' |
'requiremsg';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles
