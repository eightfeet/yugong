import parse from "html-react-parser";
import { store } from "~/redux/store";
import { AnyObjectType, ArgumentsItem } from "~/types/appData";
import getBooleanData from "./getBooleanData";
import { compilePlaceholderFromDataSource as getResult } from "./getDataFromSource";

/**
 * 单个参数获取数据源中的数据
 * @param {ArgumentsItem} argmentsDataItem 参数
 * @param {AnyObjectType} dataSource 取数数据源,默认runningTime
 * @return {AnyObjectType}
 */
export const getArgumentsItem = (
  argmentsDataItem: ArgumentsItem,
  dataSource?: AnyObjectType,
  toJSX?: boolean
):
  | AnyObjectType
  | any[]
  | boolean
  | string
  | JSX.Element
  | JSX.Element[] => {
  // if (!argmentsDataItem) return;
  let result = undefined;
  switch (argmentsDataItem.type) {
    case "runningTime":
      result = store.getState().runningTimes[argmentsDataItem.data];
      break;
    case "string":
      result = getResult(argmentsDataItem.data, dataSource);
      if (toJSX) result = parse(result);
      break;
    case "number":
      result = getResult(argmentsDataItem.data, dataSource);
      if (toJSX) result = parse(result);
      result = Number(result);
      break;
    case "array":
      result = argmentsDataItem.data.map((item: string) =>
        toJSX
          ? parse(getResult(item, dataSource))
          : getResult(item, dataSource)
      );
      break;
    case "object":
      const objdata = {};
      Object.keys(argmentsDataItem.data).forEach((key: string) => {
        objdata[key] = getResult(argmentsDataItem.data[key], dataSource);
        if (toJSX) objdata[key] = parse(objdata[key]);
      });
      result = objdata;
      break;
    case "boolean":
      const {
        comparableAverageA,
        comparableAverageB,
        method,
      } = argmentsDataItem.data;
      const booleanData = getBooleanData({
        comparableAverageA: toJSX
          ? parse(comparableAverageA)
          : comparableAverageA,
        comparableAverageB: toJSX
          ? parse(comparableAverageB)
          : comparableAverageB,
        method,
      });
      result = booleanData;
      break;
    default:
      break;
  }

  return result;
};

/**
 * 从全部参数数据中获取数据
 * @param {ArgumentsItem[]} argmentsData
 * @param {AnyObjectType} dataSource
 * @return {AnyObjectType}
 */

export const getArguments = (
  argmentsData: ArgumentsItem[],
  dataSource?: AnyObjectType,
  toJSX?: boolean
): AnyObjectType => {
  const allResult: AnyObjectType = {};
  argmentsData?.forEach((element) => {
    if (!element || !element.fieldName) return;
    allResult[element.fieldName] = getArgumentsItem(element, dataSource, toJSX);
  });
  return allResult;
};
