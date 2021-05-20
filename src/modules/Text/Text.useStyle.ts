import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';


const useStyles = createUseStyles<string, any>({
    wrap: (style) => (styleCompiler(style.wrap).style || {}),
    paragraph: (style) => {
        return ({
            ...(styleCompiler(style.paragraph).style || {}),
            '& >span': (styleCompiler(style.prefix).style || {}),
            "&:nth-child(even)": styleCompiler(style.even).style,
            "&:nth-child(odd)": styleCompiler(style.odd).style,
            "&:first-child": styleCompiler(style.first).style,
            "&:last-child": styleCompiler(style.last).style,
        })
    },
    
});

export default useStyles;


