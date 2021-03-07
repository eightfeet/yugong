import get from "lodash/get";
import { store } from '~/redux/store';

const getDataFromRunningTime = (data: string) => {
  if (typeof data !== "string") {
    return data;
  }
  let result = data;
  const ruleList = data.match(/\{\{(.[\w|\d|-|/|.]+?)\}\}/gm);
  ruleList?.forEach((item) => {
    const key = item.replace(/\{\{(.[\w|\d|-|/|.]+?)\}\}/gm, "$1");
    const value = get(store.getState().runningTimes, key);
    result = result.replace(item, `${value || ""}`);
  });

  return result;
};

// 测试变量用
(window as any).getDataFromRunningTime = getDataFromRunningTime

export default getDataFromRunningTime;
