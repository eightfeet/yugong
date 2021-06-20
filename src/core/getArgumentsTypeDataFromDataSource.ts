import jsxParse from "html-react-parser";
import cloneDeep from "lodash/cloneDeep";
import set from "lodash/set";
import { AnyObjectType, ArgumentsItem } from "~/types/appData";
import getBooleanData from "./getBooleanData";
import { compilePlaceholderFromDataSource as getResult } from "./getDataFromSource";
import deepForEach from "./helper/deepForeach";


const parse = (target: any) => {
  let data: any = `${target}`;
  try {
    data = jsxParse(data);
  } catch (error) {
    console.log(error);
  }
  return data;
}

/**
 * 单个参数获取数据源中的数据
 * @param {ArgumentsItem} argmentsDataItem 参数
 * @param {AnyObjectType} dataSource 取数数据源,默认runningTime
 * @return {AnyObjectType}
 */
export const getArgumentsItem = (
  argmentsDataItem: ArgumentsItem,
  dataSource?: AnyObjectType,
):
  | AnyObjectType
  | number
  | any[]
  | boolean
  | string
  | JSX.Element
  | JSX.Element[] => {
  // 数据不存在时原状态返回
  if (!argmentsDataItem) return argmentsDataItem;
  let result = undefined;
  const toJSX = (argmentsDataItem.html === true);
  switch (argmentsDataItem.type) {
    case "runningTime":
      result = getResult(`{{${argmentsDataItem.data}}}`);
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
    case "mixed": 
      /**这里做一层运行时数据替换， 并不推荐在混合数据里面使用运行时数据*/
      const copyDate = cloneDeep(argmentsDataItem.data)
      deepForEach(argmentsDataItem.data, (value: any, key:any, subject: any, path: any) => {
        if (typeof value === 'string') {
          const res = getResult(value, dataSource)
          set(copyDate, `${path}`, res)
        }
      });
      result = copyDate;
      break
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
): AnyObjectType => {
  const allResult: AnyObjectType = {};
  argmentsData?.forEach((element) => {
    if (!element || !element.fieldName) return;
    allResult[element.fieldName] = getArgumentsItem(element, dataSource);
  });
  return allResult;
};
