import { AnyObjectType, Api } from "~/types/appData";
import { stringifyUrl } from "query-string";
import { getArguments, getArgumentsItem } from "./getArgumentsTypeDataFromDataSource";
import { store } from "~/redux/store";
import { compilePlaceholderFromDataSource as getResult } from "./getDataFromSource";
import loading from "./loading";
import isType from "./helper/isType";
import message from "~/components/Message";
import lodash from "lodash";

const requester = async (apiArguments: Api, isDestructuring?: boolean) => {
  const { method, body, headers, mode, credentials, dataMap } = apiArguments;
  if (!apiArguments.url) {
    console.warn(`api(${apiArguments.name})缺少url`);
    return {};
  }
  if (!method) {
    console.warn(`api(${apiArguments.name})缺少method`);
    return {};
  }
  
  // 从runningTime翻译Api数据;
  // api 接收两种数据类型
  // 1、运行时链接类型：url、headers、mode、credentials
  // 2、参数类型结构数据：body, successPublic, errorPublic

  const url = getResult(apiArguments.url);
  // 处理header
  const headersData = {
    "Content-Type": "application/json",
  };

  if (Object.prototype.toString.call(headers) === "[object Object]") {
    for (const key in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, key)) {
        const element = getResult(headers[key]);
        headersData[key] = element;
      }
    }
  }

  // 关联body
  let bodyData: any = getArguments(body || []);

  // 解构api时只取第一个参数
  if (isDestructuring && isType(bodyData, "Object")) {
    let temp = {};
    Object.keys(bodyData).some((key) => {
      temp = bodyData[key];
      return true;
    });
    bodyData = temp;
  }
  
  return await fetchApi(url, { method, headers: headersData, body: bodyData, mode, credentials }, dataMap);
};

export const fetchApi = async (
  url: string,
  { method, headers={}, body, mode="cors", credentials, ...others }: { [keys: string]: any },
  dataMap: Api['dataMap']
) => {
  // 处理Url
  let urlData = url;
  let bodyData = { ...body };
  if (method === "GET") {
    urlData = stringifyUrl({ url, query: body });
  }

  if (headers["Content-Type"] === "application/json") {
    bodyData = JSON.stringify(bodyData);
  }

  // fetch参数
  const args: AnyObjectType = {
    method,
    headers: headers,
  };

  if (method !== "GET") {
    args.body = bodyData;
  }

  if (mode) {
    args.mode = mode;
  }

  if (credentials) {
    args.credentials = credentials;
  }

  const res = await fetch(urlData, {...others, ...args });

  /**
   * 状态范围
   */
  if (res.status >= 200 && res.status < 300) {
    const textData = await res.text();
    const resultData = JSON.parse(textData);

    const body = {
      data: resultData,
    }

    // 映射处理
    if (dataMap?.length) {
      dataMap.forEach(({source, target, map}) => {
        if (!source || !map || !target) {
          return;
        }
        // 映射关系
        const argMap = getArgumentsItem(map) as AnyObjectType;
        // 数据源
        const sourceData = lodash.get(body, source);
        // 暂时存储结果
        let mapResult;
        /**
         * 处理数据映射时仅对两类型数据源做转换，
         * 1、数组对象型数据 [{foo:bar}]
         * 2、对象型数据 {foo:bar}
         * 3、字符串型数据直接转换
         */
        // 1、数组对象型数据
        if (Object.prototype.toString.call(sourceData) === '[object Array]') {
          mapResult = [];
          sourceData.forEach((itemArgMap: any) => {
            const tempData = {};
            if (Object.prototype.toString.call(itemArgMap) === '[object Object]') {
              for (const key in argMap) {
                const targetKey = argMap[key];
                tempData[targetKey] = itemArgMap[key];
                mapResult.push(tempData);
              }
            }
          });
        }
        // 2、对象型数据
        if (Object.prototype.toString.call(sourceData) === '[object Object]') {
          mapResult = {};
          for (const key in argMap) {
            if (Object.prototype.hasOwnProperty.call(argMap, key)) {
              const targetKey = argMap[key];
              mapResult[targetKey] = sourceData[key]
            }
          }
        }

        // 3、字符串型数据
        if (Object.prototype.toString.call(sourceData) === '[object String]') {
          for (const key in argMap) {
            if (Object.prototype.hasOwnProperty.call(argMap, key)) {
              mapResult = sourceData;
            }
          }
        }
        
        // 赋值
        if (mapResult) {
          lodash.set(body, target, mapResult);
        }
      })
    }


    return body;
  }
  throw res;
};

/**
 *
 * api 请求
 * @param {Api} apiArguments api参数
 * @param {boolean} [isDestructuring] 是否解构结果，将数据打平
 * @return {*}
 */
const bootstrap = async (apiArguments: Api, isDestructuring?: boolean) => {
  const { successPublic, errorPublic } = apiArguments;
  const setRunningTimes = store.dispatch.runningTimes.setRunningTimes;
  try {
    loading.show();
    const result = await requester(apiArguments, isDestructuring);
    loading.hide();
    // 处理请求结果
    // 成功发布
    if (successPublic?.length) {
      const successPublicResult = getArguments(successPublic, { result });
      setRunningTimes(successPublicResult);
    }
    return result;
  } catch (error: any) {
    message.error("请求失败");
    loading.hide();
    // 失败发布
    if (errorPublic?.length) {
      const errorPublicPublicResult = getArguments(errorPublic, error);
      setRunningTimes(errorPublicPublicResult);
    }
    throw error;
  }
};

export default bootstrap;
