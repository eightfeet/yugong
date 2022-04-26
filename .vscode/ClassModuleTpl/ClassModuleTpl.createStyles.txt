import { toStyle } from "~/core/helper/toStyles";
import { ClassModuleTplProps } from "./ClassModuleTpl";

function createStyles(props: ClassModuleTplProps) {
  return {
    style1: (style: any) => toStyle(style.style1),
    style2: (style: any) => toStyle(style.style2),
  }
};


export default createStyles