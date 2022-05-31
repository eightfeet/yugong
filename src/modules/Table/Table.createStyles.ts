import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { TableProps } from "./Table";

function createStyles(props: TableProps) {
  return {
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
      thcoleven={},
      thcolodd={},
      thcoloddfirst={},
      thcolevenlast={},
    }: Style) => {
      return {
        // 表格
        ...toStyle(table),
        "& th": toStyle(th),
        "& td": toStyle(td),
        "& thead": {
          // 页头
          "& tr": {
            ...toStyle(thead),
            "& td, th": {
              "&:nth-child(even)": toStyle(thcoleven),
              "&:nth-child(odd)": toStyle(thcolodd),
              "&:first-child": toStyle(thcoloddfirst),
              "&:last-child": toStyle(thcolevenlast),
            },
          }
        },
        "& tbody": {
          ...toStyle(tbody),
          "& tr": {
            ...toStyle(tr),
            "&:nth-child(even)": toStyle(roweven),
            "&:nth-child(odd)": toStyle(rowodd),
            "&:first-child": toStyle(rowoddfirst),
            "&:last-child": toStyle(rowoddlast),
            "& td, th": {
              "&:nth-child(even)": toStyle(coleven),
              "&:nth-child(odd)": toStyle(colodd),
              "&:first-child": toStyle(coloddfirst),
              "&:last-child": toStyle(colevenlast),
            },
          },
        },
      };
    },
  }
};
// export type key of classes list
export type ClassesKey = 
'table'|
'thead'|
'tbody'|
'th'|
'td'|
'tr'|
'rowoddfirst'|
'rowoddlast'|
'rowodd'|
'roweven'|
'coloddfirst'|
'colevenlast'|
'colodd'|
'coleven'|
'thcoleven'|
'thcolodd'|
'thcoloddfirst'|
'thcolevenlast';

type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles