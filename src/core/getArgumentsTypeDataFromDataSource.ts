import { store } from "~/redux/store";
import { AnyObjectType, ArgumentsItem } from "~/types/appData";
import getBooleanData from "./getBooleanData";
import getDataFromRunningTime from "./getDataFromRunningTime";
/**
 * 从参数数据中获取数据
 * @param {ArgumentsItem[]} argmentsData 
 * @param {AnyObjectType} dataSource
 * @return {AnyObjectType} 
 */
 
const getArgumentsTypeDataFromDataSource = (argmentsData: ArgumentsItem[], dataSource?: AnyObjectType): AnyObjectType => {
  const result: AnyObjectType = {};
  argmentsData?.forEach((element) => {
    if (!element.name) return;
    switch (element.type) {
      case "runningTime":
        result[element.name] = store.getState().runningTimes[element.data];
        break;
      case "string":
        result[element.name] = getDataFromRunningTime(element.data, dataSource);
        break;
      case "number":
        result[element.name] = Number(getDataFromRunningTime(element.data, dataSource));
        break;
      case "array":
        result[element.name] = element.data.map((item: string) =>
          getDataFromRunningTime(item, dataSource)
        );
        break;
      case "object":
        const objdata = {};
        Object.keys(element.data)
          .forEach((key: string) => {
            objdata[key] = getDataFromRunningTime(element.data[key], dataSource);
          });
        result[element.name] = objdata;
        break;
      case "boolean":
        const { comparableAverageA, comparableAverageB, method } = element.data;
        const booleanData = getBooleanData({
          comparableAverageA,
          comparableAverageB,
          method,
        });
        result[element.name] = booleanData;
        break;
      default:
        break;
    }
  });
  return result;
};

export default getArgumentsTypeDataFromDataSource;
