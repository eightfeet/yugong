import get from "lodash/get";
import { store } from '~/redux/store';
import { AnyObjectType } from "~/types/appData";
const saferEval = require('safer-eval');

/**
 * 从原数据编译占位符 compilePlaceholderFromDataSource
 * 取值规则，
 * 1、如果有传入数据源[dataSource]取值数据从数据源取
 * 2、没有传入数据源时默认从运行时runningTimes取值
 * 3、强制从运行时取值，通过标示*.来识别
 * @param {string} operationStr 操作字符
 * @param {AnyObjectType} [dataSource] 数据源，默认runningTime
 * @return {string} 返回编译结果
 */
export const compilePlaceholderFromDataSource = (data: string, dataSource?: AnyObjectType): any => {
  if (typeof data !== "string") {
    return data || '';
  }
  // js规则:js{{}}
  const regexjswrap = /js\{\{(.[\w|\d|\-|/|.|\s|:*]+?)\}\}/gm;
  // 规则:{{}}
  const regexwrap = /\{\{(.[\w|\d|\-|/|.|\s|:*]+?)\}\}/gm;
  // 规则:首尾空格
  const regexspace = /(^\s*)|(\s*$)/g;
  // 规则:强制runningTime
  const regexforceRT = /^\*\.+/;

  // 匹配运行时
  let result: any = data;

  const ruleList = data.match(regexwrap);
  ruleList?.forEach((item) => {
    // 移除{{}}
    const key = item.replace(regexwrap, "$1");

    // 拆解key，逐个遍历并替换，直到找到数据为止，若从元数据中找不到数据则返回最后一个字符串
    let keyArray = key.split('||');
    const runningTimes = store.getState().runningTimes;

    let value;
    keyArray.some((element, index) => {
      // 元素：移除首尾空格
      let el =  element.replace(regexspace,"");
      // 确定源数据
      let source = dataSource || runningTimes;
      // force global 强制从运行时取值
      if (!!el.match(regexforceRT)?.length) {
        source = runningTimes;
        el = el.replace('*.', '');
      }
      // 取值
      value = get(source, el);
      
      if (!!value) {
        return true
      } else {
        if (index === (keyArray.length - 1)) {value = element}
        return false
      }
    })

    if ( typeof value === 'number' || typeof value === 'string') {
      result = result.replace(item, `${value || ""}`);
    } else {
      result = value;
    }
  });
  return result;
};

export const runningTimeToResult = (value: any, defaultValue: number) : number => {
  const data = parseInt(`${compilePlaceholderFromDataSource(value)}`) || defaultValue;
  return data;
}

// 测试变量用
(window as any).compilePlaceholderFromDataSource = compilePlaceholderFromDataSource

