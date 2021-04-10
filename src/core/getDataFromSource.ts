import get from "lodash/get";
import { store } from '~/redux/store';
import { AnyObjectType } from "~/types/appData";

/**
 * 从原数据编译占位符 compilePlaceholderFromDataSource
 * 取值规则，
 * 1、如果有传入数据源[dataSource]取值数据从数据源取
 * 2、没有传入数据源时默认从运行时runningTimes取值
 * 3、强制从运行时取值，通过标示*.
 * @param {string} operationStr 操作字符
 * @param {AnyObjectType} [dataSource] 数据源，默认runningTime
 * @return {string} 返回编译结果
 */
export const compilePlaceholderFromDataSource = (data: string, dataSource?: AnyObjectType): string => {
  if (typeof data !== "string") {
    return data;
  }
  // 匹配运行时
  let result = data;
  const ruleList = data.match(/\{\{(.[\w|\d|-|/|.]+?)\}\}/gm);
  ruleList?.forEach((item) => {
    const key = item.replace(/\{\{(.[\w|\d|-|/|.]+?)\}\}/gm, "$1");
    const runningTimes = store.getState().runningTimes;
    let value;
    if (!!key.match(/^\*\.+/)?.length) {
      // force global 强制从运行时取值
      value = get(runningTimes, key.replace('*.', ''), runningTimes);
    } else if (dataSource) {
      // 处理内部数据
      value = get(dataSource, key, dataSource);
    } else {
      // 处理运行时数据
      value = get(runningTimes, key, runningTimes);
    }
    result = result.replace(item, `${value || ""}`);
  });
  return result;
};

/**
 * 将所有数据类型转换为编译后的值
 */
export const getCompileResult = (data: any, dataSource?: AnyObjectType ) => {

}

export const runningTimeToResult = (value: any, defaultValue: number) : number => {
  const data = parseInt(`${compilePlaceholderFromDataSource(value)}`) || defaultValue;
  return data;
}

// 测试变量用
(window as any).compilePlaceholderFromDataSource = compilePlaceholderFromDataSource

