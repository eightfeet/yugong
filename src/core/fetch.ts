import { AnyObjectType, Api } from '~/types/appData';
import { stringifyUrl } from 'query-string';
import {
    getArguments,
    getArgumentsItem,
} from './getArgumentsTypeDataFromDataSource';
import { store } from '~/redux/store';
import { compilePlaceholderFromDataSource as getResult } from './getDataFromSource';
import loading from './loading';
import isType from './helper/isType';
import message from '~/components/Message';
import lodash from 'lodash';

const requester = async (
    apiArguments: Api,
    isDestructuring?: boolean
): Promise<AnyObjectType> => {
    const { method, body, headers, mode, credentials, dataMap, enterMap } =
        apiArguments;
    // 没有Api Url 或者 Method 时 return 未设置，这里不做错误处理（throw Error），
    // “未配置”不能归于错误，不能影响下游操作
    // 下游对结果处理需要注意
    if (!apiArguments.url || !method) {
        console.warn(`api(${apiArguments.name})缺少url或method`);
        return { api_unset: true };
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

    // 解构api时只取第一个参数
    if (isDestructuring && isType(bodyData, 'Object')) {
        let temp = {};
        Object.keys(bodyData).some((key) => {
            temp = bodyData[key];
            return true;
        });
        bodyData = temp;
    }

    // 映射转换
    if (enterMap?.length) {
        const maps = enterMap[0].map?.data || {};
        for (const key in maps) {
            if (Object.prototype.hasOwnProperty.call(maps, key)) {
                const targetKey = maps[key];
                if (bodyData[key]) {
                    bodyData[targetKey] = bodyData[key];
                }
            }
        }
    }

    return await fetchApi(
        url,
        { method, headers: headersData, body: bodyData, mode, credentials },
        dataMap
    );
};

export const fetchApi = async (
    url: string,
    {
        method,
        headers = {},
        body,
        mode = 'cors',
        credentials,
        ...others
    }: { [keys: string]: any },
    dataMap: Api['dataMap']
) => {
    // 处理Url
    let urlData = url;
    let bodyData = { ...body };
    if (method === 'GET') {
        urlData = stringifyUrl({ url, query: body });
    }

    if (headers['Content-Type'] === 'application/json') {
        bodyData = JSON.stringify(bodyData);
    }

    // fetch参数
    const args: AnyObjectType = {
        method,
        headers: headers,
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

    const res = await fetch(urlData, { ...others, ...args });

    /**
     * 状态范围
     */
    if (res.status >= 200 && res.status < 300) {
        const textData = await res.text();
        const resultData = JSON.parse(textData);

        const body = {
            response: resultData,
        };
        
        // 结果处理
        // 结果到映射
        if (dataMap?.length) {
            dataMap.forEach(({ source, target, map }) => {
                if (!source || !map || !target) {
                    return;
                }
                
                // 从返回数据中获取源数据
                const sourceData = lodash.get(body, source);
                // 源数据与目标数据的映射关系, 这里不通过getArgumentsItem获取，而是手动获取，这样避免规则标签被过滤
                const argMap = map.data; //getArgumentsItem(map, sourceData) as AnyObjectType;

                // 无数据源时不做处理
                if (!sourceData) {
                    return;
                }

                // 暂时存储结果
                let mapResult;
                /**
                 * 处理数据映射时仅对两类型数据源做转换，
                 * 1、数组对象型数据 [{foo:bar}]
                 * 2、对象型数据 {foo:bar}
                 * 3、字符串型数据直接转换
                 */
                // 1、数组对象型数据
                if (
                    Object.prototype.toString.call(sourceData) ===
                    '[object Array]'
                ) {
                    mapResult = [];
                    sourceData.forEach((itemArgMap: any) => {
                        if (
                            Object.prototype.toString.call(itemArgMap) ===
                            '[object Object]'
                        ) {
                            const tempData = {};
                            for (const key in argMap) {
                                const orderKey = argMap[key];
                                // 当前项数据存在时
                                tempData[key] =
                                    itemArgMap[orderKey] ||
                                    // 当前项数据不存在时从运行时取数据，运行时无数据时返回orderKey字符
                                    getArgumentsItem({
                                        fieldName: `${orderKey}`,
                                        data: orderKey,
                                        type: 'string',
                                    }, itemArgMap);
                            }
                            mapResult.push(tempData);
                        }
                    });
                }
                // 2、对象型数据
                if (
                    Object.prototype.toString.call(sourceData) ===
                    '[object Object]'
                ) {
                    mapResult = {};
                    for (const key in argMap) {
                        if (Object.prototype.hasOwnProperty.call(argMap, key)) {
                            const orderKey = argMap[key];
                            mapResult[key] = sourceData[orderKey] || 
                            // 当前项数据不存在时从运行时取数据，运行时无数据时返回orderKey字符
                            getArgumentsItem({
                                fieldName: `${orderKey}`,
                                data: orderKey,
                                type: 'string',
                            }, sourceData);
                        }
                    }
                }

                // 3、字符串型数据
                if (
                    Object.prototype.toString.call(sourceData) ===
                    '[object String]'
                ) {
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
            });
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

        // 当前Api未设置则返回空：api的url或方法未定义时定义为空
        if (result.api_unset) {
            return {};
        }

        // 处理请求结果
        // 成功发布
        if (successPublic?.length) {
            const successPublicResult = getArguments(successPublic, result);
            setRunningTimes(successPublicResult);
        }
        return result;
    } catch (error: any) {
        loading.hide();
        // 失败发布
        if (errorPublic?.length) {
            const errorPublicPublicResult = getArguments(errorPublic, error);
            setRunningTimes(errorPublicPublicResult);
        }
        message.error(`${apiArguments.apiId}请求失败！`)
        throw error;
    }
};

export default bootstrap;
