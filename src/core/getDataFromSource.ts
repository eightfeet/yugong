import get from "lodash/get";
import { store } from '~/redux/store';
import { AnyObjectType } from "~/types/appData";
const saferEval = require('safer-eval');
//  const regex = new RegExp(`${escapeRegExp(start)}([\\S\\s]+?)${escapeRegExp(end)}`, 'gi');
// js规则:js{{}}
const regexjswrap = /js\{\{([^}]+)\}\}/gm;
// 规则:{{}}
const regexwrap = /\{\{(.[\w|\d|\-|/|.|\s|:*]+?)\}\}/gm;
// 规则:首尾空格
const regexspace = /(^\s*)|(\s*$)/g;
// 规则:强制runningTime
const regexforceRT = /^\*\.+/;

const matchRule = (ruleList: string[] | null, target:string, dataSource?: AnyObjectType, isJs?: boolean ) => {
  let result = target as any;
  if (typeof result !== 'string') {
      return result
  }
  ruleList?.forEach((item) => {
    // 是否是完整数据
    let isCompleteData = false;
    if (item === result) {
      isCompleteData = true;
    }

    // 移除{{}} 或 js{{}}
    let key;
    let value;
    // 运行时
    const runningTimes = store.getState().runningTimes;
    // 确定源数据
    let data = dataSource || runningTimes;
    // js 表达式
    if (isJs) {
      key = item.replace(regexjswrap, "$1");
      // 尝试运行表达式
      try {
        // 将"this"字符转化为"data"
        key = key.replace(/this/g, 'data');
        console.log(item, key);
        value = saferEval(key, {data, runningTimes})
      } catch (error) {
        console.log(error);
        // 无法输入时直接使用key
        value = key;
      }

    } else {
      key = item.replace(regexwrap, "$1");
      // 拆解key，逐个遍历并替换，直到找到数据为止，若从元数据中找不到数据则返回最后一个字符串
      let keyArray = key.split('||');

      keyArray.some((element, index) => {
        // 元素：移除首尾空格
        let el =  element.replace(regexspace,"");
        // force global 强制从运行时取值
        if (!!el.match(regexforceRT)?.length) {
          data = runningTimes;
          el = el.replace('*.', '');
        }
        // 取值
        value = get(data, el);
        if (!!value || value === 0) {
          return true
        } else {
          if (index === (keyArray.length - 1)) {value = element}
          return false
        }
      })
    }

    const type = Object.prototype.toString.call(value);
    if (type === '[object Object]' || type === '[object Array]' || isCompleteData) {
      result = value;
    } else {
      result = result.replace(item, (value || value === 0) ? value : '');
    }    
  });
  return result;
}

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

  // 匹配运行时
  let result: any = data;

  const ruleJsList = data.match(regexjswrap);
  if (ruleJsList?.length) {
    result = matchRule(ruleJsList, result, dataSource, true);
  }

  const ruleList = data.match(regexwrap);
  result = matchRule(ruleList, result, dataSource);

  return result;
};

export const runningTimeToResult = (value: any, defaultValue: number) : number => {
  const data = parseInt(`${compilePlaceholderFromDataSource(value)}`) || defaultValue;
  return data;
}

// 测试变量用
(window as any).compilePlaceholderFromDataSource = compilePlaceholderFromDataSource

