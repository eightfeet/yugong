import { createUseStyles } from "react-jss";
import styleCompiler from "~/compiler";

const useStyles = createUseStyles<string, any>({
  table: ({
    table = {},
    thead = {},
    tbody = {},
    th = {},
    td = {},
    tr = {},
    rowoddfirst = {},
    rowoddlast = {},
    rowodd = {},
    roweven = {},
    coloddfirst = {},
    colevenlast = {},
    colodd = {},
    coleven = {},
  }) => {
    return {
      // 表格
      ...styleCompiler(table).style,
      "& th": styleCompiler(th).style,
      "& td": styleCompiler(td).style,
      "& thead": {
        // 页头
        "& tr": styleCompiler(thead).style,
      },
      "& tbody": {
        ...styleCompiler(tbody).style,
        "& tr": {
          ...styleCompiler(tr).style,
          "&:nth-child(even)": styleCompiler(roweven).style,
          "&:nth-child(odd)": styleCompiler(rowodd).style,
          "&:first-child": styleCompiler(rowoddfirst).style,
          "&:last-child": styleCompiler(rowoddlast).style,
          "& td, th": {
            "&:nth-child(even)": styleCompiler(coleven).style,
            "&:nth-child(odd)": styleCompiler(colodd).style,
            "&:first-child": styleCompiler(coloddfirst).style,
            "&:last-child": styleCompiler(colevenlast).style,
          },
        },
      },
    };
  },
});

export default useStyles;
