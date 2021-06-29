import { createUseStyles } from "react-jss";
import styleCompiler from "~/compiler";

const useStyles = createUseStyles<string, any>({
  item: (style) => styleCompiler(style.item).style || {}
});

export default useStyles;
