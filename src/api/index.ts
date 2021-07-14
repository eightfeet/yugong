import request from "~/core/request";
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
  describe?: string;
  /**封面图片 */
  cove?: string;
  /**终端 */
  terminal?: string;
  /**标签 */
  tag?: string;
  /**页面数据 */
  pageData?: string;
  /**组件数据 */
  appData?: string;
  /**模板类型, 0:不公开，1:公开 */
  isPublic?: number;
}

/**
 * 创建模板
 *
 * @export
 * @param {createTemplateParams} params
 * @return {*}  {Promise<createTemplateResult>}
 */
export function createTemplate(
  params: createTemplateParams
): Promise<number> {
  const data: any = { ...params };
  return request.post("/api/template", data);
}

/**
 * 更新模板
 *
 * @export
 * @param {createTemplateParams} params
 * @return {*}  {Promise<createTemplateResult>}
 */
 export function updateTemplate(
  params: createTemplateParams
): Promise<number> {
  const data: any = { ...params };
  return request.put(`/api/template/${data.id}`, data);
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
  /**用户id */
  userId?: number;
  /**名称 */
  title?: string;
  /**标签 */
  tag?: string;
  /**终端 */
  terminal?: string;
  /**封面 */
  cove?: string;
  /**描述 */
  describe?: string;
  /**0不公开，1公开 */
  isPublic?: 0 | 1;
  /**条数 */
  limit?: number;
  /**页码 */
  offset?: number;
}

/**
 * 查询模板列表
 *
 * @export
 * @param {queryTemplateParams} params
 * @return {*}  {Promise<queryTemplateParams[]>}
 */
export function queryTemplate(params: queryTemplateParams): Promise<{
  rows: queryTemplateParams[];
  limit: number;
  offset: number;
  count: number;
}> {
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

export interface userResult {
  username: string;
  id: number;
}

export interface loginParams {
  username: string;
  password: string;
}
/**
 * 用户登录
 * @param params username & password
 * @returns 
 */
export function login (params: loginParams): Promise<userResult> {
  return request.post('/api/login', params)
}

export interface registerParams {
  username: string;
  password: string;
  confirm: string;
}
/**
 * 用户注册
 * @param params 注册
 * @returns 
 */
export function register (params: registerParams): Promise<userResult> {
  return request.post('/api/register', params)
}
/**
 * 
 * @returns 退出
 */
export function loginOut (): Promise<any> {
  return request.post('/api/loginOut')
}

/**
 * 同步用户信息
 * @returns 
 */
export function userSync (): Promise<userResult> {
  return request.get('/api/userSync')
} 