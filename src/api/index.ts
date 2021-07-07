import request from "~/core/request";
import { PageData } from "~/redux/pageData";
import { AppDataListTypes } from "~/types/appData";
import { stringify } from "query-string";

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
export function createTemplate(
  params: createTemplateParams
): Promise<createTemplateResult> {
  const data: any = { ...params };
  data.appData = JSON.stringify(data.appData);
  data.pageData = JSON.stringify(data.pageData);
  return request.post("/api/template", data);
}


/**
 * 查询模板列表参数
 *
 * @export
 * @interface queryTemplateParams
 */
export interface queryTemplateParams {
  /**模板id */
  id?: number;
  /**名称 */
  title?: string;
  /**标签 */
  tag?: string;
  /**终端 */
  terminal?: string;
  /**封面 */
  cove?: string;
  /**描述 */
  discript?: string;
  /**0不公开，1公开 */
  isPublic?: '0' | '1';
}

/**
 * 查询模板列表
 *
 * @export
 * @param {queryTemplateParams} params
 * @return {*}  {Promise<queryTemplateParams[]>}
 */
export function queryTemplate(params: queryTemplateParams): Promise<queryTemplateParams[]> {
  const query = stringify(params);
  return request.get(`/api/template?${query}`);
}

/**
 * 根据模板id查询模板结果类型
 *
 * @export
 * @interface queryTemplateByIdResult
 * @extends {queryTemplateParams}
 */
export interface queryTemplateByIdResult extends queryTemplateParams{
  pageData?: string,
  appData?: string
}

/**
 * 根据模板id查询模板
 *
 * @export
 * @param {((number | string))} id
 * @return {*}  {Promise<boolean>}
 */
export function queryTemplateById(id:(number | string)): Promise<queryTemplateByIdResult> {
  return request.get(`/api/template/${id}`)
}


/**
 * 删除模板
 *
 * @export
 * @param {((number | string))} id 模板id
 * @return {*}  {Promise<boolean>}
 */
export function deleteTemplate(id:(number | string)): Promise<boolean> {
    return request.delete(`/api/template/${id}`)
}

/**
 * 查询标签参数
 *
 * @export
 * @interface queryTagParams
 */
export interface queryTagParams {
  id?: number,
  name?: string,
}

/**
 * 查询标签
 *
 * @export
 * @param {queryTagParams} [params]
 * @return {*}  {Promise<queryTagParams[]>}
 */
export function queryTag(params?: queryTagParams): Promise<queryTagParams[]> {
  const query = stringify(params || {});
  return request.get(`/api/tag/${query}`)
}