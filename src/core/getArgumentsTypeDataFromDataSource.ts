import parse from 'html-react-parser';
import { store } from '~/redux/store';
import { AnyObjectType, ArgumentsItem } from '~/types/appData';
import getBooleanData from './getBooleanData';
import { compilePlaceholderFromDataSource as getResult } from './getDataFromSource';

/**
 * 将HTML标签转译为jsx
 * @param operationStr 操作字符
 * @returns 
 */
 export const HTMLToJSX = (operationStr:string):string | JSX.Element | JSX.Element[] => {
  if (!!operationStr.match(/^HTML(:|：)+/g)?.length) {
    return parse(operationStr.replace(/^HTML(:|：)+/, ''));
  }
  return operationStr;
}

/**
 * 单个参数获取数据源中的数据
 * @param {ArgumentsItem} argmentsDataItem 参数
 * @param {AnyObjectType} dataSource 取数数据源
 * @return {AnyObjectType}
 */
export const getArgumentsItem = (
    argmentsDataItem: ArgumentsItem,
    dataSource?: AnyObjectType,
    toJSX?: boolean,
): any => {
    if (!argmentsDataItem) return;
    let result = undefined;
    switch (argmentsDataItem.type) {
        case 'runningTime':
            result = store.getState().runningTimes[argmentsDataItem.data];
            break;
        case 'string':
            result = getResult(argmentsDataItem.data, dataSource);
            if (toJSX) result = HTMLToJSX(result); 
            break;
        case 'number':
            result = getResult(argmentsDataItem.data, dataSource);
            if (toJSX) result = HTMLToJSX(result); 
            result = Number(result);
            break;
        case 'array':
            result = argmentsDataItem.data.map((item: string) =>
              toJSX ?  HTMLToJSX(getResult(item, dataSource)) : getResult(item, dataSource)
            );
            break;
        case 'object':
            const objdata = {};
            Object.keys(argmentsDataItem.data).forEach((key: string) => {
                objdata[key] = getResult(
                    argmentsDataItem.data[key],
                    dataSource
                );
                if (toJSX) objdata[key] = HTMLToJSX(objdata[key]); 
            });
            result = objdata;
            break;
        case 'boolean':
            const {
                comparableAverageA,
                comparableAverageB,
                method,
            } = argmentsDataItem.data;
            const booleanData = getBooleanData({
                comparableAverageA: (toJSX ? HTMLToJSX(comparableAverageA) : comparableAverageA),
                comparableAverageB: (toJSX ? HTMLToJSX(comparableAverageB) : comparableAverageB),
                method,
            });
            result = booleanData;
            break;
        default:
            break;
    }

    return result;
};

/**
 * 从全部参数数据中获取数据
 * @param {ArgumentsItem[]} argmentsData
 * @param {AnyObjectType} dataSource
 * @return {AnyObjectType}
 */

export const getArguments = (
    argmentsData: ArgumentsItem[],
    dataSource?: AnyObjectType,
    toJSX?: boolean,
): AnyObjectType => {
    const allResult: AnyObjectType = {};
    argmentsData?.forEach((element) => {
        if (!element || !element.fieldName) return;
        allResult[element.fieldName] = getArgumentsItem(element, dataSource, toJSX);
    });
    return allResult;
};
