import { createUseStyles } from "react-jss";
import styleCompiler from "~/compiler";

const useStyles = createUseStyles<string, any>({
  wrap: (style) => ({
    ...(styleCompiler(style.wrap).style || {}),
    "& h3.formheader": styleCompiler(style.header).style || {},
    "& div.formcontainer": styleCompiler(style.container).style || {},
  }),
  footer: (style) => ({
    ...(styleCompiler(style.footer).style || {}),
    "& button": styleCompiler(style.button).style || {},
    "& .form_ok": styleCompiler(style.oknormal).style || {},
    "& .form_ok:disabled": styleCompiler(style.okdisabled).style || {},
    "& .form_reset": styleCompiler(style.resetnormal).style || {},
  }),
  formitem: (style) => ({
    // 表单项
    "& .MuiGrid-item": styleCompiler(style.formitem).style || {},
    // 表单图标
    "& .MuiSvgIcon-root": styleCompiler(style.icon).style || {},
    // 常态修饰线
    "& .MuiInput-underline:before": styleCompiler(style.baseline).style || {},
    "& .MuiOutlinedInput-notchedOutline":
      styleCompiler(style.baseline).style || {},
    // 激活修饰线
    "& .MuiInput-underline:after": styleCompiler(style.baselineact).style || {},
    "& .MuiOutlinedInput-colorSecondary.Mui-focused .MuiOutlinedInput-notchedOutline":
      styleCompiler(style.baselineact).style || {},

    "& .MuiInput-underline.Mui-error:before,  .MuiInput-underline.Mui-error:after":
      styleCompiler(style.errorbaseline).style || {},
      
    "& .MuiFormLabel-root": styleCompiler(style.label).style || {},
    "& .MuiFormLabel-root.Mui-error":
      styleCompiler(style.errorlabel).style || {},
    "& label.Mui-error, div.Mui-error, p.Mui-error, legend.Mui-error":
      styleCompiler(style.validateError).style || {},
    "& .MuiTextField-root label.Mui-focused,  .MuiTextField-root div.Mui-focused,  .MuiTextField-root p.Mui-focused,  .MuiTextField-root legend.Mui-focused":
      styleCompiler(style.activity).style || {},
  }),
});

export default useStyles;
