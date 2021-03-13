import { AnyObjectType, Api } from "~/types/appData";
import { stringifyUrl } from "query-string";
import getDataFromRunningTime from './getDataFromRunningTime'

const requester = async ({ url, method, body, headers, credentials }: Api) => {
  if (!url) {
    return Promise.reject({ message: "没有url" });
  }

  // 处理header
  const headersData = {
    "Content-Type": "application/json",
    ...headers,
  };

  // 关联body
  let bodyData: any = { };
  body?.forEach((element: AnyObjectType) => {
    switch (element.type) {
        case "string":
        case "number":
          bodyData[element.name] = getDataFromRunningTime(element.data);
          break;
        case "array":
          break;
        case "object":
          break;
        case "boolean":
          break;

        default:
          break;
      }
    
  });

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
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export default requester;
