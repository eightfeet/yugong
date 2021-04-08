import { store } from "~/redux/store";
import { AnyObjectType, ArgumentsItem } from "~/types/appData";
import getBooleanData from "./getBooleanData";
import getDataFromRunningTime from "./getDataFromRunningTime";

const getDataFromArguments = (data: ArgumentsItem[], userStore?: AnyObjectType) => {
  const result: AnyObjectType = {};
  data?.forEach((element) => {
    if (!element.name) return;
    switch (element.type) {
      case "runningTime":
        result[element.name] = store.getState().runningTimes[element.data];
        break;
      case "string":
        result[element.name] = getDataFromRunningTime(element.data, userStore);
        break;
      case "number":
        result[element.name] = Number(getDataFromRunningTime(element.data, userStore));
        break;
      case "array":
        result[element.name] = element.data.map((item: string) =>
          getDataFromRunningTime(item, userStore)
        );
        break;
      case "object":
        const objdata = {};
        Object.keys(element.data)
          .forEach((key: string) => {
            objdata[key] = getDataFromRunningTime(element.data[key], userStore);
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

export default getDataFromArguments;
