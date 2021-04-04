import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';


const useStyles = createUseStyles<string, any>({
    paragraph: (style) => {
        return ({
            ...(styleCompiler(style.paragraph).style || {}),
            '&:before': (styleCompiler(style.prefix).style || {}),
        })
    },
    
});

export default useStyles;


