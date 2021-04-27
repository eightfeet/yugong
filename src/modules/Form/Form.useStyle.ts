import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';


const useStyles = createUseStyles<string, any>({
    wrap: (style) => styleCompiler(style.wrap).style || {},
    header: (style) => styleCompiler(style.header).style || {},
    container: (style) => styleCompiler(style.container).style || {},
    footer: (style) => ({
        ...styleCompiler(style.footer).style || {},
        '& button': (styleCompiler(style.button).style || {}),
        '& .form_ok': styleCompiler(style.oknormal).style || {},
        '& .form_ok:disabled': styleCompiler(style.okdisabled).style || {},
        '& .form_reset': styleCompiler(style.resetnormal).style || {}
    }),
    formitem: (style) => ({
        '& .MuiGrid-item': styleCompiler(style.formitem).style || {},
        '& .MuiSvgIcon-root': styleCompiler(style.icon).style || {},
        '& .MuiInput-underline:before': styleCompiler(style.baseline).style || {},
        '& .MuiInput-underline:after': styleCompiler(style.baselineact).style || {},
        '& .MuiInput-underline.Mui-error:before': styleCompiler(style.errorbaseline).style || {},
        '& .MuiInput-underline.Mui-error:after': styleCompiler(style.errorbaselineact).style || {},
        '& .MuiFormLabel-root': styleCompiler(style.label).style || {},
        '& .MuiFormLabel-root.Mui-error': styleCompiler(style.errorlabel).style || {},
        
    })
});

export default useStyles;
