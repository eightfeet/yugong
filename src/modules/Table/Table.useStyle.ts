import { createUseStyles } from "react-jss";
import styleCompiler from "~/compiler";

const useStyles = createUseStyles<string, any>({
  table: (style) => {
    return {
        // 表格
      thead: {
        // 页头
        tr: {},
      },
      "& tr": {
        "&:nth-child(even)": {
          // 偶数
          backgroundColor: "red"
        },
        "&:nth-child(odd)": {
          // 奇数
          backgroundColor: "green"
        },
        '& td, th': {
          "&:nth-child(even)": {
            backgroundColor: "red"
          },
          "&:nth-child(odd)": {
            backgroundColor: "green"
          }
        }
      }
    };
  },
});

export default useStyles;
