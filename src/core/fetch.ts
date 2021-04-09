import { AnyObjectType, Api } from '~/types/appData';
import { stringifyUrl } from 'query-string';
import { getArguments } from './getArgumentsTypeDataFromDataSource';
import { store } from '~/redux/store';
import { compilePlaceholderFromDataSource as getResult } from './getDataFromSource';

const requester = async (apiArguments: Api) => {
    const {
        method,
        body,
        headers,
        mode,
        credentials,
        successPublic,
        errorPublic,
    } = apiArguments

    
    if (!apiArguments.url) {
        return Promise.reject({ message: 'api缺少url' });
    }
    if (!method) {
        return Promise.reject({ message: 'api缺少method' });
    }

    // 从runningTime翻译Api数据;
    // api 接收两种数据类型
    // 1、运行时链接类型：url、headers、mode、credentials
    // 2、参数类型结构数据：body, successPublic, errorPublic

    const url = getResult(apiArguments.url);
    // 处理header
    const headersData = {
        'Content-Type': 'application/json',
    };

    if (Object.prototype.toString.call(headers) === '[object Object]') {
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
    if (method === 'GET') {
        urlData = stringifyUrl({ url, query: bodyData });
    }

    if (headersData['Content-Type'] === 'application/json') {
        bodyData = JSON.stringify(bodyData);
    }

    // fetch参数
    const args: AnyObjectType = {
        method,
        headers: headersData,
    };

    if (method !== 'GET') {
        args.body = bodyData;
    }

    if (mode) {
        args.mode = mode;
    }

    if (credentials) {
        args.credentials = credentials;
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
            if (successPublic?.length) {
                const successPublicResult = getArguments(
                    successPublic,
                    resultData
                );
                store.dispatch.runningTimes.setRunningTimes(
                    successPublicResult
                );
            }
            return resultData;
        }
        throw res;
    } catch (error) {
        if (errorPublic?.length) {
            const errorPublicPublicResult = getArguments(
                errorPublic,
                error
            );
            store.dispatch.runningTimes.setRunningTimes(
                errorPublicPublicResult
            );
        }
      console.warn(error)
    }
};

export default requester;
