import request from '~/core/request';
import { PageData } from '~/redux/pageData';
import { AppDataListTypes } from '~/types/appData';

// 封装获取 cookie 的方法
function getCookie(name: string): string{
    let arr;
    const reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    arr = document.cookie.match(reg);
    if(arr)
    return unescape(arr[2]);
    else
    return '';
}

/**
 * 创建模板入参
 *
 * @export
 * @interface createTemplateParams
 */
export interface createTemplateParams {
    /**模板数据 */
    template: {
        /**页面数据 */
        pageData: PageData;
        /**组件数据 */
        appData: AppDataListTypes
    }
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
    return request.post('/api/template/create', params);
}

