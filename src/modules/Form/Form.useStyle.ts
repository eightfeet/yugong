import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';


const useStyles = createUseStyles<string, any>({
    wrap: (style) => styleCompiler(style.wrap).style || {},
    header: (style) => styleCompiler(style.header).style || {},
    container: (style) => styleCompiler(style.container).style || {},
    footer: (style) => ({
        ...styleCompiler(style.footer).style || {},
        '& button': (styleCompiler(style.button).style || {})
    }),
    oknormal: (style) => ({
        ...styleCompiler(style.oknormal).style || {},
        '& disabled': styleCompiler(style.okdisabled).style || {},
    }),
    resetnormal: (style) => styleCompiler(style.resetnormal).style || {},
});

export default useStyles;
