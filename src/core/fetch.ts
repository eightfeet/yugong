import { AnyObjectType, Api } from "~/types/appData";
import { stringifyUrl } from "query-string";
import { getArguments } from "./getArgumentsTypeDataFromDataSource";
import { store } from "~/redux/store";
import { compilePlaceholderFromDataSource as getResult } from "./getDataFromSource";
import loading from "./loading";

const requester = async (apiArguments: Api) => {
  const { method, body, headers, mode, credentials } = apiArguments;

  if (!apiArguments.url) {
    console.warn("api缺少url")
    return {}
  }
  if (!method) {
    console.warn("api缺少method")
    return {}
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

  // 处理Url
  let urlData = url;
  if (method === "GET") {
    urlData = stringifyUrl({ url, query: bodyData });
  }

  if (headersData["Content-Type"] === "application/json") {
    bodyData = JSON.stringify(bodyData);
  }

  // fetch参数
  const args: AnyObjectType = {
    method,
    headers: headersData,
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

  const res = await fetch(urlData, args);
  /**
   * 状态范围
   */
  if (res.status >= 200 && res.status < 300) {
    const textData = await res.text();
    const resultData = JSON.parse(textData);
    return resultData;
  }
  throw res;
};

const bootstrap = async (apiArguments: Api) => {
  const { successPublic, errorPublic } = apiArguments;
  const setRunningTimes = store.dispatch.runningTimes.setRunningTimes;
  try {
    loading.show();
    const result = await requester(apiArguments);
    loading.hide();
    // 处理请求结果
    // 成功发布
    if (successPublic?.length) {
      const successPublicResult = getArguments(successPublic, result);
      setRunningTimes(successPublicResult);
    }
    return result;
  } catch (error) {
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
