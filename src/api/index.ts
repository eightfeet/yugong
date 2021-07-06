import request from '~/core/request';
import { PageData } from '~/redux/pageData';
import { AppDataListTypes } from '~/types/appData';

/**
 * 创建模板入参
 *
 * @export
 * @interface createTemplateParams
 */
export interface createTemplateParams {
    /**标题 */
    title?: string;
    /**描述 */
    discript?: string;
    /**封面图片 */
    cove?: string;
    /**终端 */
    terminal?: string;
    /**标签 */
    tag?: string;
    /**页面数据 */
    pageData?: PageData;
    /**组件数据 */
    appData?: AppDataListTypes;
    /**模板类型, 0:不公开，1:公开 */
    isPublic?: number;
}
/**
 * 创建结果返回
 *
 * @export
 * @interface createTemplateResult
 */
export interface createTemplateResult {}

/**
 * 创建模板
 *
 * @export
 * @param {createTemplateParams} params
 * @return {*}  {Promise<createTemplateResult>}
 */
export function createTemplate(params:createTemplateParams): Promise<createTemplateResult> {
    const data: any = {...params};
    data.appData = JSON.stringify(data.appData);
    data.pageData = JSON.stringify(data.pageData);
    return request.post('/api/template', data);
}

