import { createUseStyles } from "react-jss";
import { toStyle } from "~/core/helper/toStyles";
import { StyleItemsTypes } from "~/types/appData";
import { buildModuleStyles } from "./helper";
import { LotteryProps } from "./Lottery";

function createStyles(props: LotteryProps) {
  // return createUseStyles<string, any>(buildModuleStyles())();
};
// export type key of classes list
export type ClassesKey = 'style1' | 'style2';
type Style = { [keys in ClassesKey]: StyleItemsTypes };
export default createStyles