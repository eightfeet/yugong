import { AnyObjectType, Api } from "~/types/appData";
import { stringifyUrl } from "query-string";
import getDataFromArguments from "./getDataFromArguments";
import { Dispatch, store } from "~/redux/store";

const requester = async ({ url, method, body, headers, successPublic, errorPublic, credentials }: Api) => {
  if (!url) {
    return Promise.reject({ message: "没有url" });
  }

  // 处理header
  const headersData = {
    "Content-Type": "application/json",
    ...headers,
  };

  // 关联body
  let bodyData: any = getDataFromArguments(body || [])

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

  try {
    const res = await fetch(urlData, args);
    /**
     * 状态范围
     */
    if (res.status >= 200 && res.status < 300) {
      const textData = await res.text();
      const resultData = JSON.parse(textData);
      // 处理请求结果
      console.log('resultData', resultData);
      if (successPublic?.length) {
        const successPublicResult = getDataFromArguments(successPublic, resultData);
        console.log('successPublicResult', successPublicResult)
        store.dispatch.runningTimes.setRunningTimes(successPublicResult)
      }
      return resultData;
    }
    throw res
  } catch (error) {
    // 处理失败结果
    // console.log(error);
  }
};

export default requester;
