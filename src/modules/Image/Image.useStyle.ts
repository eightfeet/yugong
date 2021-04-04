import { createUseStyles } from 'react-jss';
import styleCompiler from '~/compiler';


const useStyles = createUseStyles<string, any>({
    image: (style) => styleCompiler(style.image).style || {},
});

export default useStyles;


