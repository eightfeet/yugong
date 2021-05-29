import { ArgumentsBoolean } from "~/types/appData";
import { compilePlaceholderFromDataSource as getResult } from "./getDataFromSource";
/**
 * 
 * boolean 值设计为一个比较的概念，左右参数和比较符号，返回boolean值
 * comparableAverageA & comparableAverageB允许从运行时里面取值
 * @param comparableAverageA 比较参数1
 * @param comparableAverageB 比较参数2
 * @param method 比较方法
 * @returns boolean
 */
const getBooleanData = ({
  comparableAverageA,
  comparableAverageB,
  method,
}: ArgumentsBoolean["data"]) => {
  const Left = getResult(comparableAverageA);
  const Right = getResult(comparableAverageB);
  switch (method) {
    case "===":
      return Left === Right;
    case "!==":
      return Left !== Right;
    case ">=":
      return (Number(Left) || Left) >= (Number(Right) || Right);
    case "<":
      return (Number(Left) || Left) < (Number(Right) || Right);
    case ">":
      return (Number(Left) || Left) > (Number(Right) || Right);
    case "<=":
      return (Number(Left) || Left) <= (Number(Right) || Right);
    case "==":
      // eslint-disable-next-line 
      return Left == Right;
    case "&&":
      return Left && Right;
    case "||":
      return Left || Right;
    default:
      return false;
  }
};

export default getBooleanData;
