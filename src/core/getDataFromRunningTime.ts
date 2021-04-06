import get from "lodash/get";
import parse from 'html-react-parser';
import { store } from '~/redux/store';
import { AnyObjectType } from "~/types/appData";

const getDataFromRunningTime = (data: string, userStore?: AnyObjectType): any => {
  if (typeof data !== "string") {
    return data;
  }

  // 匹配运行时
  let result = data;
  const ruleList = data.match(/\{\{(.[\w|\d|-|/|.]+?)\}\}/gm);
  ruleList?.forEach((item) => {
    const key = item.replace(/\{\{(.[\w|\d|-|/|.]+?)\}\}/gm, "$1");
    let value;
    if ( userStore && key.indexOf('_api.')!== -1) {
      // 处理api内部数据状态
      value = get(userStore, key.replace('_api.', ''));
    } else {
      value = get(store.getState().runningTimes, key);
    }
    
    result = result.replace(item, `${value || ""}`);
  });

  if (!!result.match(/^HTML(:|：)+/g)?.length) {
    return parse(result.replace(/^HTML(:|：)+/, ''));
  }
  return result;
};

export const runningTimeToResult = (value: any, defaultValue: number) : number => {
  const data = parseInt(`${getDataFromRunningTime(value)}`) || defaultValue;
  return data;
}

// 测试变量用
(window as any).getDataFromRunningTime = getDataFromRunningTime

export default getDataFromRunningTime;
