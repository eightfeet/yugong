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
  const ruleList = data.match(/\{\{(.[\w|\d|\-|/|.|\s*]+?)\}\}/gm);
  ruleList?.forEach((item) => {
    // 移除{{}}
    const key = item.replace(/\{\{(.[\w|\d|\-|/|.|\s*]+?)\}\}/gm, "$1");
    // 拆解key，逐个遍历并替换，直到找到数据为止，若从元数据中找不到数据则返回最后一个字符串
    let keyArray = key.split('||');
    const runningTimes = store.getState().runningTimes;
    let value;
    keyArray.some((element, index) => {
      // 移除首尾空格
      const el =  element.replace(/(^\s*)|(\s*$)/g,"");
      if (!!el.match(/^\*\.+/)?.length) {
        // force global 强制从运行时取值
        value = get(runningTimes, el.replace('*.', ''));
      } else if (dataSource) {
        // 处理内部数据
        value = get(dataSource, el);
      } else {
        // 处理运行时数据
        value = get(runningTimes, el);
      }
      if (!!value) {
        return true
      } else {
        if (index === (keyArray.length - 1)) {value = element}
        return false
      }
    })

    result = result.replace(item, `${value || ""}`);
    
  });
  return result;
};

export const runningTimeToResult = (value: any, defaultValue: number) : number => {
  const data = parseInt(`${compilePlaceholderFromDataSource(value)}`) || defaultValue;
  return data;
}

// 测试变量用
(window as any).compilePlaceholderFromDataSource = compilePlaceholderFromDataSource

