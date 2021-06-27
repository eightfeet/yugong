import { createUseStyles } from "react-jss";
import styleCompiler from "~/compiler";

const useStyles = createUseStyles<string, any>({
  wrap: (style) => styleCompiler(style.wrap).style || {}
});

export default useStyles;
